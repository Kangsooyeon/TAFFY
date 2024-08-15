import '../../styles/myPage/myPage.css'
import {useState, useEffect} from 'react'

import Photo1 from '../../assets/images/myPage/photo1.png'
import Photo2 from '../../assets/images/myPage/photo2.png'
import Photo3 from '../../assets/images/myPage/photo3.png'
import RoomInfo from '../../components/myPage/roomInfo.jsx'
import UserInfo from '../../components/myPage/userInfo.jsx'
import Update from '../../pages/myPage/userUpdatePage.jsx'
import Photo from '../../pages/myPage/roomDecoPage.jsx'

import { useDispatch } from 'react-redux';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';
import { fetchUserRecordAsync } from '../../store/myPage/myPageUserRecord';


const MyPage = ({ language }) => {
  const dispatch = useDispatch();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userRecord, setUserRecord] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await dispatch(fetchUserProfileAsync()).unwrap();
        const userrecord = await dispatch(fetchUserRecordAsync()).unwrap();

        setUserData(userdata);
        setUserRecord(userrecord);
      } catch (error) {
        console.error('Failed to fetch user data or record:', error);
      }
    };

    fetchData();
  }, [dispatch, refreshKey]);

  const openUpdate = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdate = () => {
    setIsUpdateOpen(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const openPhoto = () => {
    setIsPhotoOpen(true);
  };

  const closePhoto = () => {
    setIsPhotoOpen(false);
  };

  const getPhotoSrc = () => {
    switch (selectedPhoto) {
      case 'photo1':
        return Photo1;
      case 'photo2':
        return Photo2;
      case 'photo3':
        return Photo3;
      default:
        return null;
    }
  };

  if (!userData || !userRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mypage">
      <RoomInfo language={language} userdata={userData} />
      <UserInfo language={language} userdata={userData} userrecord={userRecord} />
      <button className="mypageupdatebutton" onClick={openUpdate}>
        {language === 'ko' ? '수정' : 'edit'}
      </button>
      <button
        className="photoselectbutton"
        onClick={openPhoto}
        language={language}
        style={{ backgroundImage: selectedPhoto ? `url(${getPhotoSrc()})` : null }}
      ></button>
      {isUpdateOpen && <Update closeUpdate={closeUpdate} language={language} userdata={userData} />}
      {isPhotoOpen && <Photo closePhoto={closePhoto} setSelectedPhoto={setSelectedPhoto} language={language} />}
    </div>
  );
};

export default MyPage