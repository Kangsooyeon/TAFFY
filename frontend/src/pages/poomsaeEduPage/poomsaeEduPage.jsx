import Stage from "../../components/poomsaeEduPage/stage";

const PoomsaeEduPage = () => {

  const stages = [
    {stageNum:1, image: "src/assets/images/poomsaeEduPage/1.png", text:"태극 1장 : 하늘"},
    {stageNum:2, image: "src/assets/images/poomsaeEduPage/2.png", text:"태극 2장 : 연못"},
    {stageNum:3, image: "src/assets/images/poomsaeEduPage/3.png", text:"태극 3장 : 태양"},
    {stageNum:4, image: "src/assets/images/poomsaeEduPage/4.png", text:"태극 4장 : 천둥"},
    {stageNum:5, image: "src/assets/images/poomsaeEduPage/5.png", text:"태극 5장 : 바람"},
    {stageNum:6, image: "src/assets/images/poomsaeEduPage/6.png", text:"태극 6장 : 물"},
    {stageNum:7, image: "src/assets/images/poomsaeEduPage/7.png", text:"태극 7장 : 산맥"},
    {stageNum:8, image: "src/assets/images/poomsaeEduPage/8.png", text:"태극 8장 : 땅"},
  ]
  
  return (
    <div className="stageContainer">
      {stages.map((stage, index) => (
        <Stage 
        key={index} 
        stageNum={stage.stageNum} 
        image={stage.image} 
        text={stage.text} 
        />
      ))}
    </div>
  );
};

export default PoomsaeEduPage;
