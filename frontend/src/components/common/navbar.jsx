import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/common/navbar.css';
import logo from '../../assets/images/common/logo.png';
import loginEn from '../../assets/images/common/login.png';
import logoutEn from '../../assets/images/common/logout.png';
import myEn from '../../assets/images/common/My page.png';
import signupEn from '../../assets/images/common/Sign up.png';
import loginKo from '../../assets/images/common/로그인.png';
import logoutKo from '../../assets/images/common/로그아웃.png';
import myKo from '../../assets/images/common/마이페이지.png';
import signupKo from '../../assets/images/common/회원가입.png';
import Language from '../../assets/images/common/Language.png';
import LanguageKo from '../../assets/images/common/언어설정.png';
import Dropdown from './dropDown';

const Navbar = ({ isLoggedIn, handleLogin, handleLogout, language, setLanguage }) => {
  const location = useLocation();
  const isMainOrLanding = location.pathname === '/' || location.pathname === '/main';

  const getLanguageImages = () => {
    if (language === 'ko') {
      return {
        login: loginKo,
        logout: logoutKo,
        my: myKo,
        signup: signupKo,
        language: LanguageKo
      };
    }
    return {
      login: loginEn,
      logout: logoutEn,
      my: myEn,
      signup: signupEn,
      language: Language
    };
  };

  const { login, logout, my, signup} = getLanguageImages();

  const languageOptions = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' }]

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/main">
          <img src={logo} alt="TAFFY" />
        </Link>
      </div>
      {!isMainOrLanding && (
        <div className="links">
          <Link to="/ps_edu">{language === 'ko' ? '품새 교육' : 'Poomsae Edu'}</Link>
          <Link to="/ps_test">{language === 'ko' ? '품새 심사' : 'Poomsae Test'}</Link>
          <Link to="/sp">{language === 'ko' ? '겨루기' : 'Gyeorugi'}</Link>
        </div>
      )}
      <div className="icons">
        <Dropdown
          options={languageOptions}
          selectedOption={language === 'ko' ? LanguageKo : Language}
          onOptionSelect={(option) => setLanguage(option)}
        />
        {isLoggedIn ? (
          <>
            <a onClick={handleLogout}>
              <img src={logout} alt="logout" className="iconImage" />
            </a>
            <Link to="/my">
              <img src={my} alt="mypage" className="iconImage" />
            </Link>
          </>
        ) : (
          <>
            <a onClick={handleLogin}>
              <img src={login} alt="login" className={`iconImage ${language === 'ko' ? 'loginIconKo' : ''}`} />
            </a>
            <Link to="/signup">
              <img src={signup} alt="signup" className="iconImage" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default Navbar;
