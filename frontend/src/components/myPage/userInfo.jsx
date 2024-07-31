import '../../styles/myPage/userInfo.css'
import Check from '../../assets/images/myPage/educheck.png'
import CheckComplete from '../../assets/images/myPage/educheckcomplete.png'
import Bear from '../../assets/images/myPage/곰 기본동작 1.png'
import Tiger from '../../assets/images/myPage/호랑이 기본동작 1.png'
import Dragon from '../../assets/images/myPage/용 기본동작 1.png'

import Red from '../..//assets/images/common/belt/redBelt.png'

const UseInfo = () => {
  return (
    <div className="userinfobox">
      <div className="characterphoto">
        <img src={Tiger} alt="" />
      </div>
      <div className="characterinfomation">
        <p className="mypagenickname">닉네임</p>
        <p className="mypagettiname">띠이름</p>
        <img src={Red} alt="" />
      </div>
      <div className="poomsaeeducation">
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
      </div>
      <div className="winpoint">
        <p>승률 : 30%</p>
      </div>
    </div>
  )
}

export default UseInfo