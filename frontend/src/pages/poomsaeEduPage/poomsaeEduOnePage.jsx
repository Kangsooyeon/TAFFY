import '../../styles/poomsaeEduPage/poomsaeEduAll.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';
import AudioImage from '../../assets/images/common/audio.png';
import ProgressBar from '../../components/common/progressBar';
import { fetchMoveDetail, completeMovement, setMoveCompletion } from '../../store/poomsaeEdu/moveSlice';
import PopUp from '../../components/common/popUp';
import Webcam from '../../components/common/modelWebcam';

const PoomsaeEduOnePage = ({ language }) => {
  const { stageNum, mvSeq } = useParams();
  const [buttonText, setButtonText] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [count, setCount] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moveDetail, loading, error, completedMoves } = useSelector((state) => state.move);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    setButtonText(language === 'ko' ? '나가기' : 'Exit');
  }, [language]);

  useEffect(() => {
    if (token) {
      dispatch(fetchMoveDetail({ mvSeq, psId: stageNum, token }));
    }
  }, [dispatch, mvSeq, stageNum, token]);

  const handleCompletion = async () => {
    try {
      await dispatch(completeMovement({ psId: stageNum, mvSeq, token })).unwrap();
      dispatch(setMoveCompletion({ psId: stageNum, mvSeq }));
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Completion failed:', error);
      setShowFailurePopup(true);
    }
  };

  // const handlePrediction = (predictions) => {
  //   // predictions 배열에서 가장 높은 값을 찾음
  //   const maxPrediction = Math.max(...predictions);
  //   const calculatedAccuracy  = Math.round(maxPrediction * 100)
  //   setAccuracy(calculatedAccuracy);  // 예측값을 퍼센트로 변환하여 설정

  // };

  const handlePrediction = (predictions) => {
    const MovePrediction = predictions[mvSeq];
    const calculatedAccuracy = Math.round(MovePrediction * 100)
    setAccuracy(calculatedAccuracy);  
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowFailurePopup(false);
    navigate(`/ps_edu`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !moveDetail) {
    return <div>Error: {error || 'Move details not found'}</div>;
  }

  const mvName = language === 'ko' ? moveDetail.mvKoName : moveDetail.mvEnName;
  const mvDesc = language === 'ko' ? moveDetail.mvKoDesc : moveDetail.mvEnDesc;
  const isCompleted = completedMoves.some(move => move.psId === stageNum && move.mvSeq === mvSeq);

  return (
    <div className='poomsaeEduAllPage'>
      <div className='allEduContainer'>
        <div className='allEduContent'>
          <div className='mvGif'>
            <img src={moveDetail.mvUrl} alt={mvName} className="mvGifImage" />
          </div>
          <div className='userCam'>
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
              value={count}
              title={language === 'ko' ? '진행률' : 'Progress'}
              text={`${1} / 5`}
            />
          </div>
        </div>
        <div className='mvDescription'>
          <img src={AudioImage} alt="audio" />
          <div className='mvPsDiv'>
            <div className='mvPs'>
              <h2 className='mvPsName'>{mvName}</h2>
              {isCompleted && <img src="/path/to/completedImage.png" alt="Completed" />}
            </div>
            <PsDescription
              className="mvPsDes"
              description={mvDesc}
            />
          </div>
        </div>
        <div className='allEduFooter'>
          <div className='line'></div>
          <button className='exitButton' onClick={handleClosePopup}>
            {buttonText}
          </button>
          {!isCompleted && (
            <button className='completeButton' onClick={handleCompletion}>
              {language === 'ko' ? '완료' : 'Complete'}
            </button>
          )}
        </div>
      </div>
      {showSuccessPopup && (
        <PopUp
          className="eduPopUp"
          title={language === 'ko' ? "학습을 완료했습니다!" : "You have successfully completed the move!"}
          btnText1={language === 'ko' ? "확인" : "Confirm"}
          btnHref1="/ps_edu"
          btnText2={language === 'ko' ? "다시하기" : "Retry"}
          btnHref2={`/ps_edu/${stageNum}/${mvSeq}`}
          onClose={handleClosePopup}
        />
      )}
      {showFailurePopup && (
        <PopUp
          className="eduPopUp"
          title={language === 'ko' ? "학습을 실패했습니다." : "Failed to complete the move."}
          btnText1={language === 'ko' ? "다시하기" : "Retry"}
          btnHref1={`/ps_edu/${stageNum}/${mvSeq}`}
          btnText2={language === 'ko' ? "확인" : "Confirm"}
          btnHref2="/ps_edu"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

PoomsaeEduOnePage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PoomsaeEduOnePage;
