import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/mvItem.css';
import Completed from '../../assets/images/common/completed.png'

const MvItem = ({ stageNum, title, image, index, mvSeq }) => {
  // 개별 동작 진행할 때 클릭했을 때 해당 동작 교육으로 이동
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ps_edu/${stageNum}/${mvSeq}`);
  };

  return (
    <div className='mvItem' onClick={handleClick}>
      <div className='mvItemNumberContainer'>
        <span className='mvItemNumber'>{index + 1}</span>
      </div>
      <img src={image} alt={title} className='mvItemImage' />
    </div>
  );
}

MvItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  mvSeq: PropTypes.number.isRequired, // 동작 ID
  // moveId: PropTypes.number.isRequired, // 각 동작 ID
  index: PropTypes.number.isRequired, // 각 동작의 순서 번호
  stageNum: PropTypes.number.isRequired,
}

export default MvItem;
