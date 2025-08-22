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

  return (
    <div className={`detail-links ${show ? 'show' : ''}`}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={`#${link.id}`} className="detail-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
