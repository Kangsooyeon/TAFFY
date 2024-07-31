import '../../styles/myPage/myPage.css'
import {useState} from 'react'

import RoomInfo from '../../components/myPage/roomInfo.jsx'
import UserInfo from '../../components/myPage/userInfo.jsx'
import Update from '../../pages/myPage/userUpdatePage.jsx'

const MyPage = () => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const openUpdate = () => {
    setIsUpdateOpen(true)
  }

  const closeUpdate = () => {
    setIsUpdateOpen(false)
  }
  return (
    <div className="mypage">
      <RoomInfo/>
      <UserInfo/>
      <button className="mypageupdatebutton" onClick={openUpdate}>수정</button>
      {isUpdateOpen && <Update closeUpdate={closeUpdate} />}
    </div>
  )
}

export default MyPage