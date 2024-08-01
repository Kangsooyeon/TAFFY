import PropTypes from 'prop-types'
import MenuItem from '../../components/mainPage/menuItem';
import '../../styles/mainPage/mainPage.css';

const MainPage = ({ language }) => {
  return (
    <div className="mainPage">
      <MenuItem
        title={language === 'ko' ? "품새 교육" : "Poomsae Edu"}
        imageUrl={"/src/assets/images/mainPage/품새교육.png"}
        linkUrl="/ps_edu"
        language={language}
      />
      <MenuItem
        title={language === 'ko' ? "품새 심사" : "Poomsae Test"}
        imageUrl={"/src/assets/images/mainPage/품새심사.png"}
        linkUrl="/ps_test"
        language={language}
      />
      <MenuItem
        title={language === 'ko' ? "겨루기" : "Gyeorugi"}
        imageUrl={"/src/assets/images/mainPage/겨루기.png"}
        linkUrl="/sp"
        language={language}
      />
    </div>
  );
}

MainPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default MainPage;
