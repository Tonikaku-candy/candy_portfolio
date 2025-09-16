import React from 'react';
import './ProjectTitle.css';
import AnimatedTitle from '../AnimatedTitle';

export default function ProjectTitle({ title = 'ALL PROJECTS', className = '' }) {
  return (
    <div className={`all-projects-title-wrapper ${className}`}>
      <div className="all-projects-title">
        <AnimatedTitle
          text={title}
          trigger=".all-projects-title-wrapper"
          className={`subtitles all-projects ${className}`}
        />
      </div>
    </div>
  );
}
