import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/invitation';
import Message from '../../components/sparingPage/message';
import MessageBox from '../../components/sparingPage/messageBox';
import UserInfo from '../../components/sparingPage/userInfo';
import UserCharacter from '../../components/sparingPage/userCharacter';
import UserRecord from '../../components/sparingPage/userRecord';

const sparingPage = () => {
  return (
    <div className="sparingPage">
      <UserInfo />
      <UserCharacter />
      <UserRecord />
      <MessageBox />
      <Message />
      <Invitation />
    </div>
  )
}

export default sparingPage;