import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import '../../styles/landingPage/landingPage.css';
import { setActiveItem } from '../../actions/actions';

import Image1 from '../../assets/images/landingPage/1.jpg';
import Image2 from '../../assets/images/landingPage/2.jpg';

const items = [
  { type: 'image', src: Image1, text: '1111' },
  { type: 'image', src: Image2, text: '2222' },
  { type: 'video', src: '/videos/3.mp4', text: '3333' },
];

const defaultStyle = {
  transition: `opacity 500ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const LandingPage = () => {
  const activeItem = useSelector((state) => state.activeItem);
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
              className="carousel-item"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.text} className="background-media" />
              ) : (
                <video autoPlay loop muted controls className="background-media">
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="overlay">
                <p>{item.text}</p>
                {activeItem === items.length - 1 && (
                  <button onClick={handleStart}>Start</button>
                )}
              </div>
            </div>
          )}
        </Transition>
      ))}
      <div className="carousel-controls">
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
