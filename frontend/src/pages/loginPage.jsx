import '../styles/loginPage.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn, navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'https://i11e104.p.ssafy.io/api/login', 
                { email, password },
            );
            console.log(response);
            console.log(window.localStorage);

            if (response.data) {
                setIsLoggedIn(true);
                navigate('/main');
                alert(response.data);
                setTimeout(() => {
                    console.log(document.cookie)
                    const cookies = parseCookies();
                    console.log('Access Token:', cookies.accessToken);
                    console.log('Refresh Token:', cookies.refreshToken);
                }, 500); // 500ms 지연

            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    // 쿠키 파싱 함수
    const parseCookies = () => {
        return document.cookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = value;
            return cookies;
        }, {});
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
