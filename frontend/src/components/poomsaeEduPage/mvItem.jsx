// import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/poomsaeEduPage/mvItem.css';

const MvItem = ({ title, image }) => {
  
  // const firstJang = []

  // 개별 동작 진행할 때 클릭했을 때 해당 동작 교육으로 이동
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(linkUrl);
  // };

  return (
    <div className='mvItem'>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      {/* <button onClick={handleClick}></button> */}
    </div>
  );
}

MvItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

export default MvItem;