//move page
import { Link } from 'react-router-dom';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.png';
import './Navbar.css';
import { useState } from 'react';

//mobile
import humburger from './assets/humburger.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-bar">
      <nav className="navbar">
        <Link to="/">
          <img
            src={logo}
            className="logo"
            alt="colorful chameleon logo for Candy Fukaya brand"
          />
        </Link>

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
            <Link to="/" className="home-button">
              <span className="text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="about-button">
              <span className="text">About</span>
            </Link>
          </li>
          <li>
            <Link to="/works" className="works-button">
              <span className="text">Works</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
