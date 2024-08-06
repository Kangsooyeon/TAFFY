import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/mvItem.css';
import CompletedImage from '../../assets/images/common/completed.png'

const MvItem = ({ stageNum, title, image, mvSeq, isDone }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ps_edu/${stageNum}/${mvSeq}`);
  };

  return (
    <div className='mvItem' onClick={handleClick}>
      <div className='mvItemNumberContainer'>
        <span className='mvItemNumber'>{mvSeq}</span>
      </div>
      {isDone && <img src={CompletedImage} alt="Completed" className='completedImage' />}
      <img src={image} alt={title} className='mvItemImage' />
    </div>
  );
}

MvItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  mvSeq: PropTypes.number.isRequired, // 동작 ID
  stageNum: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired, // 진행 상태
  isCompleted: PropTypes.bool.isRequired, // 완료 상태 추가
}

export default MvItem;
