import '../../../styles/sparingPage/sparingmain/userInfo.css'


const userInfo = () => {
  return (
  <div className="box">
    <div className="overlap-group">
      <div className="userInfoBox">
        <div className="nickname">banana</div>
        <div className="beltInfo">
          <div className="beltname">red</div>
          <img className="belt" alt="belt" src="..\src\assets\images\common\belt\redBelt.png" />
        </div>
      </div>
      <img className="vector" alt="Vector" src="..\src\assets\images\sparingPage\main-userinfo-vector.png" />
    </div>
  </div>
  )
}

export default userInfo;