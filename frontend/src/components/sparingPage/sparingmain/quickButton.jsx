import '../../../styles/sparingPage/sparingmain/quickButton.css';
import Punch from '../../../assets/images/sparingPage/punch.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuickSparingAsync } from '../../../store/sparing/quickStart.js';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

const QuickButton = ({ userdata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('https://i11e104.p.ssafy.io:8081/ws');
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onError,
    });
    stompClient.activate();
  }, []);

  const onConnected = () => {
    console.log('Connected to WebSocket');
    setIsConnected(true);
  };

  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
    setIsConnected(false);
  };

  const handleQuickStart = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      console.error('WebSocket is not connected');
      return;
    }

    try {
      const response = await dispatch(fetchQuickSparingAsync()).unwrap();
      const { sessionId, connectionToken, status } = response.data;
      console.log(response.data);

      stompClient.publish({ destination: '/app/register', body: JSON.stringify({ sessionId, connectionToken, userdata, status }) });

      if (status === 'start') {
        stompClient.publish({ destination: '/app/startGame', body: JSON.stringify({ sessionId }) });
      }

      navigate(`/sp/game/${sessionId}`, { state: { sessionId, connectionToken, status } });
    } catch (error) {
      console.error('Failed to fetch quick sparing data: ', error);
    }
  };

  return (
    <button className="quickbutton" onClick={handleQuickStart} disabled={!isConnected}>
      <img src={Punch} alt="" />
      <p className="quicktitle">빠른 시작</p>
      <img src={Punch} alt="" />
    </button>
  );
};

export default QuickButton;
