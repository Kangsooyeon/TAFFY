import '../../styles/sparingPage/userInfo.css'

const userInfo = () => {
  return (
  <div className="box">
    <div className="view">
      <div className="overlap-group">
        <img className="vector" alt="Vector" src="..\src\assets\images\sparingPage\main-userinfo-vector.png" />
        <div className="userInfoBox">
          <div className="nickname">진라면</div>
          <div className="div">빨간띠</div>
          <img className="belt" alt="belt" src="..\src\assets\images\common\belt\redBelt.png" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default userInfo;