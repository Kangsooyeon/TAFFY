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
    const activeStage = useSelector(state => state.stages.activeStage);
    const [selectedPoomsae, setSelectedPoomsae] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPoomsaeTest());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const completedStages = poomsaeTest.map(item => item.passed);
    console.log(activeStage)

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
                        locked={index+1 >= activeStage}
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
