import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
//components
import Navbar from './components/Navbar';
//pages
import About from './pages/About/About';
import Projects from './pages/Works/Projects';
import Home from './pages/Home/Home';
import Playground from './pages/Playground/Playground';
import '../src/styles/global.css';

// projects
import BumperProject from './pages/Projects/Bumper/BumperProject';
import ThreeDPackagingAd from './pages/Projects/ThreeDPackaging/ThreeDPackagingAd';
import JapaneseInstagramProject from './pages/Projects/Instagram/JapaneseInstagramProject';
import CanadaPromotionalVideo from './pages/Projects/Canada/CanadaPromotionalVideo';
import RhythmGame from './pages/Projects/RhythmGame/RhythmGame';
import MagicMusicMv from './pages/Projects/MagicMusicMv/MagicMusicMv';
import FashionZineAndEventProject from './pages/Projects/Fashion/FashionZineAndEventProject';



import GoToTop from './components/GoToTop';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // ← ここで state を定義！
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Navbar に setMenuOpen を渡す */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/playground" element={<Playground />} />

        {/* 他のルート */}
        <Route path="/projects/bumper" element={<BumperProject />} />
        <Route
          path="/projects/3d-packaging-ad"
          element={<ThreeDPackagingAd />}
        />
        <Route
          path="/projects/japanese-instagram-project"
          element={<JapaneseInstagramProject />}
        />
        <Route
          path="/projects/canada-promotional-video"
          element={<CanadaPromotionalVideo />}
        />
        <Route path="/projects/rhythm-game" element={<RhythmGame />} />
        <Route path="/projects/fashion-zine-and-event" element={<FashionZineAndEventProject />} />
        <Route path="/projects/magic-music-mv" element={<MagicMusicMv />} />
      </Routes>

      {/* メニュー開いてる時は GoToTop を非表示 */}
      {!menuOpen && <GoToTop />}
    </BrowserRouter>
  );
}

export default App;
