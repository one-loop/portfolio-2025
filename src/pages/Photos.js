import React from 'react';
import Navbar from '../components/Navbar';
import FooterMain from '../components/FooterMain';
import PhotoItem from './PhotoItem';
import './Photos.css';

const placeholder = 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAeEAABAwQDAAAAAAAAAAAAAAABAAMEAgUGEQczcf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARUf/aAAwDAQACEQMRAD8AlcvEsAbiGprkitx8A6bNikAE+7RTqT2lFQD2Bwcv/9k=';
const realImages = [
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F70.jpg&w=1920&q=75',
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F69.jpg&w=1920&q=75',
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F63_1.jpg&w=3840&q=75',
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F67.jpg&w=3840&q=75',
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F42.jpg&w=1920&q=75',
  'https://rauno.me/_next/image?url=%2Fstatic%2Fphotos%2F5.jpg&w=1920&q=75',
];
const fallback = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';

const images = [
  ...realImages,
  ...Array.from({ length: 44 }, () => fallback)
];

const Photos = () => {
  return (
    <div>
      <Navbar />
      <main className="photos-main">
        <div className="photos-grid">
          {images.map((src, i) => (
            <PhotoItem src={src} alt={`Photo ${i + 1}`} placeholder={placeholder} key={i} />
          ))}
        </div>
      </main>
      <FooterMain />
    </div>
  );
};

export default Photos; 