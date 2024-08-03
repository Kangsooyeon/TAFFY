import '../../styles/poomsaeEduPage/poomsaeEduAll.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';
import ProgressBar from '../../components/common/progressBar';
import AudioImage from '../../assets/images/common/audio.png';
import { fetchAllStageDetails } from '../../apis/stageApi';
import { useDispatch } from 'react-redux';
import { unlockNextStage } from '../../store/poomsaeEdu/stagesSlice';
import PopUp from '../../components/common/popUp';

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
        setDescription(language === 'ko' ? data.data.mvDetails[0].mvKoDesc : data.data.mvDetails[0].mvEnDesc); // 첫번째 동작 설명
      } catch (error) {
        console.error("Failed to fetch stage details:", error);
      }
    };

    fetchData();
  }, [stageNum, language]);

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
      setDescription(language === 'ko' ? moves[currentMoveIndex + 1].mvKoDesc : moves[currentMoveIndex + 1].mvEnDesc);
      setProgress(((currentMoveIndex + 1) / moves.length) * 100);
      setAccuracy(75); // 예시값
    } else {
      setProgress(100);
      setAccuracy(100);
      setTimeout(() => {
        setShowSuccessPopup(true);
        dispatch(unlockNextStage(parseInt(stageNum) + 1)); // 다음 스테이지 잠금 해제
      }, 1000); // 게이지가 100%가 된 후 1초 후에 팝업 나타내기
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
          <div className='userCam'></div>
          <div className='progress'>
            {/* 1. 정확도 */}
            <ProgressBar
              value={accuracy}
              title={language === 'ko' ? '정확도' : 'Accuracy'}
              text={accuracy.toString()}
            />

            {/* 2. 진행률 */}
            <ProgressBar
              value={progress}
              title={language === 'ko' ? '진행률' : 'Progress'}
              text={`${currentMoveIndex + 1} / ${moves.length}`}
              pathColor="orange"
              trailColor="grey"
              textColor="purple"
            />
          </div>
          <button onClick={handleNextMove}>{language === 'ko' ? '다음 동작' : 'Next Move'}</button> {/* 임시 버튼 */}
        </div>

        <div className='mvDescription'>
          <img src={AudioImage} alt="audio" />
          <h2 className='mvPsName'>{language === 'ko' ? moves[currentMoveIndex]?.mvKoName : moves[currentMoveIndex]?.mvEnName}</h2>
          <PsDescription
            className="mvPsDes"
            description={description}
          />
        </div>

        <div className='allEduFooter'>
          <div className='line'></div>
          <button className='exitButton' onClick={handleClick}>
            {buttonText}
          </button>
        </div>
      </div>
      {showSuccessPopup && (
        <PopUp
          className="eduPopUp"
          title={language === 'ko' ? `${stageDetails?.psKoName}을 성공했습니다!` : `You have successfully completed ${stageDetails?.psEnName}!`}
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