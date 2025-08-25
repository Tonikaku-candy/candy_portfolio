import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Navbar from './components/Navbar';
//pages
import About from './pages/About/About';
import Works from './pages/Works/Works';
import Home from './pages/Home/Home';
import Funworks from './pages/Funworks/Funworks';
import '../src/styles/global.css';

// projects
import BumperProject from './pages/Projects/Bumper/BumperProject';
import ThreeDPackagingAd from './pages/Projects/ThreeDPackaging/ThreeDPackagingAd';
import JapaneseInstagramProject from './pages/Projects/Instagram/JapaneseInstagramProject';
import CanadaPromotionalVideo from './pages/Projects/Canada/CanadaPromotionalVideo';
import RhythmGame from './pages/Projects/RhythmGame/RhythmGame';
import MagicMusicMv from './pages/Projects/MagicMusicMv/MagicMusicMv';

import GoToTop from './components/GoToTop';

import ScrollToTop from './components/ScrollToTop';

// to show inside app
function App() {
  return (
    //to change pages
    <BrowserRouter>
      <ScrollToTop />
      {/* to show menu */}
      <Navbar />

      {/* rule to change url */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/funworks" element={<Funworks />} />

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

        <Route path="/projects/magic-music-mv" element={<MagicMusicMv />} />
      </Routes>
      <GoToTop />
    </BrowserRouter>
  );
}

export default App;
