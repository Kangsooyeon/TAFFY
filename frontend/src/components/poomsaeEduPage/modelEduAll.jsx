import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';

const Webcam = ({ onPrediction, poomsaeId, currentMoveIndex }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const modelIndex = Math.floor(currentMoveIndex / 6) + 1
    const URL = `/models/${poomsaeId}jang/1_${modelIndex}/`;
    let model;

    const location = useLocation();

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
                    // window.drawConnectors(ctx, results.poseLandmarks, window.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
                    // window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 0.1 });

                    if (results.poseLandmarks) {
                        const keypoints = results.poseLandmarks.flatMap(({ x, y, z }) => [x, y, z]);
                        if (keypoints.length !== 99) {
                            console.error("Keypoints length is incorrect:", keypoints.length);
                            return;
                        }

                        const inputTensor = tf.tensor2d([keypoints]);
                        console.log('Input Tensor:', inputTensor.arraySync()); // 입력 데이터 확인

                        try {
                            const predictions = await model.predict(inputTensor).data();
                            console.log('Predictions:', predictions);
                            onPrediction(predictions);
                        } catch (error) {
                            console.error("Prediction error:", error);
                        }
                    }
                });

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

                return () => {
                    if (webcamRef.current && webcamRef.current.srcObject) {
                        const tracks = webcamRef.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop()); // Stop all video tracks
                        webcamRef.current.srcObject = null; // Remove the stream to release the camera
                        console.log("Webcam stopped and camera access released due to page navigation.");
                    }
                };
            } catch (error) {
                console.error("Error initializing pose detection:", error);
            }
        };

        init();

        // Clean up webcam when location changes (page navigation)
    }, [onPrediction, URL, location]);

    return (
        <div className="userCam">
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
                    width: '190%',
                    height: '110%',
                    boxShadow: '-7px 7px 5px 0px rgba(0, 0, 0, 0.35)',
                    borderRadius: '2%',
                }}
            />
        </div>
    );
};

Webcam.propTypes = {
    onPrediction: PropTypes.func.isRequired, 
    poomsaeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
};

export default Webcam;
