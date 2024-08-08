import { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Webcam = ({ onPrediction }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const URL = "/src/assets/models/opencv/"; // 모델 URL
    let model;

    useEffect(() => {
        const init = async () => {
            try {
                await tf.setBackend('webgl');
                await tf.ready();
            } catch (error) {
                console.warn("WebGL is not supported on this device. Switching to CPU backend.");
                await tf.setBackend('cpu');
                await tf.ready();
            }

            const modelURL = URL + "model.json";
            model = await tf.loadLayersModel(modelURL);

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

            let predictionCount = 0;
            const maxPredictions = 5;

            pose.onResults(async (results) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 비디오 프레임 그리기

                // 포즈 랜드마크 그리기
                window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
                window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.1 });

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

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false // 오디오 비활성화
                });
                video.srcObject = stream;
                video.play();
                camera.start();

                // 10초마다 예측 실행
                const predictionInterval = setInterval(async () => {
                    if (predictionCount >= maxPredictions) {
                        clearInterval(predictionInterval);
                        console.log('Prediction completed.');
                        return;
                    }
                    await pose.send({ image: video });
                    predictionCount++;
                }, 10000); // 10000ms = 10초

                // Cleanup
                return () => {
                    clearInterval(predictionInterval);
                    if (webcamRef.current && webcamRef.current.srcObject) {
                        const tracks = webcamRef.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                    }
                };
            } catch (error) {
                alert("Failed to acquire camera feed: " + error.message);
                console.error("Error accessing the camera: ", error);
            }
        };

        init();
    }, [onPrediction]);

    return (
        <div className="webcam-container">
            <video
                ref={webcamRef}
                style={{
                    display: 'none', // 비디오를 숨기고 캔버스에 그릴 것이므로 숨김
                }}
                autoPlay
                playsInline
            />
            <canvas
                ref={canvasRef}
                style={{
                    width: 640,
                    height: 480,
                }}
            />
        </div>
    );
};

export default Webcam;
