import '../styles/loginPage.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/user/loginLogout'; // 수정된 부분

const Login = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        if (e) e.preventDefault();

        try {
            const response = await dispatch(loginUser({ email, password })).unwrap();
            const { accessToken, refreshToken, activeStage } = response;

            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            console.log('Active Stage:', activeStage);

            navigate('/main');
            alert('로그인 완료');
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <div className="loginPage">
            <div className="login-box">
                <div className="login-title">
                    <p>Login</p>
                </div>
                <hr />
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-box">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter in email format"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Please enter a password"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Login;
