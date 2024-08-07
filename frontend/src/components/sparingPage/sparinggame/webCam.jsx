import '../../../styles/sparingPage/sparinggame/webCam.css';
import CamTop from '../../../assets/images/sparingPage/webcam-top.png';
import { useEffect, useRef } from 'react';

const WebCam = ({ className, streamManager }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div className={`webcambox ${className}`}>
      <img src={CamTop} className="camtop" alt="" />
      <section className="cam">
        <video ref={videoRef} autoPlay className="camvideo" />
      </section>
    </div>
  );
}

export default WebCam;
