import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoomsaeTest } from '../../store/poomsaeTest/poomsaeTest';
import { fetchUserProfileAsync } from '../../store/myPage/myPageUser';
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

const PoomsaeTestPage = () => {
    const dispatch = useDispatch();
    const poomsaeTest = useSelector(state => state.poomsaeTest.poomsaeTest);
    const [selectedPoomsae, setSelectedPoomsae] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStages, setActiveStages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userdata = await dispatch(fetchUserProfileAsync()).unwrap();

                // poomSaeCompletedList의 각 단계를 activeStages 배열에 저장
                const stages = userdata.poomSaeCompletedList.map(item => item.isCompleted);
                setActiveStages(stages);

                await dispatch(fetchPoomsaeTest());
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
        setSelectedPoomsae(poomsaeTest[index]);
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
                        locked={!activeStages[index]}
                    />
                ))}
            </div>
            {selectedPoomsae && (
                <PoomsaeTestModal 
                    poomsae={selectedPoomsae}
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default PoomsaeTestPage;
