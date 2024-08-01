import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import PoomsaeEduPage from "./pages/poomsaeEduPage/poomsaeEduPage";
import PoomsaeEduOnePage from "./pages/poomsaeEduPage/poomsaeEduOnePage.jsx";
import PoomsaeEduAllPage from "./pages/poomsaeEduPage/poomsaeEduAllPage.jsx";
import PoomsaeTestPage from "./pages/poomsaeTestPage/poomsaeTestPage";
import PoomsaeTestDetailPage from "./pages/poomsaeTestPage/poomsaeTestDetailPage";
import SparingPage from "./pages/sparingPage/sparingPage";
import SparingDetailPage from "./pages/sparingDetailPage/sparingDetailPage"
import SparingResultPage from "./pages/sparingResultPage/sparingResultPage"
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MyPage from "./pages/myPage/myPage"

import './styles/fonts/font.css';
// import { Navbar, Navbar2 } from './components/common/navbar';
import Navbar from './components/common/navbar';
import PopUp from './components/common/popUp';
import store from './actions/store';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isTestPage = location.pathname.startsWith('/ps_test/detail');
  const isSparPage = location.pathname.startsWith('/sp/game');
  const [language, setLanguage] = useState('en');
  const [showPopUp, setShowPopUp] = useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setShowPopUp(true); 
  };

  

  return (

    <Provider store={store}>
    {/* <Provider> */}
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
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/sp" element={<SparingPage />} />
        <Route path="/sp/game" element={<SparingDetailPage/>}/>
        <Route path="/sp/game/result" element={<SparingResultPage/>}/>
        <Route path="/main" element={<MainPage language={language}/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/ps_edu" element={<PoomsaeEduPage language={language}/>} />
        <Route path="/ps_edu/:stageNum/:moveId" element={<PoomsaeEduOnePage language={language}/>} />
        <Route path="/ps_edu/:stageNum" element={<PoomsaeEduAllPage language={language}/>} />
        <Route path="/ps_test" element={<PoomsaeTestPage />} />
        <Route path="/ps_test/detail/:poomsaeId" element={<PoomsaeTestDetailPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} navigate={navigate} language={language}/>} />
        <Route path="/signup" element={<SignupPage language={language}/>} />
      </Routes>
      {showPopUp && (
        <PopUp 
          title="로그아웃 하시겠습니까?" 
          btnText1="네" 
          btnHref1="/main" 
          btnText2="아니오" 
          btnHref2="" 
        />
      )}
    </Provider> 
  );
}

export default App;
