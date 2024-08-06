import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoomsaeTest } from '../../store/poomsaeTest/poomsaeTest';
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
    GreenBelt,
    YellowBelt,
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
    const activeStage = localStorage.getItem('activeStage');

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPoomsaeTest());
            setLoading(false);
        };
        fetchData();


    }, [dispatch]);

    // activeStage가 변경될 때마다 localStorage에 값을 저장
    useEffect(() => {
        localStorage.setItem('activeStage', activeStage);
    }, [activeStage]);

    const completedStages = poomsaeTest.map(item => item.passed);
    console.log(activeStage);

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
                        locked={index + 1 >= activeStage}
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
