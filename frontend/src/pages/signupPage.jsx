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

    const handleSubmit = () => {
        navigate('/login');
    }

    return (
        <div className='signupPage'>
            <div className='signup-box'>
                <div className='signup-title'>
                    <p>Sign Up</p>
                </div>
                <hr/>
                <div className='signup-form'>
                    <div className='input-box'>
                        <label>Email</label>
                        <div className="input-wrapper">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Please enter in email format" 
                            />
                            <button className="action-button">Certification</button>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>Code Number</label>
                        <input 
                            type="text" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            placeholder="Please enter code number"
                        />
                    </div>
                    <div className='input-box'>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Please enter password"
                        />
                    </div>
                    <div className='input-box'>
                        <label>Password2</label>
                        <input 
                            type="password" 
                            value={password2} 
                            onChange={(e) => setPassword2(e.target.value)} 
                            placeholder="Please enter password again"
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
                            />
                            <button className="action-button" onClick={handleNicknameCheck}>Double Check</button>  
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>Country</label>
                        <select 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                        >
                            <option value="South Korea">South Korea</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                    <div>
                        <button className="submit-button" onClick={handleSubmit}>Sign Up</button>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
