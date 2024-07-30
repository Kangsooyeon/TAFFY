import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/stage.css';
import lockImg from '../../assets/images/poomsaeEduPage/lock.png';
// import { useDispatch } from 'react-redux';
// import { setActiveStage } from '../../actions/actions';
import Modal from './modal';

const Stage = ({ stageNum, image, text, videoUrl, description, locked, language }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [moves, setMoves] = useState([]);
  const buttonText = language === 'ko' ? '상세보기' : 'View Details';
  // const dispatch = useDispatch();

  // const handleLearnComplete = () => {
  //   dispatch(setActiveStage(stageNum + 1));
  //   setModalOpen(false);
  // };

  const handleOpenModal = () => {
    if (!locked) {
      // 잠겨있지 않다면 임시 데이터 생성(백엔드에서 데이터 받아오기)
      const tempMoves = [
        { mv_id: 1, mv_ko_name: "왼쪽 아래 막기", mv_en_name: "lowBlockL", mv_thumb: "src/assets/images/poomsaeEduPage/moves/1.png" },
        { mv_id: 2, mv_ko_name: "오른쪽 아래 막기", mv_en_name: "lowBlockR", mv_thumb: "src/assets/images/poomsaeEduPage/moves/2.png" },
        { mv_id: 3, mv_ko_name: "왼쪽 중간 막기", mv_en_name: "middleBlockL", mv_thumb: "src/assets/images/poomsaeEduPage/moves/3.png" },
        { mv_id: 4, mv_ko_name: "오른쪽 중간 막기", mv_en_name: "middleBlockR", mv_thumb: "src/assets/images/poomsaeEduPage/moves/4.png" },
        { mv_id: 5, mv_ko_name: "왼쪽 얼굴 막기", mv_en_name: "faceBlockL", mv_thumb: "src/assets/images/poomsaeEduPage/moves/5.png" },
        { mv_id: 6, mv_ko_name: "오른쪽 얼굴 막기", mv_en_name: "faceBlockR", mv_thumb: "src/assets/images/poomsaeEduPage/moves/6.png" },
        { mv_id: 7, mv_ko_name: "왼쪽 아래 차기", mv_en_name: "lowKickL", mv_thumb: "src/assets/images/poomsaeEduPage/moves/7.png" },
        { mv_id: 8, mv_ko_name: "오른쪽 아래 차기", mv_en_name: "lowKickR", mv_thumb: "src/assets/images/poomsaeEduPage/moves/8.png" },
      ];
      setMoves(tempMoves);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLearnComplete = () => {
    // 학습 완료 로직
    setModalOpen(false);
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
          stageNum={stageNum}
          text={text}
          videoUrl={videoUrl}
          description={description}
          modalClose={handleCloseModal}
          onLearnComplete={handleLearnComplete}
          language={language}
          moves={moves} // 개별 동작 데이터 전달
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
