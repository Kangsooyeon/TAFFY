import { useState } from 'react';
import '../../styles/poomsaeTestPage/poomsaeTestDetailPage.css';
import PopUp from '../../components/common/popUp';


const PoomsaeTestDetailPage = () => {
    const [progress, setProgress] = useState(0);
    const [gameStatus, setGameStatus] = useState(null); 

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
        window.location.href = '/ps_test'; 
    };

    return (
        <div className="poomsae-test-detail-page">
            <div className="detail-title">
                <p>태극 1장</p>
                <p className="exit" onClick={handleExit}>나가기</p>
            </div>
            <div className="detail-content">
                <p>영역 안에 몸 전체가 보이도록 위치를 조정해주세요.</p>
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
                        />
                    )}
                    {gameStatus === 'fail' && (
                        <PopUp
                            title="불합격"
                            btnText1="재도전하기"
                            btnHref1="/ps_test/detail"
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
