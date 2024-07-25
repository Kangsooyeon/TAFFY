import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/common/popUp.css';

const PopUp = ({ title, button1Text, button2Text, button1Link, button2Link, onClose }) => {
  const navigate = useNavigate();

  const handleButtonClick = (link) => {
    navigate(link);
    onClose(); // 팝업 닫기
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="popup-buttons">
          <button onClick={() => handleButtonClick(button1Link)}>{button1Text}</button>
          <button onClick={() => handleButtonClick(button2Link)}>{button2Text}</button>
        </div>
        <button className="popup-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  button1Text: PropTypes.string.isRequired,
  button2Text: PropTypes.string.isRequired,
  button1Link: PropTypes.string.isRequired,
  button2Link: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;
