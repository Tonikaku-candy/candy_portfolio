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
import look9 from './assets/PhotoGallery/look9.webp';
import look10 from './assets/PhotoGallery/look10.webp';
import look11 from './assets/PhotoGallery/look11.webp';
import look12 from './assets/PhotoGallery/look12.webp';
import look13 from './assets/PhotoGallery/look13.webp';

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
    alt: 'Rainbow-themed decora outfit with matching rainbow face mask and colorful yarn hair extensions',
  },
  {
    src: look6,
    alt: 'colorful kimono style outfit with cherry blossom background',
  },
  {
    src: look7,
    alt: 'Candy in a purple lolita-style dress',
  },
  {
    src: look12,
    alt: 'Pastel fairy kei style with oversized lollipop prop and star accessories under dreamy pink and blue lighting',
  },
  {
    src: look9,
    alt: 'Candy in a patchwork dress and rainbow boots posing joyfully by a colorful urban wall',
  },
  {
    src: look10,
    alt: 'Colorful Decora-inspired outfit posing in front of a Harajuku-style mural wall',
  },
  {
    src: look11,
    alt: 'Vintage-inspired colorful floral dress in Shinsekai, Osaka, with matching hat and sunglasses',
  },

  {
    src: look8,
    alt: 'Graffiti backdrop with colorful decora fashion, featuring rainbow overalls and handmade accessories',
  },
  {
    src: look13,
    alt: 'Vintage-inspired colorful floral dress in Shinsekai, Osaka, with matching hat and sunglasses',
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
