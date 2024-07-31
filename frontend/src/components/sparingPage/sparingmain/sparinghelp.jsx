import {useState} from 'react'
import '../../../styles/sparingPage/sparingmain/sparinghelp.css'
import HelpBox from '../../../assets/images/sparingPage/helpbox.png'

const SparingHelp = ({closeHelp}) => {
  return (
    <div className="helpbox">
      <img src={HelpBox} alt="" />
      <button className="helpclosebutton" onClick={closeHelp}>닫기</button>
    </div>
  )
}

export default SparingHelp;