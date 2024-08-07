import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/sparingmain/invitation';
import MessageBox from '../../components/sparingPage/sparingmain/messageBox';
import UserInfo from '../../components/sparingPage/sparingmain/userInfo';
import UserCharacter from '../../components/sparingPage/sparingmain/userCharacter';
import UserRecord from '../../components/sparingPage/sparingmain/userRecord';
import QuickButton from '../../components/sparingPage/sparingmain/quickButton';
import Help from '../../components/sparingPage/sparingmain/sparinghelp.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSparingUserAsync } from '../../store/sparing/sparUser';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

const SparingPage = () => {
  const dispatch = useDispatch();
  const [isOpenHelp, setIsOpenHelp] = useState(false);
  const { userdata, status: userdataStatus } = useSelector((state) => state.sparingUser);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    dispatch(fetchSparingUserAsync());
  }, [dispatch]);

  useEffect(() => {
    const socket = new SockJS('http://i11e104.p.ssafy.io:8081/ws');
    console.log(socket)
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onError,
    });
    stompClient.activate();
  }, []);

  const onConnected = () => {
    console.log('Connected to WebSocket');
    setIsConnected(true);
  };

  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
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
          <QuickButton userdata={userdata} />
        </div>
        <div className="rightSection">
          <MessageBox />
          <Invitation />
        </div>
      </div>
      <button className="helpbutton" onClick={openHelp}>?</button>
      {isOpenHelp && <Help closeHelp={closeHelp} />}
    </div>
  );
};

export default SparingPage;
