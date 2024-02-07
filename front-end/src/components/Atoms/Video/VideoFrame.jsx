import React from 'react';

const VideoFrame = ({ title, src, id, alt, required }) => {
  return (
    <div className="video-section">
      <div className="video-wrapper">
        <iframe
          title={title}
          src={src}
          id={id}
          width="560"
          height="315"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoFrame;