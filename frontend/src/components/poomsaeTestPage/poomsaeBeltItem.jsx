import PropTypes from 'prop-types';
import '../../styles/poomsaeTestPage/poomsaeBeltItem.css';

const PoomsaeBeltItem = ({ imageUrl, onClick, completed }) => {
  return (
    <div className="belt-item" onClick={onClick}>
      <img src={imageUrl} alt="Belt" />
      {completed && <img src="/src/assets/images/common/completed.png" alt="Completed" className="completed-icon" />}
    </div>
  );
};

PoomsaeBeltItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, 
  completed: PropTypes.bool.isRequired,
};

export default PoomsaeBeltItem;
