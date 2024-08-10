import '../../styles/poomsaeEduPage/poomsaeEduAll.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';
import ProgressBar from '../../components/common/progressBar';
import AudioImage from '../../assets/images/common/audio.png';
import { completePoomsae, fetchAllStageDetails } from '../../apis/stageApi';
import { useDispatch } from 'react-redux';
import { unlockNextStage } from '../../store/poomsaeEdu/stagesSlice';
import PopUp from '../../components/common/popUp';
import Webcam from '../../components/poomsaeEduPage/modelEduAll';

const PoomsaeEduAllPage = ({ language }) => {
  const [buttonText, setButtonText] = useState('');
  const [description, setDescription] = useState('');
  const [moves, setMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [stageDetails, setStageDetails] = useState(null);

  const { stageNum } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const audioRef = useRef(null);
  const audioTimeoutRef = useRef(null);


  useEffect(() => {
    setButtonText(language === 'ko' ? '나가기' : 'Exit');
  }, [language]);

  const handleClick = () => {
    navigate(`/ps_edu`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllStageDetails(stageNum);
        setStageDetails(data.data.ps);
        setMoves(data.data.mvDetails);
        setDescription(language === 'ko' ? data.data.mvDetails[0].mvKoDesc : data.data.mvDetails[0].mvEnDesc);
        playAudio(language === 'ko' ? data.data.mvDetails[0].mvKoVo : data.data.mvDetails[0].mvEnVo);
      } catch (error) {
        console.error("Failed to fetch stage details:", error);
      }
    };

    fetchData();
  }, [stageNum, language]);

  const playAudio = (audioUrl) => {
    if (audioRef.current && audioUrl) {
      // 기존 오디오 중단
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
      }

      audioTimeoutRef.current = setTimeout(() => {
        audioRef.current.src = audioUrl;
        audioRef.current.play().then(() => {
          audioRef.current.onended = () => {
            setTimeout(() => {
              audioRef.current.play();
              audioRef.current.onended = null;
            }, 2000);
          };
        }).catch(error => {
          console.error('Audio playback failed:', error);
        });
      }, 3000);
    }
  };

  const handleAudioClick = () => {
    if (audioRef.current && moves[currentMoveIndex]) {
      const audioUrl = language === 'ko' ? moves[currentMoveIndex].mvKoVo : moves[currentMoveIndex].mvEnVo;
      if (audioUrl) {
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  };

  const handlePrediction = (predictions) => {
    const MovePrediction = predictions[currentMoveIndex + 1];
    const calculatedAccuracy = Math.round(MovePrediction * 100)
    setAccuracy(calculatedAccuracy); 
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
      setDescription(language === 'ko' ? moves[currentMoveIndex + 1].mvKoDesc : moves[currentMoveIndex + 1].mvEnDesc);
      setProgress(((currentMoveIndex + 1) / moves.length) * 100);
      setAccuracy(75); // 예시값

      // 다음 동작으로 이동할 때 자동 재생
      const audioUrl = language === 'ko' ? moves[currentMoveIndex + 1].mvKoVo : moves[currentMoveIndex + 1].mvEnVo;
      playAudio(audioUrl);
    } else {
      setProgress(100);
      setAccuracy(100);
      setTimeout(async () => {
        setShowSuccessPopup(true);
        try {
          await completePoomsae(stageNum, token); // Poomsae 완료 요청
          dispatch(unlockNextStage(parseInt(stageNum) + 1));
        } catch (error) {
          console.error("Failed to complete poomsae:", error);
        }
      }, 1000);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessPopup(false);
    navigate(`/ps_edu`);
  };

  useEffect(() => {
    if (showSuccessPopup) {
      const confirmButton = document.querySelector('.text-overlay .buttons button:first-of-type');
      if (confirmButton) {
        confirmButton.addEventListener('click', handleSuccessConfirm);
      }

      return () => {
        if (confirmButton) {
          confirmButton.removeEventListener('click', handleSuccessConfirm);
        }
      };
    }
  }, [showSuccessPopup]);

  return (
    <div className='poomsaeEduAllPage'>
      <div className='allEduContainer'>
        <div className='allEduContent'>
          <div className='mvGif'>
            <img src={moves[currentMoveIndex]?.mvUrl} alt="move gif" className="mvGifImage" />
          </div>
          <div>
          <Webcam onPrediction={handlePrediction} poomsaeId={stageNum} />
          </div>
          <div className='progress'>
            <ProgressBar
              value={accuracy}
              title={language === 'ko' ? '정확도' : 'Accuracy'}              
              text={`${accuracy.toFixed(2)}%`}
              pathColor="#DA1E28"
              trailColor="#FFD7D9"
              textColor="black"
            />
            <ProgressBar
              value={progress}
              title={language === 'ko' ? '진행률' : 'Progress'}
              text={`${currentMoveIndex} / ${moves.length}`}
            />
          </div>
          <button onClick={handleNextMove}>{language === 'ko' ? '다음 동작' : 'Next Move'}</button>
        </div>

        <div className='mvDescription'>
          <img src={AudioImage} alt="audio" onClick={handleAudioClick} style={{ cursor: 'pointer' }} />
          <div className='mvPsDiv'>
            <div className='mvPs'>
              <h2 className='mvPsName'>{language === 'ko' ? moves[currentMoveIndex]?.mvKoName : moves[currentMoveIndex]?.mvEnName}</h2>
            </div>
            <PsDescription
              className="mvPsDes"
              description={description}
            />
          </div>
        </div>

        <div className='allEduFooter'>
          <div className='line'></div>
          <button className='exitButton' onClick={handleClick}>
            {buttonText}
          </button>
        </div>
      </div>
      <audio ref={audioRef} />
      {showSuccessPopup && (
        <PopUp
          className="eduPopUp"
          title={language === 'ko' ? `${stageDetails?.psKoName.split(':')[0]}을 성공했습니다!` : `You have successfully completed ${stageDetails?.psEnName.split(':')[0]}!`}
          btnText1={language === 'ko' ? "확인" : "Confirm"}
          btnHref1="#"
          btnText2={language === 'ko' ? "다시하기" : "Retry"}
          btnHref2={`/ps_edu/${stageNum}`}
        />
      )}
    </div>
  );
};

PoomsaeEduAllPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PoomsaeEduAllPage;