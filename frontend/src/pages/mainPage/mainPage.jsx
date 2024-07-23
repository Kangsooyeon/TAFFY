// import PropTypes from 'prop-types';
import MenuItem from '../../components/mainPage/menuItem';
import '../../styles/mainPage/mainPage.css';

const MainPage = () => {
  return (
    <div className="mainPage">
      <MenuItem
        title="품새 교육"
        imageUrl={"src/assets/images/mainPage/품새교육.png"}
        linkUrl="/ps_edu"
      />
      <MenuItem
        title="품새 심사"
        imageUrl={"src/assets/images/mainPage/품새심사.png"}
        linkUrl="/ps_test"
      />
      <MenuItem
        title="겨루기"
        imageUrl={"src/assets/images/mainPage/겨루기.png"}
        linkUrl="/sp"
      />
    </div>
  );
}

// MainPage.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   handleLogout: PropTypes.func.isRequired,
// };

export default MainPage;
