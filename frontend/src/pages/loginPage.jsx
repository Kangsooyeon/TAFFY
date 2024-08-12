import '../styles/loginPage.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/user/loginLogout'; // 수정된 부분

const Login = ({ navigate, language }) => {
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
            if (language === 'ko') {
                alert('로그인 완료');
              } else {
                alert('Login successfully');
              }
        } catch (error) {
            if (language === 'ko') {
                alert('이메일이나 비밀번호를 다시 확인해주세요.');
              } else {
                alert('Please check your email or password again.');
              }

            
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
                    <p>{language==='ko' ? '로그인': 'Login'}</p>
                </div>
                <hr />
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-box">
                        <label>{language==='ko' ? '이메일': 'Email'}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language==='ko' ? '이메일 형식으로 입력해주세요': 'Please enter in email format'}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="input-box">
                        <label>{language==='ko' ? '비밀번호': 'Password'}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={language==='ko' ? '비밀번호를 입력해주세요': 'Please enter a password'}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div>
                        <button type="submit">{language==='ko'?'로그인':'Login'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    navigate: PropTypes.func.isRequired,
    language: PropTypes.func.isRequired,
};

export default Login;
