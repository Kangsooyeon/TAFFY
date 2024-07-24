import { useNavigate } from 'react-router-dom';
import '../../styles/poomsaeTestPage/poomsaeTestModal.css';
import PropTypes from 'prop-types';

const PoomsaeTestModal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleChallengeClick = () => {
        navigate('/ps_test/detail');
    };


    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <p className="modal-title">태극 1장</p>
          <div className="modal-ps">
            <div className="modal-image-box">
              <img src="src/assets/images/poomsaeTestPage/ps1.png" alt="" className="modal-image" />
            </div>
            <div className="modal-desc">
              <div className="modal-ps-description">
                <p>태극 1장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다.건이란 태극에 있어 음과 양의 상대 작용에서 양(陽)을 가리키며,만물의 시작을 알리는 기운을 나타낸다.또한, 건은 인체에 있어서 머리에 해당하므로 첫 번째 품새 수련을 통해서 태권도의 기본이 되는 동작의 바른 이해와 기술 습득을 의미한다.</p>
              </div>
              <button className="modal-btn" onClick={handleChallengeClick}>도전하기</button>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
PoomsaeTestModal.propTypes = {
    onClose: PropTypes.func.isRequired, // 모달을 닫을 함수
};

export default PoomsaeTestModal;
  