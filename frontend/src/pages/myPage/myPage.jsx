import '../../styles/myPage/myPage.css'

import RoomInfo from '../../components/myPage/roomInfo.jsx'
import UserInfo from '../../components/myPage/userInfo.jsx'


const MyPage = () => {
  return (
    <div className="mypage">
      <RoomInfo/>
      <UserInfo/>
    </div>
  )
}

export default MyPage