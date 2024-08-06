import '../../styles/myPage/roomDecoPage.css'

const RoomDecoPage = ({closePhoto, language}) => {
  return (
   <div className="photopage">
    <button className="updateclosebutton" onClick={closePhoto}>X</button>
    <button className="photosavebutton">{language === 'en'? 'Choose': '선택'}</button>
   </div>
  )
}

export default RoomDecoPage;

