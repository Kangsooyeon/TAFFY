import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/invitation';
import MessageBox from '../../components/sparingPage/messageBox';
import UserInfo from '../../components/sparingPage/userInfo';
import UserCharacter from '../../components/sparingPage/userCharacter';
import UserRecord from '../../components/sparingPage/userRecord';

const sparingPage = () => {
  return (
    <div className="sparingPage">
        <div className="leftSection">
          <UserInfo />
          <UserRecord />
        </div>
        <div className="centerSection">
          <UserCharacter />
        </div>
        <div className="rightSection">
          <MessageBox />
          <Invitation />
        </div>
    </div>
  )
}

export default sparingPage;