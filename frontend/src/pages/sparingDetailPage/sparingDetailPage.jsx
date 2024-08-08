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
  const [opponentData, setOpponentData] = useState(null);
  const nickname = userdata.data.nickname;

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    // Signal event to receive opponent's data
    session.on('signal:userData', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        console.log('Received signal:userData:', data);
        setOpponentData(data);
      } else {
        console.log('Ignored own signal:userData');
      }
    });

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
          publishAudio: false,
        });

        session.publish(publisher);
        setPublisher(publisher);
        setSession(session);

        const userDataWithNickname = { ...userdata, nickname };
        console.log('Sending userData signal:', userDataWithNickname);
        session.signal({
          data: JSON.stringify(userDataWithNickname),
          to: [],
          type: 'userData'
        });
      })
      .catch(error => {
        console.error('Failed to connect to the session:', error);
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [connectionToken, userdata]);

  const renderGameUsers = () => {
    if (publisher && opponentData) {
      return (
        <>
          <GameUser className="gameuserleft" userdata={userdata} />
          <GameUser className="gameuserright" userdata={opponentData} />
        </>
      );
    } else if (subscribers && opponentData) {
      return (
        <>
          <GameUser className="gameuserleft" userdata={opponentData} />
          <GameUser className="gameuserright" userdata={userdata} />
        </>
      );
    } else {
      return null;
    }
  };
  const renderGameCharacters = () => {
    if (publisher && opponentData) {
      return (
        <>
          <Character className="characterleft" userdata={userdata} action="leg" />
          <Character className="characterright" userdata={opponentData} action="leg" />
        </>
      );
    } else if (subscribers && opponentData) {
      return (
        <>
          <Character className="characterleft" userdata={opponentData} action="leg" />
          <Character className="characterright" userdata={userdata} action="leg" />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="sparinggame">
      <img src={Left} className="sparinggameleft" alt="" />
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>
      {renderGameUsers()}
      <HpBar className="hpbarleft" />
      <HpBar className="hpbarright" />
      <Score />
      {renderGameCharacters()}
      {/* <Character className="characterleft"/>
      <Character className="characterright" /> */}
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
