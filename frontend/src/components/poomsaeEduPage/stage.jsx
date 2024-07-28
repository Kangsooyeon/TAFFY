import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/stage.css';
import lockImg from '../../assets/images/poomsaeEduPage/lock.png';
import { useDispatch } from 'react-redux';
import { setActiveStage } from '../../actions/actions';
import Modal from './modal';

const Stage = ({ stageNum, image, text, videoUrl, description, locked, language }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLearnComplete = () => {
    dispatch(setActiveStage(stageNum + 1));
    setModalOpen(false);
  };

  const buttonText = language === 'ko' ? '상세보기' : 'View Details';

  return (
    <div className={`stage ${locked ? 'locked' : 'unlocked'}`}>
      <img 
        src={image} 
        alt={`Stage ${stageNum}`} 
        className="stageImage"
        onClick={!locked ? () => setModalOpen(true) : null}
      />
      {!locked && <div className="stageText">{text}</div>}
      {!locked && (
        <button className="viewDetails" onClick={() => setModalOpen(true)}>
          {buttonText}
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
          text={text}
          videoUrl={videoUrl}
          description={description}
          modalClose={() => setModalOpen(false)}
          onLearnComplete={handleLearnComplete}
          language={language}
        />
      )}
    </div>
  );
};

Stage.propTypes = {
  stageNum: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  locked: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
};

export default Stage;
