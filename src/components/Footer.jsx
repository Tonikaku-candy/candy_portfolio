import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.png';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className="footer-section">
      <div className="footer-text">
        <p>Thanks for visiting my colorful world!</p>
        <p>Let’s make something magical together!</p>
      </div>
      <div className="footer-icons">
        <a
         href="https://www.instagram.com/candy_ramune/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/candy-f-7207a0356/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:candyfukaya@gmail.com">
          <FaEnvelope />
        </a>
      </div>
      <p className="copyright">Candy Fukaya 2025</p>
      <div className="go-to-top" onClick={scrollToTop}>
        <img src={logo} alt="colorful chameleon logo for Candy Fukaya brand" />
      </div>
      <p className='jump'>Jump to Top</p>
    </footer>
  );
};

export default Footer;
