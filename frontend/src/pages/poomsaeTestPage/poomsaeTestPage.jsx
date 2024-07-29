import { useState } from 'react';
import '../../styles/poomsaeTestPage/poomsaeTestPage.css';
import PoomsaeBeltItem from '../../components/poomsaeTestPage/poomsaeBeltItem';
import PoomsaeTestModal from '../../components/poomsaeTestPage/poomsaeTestModal';



const PoomsaeTestPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
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

    const handleItemClick = (imageUrl) => {
        setSelectedImage(imageUrl);

    };
    
    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    

    return (
        <div className="poomsae-test-page">
            <div className="belt-box">
            {belt_images.map((url, index) => (
                <PoomsaeBeltItem 
                key={index} 
                imageUrl={url} 
                onClick={() => handleItemClick(url, index)}
                completed={completedStages[index]}
                />
            ))}
            </div>
            {selectedImage && <PoomsaeTestModal imageUrl={selectedImage} onClose={handleCloseModal} />}

        </div>
    );
};

export default PoomsaeTestPage;