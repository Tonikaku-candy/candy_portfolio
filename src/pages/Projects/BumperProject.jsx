import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/TagBar.css';
import DetailBox from '../../components/ProjectDetail/DetailBox';
import '../../components/ProjectDetail/DetailBox.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import './ProjectsDetailLayout.css';
import ScrollingTagBar from '../../components/ProjectDetail/ScrollingTagBar';
import '../../components/ProjectDetail/ScrollingTagBar.css';
import './BumperProject.css';
import ProjectTitle from '../../components/ProjectDetail/ProjectTitle';

// photo slide
import SlideCard from '../../components/ProjectDetail/SlideCard.jsx';
import SlideData from '../../components/ProjectDetail/BumperSlideData.js';
import '../../components/ProjectDetail/SlideCard.css';

// image
import brainstormingImage from '../../assets/ProjectDetails/Bumper/bumper-origin-visual.png';
// import inspirationImage from '../../assets/ProjectDetails/Bumper/colorful-staircase.jpg';
import greenBgWorks from '../../assets/home/header/green-bg-top.png';

const baseTags = [
  'CONTENT CREATION',
  'FASHION',
  'MOTION GRAPHICS',
  'GRAPHIC DESIGN',
  'BRANDING',
  'ANIMATION',
  'KAWAII',
  'MAXIMALIST',
];

const tags = [...baseTags, ...baseTags, ...baseTags];

function BumperProject() {
  const { id } = useParams();

  const [selectedTag, setSelectedTag] = useState('');
  return (
    <>
      <div className="project-detail-page">
        <ScrollingTagBar tags={tags} />

        <div className="back-to-works top">
          <Link to="/works" className="back-button">
            ← Back to Works
          </Link>
        </div>
        <ProjectTitle title="Bumper Opener Video" />
        {/* <div className="subtitles">
        <h1 className="detail-title">Bumper Opener Video</h1>
      </div> */}
        <div className="video-wrapper">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/edQKh4PadsY?si=2wn-yiRTmYtBCtMv"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="detail-box-wrapper">
          <div className="project-grid">
            <DetailBox size="S" title="SOFTWARE" colorClass="blue">
              <ul>
                <li>After Effects</li>
                <li>Photoshop</li>
                <li>Illustrator</li>
              </ul>
            </DetailBox>

            <DetailBox
              size="S"
              title="ROLE"
              colorClass="red"
              extraClass="small-padding-box"
            >
              <ul>
                <li>Direction & Motion</li>
                <li>Design & Pixel Art</li>
                <li>Costume by Me</li>
              </ul>
            </DetailBox>

            <DetailBox
              size="S"
              title="DURATION"
              colorClass="yellow"
              extraClass="small-padding-box"
            >
              <p className="tight-paragraph">June 4 – June 7, 2025</p>
            </DetailBox>
          </div>

          <DetailBox title="OVERVIEW" colorClass="pink">
            <p>
              This short animated bumper was created to open a video series.
              <br />
              I aimed to reflect my playful, quirky style while showcasing
              motion graphics skills in Adobe After Effects.
              <br />
              The piece explores timing, typography, visual rhythm, and
              transitions to deliver a fun and cohesive intro.
            </p>
          </DetailBox>

          <DetailBox title="INSPIRATION" colorClass="green">
            <div className="box-split">
              <div className="box-text">
                <p>
                  My main inspiration came from my love for colorful, maximalist
                  design — and even a few weird dreams.
                  <br />
                  Like in fashion, I enjoy mixing patterns and wanted the
                  animation to reflect that energy.
                  <br />I also made sure the process was fun for me. I wanted to
                  feel excited every time I watched it — and that feeling guided
                  the creative direction. One key inspiration for this animation
                  was the colorful staircase in my parents' home. It was
                  handmade by my dad, and I painted it myself. That
                  staircase has always been one of my favorite spots — full of
                  color, memories, and creativity.
                  <br />
                  <br />
                  When I was animating a pixel art of a ramen bowl inside an
                  emoji’s mouth, I suddenly thought: what if I added a staircase
                  leading up to the ramen? That idea turned into a quirky way to
                  show my growing obsession with ramen — like I was literally
                  climbing toward it.
                  <br />
                  <br />
                  Including that staircase made the piece feel more personal. It
                  wasn’t just about ramen anymore — it became a tribute to my
                  life, my family, and the playful way I’ve always
                  approached design.
                </p>
              </div>
           

              <div className="project-slider-detail">
                <div className="project-slider-detail">
                  <SlideCard />
                </div>
              </div>
            </div>
          </DetailBox>

          <DetailBox title="BRAINSTORMING" colorClass="purple">
            <div className="box-split">
              <div className="box-text">
                <p>
                  At first, I didn’t have a concrete plan. I just knew I wanted
                  to make something energetic and full of personality. While
                  working on a T-shirt design for my Japanese teaching
                  Instagram, I had the idea to bring that same chaotic vibe into
                  motion.
                  <br />
                  <br />
                  I started by choosing background music that made me want to
                  move — that helped spark the mood I wanted. I also
                  experimented with some of my past pixel art pieces and
                  thought, “This could totally come to life with rhythm and
                  motion.”
                  <br />
                  <br />
                  I didn’t storyboard or sketch much — I prefer to build and
                  adjust as I go — but I tried different layouts, color
                  palettes, and animations until it felt right. It was a very
                  intuitive process, driven by trial and error.
                  <br />
                  <br />I also used some photos and videos I had taken during a
                  trip to Japan — you can't really tell it's Japan from the
                  background, but I liked the personal touch it added to the
                  piece.
                </p>
              </div>
              <div className="box-image">
                <img
                  src={brainstormingImage}
                  alt="Original Visual Inspiration"
                  className="bumper-inspiration"
                />
              </div>
            </div>
          </DetailBox>

          <DetailBox title="PROCESS" colorClass="orange">
            <ol>
              <li>
                Decided on the background music first to set the tone and pacing
                of the animation.
              </li>
              <li>
                Chose what I wanted to show — mainly my original pixel art
                pieces that reflect my style.
              </li>
              <li>
                Created supporting assets that matched the theme and visuals of
                the pixel animation.
              </li>
              <li>
                Synchronized the animation with the rhythm of the music to
                create an engaging flow.
              </li>
              <li>
                Added fun details, such as playful tiny texts and hidden visual
                elements for viewers to discover.
              </li>
            </ol>
          </DetailBox>

          <DetailBox title="CHALLENGES" colorClass="blue">
            <p>
              This was one of my first projects using After Effects — I had only
              been learning the software for about three weeks. Figuring out how
              to combine different animations, masks, and effects was both
              exciting and challenging.
              <br />
              <br />
              Initially, I wanted to create and animate to my own original song,
              but I realized it would take too much time and shift my focus away
              from the visuals. So I decided to use a pre-made track and
              concentrate fully on the animation itself.
              <br />
              <br />
              Another challenge was finding the balance between visual chaos and
              clarity. I experimented with motion, color, and rhythm to make
              sure the animation felt dynamic and engaging, without becoming
              overwhelming.
            </p>
          </DetailBox>
        </div>
        <div className="back-to-works">
          <Link to="/works" className="back-button">
            ← Back to Works
          </Link>
        </div>
        <img
          src={greenBgWorks}
          className="green-bg-works bumper"
          alt="section top decoration"
        />
      </div>
      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default BumperProject;
