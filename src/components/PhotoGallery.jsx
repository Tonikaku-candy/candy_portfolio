// Photogallery.jsx
import React from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import './PhotoGallery.css';

//images
import look1 from './assets/PhotoGallery/look1.webp';
import look2 from './assets/PhotoGallery/look2.webp';
import look3 from './assets/PhotoGallery/look3.webp';
import look4 from './assets/PhotoGallery/look4.webp';
import look5 from './assets/PhotoGallery/look5.webp';
import look6 from './assets/PhotoGallery/look6.webp';
import look7 from './assets/PhotoGallery/look7.webp';
import look8 from './assets/PhotoGallery/look8.webp';

// 仮の画像
const images = [
  {
    src: look1,
    alt: 'colorful kimono style outfit with cherry blossom background',
  },
  {
    src: look2,
    alt: 'Blue velvet lolita dress with white lace trim',
  },
  {
    src: look3,
    alt: 'Candy dressed in colorful Decora fashion, holding glowing lights in her hands with eyes closed, surrounded by dreamy bokeh in an arcade-like space',
  },
  {
    src: look4,
    alt: 'Candy twirling in a fruit-printed dress with green frills in a vibrant floral garden',
  },
  {
    src: look5,
    alt: 'colorful kimono style outfit with cherry blossom background',
  },
  {
    src: look6,
    alt: 'Candy in a purple lolita-style dress',
  },
  {
    src: look7,
    alt: 'Candy in a patchwork dress and rainbow boots posing joyfully by a colorful urban wall',
  },
  {
    src: look8,
    alt: 'Colorful Decora-inspired outfit posing in front of a Harajuku-style mural wall',
  },
];

const PhotoGallery = ({ direction = 'ltr' }) => {
  const options = {
    type: 'loop',
    drag: 'free',
    arrows: false,
    pagination: false,
    autoWidth: true,
    autoHeight: true,
    direction: direction, // 'ltr' or 'rtl'
    autoScroll: {
      speed: direction === 'rtl' ? -1 : 1,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
    breakpoints: {
      600: {
        autoScroll: {
          speed: direction === 'rtl' ? -0.3 : 0.3,
        },
      },
    },
  };

  return (
    <div className="photo-gallery-wrapper">
      <Splide options={options} extensions={{ AutoScroll }}>
        {images.map((img, index) => (
          <SplideSlide key={index}>
            <div className="photo-slide">
              <img src={img.src} alt={img.alt} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default PhotoGallery;
