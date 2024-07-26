import '../../../styles/sparingPage/sparingmain/message.css'

const Message = () => {
  return (
    <div className="letterbox">
      <p>진라면냠냠쩝쩝님으로부터</p>
      <p style={{fontSize: '40px'}}>!결투!</p>
      <div className="buttonbox">
        <button className="accept">수락</button>
        <button className="deny">거절</button>
      </div>
    </div>
  )
}

export default Message;