import { useNavigate } from 'react-router-dom';
import '../../styles/poomsaeTestPage/poomsaeTestModal.css';
import PropTypes from 'prop-types';
import Ps1 from '/src/assets/images/poomsaeTestPage/ps1.png';
import Ps2 from '/src/assets/images/poomsaeTestPage/ps2.png';
import Ps3 from '/src/assets/images/poomsaeTestPage/ps3.png';
import Ps4 from '/src/assets/images/poomsaeTestPage/ps4.png';
import Ps5 from '/src/assets/images/poomsaeTestPage/ps5.png';
import Ps6 from '/src/assets/images/poomsaeTestPage/ps6.png';
import Ps7 from '/src/assets/images/poomsaeTestPage/ps7.png';
import Ps8 from '/src/assets/images/poomsaeTestPage/ps8.png';

const Ps_images = [Ps1, Ps2, Ps3, Ps4, Ps5, Ps6, Ps7, Ps8];

const PoomsaeTestModal = ({ poomsae, onClose, language }) => {
    const navigate = useNavigate();

    const handleChallengeClick = () => {
        // navigate('/ps_test/detail');
        navigate(`/ps_test/detail/${poomsae.id}`);
    };

    const imageUrl  = Ps_images[poomsae.id - 1];


    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <p className="modal-title">{poomsae.name}</p>
          <div className="modal-ps">
            <div className="modal-image-box">
              <img src={imageUrl}  alt="" className="modal-image" />
            </div>
            <div className="modal-desc">
              <div className="modal-ps-description">
                <p>{poomsae.description}</p>              
              </div>
              <div className="modal-btn">
                <button onClick={handleChallengeClick}>{language==='ko'?'도전하기':'Challenge'}</button>
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
  