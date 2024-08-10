import '../../styles/sparingPage/sparingresult/sparingResultPage.css';
import Bottom from '../../assets/images/sparingPage/result-bottom.png'
import Top from '../../assets/images/sparingPage/result-top.png'
import Title from '../../assets/images/sparingPage/result-title.png'

import CharacterFace from '../../components/sparingPage/sparingresult/characterFace.jsx'
import VicOrLose from '../../components/sparingPage/sparingresult/vicOrLose.jsx'
import VicRateAfter from '../../components/sparingPage/sparingresult/vicRateAfter.jsx'

import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react'

const sparingResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { oldMyData, newMyData, oldOpponentData, newOpponentData, myResult, opponentResult } = location.state;

  console.log("oldMyData : ",oldMyData)
  console.log("oldOpponentData : " , oldOpponentData)
  const goToSparingMain = () => {
    navigate("/sp")
  }

  return (
    <div className="sparingresultpage">
      <div className="resultbox">
        <img src={Bottom} className="resultbottom" alt="" />
        <img src={Top} className="resulttopleft" alt="" />
        <img src={Top} className="resulttopright" alt="" />
        <img src={Title} className="resulttitle" alt="" />
      </div>
      <p>{myResult}</p>
      <CharacterFace className="characterfaceleft" userdata={oldMyData}/>
      <CharacterFace className="characterfaceright" userdata={oldOpponentData}/>
      <VicOrLose className="vicorloseleft" winorlose={myResult}/>
      <VicOrLose className="vicorloseright" winorlose={opponentResult}/>
      <VicRateAfter className="vicrateafterleft" oldData={oldMyData} newData={newMyData}/>
      <VicRateAfter className="vicrateafterright" oldData={oldOpponentData} newData={newOpponentData}/>
      <p className="me">ME</p>
      <p className="you">YOU</p>
      <button className="exitbutton" onClick={goToSparingMain}>나가기</button>
      <p className="exitp">5초 후 자동으로 닫힙니다.</p>
    </div>
  )
}

export default sparingResultPage;