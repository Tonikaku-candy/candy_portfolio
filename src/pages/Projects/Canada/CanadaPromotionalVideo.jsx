// src/pages/Projects/Canada/CanadaPromotionalVideoFilm.jsx

import React, { useState } from 'react';
import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import '../../Projects/Canada/CanadaPromotionalVideo.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';




// image

const baseTags = [
  'CONTENT CREATION',
  'VIDEO EDITING',
  'PROMOTIONAL VIDEO',
  'MARKETING',
  'STORYTELLING',
];
const tags = [...baseTags, ...baseTags];

function CanadaPromotionalVideo() {
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

        <ProjectTitle title="“Canada Ain’t What I Thought!” – Promotional Short Film" />
<div className='video-wrapper canada'>
        <iframe 
          width="560"
          height="315"
          src="https://www.youtube.com/embed/a3DQwQlLYbs?si=dWl7Kf6ajfWYsc_b"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        </div>

        <div className="detail-box-wrapper">
          <div className="project-grid">
            <DetailBox size="S" title="SOFTWARE" colorClass="blue">
              <ul>
                <li>Photoshop</li>
                <li>Premiere Pro</li>
                <li>After Effects</li>
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
              <p className="tight-paragraph canada">
                {' '}
                <ul>
                  <li>March 20th – April 11th, 2025</li>
                  <li>Re-edited August 4th, 2025</li>
                </ul>
              </p>
            </DetailBox>
          </div>

          <DetailBox title="Overview" colorClass="pink">
            <p>
              This project was a promotional video created for a fictional
              company chosen in our video storytelling class. <br /> <br /> Our
              group selected a travel agency, and the goal was to produce a 2–5
              minute piece based on the storyboard we developed in the previous
              term.
            </p>
          </DetailBox>

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

          <DetailBox title="NEW APPROACH &  INSPIRATION" colorClass="purple">
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
                Rather than making a sugar-coated promotional video, I wanted to
                start with the reality: “Canada wasn’t exactly what I expected.”
                I had high expectations before coming here, but faced many
                surprises like being placed in a language school full of people
                from my own country, or realizing how different the environment
                was from what the travel agents told me.
                <br />
                <br />
                Over time, though, I found joy in multicultural life, especially
                the shared food and culture, and eventually came to love living
                in Canada. This personal experience shaped the new storyline: a
                humorous musical-style journey from disappointment to
                appreciation.
              </p>
            </div>
          </DetailBox>
          <DetailBox title="MUSIC & EDITING" colorClass="orange">
            <p>
              I wrote the lyrics in Japanese and generated the song using the AI
              music tool Suno. Since AI outcomes vary each time, I generated
              several tracks and chose the one with the most catchy, upbeat, and
              memorable melody. I also structured the video to include dramatic
              cutscenes between musical sections, making it more engaging and
              not just a simple music video.
            </p>
          </DetailBox>

          <DetailBox title="PRODUCTION HIGHLIGHTS" colorClass="pink">
            <p>
              The video features a mix of scripted acting, vlog-style dialogue,
              original music, and comedic exaggeration. We wanted it to feel
              like a musical, but with a twist showing the honest experience of
              an international student, with both the ups and downs.
            </p>
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

export default CanadaPromotionalVideo;
