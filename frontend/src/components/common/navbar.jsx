import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/common/navbar.css';
import logo from '../../assets/images/common/logo.png';
import login from '../../assets/images/common/login.png';
import logout from '../../assets/images/common/logout.png';
import my from '../../assets/images/common/my.png';
import signup from '../../assets/images/common/signup.png';

// Navbar : 로그인/로그아웃
const Navbar = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/main">
          <img src={logo} alt="TAFFY" />
        </Link>
      </div>
      <div className="icons">
        {isLoggedIn ? (
          <>
            <a onClick={handleLogout}>
              <img src={logout} alt="logout" />
            </a>
            <Link to="/my">
              <img src={my} alt="my" />
            </Link>
          </>
        ) : (
          <>
            <a onClick={handleLogin}>
              <img src={login} alt="login" />
            </a>
            <Link to="/signup">
              <img src={signup} alt="signup" />
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
};

// Navbar2 : 메인/랜딩 페이지
const Navbar2 = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/main">
          <img src={logo} alt="TAFFY" />
        </Link>
      </div>
      <div className="icons">
        {isLoggedIn ? (
          <>
            <a onClick={handleLogout}>
              <img src={logout} alt="logout" />
            </a>
            <Link to="/my">
              <img src={my} alt="my" />
            </Link>
          </>
        ) : (
          <>
            <a onClick={handleLogin}>
              <img src={login} alt="login" />
            </a>
            <Link to="/signup">
              <img src={signup} alt="signup" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar2.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export { Navbar, Navbar2 };
