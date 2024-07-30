import '../../styles/sparingPage/sparingresult/sparingResultPage.css';
import Bottom from '../../assets/images/sparingPage/result-bottom.png'
import Top from '../../assets/images/sparingPage/result-top.png'
import Title from '../../assets/images/sparingPage/result-title.png'

import CharacterFace from '../../components/sparingPage/sparingresult/characterFace.jsx'
import VicOrLose from '../../components/sparingPage/sparingresult/vicOrLose.jsx'
import VicRateAfter from '../../components/sparingPage/sparingresult/vicRateAfter.jsx'

import { useNavigate } from 'react-router-dom';


const sparingResultPage = () => {
  const navigate = useNavigate();

  const goToSparingMain = () => {
    navigate("/sp")
  }
  return (
    <div className="sparingresultpage">
      <div className="resultbox">
        <img src={Bottom} className="resultbottom" alt="" />
      ,  <img src={Top} className="resulttopleft" alt="" />
        <img src={Top} className="resulttopright" alt="" />
        <img src={Title} className="resulttitle" alt="" />
      </div>
      <CharacterFace className="characterfaceleft"/>
      <CharacterFace className="characterfaceright"/>
      <VicOrLose className="vicorloseleft"/>
      <VicOrLose className="vicorloseright"/>
      <VicRateAfter className="vicrateafterleft"/>
      <VicRateAfter className="vicrateafterright"/>
      <p className="me">ME</p>
      <p className="you">YOU</p>
      <button className="exitbutton" onClick={goToSparingMain}>나가기</button>
      <p className="exitp">5초 후 자동으로 닫힙니다.</p>
    </div>
  )
}

export default sparingResultPage;