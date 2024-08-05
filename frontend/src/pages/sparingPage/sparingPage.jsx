import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/sparingmain/invitation';
import MessageBox from '../../components/sparingPage/sparingmain/messageBox';
import UserInfo from '../../components/sparingPage/sparingmain/userInfo';
import UserCharacter from '../../components/sparingPage/sparingmain/userCharacter';
import UserRecord from '../../components/sparingPage/sparingmain/userRecord';
import QuickButton from '../../components/sparingPage/sparingmain/quickButton';
import Help from '../../components/sparingPage/sparingmain/sparinghelp.jsx'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';
import { fetchUserRecordAsync } from '../../store/myPage/myPageUserRecord';

const sparingPage = () => {
  const dispatch = useDispatch();
  const [isOpenHelp, setIsOpenHelp] = useState(false)

  const { profile, status: profileStatus } = useSelector((state) => state.user);
  const { record, status: recordStatus } = useSelector((state) => state.userRecord);

  useEffect(() => {
    dispatch(fetchUserProfileAsync());
    dispatch(fetchUserRecordAsync());
  }, [dispatch]);

  const openHelp = () => {
    setIsOpenHelp(true)
  }

  const closeHelp = () => {
    setIsOpenHelp(false)
  }

  if (profileStatus === 'loading' || recordStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (profileStatus === 'failed' || recordStatus === 'failed') {
    return <div>Error loading data</div>;
  }

  console.log(record)

  return (
    <div className="sparingtoppage">
      <div className="sparingPage">
          <div className="leftSection">
          {profile ? <UserInfo profile={profile} /> : <div>No profile data</div>}
          {record ? <UserRecord record={record} /> : <div>No record data</div>}
          </div>
          <div className="centerSection">
          {profile ?  <UserCharacter profile={profile} /> : <div>No profile data</div>}
            <QuickButton />
          </div>
          <div className="rightSection">
            <MessageBox />
            <Invitation />
          </div>
      </div>
      <button className="helpbutton" onClick={openHelp}>?</button>
      {isOpenHelp && <Help closeHelp={closeHelp}/>}
    </div>
  )
}

export default sparingPage;