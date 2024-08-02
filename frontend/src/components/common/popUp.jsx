import PropTypes from 'prop-types';
import '../../styles/common/popUp.css';

const PopUp = ({ title, btnText1, btnHref1, btnText2, btnHref2, handleBtn1Click, handleBtn2Click }) => {
  const handleBtn1 = () => {
    if (handleBtn1Click) handleBtn1Click();
    if (btnHref1) window.location.href = btnHref1;
  };

  const handleBtn2 = () => {
    if (handleBtn2Click) handleBtn2Click();
    if (btnHref2) window.location.href = btnHref2;
  };

  return (
    <div className="image-container">
      <img src="/src/assets/images/common/popUp.png" alt="Background" className="background-image" />
      <div className="text-overlay">
        <h1>{title}</h1>
        <div className="buttons">
          <button onClick={handleBtn1}>{btnText1}</button>
          <button onClick={handleBtn2}>{btnText2}</button>
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  btnText1: PropTypes.string.isRequired,
  btnHref1: PropTypes.string,
  btnText2: PropTypes.string.isRequired,
  btnHref2: PropTypes.string,
  handleBtn1Click: PropTypes.func,
  handleBtn2Click: PropTypes.func,
};

export default PopUp;
