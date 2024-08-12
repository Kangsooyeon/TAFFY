import '../../../styles/sparingPage/sparingmain/message.css'

const Message = ({ inviter, onAccept, onDeny, language }) => {
  console.log("Current language:", language);
  return (
    <div className="letterbox">
      {language ==='ko' ?
        (<div style={{ textAlign: 'center' }}>
          <p>{inviter}님으로부터</p>
          <p style={{ fontSize: '40px' }}>!결투!</p>
        </div>)
      :
        (<div style={{ textAlign: 'center' }}>
          <p>A dual from</p>
          <p style={{ fontSize: '40px' }}>{inviter}!!</p>
        </div>)
      }
      <div className="buttonbox">
        <button className="accept" onClick={onAccept}>{language === 'ko' ? '수락' :'Accept'}</button>
        <button className="deny" onClick={onDeny}>{language === 'ko' ? '거절' :'Deny'}</button>
      </div>
    </div>
  );
};

export default Message;