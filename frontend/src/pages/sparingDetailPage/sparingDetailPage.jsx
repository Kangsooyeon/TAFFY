import '../../styles/sparingPage/sparinggame/sparingDetailPage.css';
import Left from '../../assets/images/sparingPage/game-left.png';
import Right from '../../assets/images/sparingPage/game-right.png';
import Mat from '../../assets/images/sparingPage/sparingmat.png';
import Character from '../../components/sparingPage/sparinggame/character.jsx';
import HpBar from '../../components/sparingPage/sparinggame/hpBar.jsx';
import Mission from '../../components/sparingPage/sparinggame/mission.jsx';
import Timer from '../../components/sparingPage/sparinggame/timer.jsx';
import WebCam from '../../components/sparingPage/sparinggame/webCam.jsx';
import GameUser from '../../components/sparingPage/sparinggame/gameuser.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRecordUpdateAsync, fetchUserRecordAsync } from '../../store/myPage/myPageUserRecord';
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
  const [oldMyData, setOldMyData] = useState(null);
  const [newMyData, setNewMyData] = useState(null);
  const [myResult, setMyResult] = useState(null)
  const [bothPlayersReady, setBothPlayersReady] = useState(false);
  const [opponentResult, setOpponentResult] = useState(null);
  const resultRef = useRef({ myResult: null, opponentResult: null });
  const nickname = userdata.data.nickname;

  const oldMyDataRef = useRef(oldMyData);
  const newMyDataRef = useRef(newMyData);
  const myResultRef = useRef(myResult);

  useEffect(() => {
    oldMyDataRef.current = oldMyData;
  }, [oldMyData]);

  useEffect(() => {
    newMyDataRef.current = newMyData;
  }, [newMyData]);

  useEffect(() => {
    myResultRef.current = myResult;
  }, [myResult]);

  const updateRecordAndSignal  = async (isMyWin) => {
    const myResult = isMyWin ? 'win' : 'lose';
    setMyResult(myResult);

    // 이전 데이터 저장
    const oldData = userdata;
    setOldMyData(oldData);

    // 최신 데이터 업데이트
    try {
        await dispatch(fetchUserRecordUpdateAsync(myResult)).unwrap();
        const updatedRecord = await dispatch(fetchUserRecordAsync()).unwrap();
        setNewMyData(updatedRecord);
        console.log(newMyData)

        resultRef.current.myResult = {
          myResult: myResult,
          oldMyData: oldData,
          newMyData: updatedRecord,
        };

        session.signal({
          data: JSON.stringify(resultRef.current.myResult),
          to: [],
          type: 'result'
        });

        checkBothPlayersReady();

    } catch (error) {
        console.error('Error updating record:', error);
    }
  };

  const checkBothPlayersReady = () => {
    if (resultRef.current.myResult && resultRef.current.opponentResult) {
      setBothPlayersReady(true);
    }
  };

  useEffect(() => {
    if (session) {
      session.on('signal:result', (event) => {
        const data = JSON.parse(event.data);
        if (data.nickname !== nickname) {
          resultRef.current.opponentResult = {
            oldMyData: data.oldMyData,
            newMyData: data.newMyData,
            myResult: data.myResult,
          };
          checkBothPlayersReady();
        }
      });
    }
  }, [session, nickname]);

  // useEffect(() => {
  //   if (myResult && opponentResult) {
  //     setBothPlayersReady(true);
  //   }
  // }, [myResult, opponentResult]);

  useEffect(() => {
    if (bothPlayersReady) {
      navigate('/sp/game/result', {
        state: {
          oldMyData: resultRef.current.myResult.oldMyData,
          newMyData: resultRef.current.myResult.newMyData,
          oldOpponentData: resultRef.current.opponentResult.oldMyData,
          newOpponentData: resultRef.current.opponentResult.newMyData,
          myResult: resultRef.current.myResult.myResult,
          opponentResult: resultRef.current.opponentResult.myResult,
        }
      });
    }
  }, [bothPlayersReady, navigate]);




  const atkData = useSelector(state => state.sparingMission.data?.ATK);
  const defData = useSelector(state => state.sparingMission.data?.DEF);

  useEffect(() => {
    dispatch(fetchSparingMissionUserAsync('ATK'));
    dispatch(fetchSparingMissionUserAsync('DEF'));
  }, [dispatch]);

  useEffect(() => {
    if (myHp <= 0 || opponentHp <= 0) {
      const isMyWin = myHp > 0;
      updateRecordAndSignal(isMyWin);
    }
  }, [myHp, opponentHp]);

  useEffect(() => {
    const OV = new OpenVidu();
    const session = OV.initSession();

    session.on('signal:userData', (event) => {
      const data = JSON.parse(event.data);
      if (data.nickname !== nickname) {
        console.log("Opponent data received: ", data);
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
        resultRef.current.opponentResult = {
          oldMyData: data.oldMyData,
          newMyData: data.newMyData,
          myResult: data.myResult,
        };
        checkBothPlayersReady();
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
  }, [connectionToken, userdata, nickname, oldMyData, newMyData, myResult]);

  const handleWin = (winner) => {
    let newMyAction, newOpponentAction;
    let newMyHp = myHp;
    let newOpponentHp = opponentHp;

    if (winner === 'left') {
      newOpponentHp = Math.max(newOpponentHp - 34, 0);
      newMyAction = 'leg';
      newOpponentAction = 'defense';
    } else if (winner === 'right') {
      newMyHp = Math.max(newMyHp - 34, 0);
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
          <GameUser className="gameuserleft" userdata={userdata} isOpponent={false}/>
          <GameUser className="gameuserright" userdata={opponentData} isOpponent={true}/>
        </>
      );
    } else if (subscribers.length > 0 && opponentData) {
      return (
        <>
          <GameUser className="gameuserleft" userdata={opponentData} isOpponent={true}/>
          <GameUser className="gameuserright" userdata={userdata} isOpponent={false}/>
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
