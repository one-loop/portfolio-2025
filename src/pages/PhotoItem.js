import React, { useState } from 'react';

const PhotoItem = ({ src, alt, placeholder }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="photo-item">
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
    </div>
  );
};

export default PhotoItem; 