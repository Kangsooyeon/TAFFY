import Stage from "../../components/poomsaeEduPage/stage";
import '../../styles/poomsaeEduPage/poomsaeEdu.css';
import PropTypes from 'prop-types'

const PoomsaeEduPage = ({language}) => {

  const stages = [
    {stageNum:1, image: "src/assets/images/poomsaeEduPage/1.png", text:{ko:"태극 1장 : 하늘", en:"Taegeuk 1 : Sky"}},
    {stageNum:2, image: "src/assets/images/poomsaeEduPage/2.png", text:{ko:"태극 2장 : 연못", en:"Taegeuk 2 : Pond"}},
    {stageNum:3, image: "src/assets/images/poomsaeEduPage/3.png", text:{ko:"태극 3장 : 태양", en:"Taegeuk 3 : Sun"}},
    {stageNum:4, image: "src/assets/images/poomsaeEduPage/4.png", text:{ko:"태극 4장 : 천둥", en:"Taegeuk 4 : Thunder"}},
    {stageNum:5, image: "src/assets/images/poomsaeEduPage/5.png", text:{ko:"태극 5장 : 바람", en:"Taegeuk 5 : Wind"}},
    {stageNum:6, image: "src/assets/images/poomsaeEduPage/6.png", text:{ko:"태극 6장 : 물", en:"Taegeuk 6 : Water"}},
    {stageNum:7, image: "src/assets/images/poomsaeEduPage/7.png", text:{ko:"태극 7장 : 산맥", en:"Taegeuk 7 : Mountain"}},
    {stageNum:8, image: "src/assets/images/poomsaeEduPage/8.png", text:{ko:"태극 8장 : 땅", en:"Taegeuk 8 : Ground"}},
  ]
  
  return (
    <div className="poomsaeEduPage">
      <div className="stageContainer">
        {stages.map((stage, index) => (
          <Stage 
          key={index} 
          stageNum={stage.stageNum} 
          image={stage.image} 
          text={stage.text[language]} // 언어에 따라 텍스트 선택
          />
        ))}
      </div>
    </div>
  );
};

PoomsaeEduPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PoomsaeEduPage;
