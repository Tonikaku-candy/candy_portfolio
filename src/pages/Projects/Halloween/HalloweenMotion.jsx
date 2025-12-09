// src/pages/Projects/Halloween/HalloweenMotion.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import ProcessSteps from '../../../components/ProjectDetail/ProcessSteps.jsx';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import projects from '../../../data/ProjectData.js';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';

// image
import Color from '../../../assets/ProjectDetails/halloween/color-palette.webp';

Modal.setAppElement('#root');

/* -----------------------
   resolveProjectIndex
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
    keys.add(norm((p.link || '').split('/').filter(Boolean).pop()));
    return keys;
  };

  for (let i = 0; i < projects.length; i++) {
    const keys = pickKeys(projects[i]);
    if (candidates.some((c) => keys.has(c))) return i;
  }

  return projects.findIndex((p) => norm(p.link) === norm(location.pathname));
}

/* -----------------------
   buildProjectLink
------------------------- */
function buildProjectLink(proj) {
  if (!proj) return '/projects';
  if (proj.link) return proj.link.replace(/\/+$/, '');
  const idOrSlug = proj.slug ?? proj.id;
  return `/projects/${idOrSlug}`;
}

/* -----------------------
   Component
------------------------- */
function HalloweenMotion() {
  const params = useParams();
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params]
  );

  const { prevProject, nextProject, notFound } = useMemo(() => {
    const total = projects.length;
    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return { prevProject: null, nextProject: null, notFound: true };
    }
    return {
      prevProject: projects[(currentIndex - 1 + total) % total],
      nextProject: projects[(currentIndex + 1) % total],
      notFound: false,
    };
  }, [currentIndex]);

  const baseTags = [
    'CONTENT CREATION',
    'MOTION GRAPHICS',
    'GRAPHIC DESIGN',
    'BRANDING',
    'ANIMATION',
    'KAWAII',
    'MAXIMALIST',
  ];
  const tags = [...baseTags, ...baseTags, ...baseTags];

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        {/* Top Back Button */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">← Back to projects</span>
          </Link>
        </div>

        <ProjectTitle title="Halloween Geometric Motion Loop" />

        {/* Main Video */}
        <div className="video-wrapper">
          <div id="video"></div>
          <FadeInOnScroll>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4WA7PxyCIqE?si=rKW6TAwVMHHjydmU"
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </FadeInOnScroll>
        </div>

        {/* Page Links */}
        <DetailLinks
          links={[
            { id: 'video', label: 'Video' },
            { id: 'overview', label: 'Overview' },
            { id: 'inspiration', label: 'Inspiration' },
            { id: 'wip', label: 'Short Video' },
            { id: 'neonversion', label: 'Neon Version' },
          ]}
        />

        {/* Detail Boxes */}
        <div className="detail-box-wrapper">
          {/* SOFTWARE / ROLE / DURATION */}
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox size="S" title="SOFTWARE" colorClass="blue">
                <ul>
                  <li>After Effects</li>
                  <li>Illustrator</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="ROLE" colorClass="red">
                <ul>
                  <li>Direction & Motion</li>
                  <li>Design</li>
                  <li>Illustration</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="DURATION" colorClass="yellow">
                <ul>
                  <li>Oct 27 – 28, 2025</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* OVERVIEW */}
          <div id="overview">
            <FadeInOnScroll>
              <DetailBox title="OVERVIEW" colorClass="pink">
                <p>
                  This geometric motion design is a personal project created to
                  celebrate the Halloween season.
                  <br />
                  It was designed as a seamless loop using a grid system in
                  After Effects.
                  <br />
                  All shapes were illustrated directly inside the software,
                  keeping each element simple while building a rhythmic
                  composition.
                  <br />
                  Later, I redesigned the color palette using the same base file
                  to create a custom wallpaper.
                </p>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* INSPIRATION */}
          <div id="inspiration">
            <FadeInOnScroll>
              <DetailBox title="INSPIRATION" colorClass="green">
                <div className="box-split">
                  <div className="box-text">
                    <p>
                      This piece was inspired by geometric patterns and bold
                      color palettes often used in modern motion graphics.
                      <br />
                      <br />
                      I chose four main colors for each variation—originally I
                      wanted many more, but limiting the palette helped maintain
                      clarity and balance.
                      <br />
                      <br />
                      Since I made this on Halloween day, the aesthetic
                      naturally shifted toward bright, festive colors rather
                      than a spooky theme. My goal was to create a fun, minimal,
                      loop-friendly animation that still captured seasonal
                      energy.
                    </p>
                  </div>

                  <div className="image-wrapper">
                    <img src={Color} alt="color palette" />
                  </div>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>
          {/* WIP */}
          <div id="wip">
            <FadeInOnScroll>
              <DetailBox
                title="Behind-the-Scenes Short Clip"
                colorClass="purple"
              >
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <p>
                      After completing the first version of the motion piece, I
                      casually recorded a small behind-the-scenes moment and
                      that ended up inspiring a new idea. While working in
                      Illustrator, I imagined the ghost character literally
                      popping out of the canvas and entering the animation
                      itself.
                      <br />
                      <br />
                      While creating the ghost illustration, I built it from
                      simple geometric shapes. At first, the design was just a
                      combination of circles and rounded rectangles, but once
                      the pieces came together and the character started to feel
                      “alive,” the idea of it jumping out of the screen became
                      even more fun and believable.
                      <br />
                      <br />
                      Since I happened to be wearing a Halloween costume in
                      class that day, I decided to include that real WIP moment
                      inside the clip. It felt playful and matched the spirit of
                      the project, so I let that spontaneity guide the
                      direction.
                      <br />
                      <br />
                      When I later shared the short video on LinkedIn, my
                      instructor commented that showing myself designing in
                      costume was a fun and effective way to promote the work.
                      That unexpected feedback motivated me to develop the idea
                      further and integrate the WIP moment into the final
                      narrative of the project.
                    </p>
                  </div>

                  <div className="instagram-iframe">
                    <iframe
                      src="https://www.youtube.com/embed/-UeP_cdZlZQ"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: '12px' }}
                    ></iframe>
                  </div>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* NEON VERSION */}
          <div id="neonversion">
            <FadeInOnScroll>
              <DetailBox title="NEON VERSION" colorClass="purple">
                <p>
                  After finishing the Halloween palette, I created a “Neon
                  Version” to explore how color alone can change the mood of a
                  geometric loop.
                  <br />
                  <br />
                  Switching to neon colors makes the animation feel more
                  energetic and futuristic even though the shapes and timing
                  remain exactly the same.
                  <br />
                  <br />I also turned this version into a wallpaper because I
                  wanted something that makes me happy and gives me energy every
                  time I open my laptop. I added my name and my Japanese motto
                  meaning “Every day is super lucky.”
                    <br />
                  <br />
                </p>

                <div className="video-wrapper">
                  <FadeInOnScroll>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/JZ6zt0kjZ-U?si=-li7LZ0jxb2--G0X"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </FadeInOnScroll>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Prev / Next */}
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
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default HalloweenMotion;
