// src/components/TeachableMachineWebcam.jsx
import { useEffect, useRef } from 'react';

const TeachableMachineWebcam = ({ onPrediction }) => {
    const canvasRef = useRef(null);
    const labelContainerRef = useRef(null);
    const webcamRef = useRef(null);
    const URL = "/src/assets/models/1/1_4/"; // Replace with your model URL
    let model, webcam, maxPredictions;

    useEffect(() => {
        const init = async () => {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            model = await window.tmPose.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            const flip = true;
            webcam = new window.tmPose.Webcam(640, 480, flip); // width, height 설정
            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);

            const canvas = canvasRef.current;
            canvas.width = webcam.canvas.width;
            canvas.height = webcam.canvas.height;
            webcamRef.current = webcam;

            labelContainerRef.current.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainerRef.current.appendChild(document.createElement("div"));
            }
        };

        init();

        // Clean up webcam resources when component unmounts
        return () => {
            if (webcam) {
                webcam.stop();
            }
        };
    }, []);

    const loop = async () => {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    };

    const predict = async () => {
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
        }

        onPrediction(pose, prediction);
        drawPose(pose);
    };

    const drawPose = (pose) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (webcam.canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            ctx.drawImage(webcam.canvas, 0, 0, canvas.width, canvas.height); // Draw the webcam feed
            
            // Draw green rectangle (guide line)
            const rectWidth = canvas.width * 0.35; // Width relative to canvas width
            const rectHeight = canvas.height * 0.60; // Height relative to canvas height
            const rectX = (canvas.width - rectWidth) / 2;
            const rectY = (canvas.height - rectHeight) / 2;

            ctx.strokeStyle = 'green';
            ctx.lineWidth = 5;
            ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

            if (pose) {
                const minPartConfidence = 0.5;
                window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    };

    return (
        <div className="webcam">
            <canvas ref={canvasRef} id="canvas"></canvas>
            <div id="label-container" ref={labelContainerRef}></div>
        </div>
    );
};

export default TeachableMachineWebcam;
