import PropTypes from 'prop-types';
import '../../styles/poomsaeTestPage/poomsaeBeltItem.css';

const PoomsaeBeltItem = ({ imageUrl, onClick }) => {
  return (
    <div className="belt-item" onClick={onClick}>
      <img src={imageUrl} alt="Belt" />
    </div>
  );
};

PoomsaeBeltItem.propTypes = {
  imageUrl: PropTypes.string.isRequired, // imageUrl은 문자열이며 필수입니다.
  onClick: PropTypes.func.isRequired, // 클릭 핸들러 함수
};

export default PoomsaeBeltItem;
