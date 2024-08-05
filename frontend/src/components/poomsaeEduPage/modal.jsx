import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/modal.css';
import Youtube from './youtube'; 
import PsDescription from './psDescription';
import { useEffect, useState } from 'react';
import MvItem from './mvItem';
import { useNavigate } from 'react-router-dom';
import RightButton from '../../assets/images/poomsaeEduPage/right.png';
import LeftButton from '../../assets/images/poomsaeEduPage/left.png';

const Modal = ({ stageNum, text, videoUrl, description, modalClose, language, moves, loading, error }) => {
  const [buttonText, setButtonText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    setButtonText(language === 'ko' ? '전체 학습' : 'All Learning');
  }, [language]);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < moves.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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

  const totalPages = Math.ceil(moves.length / itemsPerPage);

  return (
    <div className='detailModal'>
      <div className='modalWrapper'>
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
            <button className="navButton prevButton" onClick={handlePrevPage}>
              <img src={LeftButton} alt="left" />
            </button>
            <div className='mvItems'>
              {moves.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((move, index) => (
                <MvItem
                  key={index}
                  title={language === 'ko' ? move.mvKoName : move.mvEnName}
                  image={move.mvThumb}
                  language={language}
                  moveId={move.mvId}
                  stageNum={stageNum}
                  index={currentPage * itemsPerPage + index}
                />
              ))}
            </div>
            <button className="navButton nextButton" onClick={handleNextPage}>
              <img src={RightButton} alt="right" />
            </button>
            <div className="pageIndicator">
              {`${currentPage + 1} / ${totalPages}`}
            </div>
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
