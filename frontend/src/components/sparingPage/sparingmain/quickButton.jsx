import '../../../styles/sparingPage/sparingmain/quickButton.css';
import Punch from '../../../assets/images/sparingPage/punch.png';
// import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuickSparingAsync } from '../../../store/sparing/quickStart';

const QuickButton = ({ userdata, stompClient, setSessionID, setConnectionToken, setStatus }) => {
  const dispatch = useDispatch();

  const handleQuickStart = async () => {
    try {
      const response = await dispatch(fetchQuickSparingAsync()).unwrap();
      console.log(response.data)
      const { status, sessionId, connectionToken } = response.data;

      setSessionID(sessionId);
      setConnectionToken(connectionToken);
      setStatus(status)

      if (status === 'waiting') {
        console.log('대기 상태입니다');
      } else if (status === 'start') {
        const dataMessage = {
          nickname: userdata.data.nickname,
          sessionId: sessionId,
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
      <img src={Punch} alt="Quick Start" />
      <p className="quicktitle">빠른 시작</p>
      <img src={Punch} alt="Quick Start" />
    </button>
  );
};

export default QuickButton;