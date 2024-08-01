import '../styles/signupPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nickname, setNickname] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const handleNicknameCheck = async () => {
        try {
            const response = await axios.post('https://i11e104.p.ssafy.io/api/nickname', { nickName: nickname });
            alert(response.data); // 응답 메시지를 alert로 표시
        } catch (error) {
            console.error('Error checking nickname:', error);
            alert('이미 존재하는 닉네임입니다');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert('비밀번호가 일치하지 않습니다');
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
                alert('회원가입 완료');
                navigate('/login');
            } else {
                alert(response.data);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='signupPage'>
            <div className='signup-box'>
                <div className='signup-title'>
                    <p>Sign Up</p>
                </div>
                <hr/>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <label>Email</label>
                        <div className="input-wrapper">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Please enter in email format" 
                                required
                            />
                            <button type="button" className="action-button">Certification</button>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>Code Number</label>
                        <input 
                            type="text" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            placeholder="Please enter code number"
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Please enter password"
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>Password2</label>
                        <input 
                            type="password" 
                            value={password2} 
                            onChange={(e) => setPassword2(e.target.value)} 
                            placeholder="Please enter password again"
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <label>Nickname</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                value={nickname} 
                                onChange={(e) => setNickname(e.target.value)} 
                                placeholder="Please enter nickname" 
                                required
                            />
                            <button type="button" className="action-button" onClick={handleNicknameCheck}>Double Check</button>  
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>Country</label>
                        <select 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            required
                        >
                            <option value="South Korea">South Korea</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="submit-button">Sign Up</button>  
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
