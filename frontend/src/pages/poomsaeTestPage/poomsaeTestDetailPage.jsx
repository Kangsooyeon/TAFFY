import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/poomsaeTestPage/poomsaeTestDetailPage.css';
import PopUp from '../../components/common/popUp';
import axios from 'axios';

const PoomsaeTestDetailPage = () => {
    const [progress, setProgress] = useState(0);
    const [gameStatus, setGameStatus] = useState(null);
    const [instruction, setInstruction] = useState('영역 안에 몸 전체가 보이도록 위치를 조정해주세요.');
    const { poomsaeId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const instructions = [
            '차렷',
            '경례',
            '준비',
            '시작'
        ];

        let currentInstruction = 0;

        const changeInstruction = () => {
            if (currentInstruction < instructions.length) {
                setInstruction(instructions[currentInstruction]);
                currentInstruction++;
                setTimeout(changeInstruction, 3000);
            }
        };

        const timer = setTimeout(changeInstruction, 3000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []); // 빈 배열을 넣어 첫 렌더링 시 한 번만 실행되도록 설정

    const handleProgressUpdate = (success) => {
        if (success) {
            const newProgress = progress + 20;
            console.log(`Progress updated to: ${newProgress}%`);
            setProgress(newProgress);
            if (newProgress >= 100) {
                setGameStatus('pass');
                console.log('Game status: pass');
            }
        } else {
            setGameStatus('fail');
            console.log('Game status: fail');
        }
    };

    const handleReset = () => {
        setProgress(0);
        setGameStatus(null);
        console.log('Progress reset to 0%. Game status reset.');
    };

    const handleExit = () => {
        navigate('/ps_test');
    };

    const handlePopUpButtonClick = async (href) => {
        const url = `https://i11e104.p.ssafy.io/api/test/${poomsaeId}`;
        console.log('Request URL:', url);
        try {
            const response = await axios.put(
                url,
                {}, // 필요한 데이터가 있을 경우 여기에 추가
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('API Response:', response.data);
            navigate(href);
        } catch (error) {
            console.error('Error updating poomsae test:', error);
            alert('An error occurred while updating the test. Please try again.');
        }
    };

    return (
        <div className="poomsae-test-detail-page">
            <div className="detail-title">
                <p>태극 {poomsaeId}장</p>
                <p className="exit" onClick={handleExit}>나가기</p>
            </div>
            <div className="detail-content">
                <p>{instruction}</p>
                <div className='webcam'>
                    
                </div>
                <div className="temp">
                    <button onClick={() => handleProgressUpdate(true)}>Increase Progress</button>
                    <button onClick={() => handleProgressUpdate(false)}>Fail Stage</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
            {gameStatus && (
                <div className="pop-up-container">
                    {gameStatus === 'pass' && (
                        <PopUp
                            title="합격"
                            btnText1="촬영하기"
                            btnHref1="/photo"
                            btnText2="목록으로"
                            btnHref2="/ps_test"
                            handleBtn1Click={() => handlePopUpButtonClick('/photo')}
                            handleBtn2Click={() => handlePopUpButtonClick('/ps_test')}
                        />
                    )}
                    {gameStatus === 'fail' && (
                        <PopUp
                            title="불합격"
                            btnText1="재도전하기"
                            btnHref1={`/ps_test/detail/${poomsaeId}`}
                            btnText2="교육하기"
                            btnHref2="/ps_edu"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default PoomsaeTestDetailPage;
