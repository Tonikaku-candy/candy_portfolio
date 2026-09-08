import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaGithub,
} from 'react-icons/fa';

import logo from './assets/candy-fukaya-pixel-chameleon-logo.webp';
import './Footer.css';
import { useLanguage } from './context/LanguageContext.jsx';

const Footer = () => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-section">
      <div
        className={`footer-text ${
          language === 'ja' ? 'japanese-text' : ''
        }`}
      >
        <p>
          {language === 'en'
            ? 'Thanks for visiting my colorful world!'
            : '私のカラフルな世界を見てくださり、ありがとうございます！'}
        </p>

        <p>
          {language === 'en'
            ? 'Let’s make something magical together!'
            : '一緒にワクワクするものをつくりましょう！'}
        </p>
      </div>

      <div className="footer-icons">
        <a
          href="https://www.instagram.com/candy_ramune/"
          target="_blank"
          aria-label="Candy's Instagram"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.linkedin.com/in/candy-fukaya"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Candy's LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="mailto:candyfukaya@gmail.com"
          aria-label="Email Candy"
        >
          <FaEnvelope />
        </a>

        <a
          href="https://github.com/Tonikaku-candy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Candy's GitHub"
        >
          <FaGithub />
        </a>
      </div>

      <p
        className={`copyright ${
          language === 'ja' ? 'japanese-text' : ''
        }`}
      >
        {language === 'en'
          ? 'Designed and coded by Candy Fukaya with React © 2025'
          : 'デザイン・コーディング：Candy Fukaya / React © 2025'}
      </p>

      <div className="go-to-top" onClick={scrollToTop}>
        <img
          src={logo}
          alt="colorful chameleon logo for Candy Fukaya brand"
        />
      </div>
    </footer>
  );
};

export default Footer;