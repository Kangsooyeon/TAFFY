import '../../styles/sparingPage/sparingPage.css';
import Invitation from '../../components/sparingPage/sparingmain/invitation';
import MessageBox from '../../components/sparingPage/sparingmain/messageBox';
import UserInfo from '../../components/sparingPage/sparingmain/userInfo';
import UserCharacter from '../../components/sparingPage/sparingmain/userCharacter';
import UserRecord from '../../components/sparingPage/sparingmain/userRecord';
import QuickButton from '../../components/sparingPage/sparingmain/quickButton';
import Help from '../../components/sparingPage/sparingmain/sparinghelp.jsx'
import {useState} from 'react'


const sparingPage = () => {
  const [isOpenHelp, setIsOpenHelp] = useState(false)

  const openHelp = () => {
    setIsOpenHelp(true)
  }

  const closeHelp = () => {
    setIsOpenHelp(false)
  }

  return (
    <div className="sparingtoppage">
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
      <button className="helpbutton" onClick={openHelp}>?</button>
      {isOpenHelp && <Help closeHelp={closeHelp}/>}
    </div>
  )
}

export default sparingPage;