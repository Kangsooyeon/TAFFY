import '../../styles/myPage/myPage.css'
import {useState} from 'react'

import RoomInfo from '../../components/myPage/roomInfo.jsx'
import UserInfo from '../../components/myPage/userInfo.jsx'
import Update from '../../pages/myPage/userUpdatePage.jsx'
import Photo from '../../pages/myPage/roomDecoPage.jsx'

const MyPage = ({ language }) => {
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
      <RoomInfo language={language}/>
      <UserInfo language={language}/>
      <button className="mypageupdatebutton" onClick={openUpdate} language={language}>{language === 'ko'?'수정':'edit'}</button>
      <button className="photoselectbutton" onClick={openPhoto} language={language}></button>
      {isUpdateOpen && <Update closeUpdate={closeUpdate} language={language} />}
      {isPhotoOpen && <Photo closePhoto={closePhoto} language={language}/>}
    </div>
  )
}

export default MyPage