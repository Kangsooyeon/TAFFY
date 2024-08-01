import '../../../styles/sparingPage/sparingmain/userInfo.css'
import Vector from '../../../assets/images/sparingPage/main-userinfo-vector.png'
import Belt from '../../../assets/images/common/belt/redBelt.png'

const userInfo = () => {
  return (
  // <div className="box">
    <div className="overlap-group">
      <div className="userInfoBox">
        <div className="nickname">banana</div>
        <div className="beltInfo">
          <div className="beltname">red</div>
          <img className="belt" alt="belt" src={Belt} />
        </div>
      </div>
      <img className="vector" alt="Vector" src={Vector} />
    </div>
  // </div>
  )
}

export default userInfo;