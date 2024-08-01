import '../styles/loginPage.css';
import PropTypes from 'prop-types';

const Login = ({ setIsLoggedIn, navigate }) => {
    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/main');
    };

    return (
        <div className="loginPage">
            <div className="login-box">
                <div className="login-title">
                    <p>Login</p>
                </div>

                <hr/>
                <div className="login-form">
                    <div className="input-box">
                        <label> Email </label>
                        <input type="email" placeholder="Please enter in email format"/>
                    </div>
                    <div className="input-box">
                        <label> Password </label>
                        <input type="password" placeholder="Please enter a password"/>
                    </div>
                    <div>
                        <button onClick={handleLogin}>Login</button>  
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
};

export default Login;
