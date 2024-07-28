import Stage from "../../components/poomsaeEduPage/stage";
import '../../styles/poomsaeEduPage/poomsaeEdu.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PoomsaeEduPage = ({ language }) => {
  const activeStage = useSelector((state) => state.activeStage);

  const stages = [
    { stageNum: 1, image: "src/assets/images/poomsaeEduPage/1.png", 
      text: { ko: "태극 1장 : 하늘", en: "Taegeuk 1 : Sky" }, 
      videoUrl: "https://www.youtube.com/watch?v=lKgP1DnC-Zk", 
      description: { ko : "태극 1장은 팔괘의 (☰)를 의미하며... 태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며... 태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며... 태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...태극 1장은 팔괘의 (☰)를 의미하며...", en : "English!!!!!!!!!!!!!!!!"} },
    { stageNum: 2, 
      image: "src/assets/images/poomsaeEduPage/2.png", 
      text: { ko: "태극 2장 : 연못", en: "Taegeuk 2 : Pond" }, 
      videoUrl: "https://www.youtube.com/watch?v=KLEeB1H5PeM", 
      description: { ko : "태극 2장은 팔괘의 (☷)를 의미하며...", en:"english여요요요요요요요요요요요"} },
    { stageNum: 3, image: "src/assets/images/poomsaeEduPage/3.png", text: { ko: "태극 3장 : 태양", en: "Taegeuk 3 : Sun" }, videoUrl: "https://www.youtube.com/watch?v=ZUKAsSi-ziA", description: "태극 3장은 팔괘의 (☲)를 의미하며..." },
    { stageNum: 4, image: "src/assets/images/poomsaeEduPage/4.png", text: { ko: "태극 4장 : 천둥", en: "Taegeuk 4 : Thunder" }, videoUrl: "https://www.youtube.com/watch?v=FbqjsUndH2M", description: "태극 4장은 팔괘의 (☳)를 의미하며..." },
    { stageNum: 5, image: "src/assets/images/poomsaeEduPage/5.png", text: { ko: "태극 5장 : 바람", en: "Taegeuk 5 : Wind" }, videoUrl: "https://www.youtube.com/watch?v=1c5tRnshbwA", description: "태극 5장은 팔괘의 (☴)를 의미하며..." },
    { stageNum: 6, image: "src/assets/images/poomsaeEduPage/6.png", text: { ko: "태극 6장 : 물", en: "Taegeuk 6 : Water" }, videoUrl: "https://www.youtube.com/watch?v=YkW4UY5HsKI", description: "태극 6장은 팔괘의 (☵)를 의미하며..." },
    { stageNum: 7, image: "src/assets/images/poomsaeEduPage/7.png", text: { ko: "태극 7장 : 산맥", en: "Taegeuk 7 : Mountain" }, videoUrl: "https://www.youtube.com/watch?v=7OrejwNss6o", description: "태극 7장은 팔괘의 (☶)를 의미하며..." },
    { stageNum: 8, image: "src/assets/images/poomsaeEduPage/8.png", text: { ko: "태극 8장 : 땅", en: "Taegeuk 8 : Ground" }, videoUrl: "https://www.youtube.com/watch?v=1u8PtE8Swdo", description: "태극 8장은 팔괘의 (☷)를 의미하며..." },
  ];

  return (
    <div className="poomsaeEduPage">
      <div className="stageContainer">
        {stages.map((stage, index) => (
          <Stage 
            key={index} 
            stageNum={stage.stageNum} 
            image={stage.image} 
            text={stage.text[language]} // 언어에 따라 텍스트 선택
            locked={stage.stageNum > activeStage} // 잠금 상태 prop
            videoUrl={stage.videoUrl}
            description={stage.description[language]}
            language={language} // language prop
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
