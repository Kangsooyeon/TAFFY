import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

const WebCam = ({ className, streamManager, isAttack, isLocalUser, setPredictedLabel }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const poseRef = useRef(null); // 포즈 객체를 ref로 관리

  useEffect(() => {
    const initializeStream = async () => {
      if (streamManager && videoRef.current) {
        streamManager.addVideoElement(videoRef.current);
        console.log('Video stream added to video element');
      } else {
        console.warn('Stream manager or video element not found');
        return;
      }

      if (isLocalUser) {
        try {
          await tf.setBackend('webgl');
          await tf.ready();
          console.log('TensorFlow.js initialized with WebGL backend');

          // 모델 로드 전에 기존 모델을 정리합니다.
          if (modelRef.current) {
            modelRef.current.dispose();
            modelRef.current = null;
          }

          const modelPath = isAttack ? '/models/6jang/model.json' : '/models/7jang/model.json';
          console.log(`Loading model from: ${modelPath}`);

          const model = await tf.loadLayersModel(modelPath);
          console.log(`Successfully loaded model from: ${modelPath}`);
          modelRef.current = model;

          // 이전 포즈 인식 객체를 정리합니다.
          if (poseRef.current) {
            poseRef.current.close(); // 포즈 인식기를 닫아줍니다.
          }

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

          poseRef.current = pose; // 현재 포즈 객체를 저장합니다.

          pose.onResults(async (results) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (canvas && ctx && videoRef.current) {
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;

              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

              if (results.poseLandmarks && modelRef.current) {
                const keypoints = results.poseLandmarks.flatMap(({ x, y, z }) => [x, y, z]);
                const inputTensor = tf.tensor2d([keypoints]);

                const labels = isAttack 
                  ? ['두 주먹 젖혀찌르기', '니킥','앞차기', '몸통찌르기'] 
                  : ['몸통막기', '아래막기', '얼굴막기'];

                const predictions = modelRef.current.predict(inputTensor);
                predictions.array().then((result) => {
                  const predictedIndex = result[0].indexOf(Math.max(...result[0]));
                  const predictedLabel = labels[predictedIndex];
                  console.log('Model predictions:', result);

                  console.log(isAttack ? 'Attack Mode' : 'Defense Mode', '- Predicted Label:', predictedLabel);
                  setPredictedLabel(predictedLabel);
                });
              }

              // 포즈 랜드마크 그리기
              window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
              window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.1 });
            }
          });

          videoRef.current.onloadeddata = () => {
            console.log('Video data loaded');
            const sendPose = async () => {
              await poseRef.current.send({ image: videoRef.current });
              requestAnimationFrame(sendPose);  // 루프 실행
            };
            sendPose();  // 초기 시작
          };
        } catch (error) {
          console.error("Error initializing MediaPipe Pose or TensorFlow.js:", error);
        }
      }
    };

    initializeStream();

    // Clean up when the component is unmounted or the dependencies change
    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
        modelRef.current = null;
      }
      if (poseRef.current) {
        poseRef.current.close();
        poseRef.current = null;
      }
    };
  }, [streamManager, isAttack, isLocalUser]);

  return (
    <div className={`webcambox ${className}`}>
      <img src={CamTop} className="camtop" alt="" />
      <section className="cam">
        <video ref={videoRef} autoPlay className="camvideo" />
        <canvas ref={canvasRef} className="camoverlay" style={{ display: 'none' }} />
      </section>
    </div>
  );
};

export default WebCam;
