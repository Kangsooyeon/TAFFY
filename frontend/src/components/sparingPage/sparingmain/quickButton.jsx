// import { useNavigate } from 'react-router-dom';
import '../../../styles/sparingPage/sparingmain/quickButton.css'
import Punch from '../../../assets/images/sparingPage/punch.png'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {fetchQuickSparingAsync} from '../../../store/sparing/quickStart.js'
import { OpenVidu } from 'openvidu-browser';
import { useNavigate } from 'react-router-dom';

const quickButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);

  const handleQuickStart = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(fetchQuickSparingAsync()).unwrap();
      const data = response.data;
      console.log(data)
      const OV = new OpenVidu();
      const session = OV.initSession();

      session.on('streamCreated', (event) => {
        session.subscribe(event.stream, 'subscriber');
      });

      await session.connect(data.connectionToken);

      const publisher = OV.initPublisher('publisher');
      session.publish(publisher);

      setSession(session);
      setPublisher(publisher);

      console.log('Connected to session:', data.sessionId);
      console.log('Connection status:', data.status);
    
      navigate('/sp/game', { state: { sessionId: data.sessionId, connectionToken: data.connectionToken } });
    } catch (error) {
      console.error('Failed to fetch quick sparing data: ', error);
    }
  }

  return (
    <button className="quickbutton" onClick={handleQuickStart}>
      <img src={Punch} alt="" />
      <p className="quicktitle">빠른 시작</p>
      <img src={Punch} alt="" />
    </button>
  )
}

export default quickButton;