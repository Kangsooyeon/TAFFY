import '../../../styles/sparingPage/sparingmain/quickButton.css'
import Punch from '../../../assets/images/sparingPage/punch.png'

const quickButton = () => {
  return (
    <button className="quickbutton">
      <img src={Punch} alt="" />
      <p className="quicktitle">빠른 시작</p>
      <img src={Punch} alt="" />
    </button>
  )
}

export default quickButton;