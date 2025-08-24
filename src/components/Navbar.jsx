import { NavLink } from 'react-router-dom';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.png';
import './Navbar.css';
import { useState } from 'react';
import heart from './assets/pixel-heart.png';
import humburger from './assets/humburger.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 追加：リンク押下でメニューを閉じる
  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="header-bar">
      <nav className="navbar">
        {/* モバイル時に背景クリックで閉じる */}
        <div
          className={`mobile-cover ${isOpen ? 'show' : ''}`}
          onClick={() => setIsOpen(false)}
        ></div>

        <NavLink to="/" className="logo-wrapper" onClick={handleNavClick}>
          <div className="logo-tab-box">
            <img
              src={logo}
              className="logo"
              alt="colorful chameleon logo for Candy Fukaya brand"
            />
          </div>
        </NavLink>

        {/* burger */}
        {isOpen ? (
          <button
            className="burger-icon close-icon"
            onClick={() => setIsOpen(false)}
            aria-label="close menu"
            aria-expanded="true"
          >
            X
          </button>
        ) : (
          <button
            className="burger-icon"
            id="burger-icon"
            onClick={() => setIsOpen(true)}
            aria-label="open menu"
            aria-expanded="false"
          >
            <img src={humburger} alt="menu" />
          </button>
        )}

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? 'home-button active' : 'home-button'
              }
            >
              {({ isActive }) => (
                <span className="text-with-hearts">
                  {isActive && <img src={heart} alt="" className="active-heart left" />}
                  <span className="text">Home</span>
                  {isActive && <img src={heart} alt="" className="active-heart right" />}
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? 'about-button active' : 'about-button'
              }
            >
              {({ isActive }) => (
                <span className="text-with-hearts">
                  {isActive && <img src={heart} alt="" className="active-heart left" />}
                  <span className="text">About</span>
                  {isActive && <img src={heart} alt="" className="active-heart right" />}
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/works"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? 'works-button active' : 'works-button'
              }
            >
              {({ isActive }) => (
                <span className="text-with-hearts">
                  {isActive && <img src={heart} alt="" className="active-heart left" />}
                  <span className="text">Projects</span>
                  {isActive && <img src={heart} alt="" className="active-heart right" />}
                </span>
              )}
            </NavLink>
          </li>

          {/* Funworks */}
          <li>
            <NavLink
              to="/funworks"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? 'funworks-button active' : 'funworks-button'
              }
            >
              {({ isActive }) => (
                <span className="text-with-hearts">
                  {isActive && <img src={heart} alt="" className="active-heart left" />}
                  <span className="text">Funworks</span>
                  {isActive && <img src={heart} alt="" className="active-heart right" />}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
