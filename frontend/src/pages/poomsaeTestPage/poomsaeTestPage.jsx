import { useState } from 'react';
import '../../styles/poomsaeTestPage/poomsaeTestPage.css';
import PoomsaeBeltItem from '../../components/poomsaeTestPage/poomsaeBeltItem';
import PoomsaeTestModal from '../../components/poomsaeTestPage/poomsaeTestModal';
import PoomsaeImage from '/src/assets/images/poomsaeTestPage/ps1.png';


const poomsaeDetails = [
    {
        id: 1,
        name: "태극 1장",
        description: "태극 1장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 2,
        name: "태극 2장",
        description: "태극 2장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 3,
        name: "태극 3장",
        description: "태극 1장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 4,
        name: "태극 4장",
        description: "태극 4장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 5,
        name: "태극 5장",
        description: "태극 5장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 6,
        name: "태극 6장",
        description: "태극 6장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 7,
        name: "태극 7장",
        description: "태극 7장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    {
        id: 8,
        name: "태극 8장",
        description: "태극 8장은 팔괘 중에서 하늘을 상징하는 건(建)에 해당한다...",
        imageUrl: {PoomsaeImage},
    },
    
];



const PoomsaeTestPage = () => {
    const [selectedPoomsae, setSelectedPoomsae] = useState(null);
    //임시 data
    const [completedStages] = useState([true, false, false, false, false, false, false, false]); 


    const belt_images = [
        'src/assets/images/common/belt/yellowBelt.png',
        'src/assets/images/common/belt/greenBelt.png',
        'src/assets/images/common/belt/purpleBelt.png',
        'src/assets/images/common/belt/blueBelt.png',
        'src/assets/images/common/belt/brownBelt.png',
        'src/assets/images/common/belt/orangeBelt.png',
        'src/assets/images/common/belt/redBelt.png',
        'src/assets/images/common/belt/blackBelt.png',
    ];

    const handleItemClick = (index) => {
        setSelectedPoomsae(poomsaeDetails[index]);

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
                completed={completedStages[index]}
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