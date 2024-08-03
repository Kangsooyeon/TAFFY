import Stage from "../../components/poomsaeEduPage/stage";
import '../../styles/poomsaeEduPage/poomsaeEdu.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchStages } from "../../store/poomsaeEdu/stagesSlice";

const PoomsaeEduPage = ({ language }) => {
  const dispatch = useDispatch();
  const { stages, loading, error } = useSelector((state) => state.stages);
  const activeStage = useSelector((state) => state.stages.activeStage); // 수정

  useEffect(() => {
    dispatch(fetchStages());
  }, [dispatch]);

  useEffect(() => {
    console.log('Stages:', stages); // 데이터 로깅
  }, [stages]);

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
