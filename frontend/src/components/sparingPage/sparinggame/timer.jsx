import '../../../styles/sparingPage/sparinggame/timer.css';
import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(5);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const startTimer = () => {
    setTime(5);
    setIsActive(true);
  };

  return (
    <div onClick={startTimer} className="timerbox">
      <p className="timersecond">{time}</p>
    </div>
  );
};

export default Timer;