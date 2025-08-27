// src/pages/Projects/Canada/CanadaPromotionalVideoFilm.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import '../../Projects/Canada/CanadaPromotionalVideo.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import screenShot from '../../../assets/ProjectDetails/Canada/canada_video_editing_what_scene.webp';
import wall from '../../../assets/ProjectDetails/Canada/canada_awesome_wall.webp';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
// slide
import SlideData from './CanadaSlideData.js';
import SlideCard from '../../../components/ProjectDetail/SlideCard';

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
   CanadaPromotionalVideo コンポーネント
------------------------- */
function CanadaPromotionalVideo() {
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
    'VIDEO EDITING',
    'PROMOTIONAL VIDEO',
    'MARKETING',
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

        <ProjectTitle   title={`“Canada Ain’t What I Thought!”\nPlayful Travel Campaign Film`}  />

         <FadeInOnScroll>
        <div className="video-wrapper canada">
            
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/o0zuYan30wI?si=G6HFcPcZ5pCGQiz3"
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
                    { id: 'overview', label: 'Overview' },
                    { id: 'concept', label: 'Concept' },
                    { id: 'approach', label: 'Approach' },
                    { id: 'music', label: 'Music' },
                    { id: 'production', label: 'Production' },
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
                <li>Creative Director</li>
                <li>Video Editor</li>
                <li>Lyric Writer</li>
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
              <ul className="tight-paragraph canada">
                <li>March 20th – April 11th, 2025</li>
                <li>Re-edited August 4th, 2025</li>
              </ul>
            </DetailBox>
            </FadeInOnScroll>
          </div>
    <div id="overview"></div>
    <FadeInOnScroll>
          <DetailBox title="Overview" colorClass="pink">
            <p>
              This project was a promotional video created for a fictional
              company chosen in our video storytelling class. <br /> <br />
              Our group selected a travel agency, and the goal was to produce a
              2–5 minute piece based on the storyboard we developed in the
              previous term.
            </p>
          </DetailBox>
          </FadeInOnScroll>
    <div id="concept"></div>
    <FadeInOnScroll>
          <DetailBox title="CONCEPT & DIRECTION" colorClass="green">
            <p>
              At first, we planned a typical story of an international student
              who feels lonely after arriving in Canada but eventually finds joy
              through online friendships during the pandemic. <br /> <br />
              However, I was in charge of directing and editing, and I asked
              myself "Do I really want to make this story?" I noticed that the
              team wasn’t very enthusiastic either, so I proposed something more
              fun to create, something that would reflect our real experiences.
            </p>
          </DetailBox>
          </FadeInOnScroll>

    <div id="approach"></div>
    <FadeInOnScroll>
          <DetailBox title="NEW APPROACH & INSPIRATION" colorClass="purple">
            <p>
              Rather than making a sugar-coated promotional video, I wanted to
              start with the reality: “Canada wasn’t exactly what I expected.” I
              had high expectations before coming here, but faced many surprises
              like being placed in a language school full of people from my own
              country, or realizing how different the environment was from what
              the travel agents told me.
              <br />
              <br />
              Over time, though, I found joy in multicultural life, especially
              the shared food and culture, and eventually came to love living in
              Canada. This personal experience shaped the new storyline: a
              humorous musical-style journey from disappointment to
              appreciation.
            </p>

            <br />
            <h3 className="story-plan-heading">Here is the story plan:</h3>
            <div className="project-slider-detail canada-slide">
              <SlideCard slideData={SlideData} />
            </div>
          </DetailBox>
          </FadeInOnScroll>

    <div id="music"></div>
    <FadeInOnScroll>
          <DetailBox title="MUSIC & EDITING" colorClass="orange">
            <p>
              I wrote the lyrics in Japanese and generated the song using the AI
              music tool Suno. Since AI outcomes vary each time, I generated
              several tracks and chose the one with the most catchy, upbeat, and
              memorable melody. I also structured the video to include dramatic
              cutscenes between musical sections, making it more engaging and
              not just a simple music video.
            </p>
            <div className="text-center">
              <a
                href="https://suno.com/playlist/80ca1620-0b76-44f5-b7d8-a86db1bb8f7a"
                target="_blank"
                rel="noopener noreferrer"
                className="suno-link"
              >
                Listen to other versions
              </a>
            </div>
          </DetailBox>
          </FadeInOnScroll>

    <div id="production"></div>
    <FadeInOnScroll>
          <DetailBox title="PRODUCTION HIGHLIGHTS" colorClass="pink">
            <p>
              The video features a mix of scripted acting, vlog-style dialogue,
              original music, and comedic exaggeration. We wanted it to feel
              like a musical, but with a twist showing the honest experience of
              an international student, with both the ups and downs.
              <br />
              <br />I also used Adobe After Effects for adding motion graphics,
              transitions, and subtle visual effects to make the storytelling
              more dynamic and polished.
              <br />
              <br />
              Screenshot from Adobe After Effects, showing the “What!?!!”
              comic-style cut scene created with Loto Blush font. This editing
              process involved layering video footage with animated speech
              bubbles to enhance the playful, musical style of the campaign
              film.
            </p>
            <div className="ae-screenshot">
              <img
                src={screenShot}
                alt="Adobe After Effects editing screenshot of 'What!?!' comic-style cut scene with Loto Blush font"
                className="ae-screenshot-img"
              />
            </div>
            <p>
              During the lyric <strong>“Canada is awesome now!”</strong>, we
              intentionally matched the scene with a Vancouver mural that says
              <em>“MORE AWESOME NOW”</em>.
              <br />
              This coincidence created a powerful visual pun, linking the song
              lyric directly with real urban street art. It emphasized the
              playful yet genuine discovery of joy in Canada.
            </p>
            <div className="ae-screenshot">
              <img
                src={wall}
                alt="Mural in Vancouver with 'MORE AWESOME NOW' text, used in Canada promo video"
                className="ae-screenshot-img"
              />
            </div>
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

export default CanadaPromotionalVideo;
