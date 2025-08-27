import React from 'react';
import './ProjectTitle.css';
import AnimatedTitle from '../AnimatedTitle'; // 忘れずインポート

export default function ProjectTitle({ title = 'ALL PROJECTS' }) {
  return (
    <div className="all-projects-title-wrapper">
      <div className="all-projects-title">
        {/* h2 → AnimatedTitle に置き換え */}
        <AnimatedTitle
          text={title}
          trigger=".all-projects-title-wrapper" // スクロール時のトリガー
          className="subtitles all-projects"
        />
      </div>
    </div>
  );
}
