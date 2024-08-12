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
import MyPage from "./pages/myPage/myPage";
import './styles/fonts/font.css';
import Navbar from './components/common/navbar';
import PopUp from './components/common/popUp';
import PrivateRoute from './components/common/privateRoute';
import { logout, setAuthFromStorage } from './store/user/loginLogout';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isTestPage = location.pathname.startsWith('/ps_test/detail');
  const isSparPage = location.pathname.startsWith('/sp/game');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, [dispatch]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // 언어 설정을 localStorage에 저장
  };

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

    setLanguage('en');
    localStorage.setItem('language', 'en'); // localStorage에 'en'으로 설정

    setShowPopUp(false); // 팝업 닫기
    navigate('/main'); // 메인 페이지로 이동
    
    if (language === 'ko') {
      alert('로그아웃 되었습니다.');
    } else {
      alert('Logout successfully.');
    }
  };

  const handleLogout = () => {
    setShowPopUp(true); 
  };

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음
  }

  return (
    <div>
      {(!isTestPage && !isSparPage) && (
        <Navbar 
          isLoggedIn={isLoggedIn} 
          handleLogin={handleLogin} 
          handleLogout={handleLogout} 
          language={language} 
          setLanguage={handleLanguageChange}
        />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sp" element={<PrivateRoute element={SparingPage} language={language} />} />
        <Route path="/sp/game/:sessionId" element={<PrivateRoute element={SparingDetailPage} />} />
        <Route path="/sp/game/result" element={<PrivateRoute element={SparingResultPage} />} />
        <Route path="/main" element={<MainPage language={language}/>} />
        <Route path="/mypage" element={<PrivateRoute element={MyPage} language={language} />} />
        <Route path="/ps_edu" element={<PrivateRoute element={PoomsaeEduPage} language={language}/>} />
        <Route path="/ps_edu/:stageNum/:mvSeq" element={<PrivateRoute element={PoomsaeEduOnePage} language={language}/>} />
        <Route path="/ps_edu/:stageNum" element={<PrivateRoute element={PoomsaeEduAllPage} language={language}/>} />
        <Route path="/ps_test" element={<PrivateRoute element={PoomsaeTestPage} />} />
        <Route path="/ps_test/detail/:poomsaeId" element={<PrivateRoute element={PoomsaeTestDetailPage} />} />
        <Route path="/login" element={<LoginPage navigate={navigate} language={language}/>} />
        <Route path="/signup" element={<SignupPage language={language}/>} />
      </Routes>
      {showPopUp && (
        <PopUp 
          title={language==='ko'?'로그아웃 하시겠습니까?' :'Logout Now?'}
          btnText1={language==='ko'?'네':'Yes'}
          btnHref1="" 
          btnText2={language==='ko'?'아니오':'No'}
          btnHref2="" 
          handleBtn1Click={handleLogoutConfirm} // 로그아웃 핸들러 연결
          handleBtn2Click={() => setShowPopUp(false)} // 팝업 닫기 핸들러 연결
        />
      )}
    </div>
  );
}

export default App;
