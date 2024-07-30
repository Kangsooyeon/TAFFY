import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/mvItem.css';

const MvItem = ({ stageNum, title, image, moveId, language }) => {
  // 개별 동작 진행할 때 클릭했을 때 해당 동작 교육으로 이동
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/ps_edu/${stageNum}/${moveId}?lang=${language}`);
  };

  // const buttonText = language === 'ko' ? '교육하기' : 'Learn';

  return (
    <div className='mvItem' onClick={handleClick}>
      <img src={image} alt={title} />
      <h2 className='mvName'>{title}</h2>
    </div>
  );
}

MvItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  moveId: PropTypes.number.isRequired, // 각 동작 ID
  language: PropTypes.string.isRequired,
  stageNum: PropTypes.number.isRequired,
}

export default MvItem;