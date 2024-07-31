import '../../../styles/sparingPage/sparingmain/invitation.css'
import Search from '../../../assets/images/sparingPage/search.png'

const Invitation = () => {

  function InvitationCard() {
    return (
      <div className="invitationcardbox">
        <h1 style={{margin: '0px'}}>초대하기</h1>
        <div className="invitationcard">
          <p style={{fontFamily: 'HappinessM'}}>야</p>
          <div className="inputcontainer">
          <img src={Search} alt="" className="inputicon"/>
          <input className="nicknameinput" type="text" />
          </div>
          <p style={{fontFamily: 'HappinessM'}}>겨루자!</p>
        </div>
      </div>
    )   
  }

  function WaitingCard() {
    return (
    <div className="waitingbox">
      <div className="waitingtitle">
        <h3>morebananaplz 님의</h3>
        <h3> 승낙을 기다리고 있습니다.</h3>
      </div>
      <div className="timer">
        <p>10:11</p>
      </div>
    </div>
    )
  }

  let invitationContent = <WaitingCard />

  return (
    <div className="invitation">
      {invitationContent}
    </div>
  )
}

export default Invitation;