import '../../styles/myPage/roomDecoPage.css'
import Photo1 from '../../assets/images/myPage/photo1.png'
import Photo2 from '../../assets/images/myPage/photo2.png'
import Photo3 from '../../assets/images/myPage/photo3.png'

import {useState} from 'react' 

const RoomDecoPage = ({ closePhoto, language, setSelectedPhoto }) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState('');

  const handlePhotoChange = (e) => {
    setSelectedPhotoId(e.target.value);
  };

  const handleSavePhoto = () => {
    setSelectedPhoto(selectedPhotoId); // Pass the selected photo back to MyPage
    closePhoto();
  };

  return (
    <div className="photopage">
      <div className="photo-selection-container">
        <div className="character-options">
          {[
            { id: 'photo1', img: Photo1 },
            { id: 'photo3', img: Photo3 },
            { id: 'photo2', img: Photo2 },
          ].map((photo) => (
            <label key={photo.id} className="photo-option">
              <img
                src={photo.img}
                alt={photo.id}
                className="photo-image"
                onClick={() => setSelectedPhotoId(photo.id)}
                style={{ cursor: 'pointer' }}
              />
              <input
                type="radio"
                id={photo.id}
                name="character"
                value={photo.id}
                checked={selectedPhotoId === photo.id}
                onChange={handlePhotoChange}
              />
            </label>
          ))}
        </div>
      </div>
      <button className="updateclosebutton" onClick={closePhoto}>X</button>
      <button className="photosavebutton" onClick={handleSavePhoto}>
        {language === 'en' ? 'Choose' : '선택'}
      </button>
    </div>
  );
};

export default RoomDecoPage;

