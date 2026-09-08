// src/pages/Projects/VancouverBrochure/VancouverBrochure.jsx

import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useMemo } from 'react';

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
import Cover from '../../../assets/ProjectDetails/VancouverBrochure/brochure-cover.webp';
import VersionOne from '../../../assets/ProjectDetails/VancouverBrochure/brochure-v1.webp';
import FinalDesign from '../../../assets/ProjectDetails/VancouverBrochure/brochure-final.webp';

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

    if (candidates.some((c) => keys.has(c))) {
      return i;
    }
  }

  const path = norm(location?.pathname || '');

  return projects.findIndex((p) => norm(p.link) === path);
}

/* -----------------------
   buildProjectLink
------------------------- */
function buildProjectLink(proj) {
  if (!proj) return '/projects';

  if (proj.link) {
    return proj.link.replace(/\/+$/, '');
  }

  const idOrSlug = proj.slug ?? proj.id;

  return `/projects/${idOrSlug}`;
}

/* -----------------------
   Component
------------------------- */
function VancouverBrochure() {
  const params = useParams();
  const location = useLocation();

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params],
  );

  const { prevProject, nextProject } = useMemo(() => {
    const total = projects.length;

    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return {
        prevProject: null,
        nextProject: null,
      };
    }

    const prevIndex = (currentIndex - 1 + total) % total;

    const nextIndex = (currentIndex + 1) % total;

    return {
      prevProject: projects[prevIndex] || null,
      nextProject: projects[nextIndex] || null,
    };
  }, [currentIndex]);

  /* -----------------------
     Scrolling Tags
  ------------------------- */
  const baseTags = [
    'GRAPHIC DESIGN',
    'EDITORIAL DESIGN',
    'PRINT DESIGN',
    'INFORMATION DESIGN',
    'BROCHURE',
    'TYPOGRAPHY',
    'LAYOUT DESIGN',
  ];

  const tags = [...baseTags, ...baseTags];

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        {/* BACK */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">← Back to projects</span>
          </Link>
        </div>

        {/* TITLE */}
        <ProjectTitle title="Vancouver Architecture Brochure" />

        {/* HERO */}
        <FadeInOnScroll>
          <img
            src={Cover}
            alt="Downtown Vancouver Architecture Walk brochure"
            className="instagram-image"
          />
        </FadeInOnScroll>

        {/* LINKS */}
        <DetailLinks
          links={[
            {
              id: 'overview',
              label: 'Overview',
            },
            {
              id: 'version-one',
              label: (
                <>
                  Version
                  <br />
                  One
                </>
              ),
            },
            {
              id: 'improvements',
              label: (
                <>
                  Feedback &
                  <br />
                  Improvements
                </>
              ),
            },
            {
              id: 'final-design',
              label: (
                <>
                  Final
                  <br />
                  Design
                </>
              ),
            },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* SOFTWARE / ROLE / FORMAT */}
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
                  <li>Information Designer</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox size="S" title="DURATION" colorClass="yellow">
                <ul>
                  <li>July 2026</li>
                  <li>Revised August 2026</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* OVERVIEW */}
          <div id="overview"></div>

          <FadeInOnScroll>
            <DetailBox title="Overview" colorClass="pink">
              <p>
                Vancouver Architecture Brochure is a personal project designed
                as a self-guided walking tour featuring six architectural
                landmarks in downtown Vancouver.
                <br />
                <br />I designed the brochure as a visitor guide that could be
                distributed at hotels and other tourist locations. The route is
                planned so visitors can reach the starting point by public
                transit and explore the city on foot. The final design combines
                architectural information, transit directions, a walking route,
                and a detailed map in a compact tri-fold format.
              </p>
            </DetailBox>
          </FadeInOnScroll>

          {/* VERSION ONE */}
          <div id="version-one"></div>

          <FadeInOnScroll>
            <DetailBox title="Version One" colorClass="green">
              <p>
                For the first version, I created a clean and minimal design that
                could appeal to a wide range of age groups. I used fresh blue
                tones as the primary color palette to give the brochure a simple
                and approachable look.
                <br />
                <br />
                The brochure introduced six architectural landmarks with basic
                building information, walking distance, estimated time, and a
                simplified map showing the route through downtown Vancouver.
              </p>

              <div className="image-wrapper" style={{ marginTop: '2rem' }}>
                <img
                  src={VersionOne}
                  alt="First version of Vancouver architecture brochure"
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* IMPROVEMENTS */}
          <div id="improvements"></div>

          <FadeInOnScroll>
            <DetailBox title="Feedback & Improvements" colorClass="purple">
              <p>
                Feedback suggested that the first design felt too
                business-oriented and did not fully communicate the excitement
                of travel and exploring Vancouver.
                <br />
                <br />
                There were also usability issues. The map showed numbered
                destinations, but did not explain how visitors could reach the
                starting point. Important information such as “About the Guide”
                was also placed on the back panel, making it easy to overlook.
                <br />
                <br />
                Based on this feedback, I revised both the visual design and the
                information structure to create a more engaging and practical
                travel guide.
              </p>
              <br />

              <ul>
                <li>
                  Added an illustration of people walking to create a more
                  enjoyable and travel-focused atmosphere
                </li>

                <li>
                  Added photos of the featured architecture to the front cover
                  so visitors can immediately see what they will discover on the
                  tour
                </li>

                <li>
                  Recreated the map in Illustrator with a simpler and clearer
                  visual style
                </li>

                <li>
                  Added major landmarks and parks, including Canada Place and BC
                  Place, to provide more context for navigating the city
                </li>

                <li>
                  Replaced the rigid visual style with rounded shapes, curved
                  elements, and softer image treatments to create a more
                  friendly and inviting design
                </li>

                <li>
                  Added a clear starting point and directions from
                  Yaletown–Roundhouse Station to help visitors begin the walking
                  tour
                </li>

                <li>
                  Reorganized the information hierarchy so important guide
                  information is easier to find
                </li>
              </ul>
            </DetailBox>
          </FadeInOnScroll>

          {/* FINAL DESIGN */}
          <div id="final-design"></div>

          <FadeInOnScroll>
            <DetailBox title="Final Design" colorClass="orange">
              <p>
                The final design transforms the brochure into a more inviting
                and practical travel guide while maintaining a clean and
                easy-to-follow layout.
                <br />
                <br />
                Softer shapes, architectural photography, and playful
                illustrations create a more enjoyable sense of exploration,
                while the redesigned map and clearer information hierarchy make
                the walking tour easier to navigate.
                <br />
                <br />
                The final brochure balances visual appeal with functionality,
                helping visitors discover Vancouver’s architecture and enjoy
                exploring the city on foot.
              </p>

              <div className="image-wrapper" style={{ marginTop: '2rem' }}>
                <img
                  src={FinalDesign}
                  alt="Final Vancouver architecture walking tour brochure"
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>
        </div>

        {/* PREV / NEXT */}
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

export default VancouverBrochure;
