import PropTypes from 'prop-types';

const Stage = ({ stageNum, image, text }) => {
  return (
    <div className="stage">
      <img src={image} alt={`Stage ${stageNum}`} />
      <div className="stageInfo">
        <h3 className="stageState">{text}</h3>
        <hr />
        <p className="lock">🔒</p>
      </div>
    </div>
  );
};

Stage.propTypes = {
  stageNum: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Stage;
