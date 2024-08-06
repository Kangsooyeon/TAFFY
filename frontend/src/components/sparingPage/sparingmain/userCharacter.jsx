import '../../../styles/sparingPage/sparingmain/userCharacter.css'

import Tiger from '../../../assets/images/sparingPage/tiger/호랑이 기본동작 1.png'
import Bear from '../../../assets/images/sparingPage/bear/곰 기본동작 1.png'
import Dragon from '../../../assets/images/sparingPage/dragon/용 기본동작 1.png'

const userCharacter = ({userdata}) => {
  const getCharacterImgSrc = (charactername) => {
    switch (charactername) {
      case 'Tiger':
        return Tiger;
      case 'Bear':
        return Bear;
      case 'Dragon':
        return Dragon;
    }
  }

  return (
    <div className="characterbox">
      <img className="charactersparingimg" src={getCharacterImgSrc(userdata.data.avatar)} alt="" />
    </div>
  )
}

export default userCharacter;