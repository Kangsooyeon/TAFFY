import { useNavigate } from 'react-router-dom';
import '../../styles/poomsaeTestPage/poomsaeTestModal.css';
import PropTypes from 'prop-types';

const PoomsaeTestModal = ({ poomsae, onClose }) => {
    const navigate = useNavigate();

    const handleChallengeClick = () => {
        // navigate('/ps_test/detail');
        navigate(`/ps_test/detail/${poomsae.id}`);
    };


    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <p className="modal-title">{poomsae.name}</p>
          <div className="modal-ps">
            <div className="modal-image-box">
              <img src={`/src/assets/images/poomsaeTestPage/ps${poomsae.id}.png`}  alt="" className="modal-image" />
            </div>
            <div className="modal-desc">
              <div className="modal-ps-description">
                <p>{poomsae.description}</p>              
              </div>
              <div className="modal-btn">
                <button onClick={handleChallengeClick}>도전하기</button>
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>X</button>
        </div>
      </div>
    );
  };
  
PoomsaeTestModal.propTypes = {
    poomsae: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired, // 모달을 닫을 함수
};

export default PoomsaeTestModal;
  