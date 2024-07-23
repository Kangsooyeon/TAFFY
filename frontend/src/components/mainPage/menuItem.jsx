import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types';
import '../../styles/mainPage/menuItem.css';

const MenuItem = ({title, imageUrl, linkUrl}) => {
  const navigate = useNavigate();

  const handelClick = () => {
    navigate(linkUrl);
  }

  return (
    <div className='menuItem'>
      <h2>{title}</h2>
      <hr />
      <img src={imageUrl} alt={title} />
       <button onClick={handelClick}></button>
    </div>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
}

export default MenuItem;