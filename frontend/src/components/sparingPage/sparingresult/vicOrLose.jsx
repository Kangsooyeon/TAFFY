import '../../../styles/sparingPage/sparingresult/vicOrLose.css'
import Win from '../../../assets/images/sparingPage/result-win.png'
import Lose from '../../../assets/images/sparingPage/result-lose.png'

const VicOrLose = ({className, winorlose}) => {
  return (
    <div className={`vicorlosebox ${className}`}>
      { winorlose === 'win' ? 
      <img src={Win} alt="" /> :
      <img src={Lose} alt="" />       
      }
    </div>
  )
}

export default VicOrLose;