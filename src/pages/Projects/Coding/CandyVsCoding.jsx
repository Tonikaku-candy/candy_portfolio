// src/pages/Projects/MagicMusic/MagicMusicMv.jsx
import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';

import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import Modal from 'react-modal';

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';

import SlideData2 from './CandyVsCodingStoryboardData.js';

// image
import color from '../../../assets/ProjectDetails/CandyVsCoding/color-typography.webp';
import logo from '../../../assets/ProjectDetails/CandyVsCoding/logo-variations.webp';

Modal.setAppElement('#root');
/* -----------------------
   resolveProjectIndex 関数（高機能版）
------------------------- */
function resolveProjectIndex(projects, location, params) {
  const norm = (v) =>
    String(v ?? '')
      .replace(/\/+$/, '')
      .toLowerCase();

  const paramCandidates = Object.values(params || {})
    .filter(Boolean)
    .map((v) => norm(v));
  const lastSeg = norm(location?.pathname?.split('/').filter(Boolean).pop());
  const candidates = [...paramCandidates, lastSeg].filter(Boolean);

  const pickKeys = (p) => {
    const keys = new Set();
    keys.add(norm(p.id));
    keys.add(norm(p.slug));
    keys.add(norm(p.link));
    const linkLast = norm((p.link || '').split('/').filter(Boolean).pop());
    keys.add(linkLast);
    return keys;
  };

  for (let i = 0; i < projects.length; i++) {
    const keys = pickKeys(projects[i]);
    if (candidates.some((c) => keys.has(c))) return i;
  }

  const path = norm(location?.pathname || '');
  return projects.findIndex((p) => norm(p.link) === path);
}

/* -----------------------
   buildProjectLink 関数
------------------------- */
function buildProjectLink(proj) {
  if (!proj) return '/projects';
  if (proj.link) return proj.link.replace(/\/+$/, '');
  const idOrSlug = proj.slug ?? proj.id;
  return `/projects/${idOrSlug}`;
}

