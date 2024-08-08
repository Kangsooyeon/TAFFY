import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import PoomsaeEduPage from "./pages/poomsaeEduPage/poomsaeEduPage";
import PoomsaeEduOnePage from "./pages/poomsaeEduPage/poomsaeEduOnePage.jsx";
import PoomsaeEduAllPage from "./pages/poomsaeEduPage/poomsaeEduAllPage.jsx";
import PoomsaeTestPage from "./pages/poomsaeTestPage/poomsaeTestPage";
import PoomsaeTestDetailPage from "./pages/poomsaeTestPage/poomsaeTestDetailPage";
import SparingPage from "./pages/sparingPage/sparingPage";
import SparingDetailPage from "./pages/sparingDetailPage/sparingDetailPage";
import SparingResultPage from "./pages/sparingResultPage/sparingResultPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MyPage from "./pages/myPage/myPage"
import './styles/fonts/font.css';
import Navbar from './components/common/navbar';
import PopUp from './components/common/popUp';
import { logout, setAuthFromStorage } from './store/user/loginLogout';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isTestPage = location.pathname.startsWith('/ps_test/detail');
  const isSparPage = location.pathname.startsWith('/sp/game');
  const [language, setLanguage] = useState('en');
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(setAuthFromStorage({
        isLoggedIn: true,
        accessToken,
        refreshToken
      }));
    }
  }, [dispatch]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogoutConfirm = () => {
    // 모든 로컬 스토리지 항목 삭제
    localStorage.clear();

    // 모든 쿠키 삭제
    const allCookies = Cookies.get(); // 모든 쿠키 가져오기
    for (let cookie in allCookies) {
      Cookies.remove(cookie, { path: '/' });
    }

    // 리덕스 스토어 업데이트
    dispatch(logout());

    setShowPopUp(false); // 팝업 닫기
    navigate('/main'); // 메인 페이지로 이동
    alert('로그아웃 되었습니다.');
  };

  const handleLogout = () => {
    setShowPopUp(true); 
  };

  // const [sessionId, setSessionId] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const socket = new SockJS('https://i11e104.p.ssafy.io/ws');
  //   stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     debug: (str) => console.log(str),
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log('Connected to WebSocket');
  //       stompClient.subscribe('/topic/data', onMessageReceived);
  //     },
  //     onStompError: (error) => {
  //       console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
  //     },
  //   });
  //   stompClient.activate();
  // }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (sessionId.trim() && nickname.trim()) {
  //     const dataMessage = {
  //       sessionId,
  //       nickname
  //     };
  //     stompClient.publish({
  //       destination: '/app/data.send',
  //       body: JSON.stringify(dataMessage)
  //     });
  //     setSessionId('');
  //     setNickname('');
  //   }
  // };

  // const onMessageReceived = (payload) => {
  //   const message = JSON.parse(payload.body);
  //   console.log('Message received: ', message); // 메시지 수신 확인
  //   setMessages((prevMessages) => [...prevMessages, message]);
  // };

  return (
    <div>
      {(!isTestPage && !isSparPage) && (
        <Navbar 
          isLoggedIn={isLoggedIn} 
          handleLogin={handleLogin} 
          handleLogout={handleLogout} 
          language={language} 
          setLanguage={setLanguage} 
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sp" element={<SparingPage />} />
        <Route path="/sp/game/:sessionId" element={<SparingDetailPage />} />
        <Route path="/sp/game/result" element={<SparingResultPage />} />
        <Route path="/main" element={<MainPage language={language}/>} />
        <Route path="/mypage" element={<MyPage language={language}  />} />
        <Route path="/ps_edu" element={<PoomsaeEduPage language={language}/>} />
        <Route path="/ps_edu/:stageNum/:mvSeq" element={<PoomsaeEduOnePage language={language}/>} />
        <Route path="/ps_edu/:stageNum" element={<PoomsaeEduAllPage language={language}/>} />
        <Route path="/ps_test" element={<PoomsaeTestPage />} />
        <Route path="/ps_test/detail/:poomsaeId" element={<PoomsaeTestDetailPage />} />
        <Route path="/login" element={<LoginPage navigate={navigate} />} />
        <Route path="/signup" element={<SignupPage language={language}/>} />
      </Routes>
      {showPopUp && (
        <PopUp 
          title="로그아웃 하시겠습니까?" 
          btnText1="네" 
          btnHref1="" 
          btnText2="아니오" 
          btnHref2="" 
          handleBtn1Click={handleLogoutConfirm} // 로그아웃 핸들러 연결
          handleBtn2Click={() => setShowPopUp(false)} // 팝업 닫기 핸들러 연결
        />
      )}
    </div>
  );
}

export default App;
