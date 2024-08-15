import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import '../../styles/common/progressBar.css';
import 'react-circular-progressbar/dist/styles.css'; // 기본 스타일 가져오기
import PropTypes from 'prop-types';

const ProgressBar = ({ value, text, title, pathColor, trailColor, textColor }) => {
  return (
    <div className="pgsDiv">
      <h2 className="pgsTitle">{title}</h2>
        <CircularProgressbar
          value={value}
          text={text}
          styles={buildStyles({
            textColor: textColor || "black",
            pathColor: pathColor || "#0043CE",
            trailColor: trailColor || "#D0E2FF",
            backgroundColor: "transparent",
            pathTransitionDuration: 0.5,
            pathTransition: 'stroke-dashoffset 0.5s ease 0s',
            textSize: '30px', // 텍스트 크기 조정
          })}
        />
      </div>
  );
};

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  pathColor: PropTypes.string,
  trailColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default ProgressBar;
