import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import './styles/fonts/font.css';
import Navbar from './components/common/navbar';
import PopUp from './components/common/popUp';
import store from './actions/store';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <Navbar 
        isLoggedIn={isLoggedIn} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
        language={language} 
        setLanguage={setLanguage} 
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage language={language}/>} />
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
