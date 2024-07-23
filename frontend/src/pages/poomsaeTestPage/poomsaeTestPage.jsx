import '../../styles/poomsaeTestPage/poomsaeTestPage.css';
import PoomsaeBeltItem from '../../components/poomsaeTestPage/poomsaeBeltItem';


const PoomsaeTestPage = () => {
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

    return (
        <div className="poomsae-test-page">
            <div className="belt-box">
            {belt_images.map((url, index) => (
                <PoomsaeBeltItem key={index} imageUrl={url} />
            ))}
            </div>

        </div>
    );
};

export default PoomsaeTestPage;