import {useNavigate} from 'react-router-dom';
import '../../styles/landingPage/landingPage.css';

const LandingPage = () => {
  // 페이지 이동
  const navigate = useNavigate();

  // Start 버튼이 클릭됐을 때 호출
  const handleStart = () => {
    navigate('/main')
  }

  return (
    <div className="landingPage">
      <h1>Welcome to the TAFFY!</h1>
      {/* 클릭 시 handleStart 함수 호출 */}
      <button onClick={handleStart}>Start NoW!</button>
    </div>
  )
}

export default LandingPage;