import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStages, loadUserState } from '../../store/poomsaeEdu/stagesSlice';
import Stage from '../../components/poomsaeEduPage/stage';
import '../../styles/poomsaeEduPage/poomsaeEdu.css';
import PropTypes from 'prop-types';

const PoomsaeEduPage = ({ language }) => {
  const dispatch = useDispatch();
  const { stages, loading, error, activeStage, completedStages } = useSelector((state) => state.stages);
  const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

  useEffect(() => {
    console.log('useEffect for loading user state is running'); // 로그 추가
    if (token) {
      console.log('Token available, loading user state:', token);
      dispatch(loadUserState(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log('useEffect for fetching stages is running'); // 로그 추가
    if (token) {
      console.log('Token available, fetching stages:', token);
      dispatch(fetchStages());
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log('Stages:', stages);
    console.log('Completed stages:', completedStages);
  }, [stages, completedStages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // stages가 배열이 아닌 경우 빈 배열로 초기화
  const stagesArray = Array.isArray(stages) ? stages : [];
  if (stagesArray.length === 0) return <div>아직도 안 되고 난리</div>;
  // if (!stages || stages.length === 0) return <div>아직도 안 되고 난리</div>;

  return (
    <div className="poomsaeEduPage">
      <div className="stageContainer">
        {/* {stages.map((stage, index) => ( */}
        {stagesArray.map((stage, index) => (
          <Stage 
            key={index}
            stageNum={stage.psId}
            image={stage.psThumb}
            text={language === 'ko' ? stage.psKoName : stage.psEnName}
            locked={stage.psId > activeStage}
            completed={completedStages.includes(stage.psId)}
            videoUrl={stage.psUrl}
            description={language === 'ko' ? stage.psKoDesc : stage.psEnDesc}
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
