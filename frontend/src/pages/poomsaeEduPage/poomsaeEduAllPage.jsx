import '../../styles/poomsaeEduPage/poomsaeEduAll.css'
// import { useParams } from 'react-router-dom'
// import { useState, useEffect, useNavigate } from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PoomsaeEduAllPage = ({language}) => {

  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    setButtonText(language === 'ko' ? '나가기' : 'Exit');
  }, [language]);

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/ps_edu`);
  // }

  // const {stageNum} = useParams();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const language = queryParams.get('lang');

  return (
    <div className='poomsaeEduAllPage'>
      <div className='allEduContainer'>
        
        <div className='allEduContent'>

          <div className='mvGif'></div>
          <div className='userCam'></div>
          <div className='progress'>
            {/* 1. 정확도 */}
            {/* 2. 진행률 */}
          </div>
        
        </div>

        <div className='mvDescription'>
          {/* 스피커 이미지 */}
          <img src="../../assets/images/common/audio.png" alt="audio" />
          {/* 동작 이름 */}
          {/* 동작 설명 */}
        </div>
        
        <div className='allEduFooter'>
        <div className='line'></div>
          {/* <button className='exitButton' onClick={handleClick}>
            {buttonText}
          </button> */}
        </div>
      
      </div>
    </div>
  )
}

PoomsaeEduAllPage.propTypes = {
  language: PropTypes.number.isRequired,
}

export default PoomsaeEduAllPage;