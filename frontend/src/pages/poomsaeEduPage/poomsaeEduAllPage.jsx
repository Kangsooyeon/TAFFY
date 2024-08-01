import '../../styles/poomsaeEduPage/poomsaeEduAll.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';
import ProgressBar from '../../components/common/progressBar';
import AudioImage from '../../assets/images/common/audio.png'

const PoomsaeEduAllPage = ({language}) => {
  
  const [buttonText, setButtonText] = useState('');
  // const description = useState('가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라'); // 임시 데이터를 여기서 설정
  const description = useState('다라가나다라가나다라'); // 임시 데이터

  useEffect(() => {
    setButtonText(language === 'ko' ? '나가기' : 'Exit');
  }, [language]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ps_edu`);
  }

  return (
    <div className='poomsaeEduAllPage'>
      <div className='allEduContainer'>
        
        <div className='allEduContent'>

          <div className='mvGif'>
            {/* <img src="https://lab.ssafy.com/s11-webmobile1-sub2/S11P12E104/uploads/7c00745221ff1e97c803c24da2c4b8dd/ezgif.com-resize__1_.gif" alt="" /> */}
          </div>
          <div className='userCam'></div>
          <div className='progress'>
            {/* 1. 정확도 */}
            <ProgressBar 
              value = {75}
              title = '정확도'
              text = '75'/>

            {/* 2. 진행률 */}
            <ProgressBar 
              value = {75}
              title = '진행률'
              text = '75'
              pathColor="orange" 
              trailColor="grey" 
              textColor="purple" />
          </div>
        
        </div>

        <div className='mvDescription'>
          <img src={AudioImage} alt="audio"/>
          <h2 className='mvPsName'>동작 이름</h2>
          <PsDescription 
            className="mvPsDes"
            description={description}/>
        </div>
        
        <div className='allEduFooter'>
        <div className='line'></div>
          <button className='exitButton' onClick={handleClick}>
            {buttonText}
          </button>
        </div>
      
      </div>
    </div>
  )
}

PoomsaeEduAllPage.propTypes = {
  language: PropTypes.string.isRequired,
}

export default PoomsaeEduAllPage;