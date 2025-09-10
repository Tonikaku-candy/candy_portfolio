import HTMLFlipBook from 'react-pageflip';
import React, { useRef } from 'react';
import './Flipbook.css';

// 画像をここでまとめて import
import page1 from '../../../assets/ProjectDetails/Fashion/magazine2-1.webp';
import page2 from '../../../assets/ProjectDetails/Fashion/magazine2-2.webp';
import page3 from '../../../assets/ProjectDetails/Fashion/magazine2-3.webp';
import page4 from '../../../assets/ProjectDetails/Fashion/magazine2-4.webp';
import page5 from '../../../assets/ProjectDetails/Fashion/magazine2-5.webp';
import page6 from '../../../assets/ProjectDetails/Fashion/magazine2-6.webp';
import page7 from '../../../assets/ProjectDetails/Fashion/magazine2-7.webp';
import page8 from '../../../assets/ProjectDetails/Fashion/magazine2-8.webp';
import page9 from '../../../assets/ProjectDetails/Fashion/magazine2-9.webp';
import page10 from '../../../assets/ProjectDetails/Fashion/magazine2-10.webp';
import page11 from '../../../assets/ProjectDetails/Fashion/magazine2-11.webp';
import page12 from '../../../assets/ProjectDetails/Fashion/magazine2-12.webp';
import page13 from '../../../assets/ProjectDetails/Fashion/magazine2-13.webp';
import page14 from '../../../assets/ProjectDetails/Fashion/magazine2-14.webp';
import page15 from '../../../assets/ProjectDetails/Fashion/magazine2-15.webp';
import page16 from '../../../assets/ProjectDetails/Fashion/magazine2-16.webp';
import page17 from '../../../assets/ProjectDetails/Fashion/magazine2-17.webp';
import page18 from '../../../assets/ProjectDetails/Fashion/magazine2-18.webp';
import page19 from '../../../assets/ProjectDetails/Fashion/magazine2-19.webp';
import page20 from '../../../assets/ProjectDetails/Fashion/magazine2-20.webp';
import page21 from '../../../assets/ProjectDetails/Fashion/magazine2-21.webp';
import page22 from '../../../assets/ProjectDetails/Fashion/magazine2-22.webp';
import page23 from '../../../assets/ProjectDetails/Fashion/magazine2-23.webp';
import page24 from '../../../assets/ProjectDetails/Fashion/magazine2-24.webp';
import page25 from '../../../assets/ProjectDetails/Fashion/magazine2-25.webp';
import page26 from '../../../assets/ProjectDetails/Fashion/magazine2-26.webp';

function Flipbook() {
  const isMobile = window.innerWidth < 768;
  const book = useRef();
  const pages = [
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13,
    page14,
    page15,
    page16,
    page17,
    page18,
    page19,
    page20,
    page21,
    page22,
    page23,
    page24,
    page25,
    page26,
  ];

  return (
    <div className="magazine-wrapper">
      {/* 左矢印 */}
      <button
        className="flipbook-arrow left"
        onClick={() => book.current.pageFlip().flipPrev()}
      >
        &lt;
      </button>

      <HTMLFlipBook
        ref={book}
        width={570}
        height={760}
        size="stretch"
        minWidth={250}
        maxWidth={570}
        minHeight={350}
        maxHeight={760}
        showCover={true}
        className="flipbook-container"
      >
        {pages.map((page, i) => (
          <div key={i} className="flipbook-page">
            <img
              src={page}
              alt={`Fashion Zine page ${i + 1}`}
              className="flipbook-image"
            />
          </div>
        ))}
      </HTMLFlipBook>
      {/* 右矢印 */}
      <button
        className="flipbook-arrow right"
        onClick={() => book.current.pageFlip().flipNext()}
      >
        &gt;
      </button>
    </div>
  );
}

export default Flipbook;
