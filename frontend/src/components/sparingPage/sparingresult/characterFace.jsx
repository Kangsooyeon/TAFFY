import '../../../styles/sparingPage/sparingresult/characterFace.css'
import DragonImage from '../../../assets/images/common/face/용 머리.png'
import BearImage from '../../../assets/images/common/face/곰 머리.png'
import TigerImage from '../../../assets/images/common/face/호랑이 머리.png'

const CharacterFace = ({className, userdata}) => {
  const avatarface = userdata.data.avatar;

  // avatarface 값에 따라 실제 이미지 파일 경로를 설정
  let avatarImagePath;
  switch (avatarface) {
    case 'Dragon':
      avatarImagePath = DragonImage;
      break;
    case 'Bear':
      avatarImagePath = BearImage;
      break;
    case 'Tiger':
      avatarImagePath = TigerImage;
      break;
    default:
      avatarImagePath = ''; // 기본값 설정
      break;
  }
  
  return (
    <div className={`characterfacebox ${className}`}>
      <img src={avatarImagePath} className="characterface" alt="" />
    </div>
  )
}

export default CharacterFace;