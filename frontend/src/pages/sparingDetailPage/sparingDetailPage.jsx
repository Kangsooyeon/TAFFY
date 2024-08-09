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
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSparingMissionUserAsync } from '../../store/sparing/sparMission';

const SparingDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connectionToken, userdata, status } = location.state;
  console.log('Received in SparingDetailPage:', { connectionToken, userdata });

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [opponentData, setOpponentData] = useState(null);
  const [round, setRound] = useState(0);
  const [myMission, setMyMission] = useState('');
  const [opponentMission, setOpponentMission] = useState('');
  const [isAttack, setIsAttack] = useState(status === 'start' ? true : false);
  const [myHp, setMyHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);
  const [myAction, setMyAction] = useState('basic');
  const [opponentAction, setOpponentAction] = useState('basic');
  
  const nickname = userdata.data.nickname;

  useEffect(() => {
    if (myHp <= 0 || opponentHp <= 0) {
      const isMyWin = myHp > 0;
      const isOpponentWin = opponentHp > 0;
  
      session.signal({
        data: JSON.stringify({
          nickname,
          myResult: isMyWin ? 'win' : 'lose',
          opponentResult: isOpponentWin ? 'win' : 'lose',
          myData: userdata,
          opponentData: opponentData
        }),
        to: [],
        type: 'result'
      });
  
      navigate('/sp/game/result', {
        state: {
          myData: userdata,
          opponentData: opponentData,
          myResult: isMyWin ? 'win' : 'lose',
          opponentResult: isOpponentWin ? 'win' : 'lose'
        }
      });
    }
  }, [myHp, opponentHp, session, navigate, userdata, opponentData, nickname]);
  const atkData = useSelector(state => state.sparingMission.data?.ATK);
  const defData = useSelector(state => state.sparingMission.data?.DEF);

  useEffect(() => {
    dispatch(fetchSparingMissionUserAsync('ATK'));
    dispatch(fetchSparingMissionUserAsync('DEF'));
  }, [dispatch]);
  

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('signal:userData', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        setOpponentData(data);
      }
    });

    session.on('signal:mission', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        setOpponentMission(data.mission);
      }
    });

    session.on('signal:action', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        setOpponentAction(data.myAction);
        setMyAction(data.opponentAction);
        if (data.opponentHp !== undefined) setOpponentHp(data.myHp);
        if (data.myHp !== undefined) setMyHp(data.opponentHp);
      }
    });
    
    session.on('signal:result', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        navigate('/sp/game/result', {
          state: {
            myData: data.opponentData,
            opponentData: data.myData,
            myResult: data.opponentResult,
            opponentResult: data.myResult
          }
        });
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

  const handleWin = (winner) => {
    let newMyAction, newOpponentAction;
    let newMyHp = myHp;
    let newOpponentHp = opponentHp;

    if (winner === 'left') {
      newOpponentHp = Math.max(newOpponentHp - 34, 0)
      newMyAction = 'leg';
      newOpponentAction = 'defense';
    } else if (winner === 'right') {
      newMyHp = Math.max(newMyHp - 34, 0)
      newMyAction = 'defense';
      newOpponentAction = 'leg';
    }

    setMyHp(newMyHp);
    setOpponentHp(newOpponentHp);
    setMyAction(newMyAction);
    setOpponentAction(newOpponentAction);

    session.signal({
      data: JSON.stringify({
        myAction: newMyAction,
        opponentAction: newOpponentAction,
        myHp: newMyHp,
        opponentHp: newOpponentHp,
        nickname,
      }),
      to: [],
      type: 'action'
    });
  };

  const nextRound = () => {
    const missionList = isAttack ? atkData : defData;
    if (!missionList) return;

    const mission = missionList.data[Math.floor(Math.random() * missionList.data.length)];
    setMyMission(mission.moKoName);

    session.signal({
      data: JSON.stringify({ mission: mission.moKoName, isAttack, nickname }),
      to: [],
      type: 'mission'
    });

    const newRound = round + 1;
    const newIsAttack = !isAttack;
    setRound(newRound);
    setIsAttack(newIsAttack);
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
          <Character className="characterleft" userdata={userdata} action={myAction} />
          <Character className="characterright" userdata={opponentData} action={opponentAction} />
        </>
      );
    } else if (subscribers && opponentData) {
      return (
        <>
          <Character className="characterleft" userdata={opponentData} action={opponentAction} />
          <Character className="characterright" userdata={userdata} action={myAction} />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="sparinggame">
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>
      {renderGameUsers()}
      <HpBar className="hpbarleft" hp={myHp} />
      <HpBar className="hpbarright" hp={opponentHp} />
      {/* <Score /> */}
      {renderGameCharacters()}
      <Mission myMission={myMission} opponentMission={opponentMission} />
      <Timer />
      <WebCam className="webcamleft" streamManager={publisher} />
      {subscribers.map((subscriber, index) => (
        <WebCam key={index} className="webcamright" streamManager={subscriber} />
      ))}
      <button onClick={nextRound}>Next Round</button>
      <button onClick={() => handleWin('left')}>left win</button>
      <button onClick={() => handleWin('right')}>right win</button>
    </div>
  );
};

export default SparingDetailPage;
