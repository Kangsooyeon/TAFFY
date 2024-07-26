import { useNavigate } from 'react-router-dom';
import '../../../styles/sparingPage/sparingmain/quickButton.css'
import Punch from '../../../assets/images/sparingPage/punch.png'

const quickButton = () => {
  const navigate = useNavigate();

  const goToBattle = () => {
    navigate("/sp/game")
  }

  return (
    <button className="quickbutton" onClick={goToBattle}>
      <img src={Punch} alt="" />
      <p className="quicktitle">빠른 시작</p>
      <img src={Punch} alt="" />
    </button>
  )
}

export default quickButton;