import '../../../styles/sparingPage/sparingmain/messageBox.css'
import MessageBottom from '../../../assets/images/sparingPage/spar-message-bottom.png'
import Letter from '../../../assets/images/sparingPage/letter.png'
import Message from './message.jsx'

const messageBox = ({ inviter, onAccept, onDeny }) => {
  return (
    <div className="messagebox">
      <div className="letterContainer">
        <img src={Letter} alt="Letter" className="letterimg" />
      </div>
      <div></div>
      <Message inviter={inviter} onAccept={onAccept} onDeny={onDeny} />
      <div style={{ margin: '-3.5px', width: '97.5%' }} className="messageimgbottom">
        <img src={MessageBottom} alt="Message Bottom" className="messageimgbottom" />
      </div>
    </div>
  );
};

export default messageBox;