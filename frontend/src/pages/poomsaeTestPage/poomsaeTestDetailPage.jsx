import '../../styles/poomsaeTestPage/poomsaeTestDetailPage.css';

const PoomsaeTestDetailPage = () => {

    return (
        <div className="poomsae-test-detail-page">
            <div className="detail-title">
                <p>태극 1장</p>
            </div>
            <div className="detail-content">
                <img 
                    src="/assets/images/common/popUp.png"  
                    className="poomsae-image"
                />
            </div>
        </div>
    );
};

export default PoomsaeTestDetailPage;
