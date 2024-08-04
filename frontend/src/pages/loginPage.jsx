import '../styles/loginPage.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가
import { useDispatch } from 'react-redux';
import { loginSuccess} from '../store/user/loginLogout'; // 리덕스 액션 가져오기

const Login = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

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
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                // 리덕스 스토어에 로그인 상태와 토큰 저장
                dispatch(loginSuccess({ accessToken, refreshToken }));

                console.log('Access Token:', accessToken);
                console.log('Refresh Token:', refreshToken);

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
    navigate: PropTypes.func.isRequired,
};

export default Login;
