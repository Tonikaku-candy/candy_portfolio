// src/pages/Projects/Shiseido/ShiseidoPackage.jsx

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

// images
import Poster from '../../../assets/ProjectDetails/Shiseido/ultimune-final-poster.webp';
import Moodboard from '../../../assets/ProjectDetails/Shiseido/ultimune-moodboard.webp';
import Process from '../../../assets/ProjectDetails/Shiseido/ultimune-horse-process.webp';
import Package from '../../../assets/ProjectDetails/Shiseido/shiseido-ultimune-packag.webp';

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
function ShiseidoPackage() {
  const params = useParams();
  const location = useLocation();

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
    'ILLUSTRATION',
    'GRAPHIC DESIGN',
    'PACKAGING',
    'POSTER DESIGN',
    'BRANDING',
    'BEAUTY VISUALS',
    'COSMETICS DESIGN',
  ];
  const tags = [...baseTags, ...baseTags];

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        {/* Back button */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">← Back to projects</span>
          </Link>
        </div>

        {/* TITLE */}
        <ProjectTitle
          className="long-title"
          title="Shiseido Ultimune Package Design"
        />

        <FadeInOnScroll>
          <img
            src={Poster}
            alt="Shiseido Ultimune New Year concept poster"
            className="instagram-image"
          />
        </FadeInOnScroll>

        {/* LINKS */}
        <DetailLinks
          links={[
            { id: 'overview', label: 'Overview' },
            {
              id: 'moodboard',
              label: (
                <>
                  Research &
                  <br />
                  Moodboard
                </>
              ),
            },
            {
              id: 'process',
              label: (
                <>
                  {' '}
                  Design
                  <br />
                  Process
                </>
              ),
            },
            { id: 'product', label: 'Product Design' },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* SOFTWARE / ROLE / DURATION */}
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox size="S" title="SOFTWARE" colorClass="blue">
                <ul>
                  <li>Illustrator</li>
                  <li>Photoshop</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="ROLE" colorClass="red">
                <ul>
                  <li>Graphic Designer</li>
                  <li>Illustrator</li>
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
                <ul className="tight-paragraph">
                  <li>Nov 21 - 23, 2025</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* OVERVIEW */}
          <div id="overview"></div>
          <FadeInOnScroll>
            <DetailBox title="Overview" colorClass="pink">
              <p>
                This is an unofficial concept project inspired by Shiseido’s
                2026 New Year edition. <br></br>I created a geometric horse
                illustration representing the Year of the Horse, blended with
                Shiseido’s camellia motifs and signature Ultimune red. The
                concept includes a poster design and a packaging mockup.
              </p>
            </DetailBox>
          </FadeInOnScroll>

          {/* MOODBOARD */}
          <div id="moodboard"></div>
          <FadeInOnScroll>
            <DetailBox title="Research & Moodboard" colorClass="green">
              <p>
                To develop this concept, I researched Shiseido’s visual
                identity, focusing on its signature reds, soft gradients, and
                minimal-yet-luxurious aesthetic. I also analyzed previous
                limited-edition Ultimune releases to understand how the brand
                incorporates cultural themes. The target audience I envisioned
                was women in their late 20s to 40s who enjoy high-end skincare
                and prefer designs that are minimal, elegant, and subtly cute
                with just the right amount of vibrance.
              </p>
              <br />
              <p>
                For the Lunar New Year direction, I explored motifs connected to
                the Year of the Horse and the symbolism of camellia (tsubaki),
                which represents beauty, strength, and renewal. Since camellia
                extract is also an ingredient used in Ultimune formulas, I felt
                this motif was essential. These ideas guided the color palette,
                composition, and geometric illustration style throughout the
                project.
              </p>

              <div className="image-wrapper">
                <img src={Moodboard} alt="Moodboard" />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* PROCESS */}
          <div id="process"></div>
          <FadeInOnScroll>
            <DetailBox title="Design Process" colorClass="purple">
              <p>
                I designed a 2026 New Year concept for Shiseido’s Ultimune
                because the brand has released special New Year editions in the
                past. Since 2026 is the Year of the Horse, I created a design
                centered around a geometric horse motif.
                <br></br>
                <br></br>
                Shiseido’s holiday collections often use gold accents, so I
                incorporated gold elements into the horse illustration to match
                the brand’s visual identity. I wanted to avoid a retro look that
                might feel outdated, so I explored geometric patterns to create
                a modern and stylish impression.
                <br></br>
                <br></br>
                During the design process, I experimented with different shapes
                and compositions to find a balance that felt bold yet elegant.
                The final illustration features clean geometric forms and
                layered gradients, with a camellia flower blended into the
                silhouette to symbolize beauty, harmony, and renewal.
              </p>
              <div className="image-wrapper">
                <img src={Process} alt="Process" />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Product */}
          <div id="product"></div>
          <FadeInOnScroll>
            <DetailBox title="Product Design" colorClass="orange">
              <p>
                For the final product design, I placed the geometric horse
                illustration onto the Ultimune bottle and box, carefully
                adjusting shapes and colors so the artwork blended naturally
                with Shiseido’s signature red aesthetic. The gold accents
                highlight the New Year theme, while the camellia motif connects
                back to both Japanese culture and the Ultimune formula itself.
                My goal was to create a limited-edition look that feels modern,
                elegant, and visually charming—something collectors would want
                to display rather than simply use.
              </p>
              <br></br>
              <p>
                The scattered shapes surrounding the horse illustration came
                from an idea I discovered while experimenting with different
                geometric compositions. As I moved and rearranged the shapes
                during the design process, I found that these accents added a
                sense of movement and rhythm to the overall visual.
              </p>

              <div className="image-wrapper" style={{ marginTop: '2rem' }}>
                <img src={Package} alt="Packaging Mockup" />
              </div>
            </DetailBox>
          </FadeInOnScroll>
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

export default ShiseidoPackage;
