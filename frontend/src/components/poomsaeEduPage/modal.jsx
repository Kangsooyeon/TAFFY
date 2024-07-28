import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/modal.css';
import Youtube from './youtube'; 
import PsDescription from './psDescription';
import { useEffect, useState } from 'react';

const Modal = ({ text, videoUrl, description, modalClose, onLearnComplete, language }) => {
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    setButtonText(language === 'ko' ? '전체 학습' : 'All Learning');
  }, [language]);

  return (
    <div className='modal'>
      <div className='modalWrapper'>
        <button className='closeButton' onClick={modalClose}>X</button>
        <div className='modalContent'>
          <div className='leftSection'>
            <h2 className='poomsaeName'>{text}</h2>
            <Youtube videoUrl={videoUrl} />
            <PsDescription description={description} />
          </div>
          <div className='rightSection'>
            <button onClick={onLearnComplete}>학습 완료!</button>
          </div>
        </div>
        <div className='modalFooter'>
          <div className='line'></div>
          <button className='completeAllButton' onClick={onLearnComplete}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  onLearnComplete: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default Modal;
