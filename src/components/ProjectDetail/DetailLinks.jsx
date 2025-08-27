import React, { useState, useEffect } from 'react';
import './DetailLinks.css';

export default function DetailLinks({ links }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✨ スムーズスクロール関数
  const handleSmoothScroll = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={`detail-links ${show ? 'show' : ''}`}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {/* onClickで呼び出す */}
            <a
              href={`#${link.id}`}
              className="detail-link"
              onClick={handleSmoothScroll(link.id)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
