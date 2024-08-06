import '../../../styles/sparingPage/sparingmain/quickButton.css'
import Punch from '../../../assets/images/sparingPage/punch.png'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuickSparingAsync } from '../../../store/sparing/quickStart.js'
import { OpenVidu } from 'openvidu-browser';
import { useNavigate } from 'react-router-dom';

const QuickButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuickStart = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(fetchQuickSparingAsync()).unwrap();
      const { sessionId, connectionToken, status } = response.data;
      console.log(response.data);

      navigate(`/sp/game/${sessionId}`, { state: { sessionId, connectionToken, status } });
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

export default QuickButton;
