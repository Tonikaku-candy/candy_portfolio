// src/pages/Projects/Instagram/JapaneseInstagramProject.jsx

import React, { useState } from 'react';
import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox';
import '../../../components/ProjectDetail/DetailBox.css';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import '../ProjectsDetailLayout.css';
import '../../Projects/Instagram/JapaneseInstagramProject.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle';
import ProcessSteps from '../../../components/ProjectDetail/ProcessSteps';
import SlideCard from '../../../components/ProjectDetail/SlideCard';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';

import SlideData from './InstagramSlideData.js';

// image
import instagramImage from '../../../components/assets/japanese-instagram-content-posts.webp';

const baseTags = [
  'CONTENT CREATION',
  'SOCIAL MEDIA',
  'JAPANESE LANGUAGE',
  'MARKETING',
  'INSTAGRAM',
  'DESIGN',
];
const tags = [...baseTags, ...baseTags];

function JapaneseInstagramProject() {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        <div className="back-to-works top">
          <Link to="/works" className="back-button">
            ← Back to projects
          </Link>
        </div>

        <ProjectTitle title="INSTAGRAM CONTENT CREATION" />

        <img
          src={instagramImage}
          alt="Sample layout of Instagram content posts for Japanese learning project"
          className="instagram-image"
        />

        <DetailLinks
          links={[
            { id: 'overview', label: 'OVERVIEW' },
            { id: 'concept', label: 'concept' },
            { id: 'strategy', label: 'strategy' },
            { id: 'engagement', label: 'engagement' },
          ]}
        />
        <div className="detail-box-wrapper">
          <div className="project-grid">
            <DetailBox size="S" title="SOFTWARE" colorClass="blue">
              <ul>
                <li>Photoshop</li>
                <li>Instagram Insights</li>
                <li>CapCut</li>
              </ul>
            </DetailBox>

            <DetailBox size="S" title="ROLE" colorClass="red">
              <ul>
                <li>Content Creator</li>
                <li>Japanese Language Instructor</li>
                <li>Social Media Manager</li>
              </ul>
            </DetailBox>

            <DetailBox
              size="S"
              title="DURATION"
              colorClass="yellow"
              extraClass="small-padding-box"
            >
              <p className="tight-paragraph">Feb – June, 2025</p>
            </DetailBox>
          </div>

          <div id="overview">
            <DetailBox title="Overview" colorClass="pink">
              <p>
                This Instagram project began as a group assignment for our
                Social Media class. I led the content creation and account
                strategy to build a playful, emotional learning experience using
                Japanese phrases. The aim was to make Japanese learning fun,
                shareable, and stylish — something that doesn’t feel like a
                textbook.
              </p>
            </DetailBox>
          </div>

          <div id="concept"></div>
          <DetailBox title="CONCEPT & INSPIRATION" colorClass="green">
            <p>
              The idea came from my past experience as a Japanese tutor — I
              realized that students want to learn practical and fun phrases
              they can actually use in real life.
              <br />
              <br />I also noticed that most Japanese learning content online
              tends to be either too formal or too boring. To make things more
              engaging, I combined casual language with elements of Japanese
              subculture such as anime references, slang, and gag-style humor.
            </p>
          </DetailBox>

          <div id="strategy"></div>
          <DetailBox title="CONTENT MARKETING STRATEGY" colorClass="purple">
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
              }}
            >
              {/* Left: Text */}
              <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
                <p>
                  Since most of our audience browses Instagram casually, I
                  focused on creating short, visually engaging posts with a
                  playful and approachable tone.
                  <br />
                  <br />
                  Each post follows a specific theme such as "Otaku Terms,"
                  "Useless Words," or "Abbreviations," making the content easy
                  to understand and enjoy—even for those without deep grammar
                  knowledge.
                  <br />
                  <br />
                  I intentionally included quirky, “useless” Japanese
                  words—phrases you’ll never find in a textbook and probably
                  never need in real life—because I felt they added a unique and
                  unexpected charm that sets our account apart from typical
                  Japanese learning pages.
                  <br />
                  <br />
                  I also maintained consistency in layout, color palette, and
                  character voice to establish a strong and recognizable brand
                  identity for the account.
                  <br />
                  <br />
                  For Reels, I focused on creating short, relatable videos that
                  highlight cultural differences between Japan and Western
                  countries.
                  <br />
                  <br />
                  Since Reels are often shown to random users who may not be
                  actively learning Japanese, I avoided direct language
                  instruction. Instead, I used humor and everyday situations to
                  grab attention and drive more viewers to our main Instagram
                  page.
                </p>
              </div>

              {/* Right: Instagram Reel */}
              <div style={{ flex: '0 0 360px' }}>
                <iframe
                  src="https://www.instagram.com/reel/DGn8h_dvgyp/embed"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  title="Instagram Reel"
                  style={{ borderRadius: '12px' }}
                ></iframe>
              </div>
            </div>
          </DetailBox>
          <div id="engagement"></div>
          <DetailBox title="ENGAGEMENT HIGHLIGHTS" colorClass="orange">
            <p>
              Even with only a few followers, our Reels managed to reach large
              audiences—proving that humor, cultural references, and unexpected
              twists can be powerful tools for engagement.
              <br />
              <br />
              One of our most popular Reels was a parody of the viral “PPAP”
              song. We turned it into a silly Japanese pun: “I have a Negi” + “I
              have a Toro” = *Negitoro* (a type of sushi).
              <br />
            </p>
            <ul>
              <li>
                <strong>2,432 views</strong> on one Reel (96.1% from
                non-followers)
              </li>
              <li>
                <strong>99 interactions</strong> total
              </li>
              <li>
                <strong>79 likes, 13 shares, and 5 saves</strong>
              </li>
              <li>
                <strong>11h 33m</strong> of total watch time
              </li>
            </ul>
            <br />
            Another featured a word game battle presented with intense,
            mock-serious visuals.
            <br />
            <ul>
              <li>
                <strong>2,019 views</strong> on one Reel (95.7% from
                non-followers)
              </li>
              <li>
                <strong>122 interactions</strong> total
              </li>
              <li>
                <strong>80 likes, 29 shares, and 9 saves</strong>
              </li>
              <li>
                <strong>6h 17m</strong> of total watch time
              </li>
              <li>
                Top discovery source: <strong>Reels tab (70.2%)</strong>
              </li>
            </ul>
            <p>
              These results confirmed that short-form content blending Japanese
              culture with internet humor resonates well—even with users who
              aren't actively studying Japanese.
            </p>
            <div className="project-slider-detail">
              <SlideCard slideData={SlideData} />
            </div>
            <div className="text-center">
              <a
                href="https://www.instagram.com/atarashiivancouver/"
                target="_blank"
                rel="noopener noreferrer"
                className="visit-instagram-button"
              >
                Visit our Instagram
              </a>
            </div>
          </DetailBox>
        </div>

        <div className="back-to-works">
          <Link to="/works" className="back-button">
            ← Back to Projects
          </Link>
        </div>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default JapaneseInstagramProject;
