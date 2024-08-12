import '../styles/signupPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({language}) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nickname, setNickname] = useState('');
    const [country, setCountry] = useState('Korea');
    const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복확인 상태 추가

    const navigate = useNavigate();

    const handleNicknameCheck = async () => {
        try {
            const response = await axios.post('https://i11e104.p.ssafy.io/api/nickname', { nickName: nickname });
            if (language === 'ko') {
                alert(response.data);
            } else {
                alert('Available nicknames.');
            }
            setIsNicknameChecked(true);
        } catch (error) {
            if (language === 'ko') {
                alert('이미 존재하는 닉네임입니다');
            } else {
                alert('This nickname already exists');
            }
            setIsNicknameChecked(false);
        }
    };

    const handleCertification = () => {
        if (language === 'ko') {
            alert('인증번호는 1234 입니다');
        } else {
            alert('The verification code is 1234');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            if (language === 'ko') {
                alert('비밀번호가 일치하지 않습니다');
            } else {
                alert('Passwords do not match');
            }
            return;
        }

        if (!isNicknameChecked) { // 닉네임 중복확인 여부 체크
            if (language === 'ko') {
                alert('닉네임 중복확인을 해주세요');
            } else {
                alert('Check for duplicate nicknames');
            }
            return;
        }

        try {
            const response = await axios.post('https://i11e104.p.ssafy.io/api/sign-up', {
                email,
                password,
                nickName: nickname,
                countryName: country
            });

            if (response.data === '회원가입 완료') {
                if (language === 'ko') {
                    alert('회원가입 완료');
                } else {
                    alert('Sign up successful');
                }
                navigate('/login');
            } else {
                alert(response.data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.msg) {
                    alert(errorData.msg);
                }
                if (errorData.data) {
                    const errorDetails = Object.values(errorData.data).join('\n');
                    alert(errorDetails);
                }
            } else {
                if (language === 'ko') {
                    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
                } else {
                    alert('Sign up failed due to an error.');
                }
            }
        }
    };

    return (
        <div className='signupPage'>
            <div className='signup-box'>
                <div className='signup-title'>
                    <p>{language === 'ko' ? '회원가입': 'Sign Up'}</p>
                    
                </div>
                <hr/>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <label>{language==='ko' ? '이메일' : 'Email'}</label>
                        <div className="signup-input-wrapper">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder={language==='ko' ? '이메일 형식으로 입력해주세요': 'Please enter in email format'}
                                required
                            />
                            <button type="button" className="action-button" onClick={handleCertification}>{language==='ko'?'인증번호 받기':'Certification'}</button>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>{language==='ko'?'인증번호':'Code Number'}</label>
                        <input 
                            type="text" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            placeholder={language==='ko'?'인증번호를 입력해주세요' : "Please enter code number"}
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>{language==='ko' ? '비밀번호': 'Password'}</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder={language==='ko' ? '비밀번호를 입력해주세요': 'Please enter a password'}
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>{language==='ko'?'비밀번호 확인':'Password2'}</label>
                        <input 
                            type="password" 
                            value={password2} 
                            onChange={(e) => setPassword2(e.target.value)} 
                            placeholder={language==='ko' ? '비밀번호를 다시 입력해주세요': 'Please enter a password again'}
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>{language==='ko'?'닉네임':'Nickname'}</label>
                        <div className="signup-input-wrapper">
                            <input 
                                type="text" 
                                value={nickname} 
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                    setIsNicknameChecked(false); // 닉네임이 변경될 때 중복확인 상태를 리셋
                                }} 
                                placeholder={language==='ko'?'닉네임은 4~10자로 입력해주세요':'Please enter a nickname of 4~10 characters.'}
                                required
                            />
                            <button type="button" className="action-button" onClick={handleNicknameCheck}>{language==='ko'?'중복확인':'Double Check'}</button>  
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>{language==='ko'?'국적':'Country'}</label>
                        <select 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            required
                        >

                            {language === 'ko' ? (
                                <>
                                    <option value="Korea">한국</option>
                                    <option value="USA">미국</option>
                                    <option value="China">중국</option>
                                    <option value="India">인도</option>
                                    <option value="Canada">캐나다</option>
                                    <option value="Australia">호주</option>
                                    <option value="Indonesia">인도네시아</option>
                                    <option value="Vietnam">베트남</option>
                                    <option value="Morocco">모로코</option>
                                    <option value="Malaysia">말레이시아</option>
                                </>
                                ) : (
                                <>
                                    <option value="Korea">Korea</option>
                                    <option value="USA">USA</option>
                                    <option value="China">China</option>
                                    <option value="India">India</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Malaysia">Malaysia</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="submit-button">{language==='ko'?'회원가입':'Sign Up'}</button>  
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
