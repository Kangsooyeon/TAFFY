import '../styles/loginPage.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가

const Login = ({ setIsLoggedIn, navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'https://i11e104.p.ssafy.io/api/login', 
                { email, password }
            );

            if (response.data && response.data.accessToken && response.data.refreshToken) {
                const { accessToken, refreshToken } = response.data;

                // 토큰을 쿠키에 저장
                Cookies.set('accessToken', accessToken, { path: '/' });
                Cookies.set('refreshToken', refreshToken, { path: '/' });

                setIsLoggedIn(true);
                navigate('/main');
                alert('로그인 완료');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
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
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter in email format"
                        />
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Please enter a password"
                        />
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
