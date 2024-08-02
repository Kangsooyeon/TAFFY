import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/modal.css';
import Youtube from './youtube'; 
import PsDescription from './psDescription';
import { useEffect, useState } from 'react';
import MvItem from './mvItem';
import { useNavigate } from 'react-router-dom';

const Modal = ({ stageNum, text, videoUrl, description, modalClose, language, moves, loading, error }) => {
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
    navigate(`/ps_edu/${stageNum}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className='detailModal'>
      <div className='modalWrapper'>
        {/* <button className='completeButton' onClick={onLearnComplete}>학습 완료!</button> */}
        <button className='closeButton' onClick={modalClose}>X</button>
        <div className='modalContent'>
          <div className='sectionLeft'>
            <h2 className='poomsaeName'>{text}</h2>
            <Youtube videoUrl={videoUrl} />
            <PsDescription 
              className="psInfo"
              description={description} />
          </div>
          <div className='sectionRight'>
              <div className='mvItems'>
                {moves.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((move, index) => (
                  <MvItem
                    key={index}
                    title={language === 'ko' ? move.mvKoName : move.mvEnName}
                    image={move.mvThumb}
                    language={language}
                    moveId={move.mvId}
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
    mvId: PropTypes.number.isRequired,
    mvThumb: PropTypes.string.isRequired,
    mvKoName: PropTypes.string.isRequired,
    mvEnName: PropTypes.string,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Modal;
