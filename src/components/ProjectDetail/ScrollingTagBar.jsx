// ScrollingTagBar.jsx
import React from 'react';
import './ScrollingTagBar.css';
import PixelHeart from '../assets/pixel-heart-red.png';

function ScrollingTagBar({ tags }) {
  return (
    <div className="tag-bar-scroll-wrapper">
      <div className="tag-bar2">
        {[...tags, ...tags].map((tag, index) => (
          <React.Fragment key={index}>
            <button className="tag-button2">
              #{tag}
            </button>
            <img src={PixelHeart} alt="heart" className="tag-heart" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ScrollingTagBar;

