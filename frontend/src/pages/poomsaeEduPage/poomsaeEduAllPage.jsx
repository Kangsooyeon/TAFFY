import '../../styles/poomsaeEduPage/poomsaeEduAll.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PsDescription from '../../components/poomsaeEduPage/psDescription';


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

          <div className='mvGif'></div>
          <div className='userCam'></div>
          <div className='progress'>
            {/* 1. 정확도 */}
            {/* 2. 진행률 */}
          </div>
        
        </div>

        <div className='mvDescription'>
          <img src="/src/assets/images/common/audio.png" alt="audio"/>
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