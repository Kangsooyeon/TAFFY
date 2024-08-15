import Stage from "../../components/poomsaeEduPage/stage";
import '../../styles/poomsaeEduPage/poomsaeEdu.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { unlockNextStage, fetchStages } from "../../store/poomsaeEdu/stagesSlice";

const PoomsaeEduPage = ({ language }) => {
  const dispatch = useDispatch();
  const { stages, loading, error } = useSelector((state) => state.stages);
  const activeStage = useSelector((state) => state.stages.activeStage); // 수정
  const token = localStorage.getItem('accessToken');

  // useEffect(() => {
  //   dispatch(fetchStages());
  // }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchStages({ token })); // 토큰을 포함하여 스테이지 데이터 가져오기
    }
  }, [dispatch, token]);

  // useEffect(() => {
  //   console.log('Stages:', stages); // 데이터 로깅
  // }, [stages]);

  useEffect(() => {
    const savedActiveStage = localStorage.getItem('activeStage');
    if (savedActiveStage) {
      dispatch(unlockNextStage(parseInt(savedActiveStage, 10)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('activeStage', activeStage);
  }, [activeStage]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stages || stages.length === 0) return <div>No stages available</div>;

  return (
    <div className="poomsaeEduPage">
      <div className="stageContainer">
        {stages.map((stage, index) => (
          <Stage 
            key={index}
            stageNum={stage.psId}
            image={stage.psThumb}
            text={language === 'ko' ? stage.psKoName : stage.psEnName}
            locked={stage.psId > activeStage}
            videoUrl={stage.psUrl}
            description={{
              psKoDesc: stage.psKoDesc || '',  // Ensure description is always an object
              psEnDesc: stage.psEnDesc || '',  // Ensure description is always an object
            }}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

PoomsaeEduPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PoomsaeEduPage;