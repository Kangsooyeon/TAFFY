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
import { useDispatch, useSelector } from 'react-redux';
import { fetchSparingMissionUserAsync } from '../../store/sparing/sparMission';

const SparingDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { connectionToken, userdata } = location.state;
  console.log('Received in SparingDetailPage:', { connectionToken, userdata });

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [opponentData, setOpponentData] = useState(null);
  const [round, setRound] = useState(0);
  const [myMission, setMyMission] = useState('');
  const [opponentMission, setOpponentMission] = useState('');
  const [isAttack, setIsAttack] = useState(true); // 초기 상태: 공격

  const atkData = useSelector(state => state.sparingMission.data?.ATK);
  const defData = useSelector(state => state.sparingMission.data?.DEF);

  useEffect(() => {
    dispatch(fetchSparingMissionUserAsync('ATK'));
    dispatch(fetchSparingMissionUserAsync('DEF'));
  }, [dispatch]);

  const nickname = userdata.data.nickname;

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('signal:userData', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        console.log('Received signal:userData:', data);
        setOpponentData(data);
      } else {
        console.log('Ignored own signal:userData');
      }
    });

    session.on('signal:mission', (event) => {
      const { mission, isAttack: senderIsAttack } = JSON.parse(event.data);
      console.log('Received mission signal:', mission, senderIsAttack);
      if (senderIsAttack !== isAttack) {
        setOpponentMission(mission);
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
  }, [connectionToken, userdata, nickname]);

  const nextRound = () => {
    const missionList = isAttack ? atkData : defData;
    if (!missionList) return; // missionList가 없을 경우 바로 반환
    console.log(Math.random() * missionList.length)
    const mission = missionList.data[Math.floor(Math.random() * missionList.data.length)];
    console.log(mission);
    setMyMission(mission.moKoName);

    session.signal({
      data: JSON.stringify({ mission: mission.moKoName, isAttack }),
      to: [],
      type: 'mission'
    });

    setRound(round + 1);
    setIsAttack(!isAttack); // 공수를 변경
  };

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
      {/* <img src={Left} className="sparinggameleft" alt="" /> */}
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>
      {renderGameUsers()}
      <HpBar className="hpbarleft" />
      <HpBar className="hpbarright" />
      <Score />
      {renderGameCharacters()}
      <Mission myMission={myMission} opponentMission={opponentMission} />
      <Timer />
      <WebCam className="webcamleft" streamManager={publisher} />
      {subscribers.map((subscriber, index) => (
        <WebCam key={index} className="webcamright" streamManager={subscriber} />
      ))}
      <button onClick={nextRound}>Next Round</button>
    </div>
  );
};

export default SparingDetailPage;
