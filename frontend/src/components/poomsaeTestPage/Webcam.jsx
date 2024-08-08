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
                console.warn("WebGL is not supported on this device. Switching to WASM backend.");
                await tf.setBackend('wasm');
                await tf.ready();
            }

            try {
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

                // startCamera 함수 정의 및 호출
                const startCamera = async () => {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 640, height: 480, frameRate: { max: 15 } },
                        audio: false // 오디오 비활성화
                    });

                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                        const camera = new window.Camera(video, {
                            onFrame: async () => {
                                await pose.send({ image: video });
                            },
                            width: 640,
                            height: 480
                        });
                        camera.start();
                    };
                };

                startCamera();

                // Cleanup
                return () => {
                    if (webcamRef.current && webcamRef.current.srcObject) {
                        const tracks = webcamRef.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                    }
                };
            } catch (error) {
                console.error("Error initializing pose detection:", error);
                alert("An error occurred during the initialization of pose detection. Please try again.");
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
