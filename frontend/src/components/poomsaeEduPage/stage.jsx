import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/stage.css'
import lockImg from '../../assets/images/poomsaeEduPage/lock.png';
const Stage = ({ stageNum, image, text }) => {
  return (
    <div className="stage">
      <img src={image} alt={`Stage ${stageNum}`} className='stageImage'/>
      <div className="stageInfo">
        <h3 className="stageState">{text}</h3>
        <hr />
        <img src={lockImg} alt='lock' className="lock"/>
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
