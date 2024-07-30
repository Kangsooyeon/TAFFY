// import '../../styled/poomsaeEduPage/poomsaeEduAll.css'
import { useParams, useLocation } from 'react-router-dom'

const PoomsaeEduAllPage = () => {

  const {stageNum} = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const language = queryParams.get('lang');

  return (
    <div>
      <p>전체 품새 교육 페이지 : {stageNum}</p>
      <p>language : {language}</p>
    </div>
  )
}

export default PoomsaeEduAllPage;