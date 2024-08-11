import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

const WebCam = ({ className, streamManager }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      console.log('Video stream added to video element');
    } else {
      console.warn('Stream manager or video element not found');
    }

    const loadMediaPipe = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js initialized with WebGL backend');

        const pose = new window.Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        // 비디오 로드 후 처리
        videoRef.current.onloadeddata = () => {
          console.log('Video data loaded');

          const sendPose = async () => {
            await pose.send({ image: videoRef.current });
            requestAnimationFrame(sendPose);  // 루프 실행
          };

          sendPose();  // 초기 시작
        };

        pose.onResults((results) => {
          console.log('Pose results:', results);

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          // 비디오 크기와 캔버스 크기 일치
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          if (results.poseLandmarks) {
            window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
            window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.1 });
          } else {
            console.warn('No pose landmarks detected');
          }
        });

      } catch (error) {
        console.error("Error initializing MediaPipe Pose or TensorFlow.js:", error);
      }
    };

    loadMediaPipe();

  }, [streamManager]);

  return (
    <div className={`webcambox ${className}`}>
      <img src={CamTop} className="camtop" alt="" />
      <section className="cam">
        <video ref={videoRef} autoPlay className="camvideo" />
        <canvas ref={canvasRef} className="camoverlay" />
      </section>
    </div>
  );
}

export default WebCam;
