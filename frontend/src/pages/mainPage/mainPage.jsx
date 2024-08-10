import PropTypes from 'prop-types'
import MenuItem from '../../components/mainPage/menuItem';
import '../../styles/mainPage/mainPage.css';
import PsEdu from '../../assets/images/mainPage/품새교육.png'
import PsTest from '../../assets/images/mainPage/품새심사.png'
import Sp from '../../assets/images/mainPage/겨루기.png'

const MainPage = ({ language }) => {
  return (
    <>
      <link rel="preload" href="/src/assets/images/mainPage/background.jpg" as="image" />
      <div className="mainPage">
        <MenuItem
          title={language === 'ko' ? "품새 교육" : "Poomsae Edu"}
          imageUrl={PsEdu}
          linkUrl="/ps_edu"
          language={language}
        />
        <MenuItem
          title={language === 'ko' ? "품새 심사" : "Poomsae Test"}
          imageUrl={PsTest}
          linkUrl="/ps_test"
          language={language}
        />
        <MenuItem
          title={language === 'ko' ? "겨루기" : "Gyeorugi"}
          imageUrl={Sp}
          linkUrl="/sp"
          language={language}
        />
      </div>
    </>
  );
}

MainPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default MainPage;
