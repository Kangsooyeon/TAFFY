import '../../../styles/sparingPage/sparinggame/gameuser.css'
import Attack from '../../../assets/images/sparingPage/fight-info.png'
import Sheild from '../../../assets/images/sparingPage/sheild-info.png'


const GameUser = ({className, userdata}) => {
  // console.log(userdata)
  if (!userdata) {
    return null; // userdata가 없으면 아무것도 렌더링하지 않음
  }
  console.log(userdata)
  return (
    <div className={`gameuser ${className}`}>
      <img src={Attack} alt=""  className="gameuserinfobox"/>
      <p className="usergameinfo">{userdata.data.nickname}</p>
    </div>
  )
}

export default GameUser;