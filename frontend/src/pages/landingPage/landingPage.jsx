import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import '../../styles/landingPage/landingPage.css';
import { setActiveItem } from '../../store/landing/landingSlice';

// Import images directly
import Image1 from '../../assets/images/landingPage/poomsaePage.png';
import Image2 from '../../assets/images/landingPage/gyeorugiPage.png';

// Define the items array within the component
const items = [
  { type: 'video', src: '/videos/Landing.mp4', text: '', className: 'videoPage' },
  { type: 'image', src: Image1, text: 'Harmony of Body and Mind', className: 'poomsaePage' },
  { type: 'image', src: Image2, text: 'Gyeorugi Together, Grow Together', className: 'gyeorugiPage' },
  { type: 'video', src: '/videos/LandingLast.mp4', text: '', className: 'videoPage' },
];

const defaultStyle = {
  transition: 'opacity 500ms ease-in-out',
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const LandingPage = () => {
  const activeItem = useSelector((state) => state.landing.activeItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  useEffect(() => {
    console.log('Active item:', activeItem);
    console.log('Current item:', items[activeItem]);
  }, [activeItem]);

  const handleStart = () => {
    navigate('/main');
  };

  return (
    <div className="landingPage">
      {items.map((item, index) => (
        <Transition
          key={index}
          nodeRef={nodeRef}
          in={activeItem === index}
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              ref={nodeRef}
              className={`carouselItem ${item.className}`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.text} className="backgroundMedia" loading="lazy" />
              ) : (
                <video autoPlay loop muted controls className="backgroundMedia" preload="none">
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="overlay">
                {index === 1 && (
                  <div className="poomsaeContent">
                    <h1 className="harmonyText antonio">Harmony of Body and Mind</h1>
                    <div className="poomsaeSegments">
                      <div>
                        <h3 className="antonio" style={{ fontSize: '25px' }}>Poomsae Education</h3>
                        <hr style={{ height: '0.5%', backgroundColor: 'black', margin: '-5px 0' }} />
                        <p className="poomsaeP">Our training program is divided into easy-to-follow segments, with each movement and chapter of the Poomsae clearly outlined.</p>
                      </div>
                      <div>
                        <h3 className="antonio" style={{ fontSize: '25px' }}>Poomsae Test</h3>
                        <hr style={{ height: '0.5%', backgroundColor: 'black', margin: '-5px 0' }} />
                        <p className="poomsaeP">After rigorous practice, evaluate your skills through a Poomsae test and upgrade your belt color upon passing.</p>
                      </div>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="gyeorugiContent">
                    <h1 className="gyeorugiText antonio">Gyeorugi Together, Grow Together</h1>
                    <hr className="hrDivider" />
                    <h3 className="h3g">Enjoy Gyeorugi with friends or new opponents!</h3>
                    <h3 className="h3g">Discover the fun of sparring with a twist now.</h3>
                  </div>
                )}
                {index === 3 && (
                  <div className="finalPageContent">
                    <h1 className="antonio">Sound body Sound mind</h1>
                    <h3 className="h3">TAFFY : Taekwondo Academy For Foreign For You</h3>
                    {activeItem === items.length - 1 && (
                      <button className="startButton" onClick={handleStart}>Start</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Transition>
      ))}
      <div className="carouselControls">
        {items.map((_, index) => (
          <button
            key={index}
            className={index === activeItem ? 'active' : ''}
            onClick={() => dispatch(setActiveItem(index))}
          >
            ●
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
