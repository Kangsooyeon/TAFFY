import '../../../styles/sparingPage/sparingresult/vicOrLose.css'
import Win from '../../../assets/images/sparingPage/result-win.png'
import Lose from '../../../assets/images/sparingPage/result-lose.png'
import Win_eng from '../../../assets/images/sparingPage/result-win-eng.png'
import Lose_eng from '../../../assets/images/sparingPage/result-lose-eng.png'

const VicOrLose = ({className, winorlose, language}) => {
  return (
    <div className={`vicorlosebox ${className}`}>
      {winorlose === 'win' 
        ? (language === 'ko' 
            ? <img src={Win} alt="" /> 
            : <img src={Win_eng} alt="" />)
        : (language === 'ko' 
            ? <img src={Lose} alt="" /> 
            : <img src={Lose_eng} alt="" />)}
      </div>
  )
}

export default VicOrLose;