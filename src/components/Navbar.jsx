import { NavLink } from 'react-router-dom';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.webp';
import './Navbar.css';
import { useState, useEffect } from 'react';
import heart from './assets/pixel-heart.png';
import { bubble as Menu } from 'react-burger-menu';
import burger from './assets/humburger2.png';
import ufo from '../assets/About/rabbit-ufo.svg';
import close from '../components/assets/crossing-hands.webp';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Navbar({ menuOpen, setMenuOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const messages = [
    'Stay sweet!',
    'Stay weird!',
    'Stay creating!',
    'Stay colorful!',
    'Stay playful!',
    'Candelicious',
  ];

  const [openBubble, setOpenBubble] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  
  const handleUfoClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); 
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]); 
    }
    
    setOpenBubble(true);
    setMsgIndex(Math.floor(Math.random() * messages.length));
    window.clearTimeout(window.__ufoTimer);
    window.__ufoTimer = window.setTimeout(() => setOpenBubble(false), 2500);
  };

  // ここから修正
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    
    const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            setShowNavbar(false);
        } else if (window.scrollY < lastScrollY) {
            setShowNavbar(true);
        }
        if (window.scrollY < 10) {
            setShowNavbar(true);
        }
        
        setLastScrollY(window.scrollY);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    window.addEventListener('scroll', handleScroll);

    // メニューが開いているときにスクロールを無効化するロジック
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }

    return () => {
        window.removeEventListener('resize', checkWidth);
        window.removeEventListener('scroll', handleScroll);
        // コンポーネントがアンマウントされるときにスタイルを元に戻す
        document.body.style.overflow = 'unset';
        document.body.style.position = 'unset';
        document.body.style.width = 'unset';
    };
  }, [lastScrollY, menuOpen]); // 依存配列に menuOpen を追加

  const renderLinks = () => (
    <>
      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          isActive ? 'home-button active' : 'home-button'
        }
      >
        {({ isActive }) => (
          <span className="text-with-hearts">
            {isActive && (
              <img src={heart} alt="" className="active-heart left" />
            )}
            <span className="text">Home</span>
            {isActive && (
              <img src={heart} alt="" className="active-heart right" />
            )}
          </span>
        )}
      </NavLink>
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          isActive ? 'about-button active' : 'about-button'
        }
      >
        {({ isActive }) => (
          <span className="text-with-hearts">
            {isActive && (
              <img src={heart} alt="" className="active-heart left" />
            )}
            <span className="text">About</span>
            {isActive && (
              <img src={heart} alt="" className="active-heart right" />
            )}
          </span>
        )}
      </NavLink>
      <NavLink
        to="/projects"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          isActive ? 'works-button active' : 'works-button'
        }
      >
        {({ isActive }) => (
          <span className="text-with-hearts">
            {isActive && (
              <img src={heart} alt="" className="active-heart left" />
            )}
            <span className="text">Projects</span>
            {isActive && (
              <img src={heart} alt="" className="active-heart right" />
            )}
          </span>
        )}
      </NavLink>
      <NavLink
        to="/playground"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          isActive ? 'playground-button active' : 'playground-button'
        }
      >
        {({ isActive }) => (
          <span className="text-with-hearts">
            {isActive && (
              <img src={heart} alt="" className="active-heart left" />
            )}
            <span className="text">Playground</span>
            {isActive && (
              <img src={heart} alt="" className="active-heart right" />
            )}
          </span>
        )}
      </NavLink>
    </>
  );

  return (
    <div className={`navbar-container ${!showNavbar && !menuOpen ? 'navbar-hidden' : ''}`}>
      <header className="header-bar">
        <nav className="navbar">
          <NavLink to="/" className="logo-wrapper">
            <div className="logo-tab-box">
              <img
                src={logo}
                className="logo"
                alt="colorful chameleon logo for Candy Fukaya brand"
              />
            </div>
          </NavLink>
          {!isMobile && (
            <ul className="nav-links">
              <li>{renderLinks()}</li>
              <li>
                <NavLink
                  to="mailto:candyfukaya@gmail.com"
                  className="mail-icon-nav"
                  aria-label="Send email to Candy Fukaya"
                >
                  <FaEnvelope />
                </NavLink>
              </li>
            </ul>
          )}
          {isMobile && (
            <Menu
              right
              isOpen={menuOpen}
              onStateChange={(state) => setMenuOpen(state.isOpen)}
              customBurgerIcon={<img src={burger} alt="menu" />}
              customCrossIcon={<img src={close} alt="close menu" />}
              styles={{
                bmMorphShape: {
                  fill: '#fff94d',
                },
              }}
            >
              {renderLinks()}
              <div className="menu-footer-images">
                <button
                  className="ufo-btn"
                  onClick={handleUfoClick}
                  aria-label="Show secret message"
                >
                  <img 
                    src={ufo} 
                    alt="ufo rabbit" 
                    className={`ufo-nav ${isShaking ? 'shake' : ''}`} 
                  />
                </button>
                {openBubble && (
                  <div className="ufo-bubble-nav">{messages[msgIndex]}</div>
                )}
              </div>
              <div className="mobile-social-links">
                <a
                  href="mailto:candyfukaya@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Candy"
                >
                  <FaEnvelope size={40} color="#ff62bc" />
                </a>
                <a
                  href="https://www.instagram.com/candy_ramune/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Candy's Instagram"
                >
                  <FaInstagram size={40} color="#38f03eff" />
                </a>
                <a
                  href="https://www.linkedin.com/in/candy-fukaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Candy's LinkedIn"
                >
                  <FaLinkedin size={40} color="#00cfff" />
                </a>
              </div>
            </Menu>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;