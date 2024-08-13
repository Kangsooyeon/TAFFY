import '../../styles/sparingPage/sparingresult/sparingResultPage.css';
import Bottom from '../../assets/images/sparingPage/result-bottom.png'
import Top from '../../assets/images/sparingPage/result-top.png'
import Title_Ko from '../../assets/images/sparingPage/result-title.png'
import Title_En from '../../assets/images/sparingPage/result-title-eng.png'

import CharacterFace from '../../components/sparingPage/sparingresult/characterFace.jsx'
import VicOrLose from '../../components/sparingPage/sparingresult/vicOrLose.jsx'
import VicRateAfter from '../../components/sparingPage/sparingresult/vicRateAfter.jsx'

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react'

const sparingResultPage = ({language}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { oldMyData, newMyData, oldOpponentData, newOpponentData, myResult, opponentResult } = location.state;

  // console.log("oldMyData : ",oldMyData)
  // console.log("oldOpponentData : " , oldOpponentData)
  const goToSparingMain = () => {
    navigate("/sp")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      goToSparingMain(); // 10초 후 자동으로 스파링 메인 페이지로 이동
    }, 10000); // 10000ms = 10초

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어
  }, []);

  return (
    <div className="sparingresultpage">
      <div className="resultbox">
        <img src={Bottom} className="resultbottom" alt="" />
        <img src={Top} className="resulttopleft" alt="" />
        <img src={Top} className="resulttopright" alt="" />
        {language === 'ko' ?
          <img src={Title_Ko} className="resulttitle" alt="" /> :
          <img src={Title_En} className="resulttitle" alt="" /> 
        }
      </div>
      <p>{myResult}</p>
      <CharacterFace className="characterfaceleft" userdata={oldMyData}/>
      <CharacterFace className="characterfaceright" userdata={oldOpponentData}/>
      <VicOrLose className="vicorloseleft" winorlose={myResult} language={language}/>
      <VicOrLose className="vicorloseright" winorlose={opponentResult} language={language}/>
      <VicRateAfter className="vicrateafterleft" oldData={oldMyData} newData={newMyData} result={myResult} language={language}/>
      <VicRateAfter className="vicrateafterright" oldData={oldOpponentData} newData={newOpponentData} result={opponentResult} language={language}/>
      <p className="me">ME</p>
      <p className="you">YOU</p>
      <button className="exitbutton" onClick={goToSparingMain}>{language === 'ko' ? '나가기' : 'EXIT'}</button>
      <p className="exitp">{language === 'ko' ? '10초 후 자동으로 닫힙니다.' : 'It closes automatically after 10 seconds.'}</p>
    </div>
  )
}

export default sparingResultPage;