import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/modal.css';
import Youtube from './youtube'; 
import PsDescription from './psDescription';
import { useEffect, useState } from 'react';
import MvItem from './mvItem';
import { useNavigate } from 'react-router-dom';

const Modal = ({ stageNum, text, videoUrl, description, modalClose, language, moves }) => {
  const [buttonText, setButtonText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    setButtonText(language === 'ko' ? '전체 학습' : 'All Learning');
  }, [language]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Navigating to /ps_edu/${stageNum}?lang=${language}`);
    navigate(`/ps_edu/${stageNum}`);
  }

  return (
    <div className='modal'>
      <div className='modalWrapper'>
        {/* <button className='completeButton' onClick={onLearnComplete}>학습 완료!</button> */}
        <button className='closeButton' onClick={modalClose}>X</button>
        <div className='modalContent'>
          <div className='leftSection'>
            <h2 className='poomsaeName'>{text}</h2>
            <Youtube videoUrl={videoUrl} />
            <PsDescription 
              className="psInfo"
              description={description} />
          </div>
          <div className='rightSection'>
              <div className='mvItems'>
                {moves.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((move, index) => (
                  <MvItem
                    key={index}
                    title={language === 'ko' ? move.mv_ko_name : move.mv_en_name}
                    image={move.mv_thumb}
                    language={language}
                    moveId={move.mv_id}
                    stageNum={stageNum}
                  />
                ))}
              </div>
              {currentPage > 0 && <button onClick={handlePrevPage}>Previous</button>}
              {(currentPage + 1) * itemsPerPage < moves.length && <button onClick={handleNextPage}>Next</button>}
          </div>
        </div>
        <div className='modalFooter'>
          <div className='line'></div>
          <button className='completeAllButton' onClick={handleClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  stageNum: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
  onLearnComplete: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.shape({
    mv_id: PropTypes.number.isRequired,
    mv_thumb: PropTypes.string.isRequired,
    mv_ko_name: PropTypes.string.isRequired,
    mv_en_name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Modal;
