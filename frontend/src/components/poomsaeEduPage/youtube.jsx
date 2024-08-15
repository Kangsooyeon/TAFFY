import { useState } from 'react';
import PropTypes from 'prop-types';
import play from '../../assets/images/poomsaeEduPage/youtubeIcon.png';

const YouTube = ({ videoUrl }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  let videoId = '';
  if (videoUrl) {
    try {
      const url = new URL(videoUrl);
      if (url.hostname === 'youtu.be') {
        // Shortened YouTube URL (e.g., https://youtu.be/VIDEO_ID)
        videoId = url.pathname.slice(1);
      } else {
        // Standard YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
        videoId = url.searchParams.get('v');
      }
    } catch (error) {
      console.error('Invalid video URL', error);
    }
  }

  return (
    <div className="videoThumbnail" onClick={handleVideoPlay}>
      {!isVideoPlaying ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Play video"
            className="thumbnailImage"
            onError={(e) => { e.target.src = 'fallback-image-url.jpg'; }} // You can use a fallback image
          />
          <div className="playButton">
            <img src={play} alt="youtubeIcon" />
          </div>
        </>
      ) : (
        <iframe
          width="100%"
          height="370"
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
