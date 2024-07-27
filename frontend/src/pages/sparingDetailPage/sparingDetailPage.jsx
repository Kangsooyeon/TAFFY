import '../../styles/sparingPage/sparinggame/sparingDetailPage.css'
import Left from '../../assets/images/sparingPage/game-left.png'
import Right from '../../assets/images/sparingPage/game-right.png'
import Mat from '../../assets/images/sparingPage/sparingmat.png'

import Character from '../../components/sparingPage/sparinggame/character.jsx'
import HpBar from '../../components/sparingPage/sparinggame/hpBar.jsx'
import Mission from '../../components/sparingPage/sparinggame/mission.jsx'
import Score from '../../components/sparingPage/sparinggame/score.jsx'
import Timer from '../../components/sparingPage/sparinggame/timer.jsx'
import WebCam from '../../components/sparingPage/sparinggame/webCam.jsx'
import GameUser from '../../components/sparingPage/sparinggame/gameuser.jsx'


const SparingDetailPage = () => {
  return (
    <div className="sparinggame">
      <img src={Left} className="sparinggameleft" alt="" />
      <img src={Right} className="sparinggameright" alt="" />
      <div className="sparingstage">
      <img src={Mat} className="sparingmat" alt="" />
      <GameUser />
      <GameUser />
      </div>
      <div className="sparinggamebox">
        <Character />
        <HpBar />
        <Mission />
        <Score />
        <Timer />
        <WebCam />

      </div>
    </div>
  )
}

export default SparingDetailPage