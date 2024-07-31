import '../../../styles/sparingPage/sparingresult/vicOrLose.css'
import Win from '../../../assets/images/sparingPage/result-win.png'
import Lose from '../../../assets/images/sparingPage/result-lose.png'

const VicOrLose = ({className}) => {
  return (
    <div className={`vicorlosebox ${className}`}>
      <img src={Win} alt="" />
    </div>
  )
}

export default VicOrLose;