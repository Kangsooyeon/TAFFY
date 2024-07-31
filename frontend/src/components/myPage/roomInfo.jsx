import '../../styles/myPage/roomInfo.css'
import Room from '../../assets/images/myPage/room.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'
import Korea from '../../assets/images/myPage/flag/한국.png'

const RoomInfo = () => {
  return (
    <div className="roominfobox">
      <img src={Room} alt="" />
      <div className="flag">
        <img src={Korea} alt="" />
      </div>
    </div>
  )
}

export default RoomInfo;