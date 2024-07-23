import '../../styles/poomsaeTestPage/poomsaeBeltItem.css';
import PropTypes from 'prop-types';

const BeltItem = ({ imageUrl }) => {
    return (
      <div className="belt-item">
        <img src={imageUrl} alt='Belt' />
      </div>
    );
  };

// PropTypes를 사용하여 props의 타입을 정의합니다.
BeltItem.propTypes = {
    imageUrl: PropTypes.string.isRequired, // imageUrl은 문자열이며 필수입니다.
  };
  

export default BeltItem