import '../../styles/poomsaeEduPage/poomsaeEduAll.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';
import AudioImage from '../../assets/images/common/audio.png';
import ProgressBar from '../../components/common/progressBar';
import { fetchMoveDetail } from '../../apis/mvApi';

const PoomsaeEduOnePage = ({ language }) => {
  const { stageNum, mvSeq } = useParams();
  const [buttonText, setButtonText] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [count, setCount] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [moveDetail, setMoveDetail] = useState(null); // 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    setButtonText(language === 'ko' ? '나가기' : 'Exit');
  }, [language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response  = await fetchMoveDetail(stageNum, mvSeq, token);
        setMoveDetail(response.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, stageNum, mvSeq]);

  useEffect(() => {
    console.log('stageNum:', stageNum, 'mvSeq:', mvSeq);
  }, [stageNum, mvSeq]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/ps_edu`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const mvName = language === 'ko' ? moveDetail.mvKoName : moveDetail.mvEnName;
  const mvDesc = language === 'ko' ? moveDetail.mvKoDesc : moveDetail.mvEnDesc;

  return (
    <div className='poomsaeEduAllPage'>
      <div className='allEduContainer'>
        <div className='allEduContent'>
          <div className='mvGif'>
            <img src={moveDetail.mvUrl} alt={mvName} className="mvGifImage"/>
          </div>
          <div className='userCam'></div>
          <div className='progress'>
            <ProgressBar
              value={accuracy}
              title={language === 'ko' ? '정확도' : 'Accuracy'}
              text={accuracy.toString()}
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
            </div>
            <PsDescription
              className="mvPsDes"
              description={mvDesc}
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
    </div>
  );
};

PoomsaeEduOnePage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PoomsaeEduOnePage;
