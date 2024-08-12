import {useState} from 'react'
import '../../../styles/sparingPage/sparingmain/sparinghelp.css'
import Help1 from '../../../assets/images/sparingPage/help1.png'
import Help2 from '../../../assets/images/sparingPage/help2.png'
import { CSSTransition } from 'react-transition-group';
import SlideButton from '../../../assets/images/sparingPage/slidebutton.png'
import Help1_eng from '../../../assets/images/sparingPage/help1_eng.png'
import Help2_eng from '../../../assets/images/sparingPage/help2_eng.png'

const images = [
  Help1,
  Help2
];

const SparingHelp = ({closeHelp}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="helpbox">
      <div className="helpcontainer">
        <CSSTransition key={currentIndex}>
          <img src={images[currentIndex]} alt="slide" className="helpslide" />
        </CSSTransition>
      </div>
      <img src={SlideButton} className="sliderightbutton" onClick={nextSlide} alt="slidebutton" />
      <img src={SlideButton} className="slideleftbutton" onClick={nextSlide} alt="lidebutton" />
      <button className="helpclosebutton" onClick={closeHelp}>닫기</button>
    </div>
  )
}

export default SparingHelp;