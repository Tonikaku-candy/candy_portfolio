import React, { useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './SlideCard.css';

import { useLanguage } from '../context/LanguageContext.jsx';

export default function SlideCard({ slideData, onImageClick }) {
  const { language } = useLanguage();

  const mainRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleThumbnailClick = (index) => {
    mainRef.current?.go(index);
  };

  if (!Array.isArray(slideData)) {
    return (
      <p>
        {language === 'en'
          ? 'Slide data is missing or invalid.'
          : 'スライドデータが見つかりません。'}
      </p>
    );
  }

  // 英語のみの古いSlideDataにも対応
  const getLocalizedText = (value) => {
    if (typeof value === 'string') {
      return value;
    }

    if (value && typeof value === 'object') {
      return value[language] ?? value.en ?? '';
    }

    return '';
  };

  return (
    <div className="gallery02">
      <Splide
        options={{
          type: 'fade',
          pagination: false,
          arrows: false,
          rewind: true,
        }}
        onMoved={(splide) => setCurrentSlide(splide.index)}
        ref={mainRef}
        className="main-slider"
      >
        {slideData.map((slide, index) => (
          <SplideSlide key={index}>
            <div className="slide-wrapper">
              <img
                src={slide.image}
                alt={getLocalizedText(slide.alt)}
                className="main-img cursor-zoom-in"
                onClick={() =>
                  onImageClick && onImageClick(slide.image)
                }
                style={{ cursor: 'zoom-in' }}
              />

              <p
                className={`slide-caption ${
                  language === 'ja' ? 'japanese-text' : ''
                }`}
              >
                {getLocalizedText(slide.text)}
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <div className="thumbnail-slider-wrapper">
        <button
          className="custom-arrow"
          onClick={() => mainRef.current?.go('<')}
          aria-label={language === 'en' ? 'Previous slide' : '前のスライド'}
        >
          ←
        </button>

        <div className="thumbnail-slider">
          {slideData.map((slide, index) => (
            <div
              key={index}
              className={`thumb-media ${
                index === currentSlide ? 'is-active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={slide.image}
                alt={getLocalizedText(slide.alt)}
              />
            </div>
          ))}
        </div>

        <button
          className="custom-arrow"
          onClick={() => mainRef.current?.go('>')}
          aria-label={language === 'en' ? 'Next slide' : '次のスライド'}
        >
          →
        </button>
      </div>
    </div>
  );
}