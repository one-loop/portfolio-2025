import React, { useState } from 'react';

const PhotoItem = ({ src, alt, placeholder, location, season, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="photo-item">
      {/* Blur placeholder */}
      <img
        className="photo-blur"
        src={placeholder}
        alt=""
        aria-hidden="true"
      />
      
      {/* Main image */}
      <img
        className={`photo-img ${imageLoaded ? 'loaded' : ''}`}
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* Overlay with metadata */}
      <div className="after">
        <div className="photo-location">{location}</div>
        <div className="photo-time">{season}</div>
      </div>
    </div>
  );
};

export default PhotoItem; 