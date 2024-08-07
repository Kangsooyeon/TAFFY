import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Webcam = ({ onPrediction }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const URL = "/src/assets/models/opencv/"; // 모델 URL
    let model;

    useEffect(() => {
        const init = async () => {
            await tf.setBackend('webgl');
            await tf.ready();

            const modelURL = URL + "model.json";
            model = await tf.loadLayersModel(modelURL);
            // console.log("Model Loaded:", model);
            // model.summary(); // 모델 구조를 출력하여 확인

            const video = webcamRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

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

            pose.onResults(async (results) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
                window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
                window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });

                if (results.poseLandmarks) {
                    const keypoints = results.poseLandmarks.flatMap(({ x, y, z }) => [x, y, z]);
                    if (keypoints.length !== 99) {
                        console.error("Keypoints length is incorrect:", keypoints.length);
                        return;
                    }
                    
                    // 관절 좌표를 콘솔에 출력
                    console.log('Pose Landmarks:', results.poseLandmarks);

                    const inputTensor = tf.tensor2d([keypoints]);
                    console.log('Input Tensor:', inputTensor.arraySync()); // 입력 데이터 확인

                    try {
                        const predictions = await model.predict(inputTensor).data();
                        // 예측값을 콘솔에 출력
                        console.log('Predictions:', predictions);
                        onPrediction(predictions);
                    } catch (error) {
                        console.error("Prediction error:", error);
                    }
                }
            });

            const camera = new window.Camera(video, {
                onFrame: async () => {
                    await pose.send({ image: video });
                },
                width: 640,
                height: 480
            });

            camera.start();
        };

        init();

        return () => {
            if (webcamRef.current && webcamRef.current.srcObject) {
                const tracks = webcamRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [onPrediction]);

    return (
        <div className="webcam">
            <video
                ref={webcamRef}
                style={{
                    position: 'absolute',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 9,
                    width: 640,
                    height: 480,
                    visibility: 'visible', // 웹캠 비디오 표시
                }}
                autoPlay
                playsInline
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 10,
                    width: 640,
                    height: 480,
                }}
            />
        </div>
    );
};

export default Webcam;
