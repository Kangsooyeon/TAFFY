import '../../../styles/sparingPage/sparingmain/message.css'

const Message = ({ inviter, onAccept, onDeny }) => {
  return (
    <div className="letterbox">
      <p>{inviter}님으로부터</p>
      <p style={{ fontSize: '40px' }}>!결투!</p>
      <div className="buttonbox">
        <button className="accept" onClick={onAccept}>수락</button>
        <button className="deny" onClick={onDeny}>거절</button>
      </div>
    </div>
  );
};

export default Message;