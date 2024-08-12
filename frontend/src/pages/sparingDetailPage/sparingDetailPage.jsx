import '../../styles/sparingPage/sparinggame/sparingDetailPage.css';
import Left from '../../assets/images/sparingPage/game-left.png';
import Right from '../../assets/images/sparingPage/game-right.png';
import Mat from '../../assets/images/sparingPage/sparingmat.png';
import GameFinish_English from '../../assets/images/sparingPage/gamefinish_eng.png'
import GameFinish_Korea from '../../assets/images/sparingPage/gamefinish_kor.png'
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
import { fetchGameExitAsync } from '../../store/sparing/gameExit'

const SparingDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionId, connectionToken, userdata, status, roomType } = location.state;
  console.log('Received in SparingDetailPage:', { connectionToken, userdata, status, roomType, sessionId });

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
  const [finishOn, setFinishOn] = useState(false)
  const [opponentDataReady, setOpponentDataReady] = useState(false);
  const [predictedLabel, setPredictedLabel] = useState(false)

  const resultRef = useRef({ myResult: null, opponentResult: null });
  const nickname = userdata.data.nickname;

  console.log(userdata)
  console.log(opponentData)
  console.log('예측모델', predictedLabel)

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

        console.log("My Result:", resultRef.current.myResult);

        session.signal({
          data: JSON.stringify({
            ...resultRef.current.myResult,
            nickname: nickname,  
          }),
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
            oldOpponentData: data.oldMyData,
            newOpponentData: data.newMyData,
            opponentResult: data.myResult,
          };
          console.log("Opponent Result:", resultRef.current.opponentResult);

          checkBothPlayersReady();
        }
      });
    }
  }, [session, nickname]);

  useEffect(() => {
    if (bothPlayersReady) {
      console.log(sessionId, roomType)
      console.log("Final My Result:", resultRef.current.myResult);
      console.log("Final Opponent Result:", resultRef.current.opponentResult);
      dispatch(fetchGameExitAsync({sessionId, roomType}))
      setFinishOn(true)
      setTimeout(() => {
        navigate('/sp/game/result', {
          state: {
            oldMyData: resultRef.current.myResult.oldMyData,
            newMyData: resultRef.current.myResult.newMyData,
            oldOpponentData: resultRef.current.opponentResult.oldOpponentData,
            newOpponentData: resultRef.current.opponentResult.newOpponentData,
            myResult: resultRef.current.myResult.myResult,
            opponentResult: resultRef.current.opponentResult.opponentResult,
          }
        });
      }, 5000)
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
    const userDataWithNickname = { ...userdata, nickname };
    
    session.on('signal:userData', (event) => {
      const data = JSON.parse(event.data);
      console.log("Opponent data received: ", data);
      if (data.nickname !== nickname) {
        setTimeout(() => { // 지연시간 추가
          setOpponentData(data);
          setOpponentDataReady(true);
        }, 1000);  // 2000ms 지연
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
          oldOpponentData: data.oldMyData,  
          newOpponentData: data.newMyData,  
          opponentResult: data.myResult,    
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
      
      session.signal({
        data: JSON.stringify(userDataWithNickname),
        to: [],
        type: 'userData'
      });
      console.log('userdata 전송')
      
    })
    .catch(error => {
      console.error('Failed to connect to the session:', error);
    });
    
    return () => {
      if (session) session.disconnect();
    };
  }, [session, connectionToken, userdata, nickname, oldMyData, newMyData, myResult]);
  
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

    setRound((prevRound) => prevRound + 1);
    setIsAttack((prevIsAttack) => {
      const newIsAttack = !prevIsAttack;
      console.log('IsAttack updated:', newIsAttack);
      return newIsAttack;
    });
  };
  
  return (
    <div className="sparinggame">
      {finishOn === true ?
        <img src={GameFinish_Korea} className="finishimg"/>:
        null} 
      <img src={Right} className="sparinggameright" alt="" />
      
      <div className="sparingstage">
        <img src={Mat} className="sparingmat" alt="" />
      </div>

      <h1>{round}, {predictedLabel}, {isAttack?'ture':'false'}</h1>

      {opponentDataReady && (
        <>
          <GameUser className="gameuserleft" userdata={userdata} isAttack={isAttack} setPredictedLabel={setPredictedLabel}/>
          <GameUser className="gameuserright" userdata={opponentData} isAttack={!isAttack} setPredictedLabel={setPredictedLabel} />

          <HpBar className="hpbarleft" hp={myHp} />
          <HpBar className="hpbarright" hp={opponentHp} />

          <Character className="characterleft" userdata={userdata} action={myAction} />
          <Character className="characterright" userdata={opponentData} action={opponentAction} />
        </>
      )}

      {finishOn === false ?
        <div>
          <Mission myMission={myMission} opponentMission={opponentMission} />
          <Timer />
          <WebCam className="webcamleft" streamManager={publisher} isAttack={isAttack} isLocalUser={true} setPredictedLabel={setPredictedLabel}/>
          {subscribers.map((subscriber, index) => (
            <WebCam key={index} className="webcamright" streamManager={subscriber} isAttack={!isAttack} isLocalUser={false} setPredictedLabel={() => {}}/>
          ))}
        </div>
      : null }

      <button onClick={nextRound}>Next Round</button>
      <button onClick={() => handleWin('left')}>left win</button>
      <button onClick={() => handleWin('right')}>right win</button>
    </div>
  );
};

export default SparingDetailPage;
