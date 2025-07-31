// src/components/assets/DetailBox.jsx
import React from 'react';
import './DetailBox.css';

// 💡 colorClassを追加で受け取るようにする！
export default function DetailBox({
  title,
  colorClass = '',
  size = 'M',
  align = 'left',
  children,
}) {
  return (
    <div className={`detail-box ${size}`}>
      <h2 className={`detail-box-title  ${colorClass} `}>{title}</h2>

      <div
        className={`detail-box-content ${
          align === 'center' ? 'text-align-center' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}
