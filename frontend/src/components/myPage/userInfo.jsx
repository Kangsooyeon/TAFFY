import '../../styles/myPage/userInfo.css'
import Check from '../../assets/images/myPage/educheck.png'
import CheckComplete from '../../assets/images/myPage/educheckcomplete.png'
import Bear from '../../assets/images/myPage/곰 기본동작 1.png'
import Tiger from '../../assets/images/myPage/호랑이 기본동작 1.png'
import Dragon from '../../assets/images/myPage/용 기본동작 1.png'

import Red from '../..//assets/images/common/belt/redBelt.png'

import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';

const UseInfo = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('accessToken'); // 로컬 스토리지에서 userId 가져오기
  const { profile, status, error } = useSelector((state) => state.user);

  console.log(userId)

  useEffect(() => {
    dispatch(fetchUserProfileAsync());
  }, [dispatch]);

  const getImageSrc = (imagename) => {
    switch (imagename) {
      case 'Tiger':
        return Tiger;
      case 'Bear':
        return Bear;
      case 'Dragon':
        return Dragon;
      default:
        return Tiger;
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  console.log

  return (
    <div className="userinfobox">
      <div className="characterphoto">
        <img src={getImageSrc(profile?.imageUrl)} alt="" />
      </div>
      <div className="characterinfomation">
        <p className="mypagenickname">{profile?.nickname}</p>
        <p className="mypagettiname">{profile?.beltName}</p>
        <img src={Red} alt="" />
      </div>
      <div className="poomsaeeducation">
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
        <img src={Check} alt="" />
      </div>
      <div className="winpoint">
        <p>승률 : 30%</p>
      </div>
    </div>
  )
}

export default UseInfo