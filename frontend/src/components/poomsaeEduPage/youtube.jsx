import { useState } from 'react';
import PropTypes from 'prop-types';
import play from '../../assets/images/poomsaeEduPage/youtubeIcon.png';

const YouTube = ({ videoUrl }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const videoId = videoUrl.split('v=')[1];

  return (
    <div className="videoThumbnail" onClick={handleVideoPlay}>
      {!isVideoPlaying ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Play video"
            className="thumbnailImage"
          />
          <div className="playButton">
            <img src={play} alt="youtubeIcon" />
          </div>
        </>
      ) : (
        <iframe
          width="100%"
          height="300"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

YouTube.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default YouTube;
