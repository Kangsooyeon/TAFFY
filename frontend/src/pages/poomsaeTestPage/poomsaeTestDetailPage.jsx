import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/poomsaeTestPage/poomsaeTestDetailPage.css';
import PopUp from '../../components/common/popUp';
import axios from 'axios';
import TeachableMachineWebcam from '../../components/poomsaeTestPage/tmWebcam';
import attentionSound from '../../assets/sounds/poomsaeTestPage/attention.mp3';
import saluteSound from '../../assets/sounds/poomsaeTestPage/salute.mp3';
import preparationSound from '../../assets/sounds/poomsaeTestPage/preparation.mp3';
import startSound from '../../assets/sounds/poomsaeTestPage/start.mp3';

const PoomsaeTestDetailPage = () => {
    const [progress, setProgress] = useState(0);
    const [gameStatus, setGameStatus] = useState(null);
    const [instruction, setInstruction] = useState('영역 안에 몸 전체가 보이도록 위치를 조정해주세요.');
    const [predictions, setPredictions] = useState([]);
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

                if (instructions[currentInstruction] === '차렷') {
                    const audio = new Audio(attentionSound);
                    audio.play();
                } else if (instructions[currentInstruction] === '경례') {
                    const audio = new Audio(saluteSound);
                    audio.play();
                } else if (instructions[currentInstruction] === '준비') {
                    const audio = new Audio(preparationSound);
                    audio.play();
                } else if (instructions[currentInstruction] === '시작') {
                    const audio = new Audio(startSound);
                    audio.play();
                }

                currentInstruction++;
                setTimeout(changeInstruction, 3000);
            }
        };

        const timer = setTimeout(changeInstruction, 3000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleProgressUpdate = (success) => {
        if (success) {
            const newProgress = progress + 20;
            setProgress(newProgress);
            if (newProgress >= 100) {
                setGameStatus('pass');
            }
        } else {
            setGameStatus('fail');
        }
    };

    const handleReset = () => {
        setProgress(0);
        setGameStatus(null);
    };

    const handleExit = () => {
        navigate('/ps_test');
    };

    const handlePopUpButtonClick = async (href) => {
        const url = `https://i11e104.p.ssafy.io/api/test/${poomsaeId}`;
        try {
            const response = await axios.put(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(href);
        } catch (error) {
            alert('An error occurred while updating the test. Please try again.');
        }
    };

    const handlePrediction = (pose, prediction) => {
        // Handle the prediction result here
        setPredictions(prediction.map(p => ` ${p.className}: ${p.probability.toFixed(2)} `));
    };

    return (
        <div className="poomsae-test-detail-page">
            <div className="detail-title">
                <p>태극 {poomsaeId}장</p>
                <p className="exit" onClick={handleExit}>나가기</p>
            </div>
            <div className="detail-content">
                <p>{instruction}</p>
                <TeachableMachineWebcam onPrediction={handlePrediction} />
                <div className="predictions">
                    <p>{predictions}</p>
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
                            titleColor="blue"
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
                            titleColor="red"
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
