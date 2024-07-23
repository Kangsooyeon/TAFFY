import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Provider } from 'react-redux';
import LandingPage from "./pages/landingPage/landingPage";
import MainPage from "./pages/mainPage/mainPage";
import './styles/fonts/font.css';
import { Navbar, Navbar2 } from './components/common/navbar';
import store from './actions/store';

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
    <Provider store={store}>
      {isMainOrLanding ? (
        <Navbar2 isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
