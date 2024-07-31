import '../../styles/myPage/roomDecoPage.css'

const RoomDecoPage = ({closePhoto}) => {
  return (
   <div className="photopage">
    <button className="updateclosebutton" onClick={closePhoto}>X</button>
    <button className="photosavebutton">선택</button>
   </div>
  )
}

export default RoomDecoPage;

