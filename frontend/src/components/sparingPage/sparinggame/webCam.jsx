import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const WebCam = ({ className, streamManager, isAttack, isLocalUser, setPredictedLabel, language, isGamePaused }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const poseRef = useRef(null);

  // console.log(isAttack)
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
      if (!isGamePaused) {
      
        if (streamManager && videoRef.current) {
          streamManager.addVideoElement(videoRef.current);
          // console.log('Video stream added to video element');
        } else {
          console.warn('Stream manager or video element not found');
          return;
        }

        console.log(isLocalUser)
        if (isLocalUser) {

        
          try {
            await tf.setBackend('webgl');
            await tf.ready();
            // console.log('TensorFlow.js initialized with WebGL backend');

            const modelPath = isAttack ? 'https://cdn.jsdelivr.net/gh/Kangsooyeon/TAFFY_attack@main/model.json' : 'https://cdn.jsdelivr.net/gh/Kangsooyeon/TAFFY_defence@main/model.json';
            // console.log(`Loading model from: ${modelPath}`);

            const model = await tf.loadLayersModel(modelPath);
            // console.log(`Successfully loaded model from: ${modelPath}`);
            modelRef.current = model;

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

            videoRef.current.oncanplay = () => {
              // console.log('Video can play');
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
              // console.log(1)
              if (isGamePaused) return;
              // console.log(2)
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
                    // console.log('Model predictions:', result);
                    // console.log(isAttack ? 'Attack Mode' : 'Defense Mode', '- Predicted Label:', predictedLabel);
                    setPredictedLabel(predictedLabel);
                  });
                }
              }
            });
          } catch (error) {
            console.error("Error initializing MediaPipe Pose or TensorFlow.js:", error);
          }
      }}
    };

    initializeStream()

    if (videoRef.current) {
      // console.log('Video element found');
    } else {
      console.error('Video element not found');
    }
    
    if (streamManager) {
      // console.log('Stream manager found');
    } else {
      console.error('Stream manager not found');
    }

    // console.log('Video ready state:', videoRef.current.readyState);

    if (videoRef.current.srcObject) {
      // console.log('Video source is set');
    } else {
      console.error('Video source is not set');
    }

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
  }, [streamManager, isAttack, isLocalUser, isGamePaused]);

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
