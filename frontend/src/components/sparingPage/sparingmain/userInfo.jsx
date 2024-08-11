import '../../../styles/sparingPage/sparingmain/userInfo.css'
import Vector from '../../../assets/images/sparingPage/main-userinfo-vector.png'
import BlackBelt from '../../../assets/images/common/belt/blackBelt.png'
import BlueBelt from '../../../assets/images/common/belt/blueBelt.png'
import BrownBelt from '../../../assets/images/common/belt/brownBelt.png'
import GreenBelt from '../../../assets/images/common/belt/greenBelt.png'
import OrangeBelt from '../../../assets/images/common/belt/orangeBelt.png'
import PurpleBelt from '../../../assets/images/common/belt/purpleBelt.png'
import RedBelt from '../../../assets/images/common/belt/redBelt.png'
import WhiteBelt from '../../../assets/images/common/belt/whiteBelt.png'
import YellowBelt from '../../../assets/images/common/belt/yellowBelt.png'

import { useEffect, useRef } from 'react';
const userInfo = ({userdata}) => {
  const nicknameRef = useRef(null);

  useEffect(() => {
    const nicknameElement = nicknameRef.current;

    // 기본 폰트 크기를 설정
    let fontSize = 80;
    nicknameElement.style.fontSize = `${fontSize}px`;

    // 글씨가 부모 요소를 넘치지 않도록 폰트 크기 조정
    while (nicknameElement.scrollWidth > nicknameElement.clientWidth && fontSize > 20) {
      fontSize -= 1;
      nicknameElement.style.fontSize = `${fontSize}px`;
    }
  }, [userdata.data.nickname]);
  const getSparBeltSrc = (beltname) => {
    switch (beltname) {
      case 'BlackBelt':
        return BlackBelt;
      case 'BlueBelt':
        return BlueBelt;
      case 'BrownBelt':
        return BrownBelt;
      case 'GreenBelt':
        return GreenBelt;
      case 'OrangeBelt':
        return OrangeBelt;
      case 'PurpleBelt':
        return PurpleBelt;
      case'RedBelt':
        return RedBelt;
      case 'WhiteBelt':
        return WhiteBelt;
      case 'YellowBelt':
        return YellowBelt;
    }
  }

  const getBeltNameClass = (beltname) => {
    switch (beltname) {
      case 'BlackBelt':
        return 'black-stroke';
      case 'BlueBelt':
        return 'blue-stroke';
      case 'BrownBelt':
        return 'brown-stroke';
      case 'GreenBelt':
        return 'green-stroke';
      case 'OrangeBelt':
        return 'orange-stroke';
      case 'PurpleBelt':
        return 'purple-stroke';
      case 'RedBelt':
        return 'red-stroke';
      case 'WhiteBelt':
        return 'white-stroke';
      case 'YellowBelt':
        return 'yellow-stroke';
      default:
        return '';
    }
  };

  return (
    <div className="overlap-group">
      <div className="userInfoBox">
        <div className="nickname" ref={nicknameRef}>{userdata.data.nickname}</div>
        <div className="beltInfo">
          <div className={`beltname ${getBeltNameClass(userdata.data.belt.split('/')[1].replace(/\s/g, ''))}`}>{userdata.data.belt.split('/')[0]}</div>
          <img className="belt" src={getSparBeltSrc(userdata.data.belt.split('/')[1].replace(/\s/g, ''))} alt="Belt" />
        </div>
      </div>
      <img className="vector" alt="Vector" src={Vector} />
    </div>
  )
}

export default userInfo;