import './TagBar.css';
import React from 'react';
import PixelHeart from './assets/pixel-heart.png';

function TagBar({ tags, activeTag, onTagClick }) {
  return (
   <div className="tag-bar-scroll-wrapper">
  <div className="tag-bar">
    {[...tags, ...tags].map((tag, index) => (
      <React.Fragment key={index}>
        <button
          className={`tag-button ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onTagClick(tag)}
        >
          #{tag}
        </button>
    
          <img src={PixelHeart} alt="heart" className="tag-heart" />
        
      </React.Fragment>
    ))}
  </div>
</div>

  );
}

export default TagBar;
