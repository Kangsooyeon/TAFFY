import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import SparingPage from "./pages/sparingPage/sparingPage";
import './styles/fonts/font.css';
import { Navbar, Navbar2 } from './components/common/navbar';
import SparingDetailPage from "./pages/sparingDetailPage/sparingDetailPage"

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMainOrLanding = location.pathname === '/' || location.pathname === '/main';

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/main');
  };

  return (
    <>
      {isMainOrLanding ? (
        <Navbar2 isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/sp" element={<SparingPage />} />
        <Route path="/sp/game" element={<SparingDetailPage/>}/>
      </Routes>
    </>
  );
}

export default App;
