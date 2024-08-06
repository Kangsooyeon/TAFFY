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
    // 쿠키 삭제
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 리덕스 스토어 업데이트
    dispatch(logout());

    setShowPopUp(false); // 팝업 닫기
    navigate('/main'); // 메인 페이지로 이동
    alert('로그아웃 되었습니다.');
  };

  const handleLogout = () => {
    setShowPopUp(true); 
  };

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/ps_edu" element={<PoomsaeEduPage language={language}/>} />
        <Route path="/ps_edu/:stageNum/:moveId" element={<PoomsaeEduOnePage language={language}/>} />
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