/* -----------------------
    コンポーネント
------------------------- */
function CandyVsCoding() {
  const params = useParams();
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params, projects]
  );

  const { prevProject, nextProject, notFound } = useMemo(() => {
    const total = projects.length;
    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return { prevProject: null, nextProject: null, notFound: true };
    }
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;
    return {
      prevProject: projects[prevIndex] || null,
      nextProject: projects[nextIndex] || null,
      notFound: false,
    };
  }, [currentIndex, projects]);

  const baseTags = [
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'UI / UX',
    'WEB DEVELOPMENT',

    'STORYTELLING',
  ];
  const tags = [...baseTags, ...baseTags];

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">← Back to projects</span>
          </Link>
        </div>

        <ProjectTitle title="Candy VS Coding: How I Built My Portfolio" />

        <div id="video"></div>
        <FadeInOnScroll>
          <div className="video-wrapper rhythm-video">
            <iframe
              src="https://www.youtube.com/embed/iMnireSu81Q?si=WTw5XHS3H6EqnUIG"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </FadeInOnScroll>

        {/* ページ内リンク */}
        <DetailLinks
          links={[
            { id: 'video', label: 'Video' },
            { id: 'overview', label: 'Overview' },
            { id: 'inspiration', label: 'Inspiration' },
            {
              id: 'process',
              label: (
                <>
                  Design
                  <br />
                  Process
                </>
              ),
            },
            {
              id: 'wireframe',
              label: (
                <>
                  Portfolio
                  <br />
                  Wireframe
                </>
              ),
            },
          ]}
        />

        <div className="detail-box-wrapper">
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox size="S" title="SOFTWARE" colorClass="blue">
                <ul>
                  <li>After Effects</li>
                  <li>Photoshop</li>
                  <li>Premiere Pro</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="ROLE" colorClass="red">
                <ul>
                  <li>Motion Designer</li>
                  <li>Editor</li>
                  <li>Filming</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title="DURATION"
                colorClass="yellow"
                extraClass="small-padding-box"
              >
                <ul>
                  <li className="game">Nov 4th – Dec 9th, 2025</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          <div id="overview"></div>
          <FadeInOnScroll>
            <DetailBox title="OVERVIEW" colorClass="pink">
              <p>
                “Candy vs Coding” is a short parody film that humorously
                visualizes my journey of learning to code and building my
                portfolio at BCIT. Inspired by classic arcade fighting games,
                the story follows me battling <strong>HTML, CSS, JavaScript, and React</strong>,
                each representing a unique challenge I faced during the program.
                <br />
                <br />
                The film mixes live-action footage, VFX, and animation created
                in After Effects and Premiere Pro. It’s both a comedy and a
                reflection of how creativity, teamwork, and perseverance helped
                me overcome technical struggles as a designer learning
                development.
              </p>
            </DetailBox>
          </FadeInOnScroll>

          <div id="inspiration"></div>
          <FadeInOnScroll>
            <DetailBox title="INSPIRATION" colorClass="green">
              <p>
                I started with <strong>zero computer knowledge</strong>, and
                coding was a real struggle for me. But I studied hard and built
                this entire portfolio website from scratch. Many people asked if
                I actually coded it myself—and some people didn’t even believe
                me!
                <br />
                <br />
                That’s why I decided to create this video about how I built my
                portfolio. Instead of making something serious or technical, I
                wanted to turn my learning journey into something fun and
                playful.
                <br />
                <br />
                One day, I suddenly thought: my journey at BCIT felt like a
                fighting game. Every new coding skill was like a boss I had to
                learn, fight, and defeat. That’s how the “fighting game” idea
                was born.
                <br />
                <br />
                Here is the storyboard:
              </p>

              <div className="project-slider-detail">
                <SlideCard
                  slideData={SlideData2}
                  onImageClick={(img) => setSelectedImage(img)}
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="process"></div>
          <FadeInOnScroll>
            <DetailBox title="PORTFOLIO DESIGN PROCESS" colorClass="purple">
              <div
              // style={{
              //   display: 'flex',
              //   gap: '2rem',
              //   flexWrap: 'wrap',
              //   alignItems: 'flex-start',
              // }}
              >
                {/* Left: Text */}

                <p>
                  During the design brainstorming phase, I created a color
                  palette and typography system to define the playful, energetic
                  identity of my brand. The bright neon colors and rounded
                  typefaces reflect the mix of Harajuku culture, fun energy, and
                  friendly tone that I always aim for in my creative work.
                </p>

                <div className="image-wrapper">
                  <img
                    src={color}
                    alt="color palette and typography"
                    // className="game-cover"
                  />
                </div>

                <p>
                  When I started thinking about my logo, I knew I wanted to use
                  pixel art. Before studying design, I used to run a small
                  handmade fashion brand where I created and sold perler-bead
                  accessories, so pixel art has a special meaning to me.
                  <br />
                  <br />I also wanted a cute character to represent my brand,
                  and that’s when the chameleon idea came to me. The chameleon
                  reflects my creative mindset: the ability to adapt, explore,
                  and grow into new forms, even when I don’t have much
                  experience yet. It reminds me that there is value in trying,
                  changing, and becoming.
                </p>
                <div className="image-wrapper">
                  <img
                    src={logo}
                    alt="logo variations"
                    // className="game-cover"
                  />
                </div>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="wireframe"></div>
          <FadeInOnScroll>
            <DetailBox title="Wireframe" colorClass="orange">
              <p>
                Before coding my portfolio website, I designed its layout in
                Figma to plan the overall structure, user flow, and page
                balance. This helped me connect design thinking with coding
                practice. It was difficult to code everything exactly as I
                designed it, but I followed the plan as closely as possible.
                Through that process, I learned how important it is to
                understand coding when designing—you can’t just design whatever
                you want. Planning is really important.
                <br />
                <br />
                As I continued coding, I kept improving the UI based on my
                instructor’s feedback. My style is busy and playful, but I
                focused on making navigation clear and making buttons easy to
                understand. In the final stage, I decided to add a grid
                background to the home page. My design mixes solid backgrounds
                and grid patterns, balancing “busy → solid → busy → solid” as a
                rhythm throughout the layout.
                <br />
                <br />
              </p>
              <iframe
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  height: '450px',
                  borderRadius: '8px',
                }}
                src="https://embed.figma.com/design/eX0LRBEzHFmK61GHg2tgZY/Portfolio-Website--%E3%82%B3%E3%83%94%E3%83%BC-?node-id=43-330&embed-host=share"
                allowFullScreen
              ></iframe>
            </DetailBox>
          </FadeInOnScroll>
        </div>

        {/* --- Prev / Next --- */}
        <div className="project-nav">
          {prevProject && (
            <Link
              to={buildProjectLink(prevProject)}
              className="nav-button prev"
            >
              <span className="button_top">← Prev</span>
            </Link>
          )}
          <Link to="/projects" className="back-button center">
            <span className="button_top">Back to projects</span>
          </Link>
          {nextProject && (
            <Link
              to={buildProjectLink(nextProject)}
              className="nav-button next"
            >
              <span className="button_top">Next →</span>
            </Link>
          )}
        </div>
        {/* モーダル（クリックで画像拡大表示） */}
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          contentLabel="拡大画像"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.95)',
              border: 'none',
              padding: 0,
              overflow: 'auto',
              width: '95vw', // モバイル用
              maxWidth: '800px', // PCでは最大800pxまで
              height: 'auto',
              maxHeight: '90vh', // 高さも制限してはみ出さないように
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 50,
            },
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '2rem',
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '8px',
              padding: '0 8px',
            }}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="拡大画像"
            style={{
              width: '100%',
            }}
          />
        </Modal>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default CandyVsCoding;
