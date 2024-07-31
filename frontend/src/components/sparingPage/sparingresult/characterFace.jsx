import '../../../styles/sparingPage/sparingresult/characterFace.css'
import Dragon from '../../../assets/images/common/face/용 머리.png'
import Bear from '../../../assets/images/common/face/곰 머리.png'
import Tiger from '../../../assets/images/common/face/호랑이 머리.png'

const CharacterFace = ({className}) => {
  return (
    <div className={`characterfacebox ${className}`}>
      <img src={Dragon} className="characterface" alt="" />
    </div>
  )
}

export default CharacterFace;