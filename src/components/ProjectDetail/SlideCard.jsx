// SlideCard.jsx
import React, { useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SlideData from './BumperSlideData';
import './SlideCard.css';

export default function SlideCard() {
  const mainRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalImage, setModalImage] = useState(null); // ⬅️ ここに置く！

  const handleThumbnailClick = (index) => {
    mainRef.current?.go(index);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="gallery02">
      {/* メインスライダー */}
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
        {SlideData.map((slide, index) => (
          <SplideSlide key={index}>
            <div className="slide-wrapper">
              <img
                src={slide.image}
                alt={slide.alt}
                className="main-img"
                onClick={() => handleImageClick(slide.image)}
                style={{ cursor: 'zoom-in' }}
              />
              <p className="slide-caption">{slide.text}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* ← → ボタン + サムネイル */}
      <div className="thumbnail-slider-wrapper">
        <button
          className="custom-arrow"
          onClick={() => mainRef.current?.go('<')} // ← rewinding OK
        >
          ←
        </button>

        <div className="thumbnail-slider">
          {SlideData.map((slide, index) => (
            <div
              key={index}
              className={`thumb-media ${
                index === currentSlide ? 'is-active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={slide.image} alt={slide.alt} />
            </div>
          ))}
        </div>

    

        <button
          className="custom-arrow"
          onClick={() => mainRef.current?.go('>')} // → rewinding OK
        >
          →
        </button>
      </div>

      {/* 画像モーダル */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="large image" />
          </div>
        </div>
      )}
    </div>
  );
}
