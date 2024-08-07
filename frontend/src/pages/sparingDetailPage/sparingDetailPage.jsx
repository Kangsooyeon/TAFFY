import '../../styles/sparingPage/sparinggame/sparingDetailPage.css';
import Left from '../../assets/images/sparingPage/game-left.png';
import Right from '../../assets/images/sparingPage/game-right.png';
import Mat from '../../assets/images/sparingPage/sparingmat.png';
import Character from '../../components/sparingPage/sparinggame/character.jsx';
import HpBar from '../../components/sparingPage/sparinggame/hpBar.jsx';
import Mission from '../../components/sparingPage/sparinggame/mission.jsx';
import Score from '../../components/sparingPage/sparinggame/score.jsx';
import Timer from '../../components/sparingPage/sparinggame/timer.jsx';
import WebCam from '../../components/sparingPage/sparinggame/webCam.jsx';
import GameUser from '../../components/sparingPage/sparinggame/gameuser.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

const SparingDetailPage = () => {
  const location = useLocation();
  const { sessionId, connectionToken, status } = location.state;
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [playerStatus, setPlayerStatus] = useState(status);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscriber(subscriber);
    });

    session.connect(connectionToken)
      .then(() => {
        const publisher = OV.initPublisher(undefined, {
          insertMode: 'APPEND',
          width: '100%',
          height: '100%',
        });

        session.publish(publisher);
        setPublisher(publisher);
        setSession(session);

        // Set up WebSocket connection
        const socket = new SockJS('https://i11e104.p.ssafy.io/ws');
        stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => {
            console.log(str);
          },
          reconnectDelay: 5000,
          onConnect: () => {
            setIsConnected(true);
            stompClient.subscribe(`/topic/game/${sessionId}`, (message) => {
              const { event } = JSON.parse(message.body);
              if (event === 'start') {
                setPlayerStatus('start');
              }
            });

            stompClient.publish({ destination: '/app/join', body: JSON.stringify({ sessionId, status }) });
          },
          onStompError: (error) => {
            console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
          },
        });
        stompClient.activate();
      })
      .catch(error => {
        console.error('Failed to connect to the session:', error);
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [connectionToken, sessionId]);

  return (
    <div className="sparinggame">
      <img src={Left} className="sparinggameleft" alt="" />
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>
      <GameUser className="gameuserleft" />
      <GameUser className="gameuserright" />
      <HpBar className="hpbarleft" />
      <HpBar className="hpbarright" />
      <Score />
      <Character className="characterleft" />
      <Character className="characterright" />
      <Mission />
      <Timer />
      <WebCam className="webcamright" streamManager={subscriber} />
      <WebCam className="webcamleft" streamManager={publisher} />
    </div>
  );
};

export default SparingDetailPage;
