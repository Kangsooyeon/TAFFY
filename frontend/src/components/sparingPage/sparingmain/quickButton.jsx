import '../../../styles/sparingPage/sparingmain/quickButton.css';
import Punch from '../../../assets/images/sparingPage/punch.png';
// import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuickSparingAsync } from '../../../store/sparing/quickStart';
import { device_util, div } from '@tensorflow/tfjs';
import { useState } from 'react'

const QuickButton = ({ userdata, stompClient, setSessionID, setConnectionToken, setStatus, setRoomType, language }) => {
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false)

  const handleQuickStart = async () => {
    try {
      const response = await dispatch(fetchQuickSparingAsync()).unwrap();
      console.log(response.data)
      const { status, sessionId, connectionToken } = response.data;

      setSessionID(sessionId);
      setConnectionToken(connectionToken);
      setStatus(status)
      setRoomType('public')
      setWaiting(true)

      if (status === 'waiting') {
        console.log('대기 상태입니다');
      } else if (status === 'start') {
        const dataMessage = {
          nickname: userdata.data.nickname,
          sessionId: sessionId,
          roomType: 'public'
        };             
        console.log(dataMessage)
        stompClient.publish({
          destination: '/app/data.send',
          body: JSON.stringify(dataMessage),
        });
        console.log('메시지 전송 완료')
      }
    } catch (error) {
      console.error('Error during quick start:', error);
    }
  };

  return (
    <button className="quickbutton" onClick={handleQuickStart}>
      { waiting ? 
        <div className="quickbuttoncontainer">
          <div id="spinner"></div>
          <p className="quicktitle">대기 중...</p>
          <div id="spinner"></div>
        </div>
        :
        <div className="quickbuttoncontainer">
          <img src={Punch} alt="Quick Start" />
          <p className="quicktitle">{language === "ko" ? "빠른 시작" : "Quick Start"}</p>
          <img src={Punch} alt="Quick Start" />
        </div>
       }
    </button>
  );
};

export default QuickButton;