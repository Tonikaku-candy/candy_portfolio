// src/pages/Projects/Fashion/FashionZineAndEventProject.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
// import './FashionZineProject.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import projects from '../../../data/ProjectData.js';

import Flipbook from './Flipbook.jsx';

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';
import FashionZineAndEventSlideData from './FashionZineAndEventSlideData.js';

/* -----------------------
   resolveProjectIndex 関数（高機能版）
------------------------- */
function resolveProjectIndex(projects, location, params) {
  const norm = (v) =>
    String(v ?? '')
      .replace(/\/+$/, '')
      .toLowerCase();

  // URL候補の収集
  const paramCandidates = Object.values(params || {})
    .filter(Boolean)
    .map((v) => norm(v));
  const lastSeg = norm(location?.pathname?.split('/').filter(Boolean).pop());
  const candidates = [...paramCandidates, lastSeg].filter(Boolean);

  // プロジェクトごとのキー候補を作成
  const pickKeys = (p) => {
    const keys = new Set();
    keys.add(norm(p.id));
    keys.add(norm(p.slug));
    keys.add(norm(p.link));
    const linkLast = norm((p.link || '').split('/').filter(Boolean).pop());
    keys.add(linkLast);
    return keys;
  };

  // 一致チェック
  for (let i = 0; i < projects.length; i++) {
    const keys = pickKeys(projects[i]);
    if (candidates.some((c) => keys.has(c))) return i;
  }

  // 保険: フルパス一致
  const path = norm(location?.pathname || '');
  const idx = projects.findIndex((p) => norm(p.link) === path);
  return idx;
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

function FashionZineAndEventProject() {
  const params = useParams();
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState('');

  // 現在インデックス解決
  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params, projects]
  );

  // 前後プロジェクト（循環）
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

  const  baseTags = [
    'EVENT ORGANIZE',
    'FASHION ZINE',
    'LOGO DESIGN',
    'POSTER DESIGN',
    'LANDING PAGE',
    'BRANDING',
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

        <ProjectTitle title="FASHION ZINE AND EVENT" />

        {notFound ? (
          <div className="project-not-found">
            <p>Can not find project</p>
            <Link to="/works" className="back-button center">
              Back to Projects
            </Link>
          </div>
        ) : (
          <>
            <FadeInOnScroll>
              <Flipbook />
            </FadeInOnScroll>

            <div className="detail-box-wrapper">
              <div className="project-grid">
                <FadeInOnScroll>
                  <DetailBox size="S" title="SOFTWARE" colorClass="blue">
                    <ul>
                      <li>InDesign</li>
                      <li>Photoshop</li>
                      <li>Illustrator</li>
                      <li>Visual Studio Code</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </DetailBox>
                </FadeInOnScroll>

                <FadeInOnScroll>
                  <DetailBox size="S" title="ROLE" colorClass="red">
                    <ul>
                      <li>Event Page Developer</li>
                      <li>Graphic Designer (Logo & Poster)</li>
                      <li>Editor & Layout Designer</li>
                      <li>Art Director</li>
                    </ul>
                  </DetailBox>
                </FadeInOnScroll>

                <FadeInOnScroll>
                  <DetailBox size="S" title="DURATION" colorClass="yellow">
                    <ul>
                      <li>March – May, 2025</li>
                    </ul>
                  </DetailBox>
                </FadeInOnScroll>
              </div>

              <FadeInOnScroll>
                <DetailBox title="OVERVIEW" colorClass="pink">
                  <p>
                    As one of the organizers of{' '}
                    <strong>Harajuku Walk YVR</strong>, I was responsible for
                    coding the event detail page, designing the Instagram logo,
                    producing the event poster, and later creating a full
                    fashion zine.
                    <br />
                    <br />
                    The zine was designed after the event using photos captured
                    on the day. In addition to the editorial layouts, I also
                    designed advertisement pages and the back cover to replicate
                    the look and feel of a real magazine. <br />
                    <br />
                    This project combined photography, typography, and playful
                    layouts to capture the energy of Tokyo street style in a
                    printed format while showcasing Harajuku-inspired fashion
                    culture.
                  </p>
                </DetailBox>
              </FadeInOnScroll>

              <FadeInOnScroll>
                <DetailBox title="DESIGN CONCEPT" colorClass="green">
                  <p>
                    As an organizer of Harajuku Walk YVR, I focused on building
                    a consistent and playful brand identity across different
                    media.
                    <br />
                    <br />
                    For the <strong>Instagram logo</strong>, I used many bold
                    shapes and created multiple color variations to capture the
                    fun, pop-like energy of Harajuku culture. The final version,
                    chosen by the other organizers, was in pink—matching the
                    cheerful theme of the event. <br />
                    <br />
                    The <strong>event poster</strong> expressed Harajuku
                    fashion’s pop, colorful, and busy atmosphere, while I
                    carefully designed outlines and contrasting backgrounds to
                    keep event details clear and readable. <br />
                    <br />
                    The <strong>fashion zine</strong> was designed after the
                    event using photos taken on the day. I also created an
                    advertisement page for our{' '}
                    <Link
                      to="/projects/japanese-instagram-project"
                      className="link-pink"
                    >
                      “Japanese teaching Instagram”
                    </Link>{' '}
                    , the back cover design, and fictional promotional product
                    visuals to enhance the feeling of a real magazine. to
                    replicate the feel of a real magazine. Since I wanted it to
                    look like a playful landing page, I designed each spread so
                    it could be experienced like flipping through an interactive
                    story with different fashion looks from the participants.
                  </p>
                  <div className="project-slider-detail">
                    <SlideCard slideData={FashionZineAndEventSlideData} />
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              <FadeInOnScroll>
                <DetailBox title="EVENT LANDING PAGE" colorClass="purple">
                  <p>
                    Alongside the zine and poster, I designed and coded a
                    <strong> one-page event website</strong> using Tailwind CSS.
                    The landing page was created to welcome first-time
                    participants and those unfamiliar with Harajuku fashion,
                    making the event easy to understand at a glance.
                    <br />
                    <br />I included photos of different Harajuku fashion styles
                    , clear event details, and playful visuals to reflect the
                    unique, colorful atmosphere of the community. The site aimed
                    to replicate the excitement of the event while guiding
                    visitors smoothly through the information.
                    <br />
                    <br />
                    The header video was designed in two versions: a horizontal
                    format for desktop and a vertical format for mobile so the
                    experience feels responsive and dynamic across devices.
                  </p>
                  <div className="text-center">
                    <a
                      href="https://purinp1.github.io/harajukuwalkvyr/?fbclid=PAZXh0bgNhZW0CMTEAAaeTMLoHwojy7-NJFC-ZrlBCwMmefHMRp8pJCoDoHShF1kdJohM-FcFNMur8pw_aem_vCRrUP4Je3wMvFKxzT6SVg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-instagram-button"
                    >
                      View Live Website
                    </a>
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              <FadeInOnScroll>
                <DetailBox title="EVENT HISTORY" colorClass="orange">
                  <p>
                    In February 2016, I co-organized the very first Harajuku
                    Fashion Walk in Vancouver together with my friend. The event
                    was even featured in the{' '}
                    <a
                      href="https://vancouversun.com/news/staff-blogs/vancouvers-first-harajuku-fashion-walk-with-video"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pink"
                    >
                      Vancouver Sun
                    </a>{' '}
                    <br />
                    <br />
                    After being held twice in the past, the event took a long
                    break. In April 2025, a new team of organizers decided to
                    bring it back — and I was invited to join them as one of the
                    organizers.
                  </p>
                </DetailBox>
              </FadeInOnScroll>
            </div>

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
          </>
        )}
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default FashionZineAndEventProject;
