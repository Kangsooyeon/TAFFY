import { Route, Routes, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import './styles/fonts/font.css';
import Navbar from './components/common/navbar';
import store from './actions/store';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('en');
  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/main');
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
      </Routes>
    </Provider>
  );
}

export default App;
