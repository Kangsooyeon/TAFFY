import '../../styles/myPage/myPage.css'
import {useState} from 'react'

import RoomInfo from '../../components/myPage/roomInfo.jsx'
import UserInfo from '../../components/myPage/userInfo.jsx'
import Update from '../../pages/myPage/userUpdatePage.jsx'
import Photo from '../../pages/myPage/roomDecoPage.jsx'

const MyPage = () => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false)

  const openUpdate = () => {
    setIsUpdateOpen(true)
  }

  const closeUpdate = () => {
    setIsUpdateOpen(false)
  }

  const openPhoto = () => {
    setIsPhotoOpen(true)
  }

  const closePhoto = () => {
    setIsPhotoOpen(false)
  }

  return (
    <div className="mypage">
      <RoomInfo/>
      <UserInfo/>
      <button className="mypageupdatebutton" onClick={openUpdate}>수정</button>
      <button className="photoselectbutton" onClick={openPhoto}></button>
      {isUpdateOpen && <Update closeUpdate={closeUpdate} />}
      {isPhotoOpen && <Photo closePhoto={closePhoto}/>}
    </div>
  )
}

export default MyPage