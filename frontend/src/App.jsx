import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import PoomsaeTestPage from "./pages/poomsaeTestPage/poomsaeTestPage";
import PoomsaeTestDetailPage from "./pages/poomsaeTestPage/poomsaeTestDetailPage";
import './styles/fonts/font.css';
import { Navbar, Navbar2 } from './components/common/navbar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMainOrLanding = location.pathname === '/' || location.pathname === '/main';
  const isDetailPage = location.pathname === '/ps_test/detail';

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/main');
  };

  return (
    <>
      {!isDetailPage && (
        isMainOrLanding ? (
          <Navbar2 isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
        ) : (
          <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
        )
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/ps_test" element={<PoomsaeTestPage />} />
        <Route path="/ps_test/detail" element={<PoomsaeTestDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
