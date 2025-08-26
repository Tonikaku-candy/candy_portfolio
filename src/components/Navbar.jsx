import { NavLink } from 'react-router-dom';
import logo from './assets/candy-fukaya-pixel-chameleon-logo.png';
import './Navbar.css';
import { useState, useEffect } from 'react';
import heart from './assets/pixel-heart.png';
import { bubble as Menu } from 'react-burger-menu';
import burger from './assets/humburger.png';
import ufo from '../assets/About/rabbit-ufo.svg';

function Navbar({ menuOpen, setMenuOpen }) {
  const [isMobile, setIsMobile] = useState(false);

  // 画面幅でモバイル判定
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // 共通のリンク描画
  const renderLinks = () => (
    <>
      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)} // ← クリックで閉じる
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
        to="/works"
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
    <header className="header-bar">
      <nav className="navbar">
        {/* ロゴ */}
        <NavLink to="/" className="logo-wrapper">
          <div className="logo-tab-box">
            <img
              src={logo}
              className="logo"
              alt="colorful chameleon logo for Candy Fukaya brand"
            />
          </div>
        </NavLink>

        {/* PC時：横並び */}
        {!isMobile && (
          <ul className="nav-links">
            <li>{renderLinks()}</li>
          </ul>
        )}

        {/* モバイル時：bubbleメニュー */}
        {isMobile && (
          <Menu
            right
            isOpen={menuOpen} // ← 状態で制御
            onStateChange={(state) => setMenuOpen(state.isOpen)} // ← 自動同期
            customBurgerIcon={<img src={burger} alt="menu" />}
            styles={{
              bmMorphShape: {
                fill: '#fff94d',
              },
            }}
          >
            {renderLinks()}
            <div className="menu-footer-images">
              <img src={ufo} alt="ufo rabbit" className="ufo" />
            </div>
          </Menu>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
