import PropTypes from 'prop-types';
import '../../styles/poomsaeTestPage/poomsaeBeltItem.css';
import Completed from "/src/assets/images/common/completed.png";
import Locked from "/src/assets/images/common/lock.png";  // 잠금 아이콘 이미지 추가

const PoomsaeBeltItem = ({ imageUrl, onClick, completed, locked }) => {
  return (
    <div className={`belt-item ${locked ? 'locked' : ''}`} onClick={locked ? null : onClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt="Belt" className="belt-img" />
      {completed && <img src={Completed} alt="Completed" className="completed-icon" />}
      {locked && <img src={Locked} alt="Locked" className="locked-icon" />}
    </div>
  );
};

PoomsaeBeltItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, 
  completed: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
};

export default PoomsaeBeltItem;
