import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/stage.css';
import lockImg from '../../assets/images/common/lock.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStageDetails } from '../../store/poomsaeEdu/stageSlice';
import Modal from './modal';

const Stage = ({ stageNum, image, text, locked, language, videoUrl, description }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const stageDetails = useSelector((state) => state.stage.stageDetails[stageNum]);
  const loading = useSelector((state) => state.stage.loading);
  const error = useSelector((state) => state.stage.error);

  useEffect(() => {
    if (modalOpen && !stageDetails) {
      dispatch(fetchStageDetails(stageNum));
    }
  }, [modalOpen, stageDetails, dispatch, stageNum]);

  useEffect(() => {
    console.log(`Stage details for ${stageNum}:`, stageDetails); // 데이터 로깅
  }, [stageDetails]);

  const handleOpenModal = () => {
    if (!locked) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Ensure the description is always an object with both psKoDesc and psEnDesc
  const selectedDescription = {
    psKoDesc: stageDetails?.psKoDesc || description.psKoDesc || 'No description available in Korean.',
    psEnDesc: stageDetails?.psEnDesc || description.psEnDesc || 'No description available in English.',
  };

  return (
    <div className={`stage ${locked ? 'locked' : 'unlocked'}`}>
      <img 
        src={image} 
        alt={`Stage ${stageNum}`} 
        className="stageImage"
        onClick={!locked ? handleOpenModal : null}
      />
      {!locked && <div className="stageText">{text}</div>}
      {!locked && (
        <button className="viewDetails" onClick={handleOpenModal}>
          {language === 'ko' ? '상세보기' : 'View Details'}
        </button>
      )}
      {locked && (
        <div className="stageInfo">
          <h3 className="stageState">{text}</h3>
          <hr />
          <img src={lockImg} alt='lock' className="lock"/>
        </div>
      )}
      {modalOpen && (
        <Modal
          stageNum={stageNum}
          text={text}
          videoUrl={stageDetails?.psUrl || videoUrl}
          description={selectedDescription} // Pass the selected description as an object
          modalClose={handleCloseModal}
          language={language}
          moves={stageDetails?.movements || []}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

Stage.propTypes = {
  stageNum: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  locked: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  description: PropTypes.shape({
    psKoDesc: PropTypes.string.isRequired,
    psEnDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Stage;
