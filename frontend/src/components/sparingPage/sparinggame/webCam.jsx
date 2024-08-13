import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
// import Attackk from '/models/6jang/model.json'
// import Defensee from '/models/7jang/model.json'

const WebCam = ({ className, streamManager, isAttack, isLocalUser, setPredictedLabel, language }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const poseRef = useRef(null); // 포즈 객체를 ref로 관리
  // const [isModelReady, setIsModelReady] = useState(false); // 모델이 실행 가능한지 여부를 나타내는 상태
  
  // 3초 후에 모델이 준비된 상태로 변경
  // const modelReadyTimeout = setTimeout(() => {
  //   setIsModelReady(true);
  // }, 2000);
  console.log(isAttack)
  useEffect(() => {
    const initializeStream = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
      } catch (error) {
          console.warn("WebGL is not supported on this device. Switching to WASM backend.");
          await tf.setBackend('wasm');
          await tf.ready();
      }

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

          // if (modelRef.current) {
          //   modelRef.current.dispose();
          //   modelRef.current = null;
          // }

          const modelPath = isAttack ? 'https://cdn.jsdelivr.net/gh/Kangsooyeon/TAFFY_attack@main/model.json' : 'https://cdn.jsdelivr.net/gh/Kangsooyeon/TAFFY_defence@main/model.json';
          console.log(`Loading model from: ${modelPath}`);

          const model = await tf.loadLayersModel(modelPath);
          console.log(`Successfully loaded model from: ${modelPath}`);
          modelRef.current = model;

          // if (poseRef.current) {
          //   poseRef.current.close(); // 포즈 인식기를 닫아줍니다.
          // }

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
          console.log(1)
          // console.log(isModelReady)

          videoRef.current.oncanplay = () => {
            console.log('Video can play');
            const sendPose = async () => {
              if (poseRef.current && videoRef.current.readyState >= 2) {
                await poseRef.current.send({ image: videoRef.current });
                console.log('pose.send() called');
                requestAnimationFrame(sendPose);
              }
            };
            sendPose();
          };

          pose.onResults(async (results) => {
            // if (!isModelReady) return; // 모델이 준비되지 않았으면 예측을 수행하지 않음
            
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

                const labels = language === 'ko' 
                ? (isAttack 
                    ? ['준비', '앞차기', '몸통찌르기', '두 주먹 젖혀 찌르기'] 
                    : ['준비', '아래막기', '얼굴막기', '몸통막기']
                  )
                : (isAttack 
                    ? ['Ready', 'Front kick', 'Fist middle punch', 'Two fists raised and stabbed'] 
                    : ['Ready', 'Low block', 'Face block', 'Middle block']
                  );

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
              // window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
              // window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.1 });
            }
            
            // videoRef.current.onloadeddata = () => {
            //   console.log('Video data loaded');
            //   const sendPose = async () => {
            //     if (poseRef.current && videoRef.current.readyState >= 2) { // 비디오 데이터가 준비되었는지 확인
            //       await poseRef.current.send({ image: videoRef.current });
            //       console.log('pose.send() called');
            //       requestAnimationFrame(sendPose);  // 루프 실행
            //     }
            //   };
            //   sendPose();  // 초기 시작
            // };  
          });
          
        } catch (error) {
          console.error("Error initializing MediaPipe Pose or TensorFlow.js:", error);
        }
      }
    };

    initializeStream();
    if (videoRef.current) {
      console.log('Video element found');
    } else {
      console.error('Video element not found');
    }
    
    if (streamManager) {
      console.log('Stream manager found');
    } else {
      console.error('Stream manager not found');
    }

    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      console.log('Video stream added to video element');
    } else {
      console.warn('Stream manager or video element not found');
      return;
    }

    console.log('Video ready state:', videoRef.current.readyState);

    if (videoRef.current.srcObject) {
      console.log('Video source is set');
    } else {
      console.error('Video source is not set');
    }

    return () => {
      // clearTimeout(modelReadyTimeout); // 타이머 정리
      if (modelRef.current) {
        modelRef.current.dispose();
        modelRef.current = null;
      }
      if (poseRef.current) {
        poseRef.current.close();
        poseRef.current = null;
      }
    };
  }, [streamManager, isAttack, isLocalUser,]);

  return (
    <div className={`webcambox ${className}`}>
      <img src={CamTop} className="camtop" alt="" />
      <section className="cam">
        <video ref={videoRef} autoPlay className="camvideo" />
        <canvas  ref={canvasRef} className="camoverlay" style={{ display: 'none' }} />
      </section>
    </div>
  );
};

export default WebCam;
