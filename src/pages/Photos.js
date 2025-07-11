import React, { useEffect, useState, useCallback } from 'react';
import FooterMain from '../components/FooterMain';
import PhotoItem from './PhotoItem';
import './Photos.css';

// Placeholder image for loading blur effect
// const placeholder = 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAeEAABAwQDAAAAAAAAAAAAAAABAAMEAgUGEQczcf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARUf/aAAwDAQACEQMRAD8AlcvEsAbiGprkitx8A6bNikAE+7RTqT2lFQD2Bwcv/9k=';
const placeholder = 'data:image/webp;base64,UklGRnIBAABXRUJQVlA4IGYBAACwCACdASomADMAPxF2r1EsJ6QirVzLaYAiCUAXOwGgGx/3F+jc8tqlTQMDOCqFfjB9COFtjlzyN8yg2z3jEUS99fETc3yYv2eTkXXokIAA4RBw/z3UyyPY86h3avz2am5QG1jCjLxp4ktiz/xx6/9LplpJy1mUsKPpJfdFQVQtDFA/PbkE/56XuhxkaS/rIoqYGTIqrSV/S+H3ohI76iUsgQDIM0u6WnYE1wLK39IxVUoEnpoRZRWwUKponldzcSBdMCMlQtQqvZvInOGrVT+KaBlWeUqCA0HeVlsxvQoPjjgDikpI1+9ky/qClHxdFhchMA3209HgweZ3o+Gh2OzcyG++B/BlfHVnismQzSE0oFl42dREW1wxJOMRtQMRDfdpCN+aJVJFtF4ecNR1LrjSCazvElWkFMJVoZe4SG+ikCYFz0377cvM6jQNAk4PaybjkQ/PA0VuJqP2gCEPKOikYyNTgAAA';

// Number of images to load per scroll/page
const IMAGES_PER_PAGE = 50;

const Photos = () => {
  // allImages: array of objects from gallery.json (filename, date, location, season)
  const [allImages, setAllImages] = useState([]);
  // visibleCount: how many images are currently visible
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  // Fetch gallery.json once on mount
  useEffect(() => {
    fetch('/gallery copy.json')
      .then(res => res.json())
      .then(data => {
        setAllImages(data); // keep all fields for each image
      });
  }, []);

  // Infinite scroll handler: load more images when near bottom
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      visibleCount < allImages.length
    ) {
      setVisibleCount(count => Math.min(count + IMAGES_PER_PAGE, allImages.length));
    }
  }, [visibleCount, allImages.length]);

  // Attach/detach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Only show up to visibleCount images
  const images = allImages.slice(0, visibleCount);

  return (
    <div>
      <main className="photos-main">
        <div className="photos-grid">
          {/* Render PhotoItem for each image, passing location and season */}
          {images.map((img, i) => (
            <PhotoItem
              src={`/gallery 2/${img.filename}`}
              alt={`Photo ${i + 1}`}
              placeholder={img.placeholder}
              key={i}
              location={img.location}
              season={img.season}
            />
          ))}
        </div>
      </main>
      <FooterMain />
    </div>
  );
};

export default Photos; 
