import '../../styles/poomsaeEduPage/poomsaeEduOne.css';
// import PropTypes from 'prop-types';
import { useParams} from 'react-router-dom'

const PoomsaeEduOnePage = () => {
  const {stageNum} = useParams();
  const {moveId} = useParams();

  return (
    <div>
      <p>개별 품새 교육 페이지</p>
      <p>현재 {stageNum}장</p>      
      <p>현재 {moveId}번 째 동작</p>
    </div>
  )
}

export default PoomsaeEduOnePage;