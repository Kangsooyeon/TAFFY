import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoomsaeTest } from '../../store/poomsaeTest/poomsaeTest';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';
import { fetchStages } from '../../store/poomsaeEdu/stagesSlice';
import '../../styles/poomsaeTestPage/poomsaeTestPage.css';
import PoomsaeBeltItem from '../../components/poomsaeTestPage/poomsaeBeltItem';
import PoomsaeTestModal from '../../components/poomsaeTestPage/poomsaeTestModal';
import GreenBelt from '/src/assets/images/common/belt/greenBelt.png';
import YellowBelt from '/src/assets/images/common/belt/yellowBelt.png';
import PurpleBelt from '/src/assets/images/common/belt/purpleBelt.png';
import BlueBelt from '/src/assets/images/common/belt/blueBelt.png';
import BrownBelt from '/src/assets/images/common/belt/brownBelt.png';
import OrangeBelt from '/src/assets/images/common/belt/orangeBelt.png';
import RedBelt from '/src/assets/images/common/belt/redBelt.png';
import BlackBelt from '/src/assets/images/common/belt/blackBelt.png';

const belt_images = [
    YellowBelt,
    GreenBelt,
    PurpleBelt,
    BlueBelt,
    BrownBelt,
    OrangeBelt,
    RedBelt,
    BlackBelt,
];

const PoomsaeTestPage = ({language}) => {
    const dispatch = useDispatch();
    const poomsaeTest = useSelector(state => state.poomsaeTest.poomsaeTest);
    const stages = useSelector(state => state.stages.stages || []);
    const [selectedPoomsae, setSelectedPoomsae] = useState(null);
    const [loading, setLoading] = useState(true);
    const [eduCompletedStages, setEduCompletedStages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userdata = await dispatch(fetchUserProfileAsync()).unwrap();

                // poomSaeCompletedList의 각 단계를 activeStages 배열에 저장
                const edustagesCompletion = userdata.poomSaeCompletedList.map(item => item.isCompleted);
                setEduCompletedStages(edustagesCompletion);

                await dispatch(fetchPoomsaeTest());
                await dispatch(fetchStages({ token }));
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const completedStages = poomsaeTest.map(item => item.passed);

    const handleItemClick = (index) => {
        const stage = stages.find(s => s.psId === poomsaeTest[index].id); // 해당 단계의 교육 데이터 찾기

        if (stage) {
            setSelectedPoomsae({
                id: poomsaeTest[index].id,
                name: language === 'ko' ? stage.psKoName : stage.psEnName, // 언어 설정에 따라 이름 변경
                description: language === 'ko' ? stage.psKoDesc : stage.psEnDesc, // 언어 설정에 따라 설명 변경
            });
        }
    };

    const handleCloseModal = () => {
        setSelectedPoomsae(null);
    };

    return (
        <div className="poomsae-test-page">
            <div className="belt-box">
                {belt_images.map((url, index) => (
                    <PoomsaeBeltItem 
                        key={index} 
                        imageUrl={url} 
                        onClick={() => handleItemClick(index)}
                        completed={completedStages[index] || false}
                        locked={!eduCompletedStages[index]}
                    />
                ))}
            </div>
            {selectedPoomsae && (
                <PoomsaeTestModal 
                    poomsae={selectedPoomsae}
                    onClose={handleCloseModal} 
                    language={language}
                />
            )}
        </div>
    );
};

export default PoomsaeTestPage;
