import '../../styles/poomsaeTestPage/poomsaeTestModal.css';
import PropTypes from 'prop-types';

const PoomsaeTestModal = ({ imageUrl, onClose }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <img src={imageUrl} alt="Belt" className="modal-image" />
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
PoomsaeTestModal.propTypes = {
    imageUrl: PropTypes.string.isRequired, // 모달에 표시할 이미지 URL
    onClose: PropTypes.func.isRequired, // 모달을 닫을 함수
};

export default PoomsaeTestModal;
  