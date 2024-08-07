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

const SparingDetailPage = () => {
  const location = useLocation();
  const { connectionToken, userdata } = location.state;
  console.log('Received in SparingDetailPage:', { connectionToken, userdata });
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    });

    session.on('streamDestroyed', (event) => {
      event.stream.streamManager?.dispose();
      setSubscribers(prevSubscribers => prevSubscribers.filter(sub => sub !== event.stream.streamManager));
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
      })
      .catch(error => {
        console.error('Failed to connect to the session:', error);
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [connectionToken]);

  return (
    <div className="sparinggame">
      <img src={Left} className="sparinggameleft" alt="" />
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>
      <GameUser className="gameuserleft" userdata={userdata} />
      <GameUser className="gameuserright" userdata={userdata} />
      <HpBar className="hpbarleft" />
      <HpBar className="hpbarright" />
      <Score />
      <Character className="characterleft"/>
      <Character className="characterright" />
      <Mission />
      <Timer />
      <WebCam className="webcamleft" streamManager={publisher} />
      {subscribers.map((subscriber, index) => (
        <WebCam key={index} className="webcamright" streamManager={subscriber} />
      ))}
    </div>
  );
};

export default SparingDetailPage;
