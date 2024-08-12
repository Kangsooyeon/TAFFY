import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landingPage/landingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoEnd = () => {
      navigate('/main');
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [navigate]);

  // const handleStart = () => {
  //   navigate('/main');
  // };

  return (
    <div className="landingPage">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="backgroundMedia"
      >
        <source src="/videos/LandingFirst.mp4" type="video/mp4" />
      </video>
      {/* <div className="overlay">
        <button className="startButton" onClick={handleStart}>Start</button>
      </div> */}
    </div>
  );
};

export default LandingPage;
