import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';
import { fetchUserRecordAsync } from '../../store/myPage/myPageUserRecord';
import '../../styles/myPage/userInfo.css';
import Check from '../../assets/images/myPage/educheck.png';
import CheckComplete from '../../assets/images/myPage/educheckcomplete.png';
import Bear from '../../assets/images/myPage/곰 기본동작 1.png';
import Tiger from '../../assets/images/myPage/호랑이 기본동작 1.png';
import Dragon from '../../assets/images/myPage/용 기본동작 1.png';
import BlackBelt from '../../assets/images/common/belt/blackBelt.png';
import BlueBelt from '../../assets/images/common/belt/blueBelt.png';
import BrownBelt from '../../assets/images/common/belt/brownBelt.png';
import GreenBelt from '../../assets/images/common/belt/greenBelt.png';
import OrangeBelt from '../../assets/images/common/belt/orangeBelt.png';
import PurpleBelt from '../../assets/images/common/belt/purpleBelt.png';
import RedBelt from '../../assets/images/common/belt/redBelt.png';
import WhiteBelt from '../../assets/images/common/belt/whiteBelt.png';
import YellowBelt from '../../assets/images/common/belt/yellowBelt.png';

const UserInfo = ({ language, userdata, userrecord }) => {
  const getImageSrc = (imagename) => {
    switch (imagename) {
      case 'Tiger':
        return Tiger;
      case 'Bear':
        return Bear;
      case 'Dragon':
        return Dragon;
      default:
        return null;
    }
  };

  const getBeltSrc = (beltname) => {
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
      case 'RedBelt':
        return RedBelt;
      case 'WhiteBelt':
        return WhiteBelt;
      case 'YellowBelt':
        return YellowBelt;
      default:
        return null;
    }
  };

  const winRate = (userrecord.data.win || 0) + (userrecord.data.lose || 0) === 0 ? 0 :
    ((userrecord.data.win || 0) / ((userrecord.data.win || 0) + (userrecord.data.lose || 0))) * 100;

  const beltNameParts = userdata?.beltName ? userdata.beltName.split('/') : ['', ''];

  return (
    <div className="userinfobox">
      <div className="characterphoto">
        <img src={getImageSrc(userdata?.profileImg)} alt="" />
      </div>
      <div className="characterinfomation">
        <p className="mypagenickname">{userdata?.nickname}</p>
        <p className="mypagettiname">{language === 'en' ? beltNameParts[1] : beltNameParts[0]}</p>
        {userdata?.beltName && (
          <img src={getBeltSrc(beltNameParts[1].replace(/\s/g, ''))} alt="Belt" />
        )}
      </div>
      <div className="poomsaeeducation">
        {userdata?.poomSaeCompletedList ? (
          userdata.poomSaeCompletedList.map((item) => (
            <img key={item.psId} src={item.isCompleted ? CheckComplete : Check} alt="" />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="winpoint">
        <p>{language === 'en' ? 'WP' : '승률'} : {winRate.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default UserInfo;
