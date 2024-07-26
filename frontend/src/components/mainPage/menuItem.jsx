import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/mainPage/menuItem.css';

const MenuItem = ({ title, imageUrl, linkUrl, language }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkUrl);
  };

  const buttonImage = language === 'ko' 
    ? 'src/assets/images/mainPage/start.png' 
    : 'src/assets/images/mainPage/startEn.png';

  return (
    <div className='menuItem'>
      <h2>{title}</h2>
      <hr />
      <div className='imageContainer'>
        <img src={imageUrl} alt={title} />
      </div>
      <button 
        onClick={handleClick} 
        style={{ backgroundImage: `url(${buttonImage})` }}
        className='menuButton'
      ></button>
    </div>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default MenuItem;
