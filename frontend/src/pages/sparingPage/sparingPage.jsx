import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/sparingmain/invitation';
import MessageBox from '../../components/sparingPage/sparingmain/messageBox';
import UserInfo from '../../components/sparingPage/sparingmain/userInfo';
import UserCharacter from '../../components/sparingPage/sparingmain/userCharacter';
import UserRecord from '../../components/sparingPage/sparingmain/userRecord';
import QuickButton from '../../components/sparingPage/sparingmain/quickButton';
import HelpButton from '../../components/sparingPage/sparingmain/helpButton'

const sparingPage = () => {
  return (
    <div>
      <div className="sparingPage">
          <div className="leftSection">
            <UserInfo />
            <UserRecord />
          </div>
          <div className="centerSection">
            <UserCharacter />
            <QuickButton />
          </div>
          <div className="rightSection">
            <MessageBox />
            <Invitation />
          </div>
      </div>
      <div>
        <HelpButton />
      </div>
    </div>
  )
}

export default sparingPage;