import { NavLink } from 'react-router-dom';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.png';
import './Navbar.css';
import { useState } from 'react';
import chameleon from './assets/colorful-chameleon.png';
import heart from './assets/pixel-heart.png';

//mobile
import humburger from './assets/humburger.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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

        {/* only mobile image */}
        {isOpen ? (
          <span
            className="burger-icon close-icon"
            onClick={() => setIsOpen(false)}
          >
            X
          </span>
        ) : (
          <img
            src={humburger}
            className="burger-icon"
            alt="menu"
            onClick={() => setIsOpen(true)}
          />
        )}

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink
              to="/"
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
          </li>
          <li>
            <NavLink
              to="/about"
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
          </li>
          <li>
            <NavLink
              to="/works"
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
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
