// src/pages/Projects/RhythmGame/RhythmGame.jsx

import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';

import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import '../../Projects/RhythmGame/RhythmGame.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';

// image
import gardenEelBubbles from '../../../assets/ProjectDetails/RhythmGame/garden-eel-bubbles.gif';
import ending from '../../../assets/ProjectDetails/RhythmGame/ending.gif';
import gameCover from '../../../assets/ProjectDetails/RhythmGame/rhythm-heaven-game-cover.webp';

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
  if (!proj) return '/works';
  if (proj.link) return proj.link.replace(/\/+$/, '');
  const idOrSlug = proj.slug ?? proj.id;
  return `/projects/${idOrSlug}`;
}

/* -----------------------
    コンポーネント
------------------------- */
function RhythmGame() {
  const params = useParams();
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState('');

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
    'CONTENT CREATION',
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'MUSIC SYNC',
    'STORYTELLING',
  ];
  const tags = [...baseTags, ...baseTags];

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        <div className="back-to-works top">
          <Link to="/works" className="back-button">
            ← Back to projects
          </Link>
        </div>

        <ProjectTitle title="Rhythm Game Animation in After Effects" />
        <div className="video-wrapper rhythm-video">
          <FadeInOnScroll>
            <iframe
              src="https://www.youtube.com/embed/FirjiKAvp8U?si=U27l5qBcxGKhgS_I"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </FadeInOnScroll>
        </div>

        {/* ページ内リンク */}
        <DetailLinks
          links={[
            { id: 'overview', label: 'Overview' },
            { id: 'inspiration', label: 'Inspiration' },
            { id: 'story', label: 'Storytelling' },
            { id: 'production', label: 'Production' },
            { id: 'feedback', label: 'Feedback' },
            { id: 'video', label: 'full video' },
          ]}
        />

        <div className="detail-box-wrapper">
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox size="S" title="SOFTWARE" colorClass="blue">
                <ul>
                  <li>Photoshop</li>
                  <li>Premiere Pro</li>
                  <li>After Effects</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="ROLE" colorClass="red">
                <ul>
                  <li>Motion Designer</li>
                  <li>Visual Storyteller</li>
                  <li>Editor</li>
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
                  <li className="game">June 15th – July 2nd, 2025</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          <div id="overview"></div>
          <FadeInOnScroll>
            <DetailBox title="Overview" colorClass="pink">
              <p>
                This project was originally assigned as a “Mythbusters-style 2D
                animation”, requiring music, narration, sound effects, and
                motion graphics.
              </p>
              <p>
                Instead of a typical myth animation, I created a rhythm
                game–style animation in After Effects. It focuses on precise
                beat synchronization and visual effects, capturing the quick and
                satisfying feel of hitting the beat.
              </p>
              <p>
                A small video in the top right corner simulates actual gameplay,
                visually reinforcing the concept that this is a rhythm game.
              </p>
            </DetailBox>
          </FadeInOnScroll>

          <div id="inspiration"></div>
          <FadeInOnScroll>
            <DetailBox title="INSPIRATION" colorClass="green">
              <p>
                Since I wasn’t very familiar with Mythbusters, <br />I decided
                to create something that I would genuinely enjoy making. <br />
                Because timing was an important skill to practice, <br />
                I chose a rhythm-game style animation. <br />
                <br />
                I referenced the game “Rhythm Heaven,” <br />
                but I’ve actually never played it and I don’t usually play
                games. <br />
                Instead, I studied gameplay videos and reimagined <br />
                what a rhythm game could look like in my own style.
              </p>
              <div className="image-wrapper">
                <img
                  src={gameCover}
                  alt="Rhythm Heaven game cover"
                  className="game-cover"
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="story"></div>
          <FadeInOnScroll>
            <DetailBox title="Humor & Storytelling" colorClass="purple">
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}
              >
                {/* Left: Text */}
                <p>
                  The original brief was to create a Mythbusters-style
                  animation.
                  <br />
                  Instead of a traditional myth story, I turned the assignment
                  itself into the “myth” — imagining what would happen if I
                  ignored the teacher’s project and played a rhythm game
                  instead.
                  <br />
                  <br />
                  To keep the tone playful, I ended the video with the line{' '}
                  <i>
                    “Candy’s grade to be decided… no one knows what happened to
                    her after.”
                  </i>
                  <br />
                  The whole piece is designed to be humorous, energetic, and
                  self-aware.
                </p>
                <div className="gif-wrapper">
                  <img src={ending} alt="Ending screen" />
                </div>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="production"></div>
          <FadeInOnScroll>
            <DetailBox title="PRODUCTION HIGHLIGHTS" colorClass="orange">
              <p>
                In my previous project, the
                <Link to="/projects/bumper" className="bumper-link">
                  “Bumper Opener”
                </Link>
                , my main goal was simply to get comfortable with After Effects
                by adding lots of motion and experimenting with timing. <br />
                <br />
                This time, I wanted to challenge myself further by creating
                custom assets such as particles. For example, in the garden eel
                scene, I designed bubbles and waves using particle effects,
                which added a greater sense of depth and atmosphere to the
                animation.
              </p>
              <div className="gif-wrapper">
                <img
                  src={gardenEelBubbles}
                  alt="Garden eel scene with particles"
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="feedback"></div>
          <FadeInOnScroll>
            <DetailBox title="FEEDBACK" colorClass="pink">
              <p>
                At first, my teacher pointed out that my rhythm game animation
                seemed far from the original “Mythbusters-style” assignment.
                However, once I reframed the project by turning the teacher
                himself into the “myth,” the class reacted with laughter, and
                even my teacher admitted, “Now this is a myth.” <br />
                <br />
                My classmates also enjoyed the unexpected flow — starting
                serious, suddenly switching into a game screen, and ending with
                an ambiguous conclusion. They said the unpredictability made it
                entertaining and memorable.
              </p>
            </DetailBox>
          </FadeInOnScroll>
        </div>
        <div id="video"></div>
        <div className="video-wrapper rhythm-video">
          <FadeInOnScroll>
            <iframe
              src="https://www.youtube.com/embed/p9sW7Ym1-bU?si=g0LenSje5iPrbO5s"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </FadeInOnScroll>
        </div>

        {/* --- Prev / Next --- */}
        <div className="project-nav">
          {prevProject && (
            <Link
              to={buildProjectLink(prevProject)}
              className="nav-button prev"
            >
              ← Prev
            </Link>
          )}
          <Link to="/works" className="back-button center">
            Back to Projects
          </Link>
          {nextProject && (
            <Link
              to={buildProjectLink(nextProject)}
              className="nav-button next"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default RhythmGame;
