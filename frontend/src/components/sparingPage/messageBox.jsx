import '../../styles/sparingPage/messageBox.css'
import MessageBlock from '../../assets/images/sparingPage/spar-message-block.png'

const messageBox = () => {
  return (
    <div className="messagebox">
      <img alt="messagebox" src={MessageBlock} />
    </div>
  )
}

export default messageBox;