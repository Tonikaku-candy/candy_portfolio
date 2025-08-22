import { useEffect, useState } from 'react';
import bunny from './assets/go-to-top.png';
import '../components/GoToTop.css';

export default function GoToTop() {
  const [bottom, setBottom] = useState(20); 
  const [show, setShow] = useState(false); 

  useEffect(() => {
    const handleLift = () => {
      const footer = document.querySelector('.footer-section');
      if (!footer) return setBottom(20);

      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

 
      const overlap = Math.max(0, vh - rect.top);
      setBottom(20 + overlap);

      setShow(window.scrollY > 300);
    };

    handleLift();
    window.addEventListener('scroll', handleLift, { passive: true });
    window.addEventListener('resize', handleLift);
    return () => {
      window.removeEventListener('scroll', handleLift);
      window.removeEventListener('resize', handleLift);
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className={`go-to-top-floating ${show ? 'show' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      style={{ bottom }}
    >
      {/* <a href='#'> */}
      <img className="go-to-top-icon" src={bunny} alt="" />
      {/* </a> */}
    </div>
  );
}
