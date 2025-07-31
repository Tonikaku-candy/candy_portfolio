import React from 'react';
import './ProjectTitle.css';

export default function ProjectTitle({ title = 'ALL PROJECTS' }) {
  return (

      <div className="all-projects-title-wrapper">
        <div className="all-projects-title">
          <div className="subtitles all-projects">
            <h2>{title}</h2>
          </div>
        </div>
      </div>
  );
}
