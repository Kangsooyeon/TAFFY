import '../../../styles/sparingPage/sparingmain/messageBox.css'
import MessageBottom from '../../../assets/images/sparingPage/spar-message-bottom.png'
import Letter from '../../../assets/images/sparingPage/letter.png'

const messageBox = () => {
  return (
    <div className="messagebox">
      <div className="letterContainer">
        <img src={Letter} alt="Letter" className="letterimg" />
      </div>
      <p>3</p>
      <div style={{margin: '-3.5px', width: '97.5%'}}>
        <img src={MessageBottom} alt="" className="messageimgbottom" />
      </div>
    </div>
  )
}

export default messageBox;