import React, { useState } from 'react';

const PhotoItem = ({ src, alt, placeholder, location, season, title }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="photo-item" title={title ? title : ''}>
      {/* Blurred placeholder */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className="photo-blur"
        draggable={false}
        loading="lazy"
        decoding="async"
        data-nimg="fill"
      />
      {/* Real image */}
      <img
        src={src}
        alt={alt}
        className={`photo-img${loaded ? ' loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        draggable={false}
        loading="lazy"
        decoding="async"
        data-nimg="fill"
      />
      <div className="after">
        <span className="photo-location">{location}</span>
        <span className="photo-time">{season}</span>
      </div>
    </div>
  );
};

export default PhotoItem; 