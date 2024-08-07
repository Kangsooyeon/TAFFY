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

const SparingPage = () => {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  const [isOpenHelp, setIsOpenHelp] = useState(false);
  const { userdata, status: userdataStatus } = useSelector((state) => state.sparingUser);

  useEffect(() => {
    dispatch(fetchSparingUserAsync());
  }, [dispatch]);

  useEffect(() => {
    const socket = new SockJS('https://i11e104.p.ssafy.io/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        setStompClient(client);
      },
      onStompError: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    client.activate();

    // Cleanup function
    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const openHelp = () => setIsOpenHelp(true);
  const closeHelp = () => setIsOpenHelp(false);

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
