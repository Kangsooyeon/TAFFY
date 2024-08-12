import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

const WebCam = ({ className, streamManager, isAttack, isLocalUser  }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      console.log('Video stream added to video element');
    } else {
      console.warn('Stream manager or video element not found');
    }

    const loadModelAndPose = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('TensorFlow.js initialized with WebGL backend');

        const modelPath = isAttack ? '/models/6jang/model.json' : '/models/7jang/model.json';
        console.log(`Loading model from: ${modelPath}`);
        
        let model;
        try {
          model = await tf.loadLayersModel(modelPath);
          console.log(`Successfully loaded model from: ${modelPath}`);
        } catch (modelLoadError) {
          console.error(`Failed to load model from: ${modelPath}`, modelLoadError);
          return;
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

        videoRef.current.onloadeddata = () => {
          console.log('Video data loaded');

          const sendPose = async () => {
            await pose.send({ image: videoRef.current });
            requestAnimationFrame(sendPose);  // 루프 실행
          };

          sendPose();  // 초기 시작
        };

        pose.onResults(async (results) => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          if (results.poseLandmarks) {
            // 관절 좌표 추출 및 텐서로 변환
            const keypoints = results.poseLandmarks.flatMap(({ x, y, z }) => [x, y, z]);
            const inputTensor = tf.tensor2d([keypoints]);

            // console.log('Input Tensor:', inputTensor.arraySync());

            // 예측 레이블 배열 정의
            const labels = isAttack 
              ? ['두 주먹 젖혀찌르기', '니킥','앞차기', '몸통찌르기'] 
              : ['몸통막기', '아래막기', '얼굴막기'];

            // 모델 예측 수행
            const predictions = model.predict(inputTensor);
            predictions.array().then((result) => {
              const predictedIndex = result[0].indexOf(Math.max(...result[0]));
              const predictedLabel = labels[predictedIndex];
              // console.log('Model predictions:', result);
              // console.log('Predicted Label:', predictedLabel);

              if (isLocalUser) {
                if (isAttack) {
                  console.log('Attack Mode - Predicted Label:', predictedLabel);
                } else {
                  console.log('Defense Mode - Predicted Label:', predictedLabel);
                }
              }
            });

            // 포즈 랜드마크 그리기
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

    loadModelAndPose();

  }, [streamManager, isAttack, isLocalUser]);

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
