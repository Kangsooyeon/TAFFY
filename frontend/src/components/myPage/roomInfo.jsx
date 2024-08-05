import '../../styles/myPage/roomInfo.css'
import Room from '../../assets/images/myPage/room.png'
import Korea from '../../assets/images/myPage/flag/Korea.png'
import Australia from '../../assets/images/myPage/flag/Australia.gif'
import China from '../../assets/images/myPage/flag/China.gif'
import India from '../../assets/images/myPage/flag/India.gif'
import Indonesia from '../../assets/images/myPage/flag/Indonesia.gif'
import Kanada from '../../assets/images/myPage/flag/Kanada.gif'
import Morocco from '../../assets/images/myPage/flag/Morocco.gif'
import Malaysia from '../../assets/images/myPage/flag/Malaysia.gif'
import USA from '../../assets/images/myPage/flag/USA.gif'
import Vietnam from '../../assets/images/myPage/flag/Vietnam.gif'

import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';


const RoomInfo = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const getFlagSrc = (flagname) => {
    switch (flagname) {
      case 'Korea':
        return Korea;
      case 'Australia':
        return Australia;
      case 'China':
        return China;
      case 'India':
        return India;
      case 'Indonesia':
        return Indonesia;
      case 'Kanada':
        return Kanada;
      case'Morocco':
        return Morocco;
      case 'Malaysia':
        return Malaysia;
      case 'USA':
        return USA;
      case 'Vietnam':
        return Vietnam;
    }
  }

  useEffect(() => {
    dispatch(fetchUserProfileAsync());
  }, [dispatch]);

  return (
    <div className="roominfobox">
      <img src={Room} alt="" />
      <div className="flag">
        <img src={getFlagSrc(profile?.country)} alt="" />
      </div>
    </div>
  )
}

export default RoomInfo;