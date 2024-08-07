import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/sparingmain/invitation';
import MessageBox from '../../components/sparingPage/sparingmain/messageBox';
import UserInfo from '../../components/sparingPage/sparingmain/userInfo';
import UserCharacter from '../../components/sparingPage/sparingmain/userCharacter';
import UserRecord from '../../components/sparingPage/sparingmain/userRecord';
import QuickButton from '../../components/sparingPage/sparingmain/quickButton';
import Help from '../../components/sparingPage/sparingmain/sparinghelp.jsx';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSparingUserAsync } from '../../store/sparing/sparUser';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useNavigate } from 'react-router-dom';

let stompClient = null;

const SparingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenHelp, setIsOpenHelp] = useState(false);
  const { userdata, status: userdataStatus } = useSelector((state) => state.sparingUser);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionID, setSessionID] = useState(null);
  const [connectionToken, setConnectionToken] = useState(null);
  const [status, setStatus] = useState(null);

  const sessionIDRef = useRef(sessionID);
  const connectionTokenRef = useRef(connectionToken);
  const userdataRef = useRef(userdata);
  const statusRef = useRef(status);

  useEffect(() => {
    dispatch(fetchSparingUserAsync());
  }, [dispatch]);

  useEffect(() => {
    const socket = new SockJS('https://i11e104.p.ssafy.io/ws');
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/data', (message) => {
          joinGame(message);
        });
        setIsConnected(true);
      },
      onStompError: (error) => {
        console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
      },
    });
    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    sessionIDRef.current = sessionID;
  }, [sessionID]);

  useEffect(() => {
    connectionTokenRef.current = connectionToken;
  }, [connectionToken]);

  useEffect(() => {
    userdataRef.current = userdata;
  }, [userdata]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const joinGame = (message) => {
    const receivedData = JSON.parse(message.body);
    console.log('Game data received: ', receivedData);
    console.log('Received sessionId:', receivedData.sessionId);
    console.log('Current sessionID:', sessionIDRef.current);

    if (sessionIDRef.current && connectionTokenRef.current && userdataRef.current && statusRef.current) {
      if (receivedData.sessionId === sessionIDRef.current) {
        console.log('game start!');
        console.log('Connection Token:', connectionTokenRef.current);
        console.log('User Data:', userdataRef.current);
        navigate(`/sp/game/${sessionIDRef.current}`, {
          state: {
            // sessionId: sessionIDRef.current,
            connectionToken: connectionTokenRef.current,
            userdata: userdataRef.current,
            // status: statusRef.current,
          },
        });
      }
    } else {
      console.error('One of the required refs is null');
    }
  };

  const openHelp = () => {
    setIsOpenHelp(true);
  };

  const closeHelp = () => {
    setIsOpenHelp(false);
  };

  if (userdataStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (userdataStatus === 'failed') {
    return <div>Error loading data</div>;
  }

  return (
    <div className="sparingtoppage">
      <div className="sparingPage">
        <div className="leftSection">
          {userdata ? <UserInfo userdata={userdata} /> : <div>No profile data</div>}
          {userdata ? <UserRecord userdata={userdata} /> : <div>No record data</div>}
        </div>
        <div className="centerSection">
          {userdata ? <UserCharacter userdata={userdata} /> : <div>No profile data</div>}
          <QuickButton
            userdata={userdata}
            stompClient={stompClient}
            setSessionID={setSessionID}
            setConnectionToken={setConnectionToken}
            setStatus={setStatus}
          />
        </div>
        <div className="rightSection">
          {/* <MessageBox /> 초대가 오면 뜸*/}
          {stompClient && <Invitation stompClient={stompClient} />}
        </div>
      </div>
      <button className="helpbutton" onClick={openHelp}>?</button>
      {isOpenHelp && <Help closeHelp={closeHelp} />}
    </div>
  );
};

export default SparingPage;
