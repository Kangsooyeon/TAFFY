import { useState } from 'react';
import '../../styles/poomsaeTestPage/poomsaeTestPage.css';
import PoomsaeBeltItem from '../../components/poomsaeTestPage/poomsaeBeltItem';
import PoomsaeTestModal from '../../components/poomsaeTestPage/poomsaeTestModal';
import PopUp from '../../components/common/popUp';


const PoomsaeTestPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

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
                <PoomsaeBeltItem key={index} imageUrl={url} onClick={() => handleItemClick(url)} />
            ))}
            </div>
            {selectedImage && <PoomsaeTestModal imageUrl={selectedImage} onClose={handleCloseModal} />}
            <div className="pop-up-container">
                <PopUp
                    title="학습을 완료했습니다!"
                    btnText1="촬영하기"
                    btnHref1="/photo"
                    btnText2="메인으로"
                    btnHref2="/main"
                />
            </div>
        </div>
    );
};

export default PoomsaeTestPage;