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

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';

import SlideData from './MagicMusicStoryboardData.js';

// image
import production1 from '../../../assets/ProjectDetails/MagicMusicMv/production.gif';

import production2 from '../../../assets/ProjectDetails/MagicMusicMv/production-before-after.gif';
import production3 from '../../../assets/ProjectDetails/MagicMusicMv/karate-scene.gif';
import production4 from '../../../assets/ProjectDetails/MagicMusicMv/sunset-scene.gif';
import production5 from '../../../assets/ProjectDetails/MagicMusicMv/fashion-show-scene.gif';
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
function MagicMusicMv() {
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
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'MUSIC VIDEO',
    'HANDMADE CLOTHES',
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

        <ProjectTitle title="Magic Music - Music Video" />
        <FadeInOnScroll>
          <div className="video-wrapper rhythm-video">
            <iframe
              src="https://www.youtube.com/embed/VN9nHoXtddE?si=pGI9K4UByQIAX1P3"
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
            { id: 'inspiration', label: 'Inspiration' },
            { id: 'production', label: 'Production' },
            { id: 'challenges', label: 'Challenges' },
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
                  <li>Costume Maker/Stylist</li>
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
                  <li className="game">June 15th – July 2nd, 2025</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          <div id="overview"></div>
          <FadeInOnScroll>
            <DetailBox title="Overview" colorClass="pink">
              <p>
                A fan-made music video created in Adobe After Effects, focusing
                on beat-synced motion, bold type, and colorful visuals. Clothes
                are mostly handmade by Candy, blending fashion craft with motion
                design to create a playful, Harajuku-inspired mood.
                <br />
                <br />
                My goal was to take something silly seriously. Instead of one
                unified style, the video embraces variety—mixing aesthetics,
                tones, and textures so each scene feels unexpected and fresh.
                The intent is to keep viewers constantly surprised, visually
                stimulated, and never sure what comes next.
                <br />
                <br />
                Many scenes were filmed on green screen and composited later.
                Early planning began with a detailed storyboard, which I will
                introduce in the following section. This helped translate
                initial sketches into live-action shots, later composited
                digitally.
                <br />
                <br />
                Overall, the mood is colorful, surreal, and intentionally
                chaotic—combining humor, absurdity, visual metaphors, and
                cultural references into a vibrant journey.
              </p>
            </DetailBox>
          </FadeInOnScroll>

          <div id="inspiration"></div>
          <FadeInOnScroll>
            <DetailBox title="INSPIRATION" colorClass="green">
              <p>
                This project was inspired by Harajuku street fashion, playful
                pop visuals, and the energetic rhythm of Kaela Kimura’s song
                “Magic Music.” Because the song itself is bright and fun — and
                the official MV is already chaotic — I wanted to push this
                energy even further by turning my project into something like
                “colorful visual overload.”
              </p>
              <br />

              <p>
                Instead of keeping it safe with a traditional lyric video, I
                took the opportunity of having my teacher’s support to
                experiment wildly. It was my first time using green screen
                compositing, and I decided to appear in the video myself —
                though often hiding behind sunglasses or digital effects to
                disguise my face. Ironically, this shyness turned into a strange
                and funny part of the video’s personality.
              </p>
              <br />

              <p>
                Overall, the video is colorful, surreal, and intentionally
                chaotic — combining humor, absurdity, visual metaphors, and
                cultural references into what I call a “crazy MV packed with
                everything I wanted to try.”
              </p>
              <div className="project-slider-detail">
                <SlideCard slideData={SlideData} />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="production"></div>
          <FadeInOnScroll>
            <DetailBox title="Production" colorClass="purple">
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
                  Although the MV may appear random, the chaos is carefully
                  structured. <strong>At 0:44–0:49, </strong>I built a sequence around image
                  references: a pixelated clip humorously labeled “4K,” a reveal
                  of a hidden green suit, and rotobrush/mask work that allowed
                  text to appear only on my face and hands.
                </p>
                <div className="gif-wrapper small">
                  <img
                    src={production1}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                <p>
                  <strong>From 0:51 to 1:09,</strong> I created a sequence based on the lyric
                  “sexy girl.” A woman at the beach turns around to reveal a
                  clown face, blows a kiss, and a heart flies out. In the next
                  karate scene, the heart gets punched to the right in rhythm
                  with the beat. Finally, during the stage performance, the
                  heart flies in from the left, hits the singer’s head, and
                  shatters. These three moments are linked together through the
                  recurring heart motif.
                </p>
                <div className="gif-wrapper small">
                  <img
                    src={production2}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                <p>
                  The karate and stage scenes were especially meaningful because
                  they reinterpret animations I had previously created in my{' '}
                  <Link
                    to="/projects/rhythm-game"
                    className="link-pink"
                  >
                    “Rhythm Game Animation project"
                  </Link>
                  ,now brought into live-action form. I had imagined doing them
                  myself back when I first made the animation, so this MV gave
                  me the chance to realize that idea in practice.
                </p>
                <div className="gif-wrapper small">
                  <img
                    src={production3}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                <p>
                  <strong>At 1:25,</strong> the opening scene reappears in an evening version to
                  signal the ending. These details show how the humor and chaos
                  were tied back into a deliberate framework.
                </p>
                <div className="gif-wrapper small">
                  <img
                    src={production4}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                <p>
                  <strong>From 1:14 to 1:22,</strong> I staged a fashion show scene to showcase
                  the clothes I had personally designed. Since the song is
                  titled “Magic Music,” I also added a playful moment where I
                  cast a spell on a dress form, transforming it as if my
                  handmade clothing came to life. This sequence allowed me to
                  integrate my background in fashion design into the MV in both
                  a literal and surreal way. Because the green screen setup
                  muted the colors of my rainbow outfit in other scenes, this
                  became the place where I could highlight it more directly.
                </p>
                <div className="gif-wrapper small">
                  <img
                    src={production5}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                <p>
                  This MV was something I could only create at this point in my
                  life. I included playful details such as featuring classmates
                  and my teacher’s face in unexpected places, along with small
                  hidden elements scattered throughout. Because of these layers,
                  the video feels fresh each time you watch it, always offering
                  new discoveries.
                </p>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          <div id="challenges"></div>
          <FadeInOnScroll>
            <DetailBox title="CHALLENGES & SOLUTIONS" colorClass="orange">
              <p>
                One of the biggest challenges came from using the Rotobrush
                tool. It made my computer extremely slow, especially since I
                shot some footage on my phone where the frame rate couldn’t be
                controlled. This meant I had to constantly adjust the
                composition’s frame rate whenever applying the Rotobrush.
              </p>
              <br />

              <p>
                Through trial and error, I learned that pre-combining all clips
                into a single video before applying the Rotobrush solved this
                issue. This way, I no longer had to change frame rate settings
                for every composition.
              </p>
              <br />

              <p>
                Another challenge was managing the large file size caused by
                using many nested compositions. To avoid slowing down my
                computer, I realized I could have split the project into a
                “first half” and “second half,” then combined them at the end.
                This workflow would have kept the files lighter and more
                efficient.
              </p>
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

export default MagicMusicMv;
