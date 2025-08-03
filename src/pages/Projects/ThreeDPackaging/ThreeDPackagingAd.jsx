import React, { useState } from 'react';
import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox';
import '../../../components/ProjectDetail/DetailBox.css';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import '../ProjectsDetailLayout.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import './ThreeDPackagingAd.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle';

// image
import foodPoster from '../../../components/assets/3d-sushi-packaging-ad.png';
import sushiWip from '../../../assets/ProjectDetails/pixel-food-wip.jpg';
import foodTshirts from '../../../assets/ProjectDetails/food-tshirts.jpg';

const baseTags = [
   '3D DESIGN',
  'FASHION',
  'MOTION GRAPHICS',
  'GRAPHIC DESIGN',
  'BRANDING',
  'ANIMATION',
  'KAWAII',
  'PACKAGING DESIGN',
];

const tags = [...baseTags, ...baseTags, ...baseTags];

function ThreeDPackagingAd() {
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

        <ProjectTitle title="3D PACKAGING AD -Apparel motion design" />

        <div className="video-wrapper poster">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/G6H-fgIViEs?si=yS7B24LdF6afEX3V"
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
                <li>Adobe Dimension</li>
                <li>Photoshop</li>
                <li>After Effects</li>
              </ul>
            </DetailBox>

            <DetailBox size="S" title="DURATION" colorClass="yellow">
              <p>
                May 1–2, 2024 (Pixel Pattern Design)
                <br />
                June 6–14, 2024 (3D Packaging Mockup)
                <br />
                July 27, 2024 (Animated Promo Video)
              </p>
            </DetailBox>
          </div>
          <DetailBox title="PROJECT PURPOSE" colorClass="pink">
            <p>
              This project was originally created for my own apparel brand,
              Candelicious, to showcase pixel-style food illustrations as part
              of a clothing design.
              <br />
              <br />
              However, I later adapted the designs for a 3D packaging assignment
              using Adobe Dimension. The goal was to explore how my personal
              creative work could be transformed into promotional materials
              using Adobe Dimension and After Effects.
              <br />
              <br />I also printed the design on an actual T-shirt, bringing the
              digital concept into the real world as a tangible product.
            </p>
          </DetailBox>
    
        

          <DetailBox title="INSPIRATION" colorClass="green">
            <p>
              I’ve always loved being creative, but instead of traditional
              drawing, I found that pixel art gives me a fun and accessible way
              to express my ideas visually. Its simplicity allows me to focus on
              color, shape, and personality—which matches my playful style
              perfectly.
              <br />
              <br />
              Since I also love food, I thought it would be fun to turn my
              favorite foods into pixel designs. The idea of combining food and
              fashion felt natural to me, and I wanted to bring a playful and
              appetizing vibe to my brand. The inspiration behind this project
              is really just a mix of my personal tastes: pixel art, cute foods,
              and bold, fun visuals.
            </p>
          </DetailBox>

            <DetailBox title="BRAINSTORMING" colorClass="purple">
            <div className="box-split">
              <div className="box-text">
                <p>
                  This project started with a food-themed pixel pattern I
                  originally created for my apparel brand, Candelicious. While
                  working on the 3D packaging assignment, I thought it would be
                  fun to transform my 2D design into a playful promotional
                  concept that blends fashion and food.
                  <br />
                  <br />
                  I surrounded the clothing mockups with real food photos and
                  added a photo of a hand holding chopsticks, as if it were
                  picking up the food on the T-shirt, to make the visuals more
                  dynamic and quirky. The phrase “Wear What You Crave” came
                  naturally as a fun tagline that connects the themes of fashion
                  and food.
                  <br />
                  <br />I began by thinking about what kind of items would best
                  reflect my brand identity. Since I’m Japanese and love pixel
                  art, I decided to combine both. I made a small list of cute
                  foods and chose ramen, sushi, and onigiri because they’re fun
                  to draw and popular with many people. I also included
                  California rolls and other recognizable sushi types so the
                  design would feel familiar to people outside of Japan as well.
                </p>
              </div>
              <div className="box-image sushi">
                <img
                  src={sushiWip}
                  className="sushi-wip"
                  alt="Work in progress of pixel art design"
                />
              </div>
            </div>
          </DetailBox>

          <DetailBox title="PROCESS" colorClass="orange">
            <div className="box-split">
              <div className="box-text">
                <ol>
                  {/* add more about software */}
                  <li>
                    Started by designing pixel-style food illustrations (like
                    ramen, sushi, and onigiri) in Photoshop for my apparel
                    brand, Candelicious.
                  </li>
                  <li>
                    Turned the food pattern into a T-shirt design and created 3D
                    mockups using Adobe Dimension.
                  </li>
                  <li>
                    Composed a poster-style layout in Dimension by surrounding
                    the T-shirt with food images and adding a hand with
                    chopsticks to create a fun, playful scene.
                  </li>
                  <li>
                    Came up with the tagline “Wear What You Crave” to connect
                    the idea of fashion and food.
                  </li>
                  <li>
                    Although I didn’t originally plan to animate it, I thought
                    the poster would look even cuter in motion — so I created an
                    animated version in After Effects using the same assets.
                  </li>
                  <li>
                    I also included a photo of the actual printed T-shirt I made
                    using the same pattern, bringing the design from digital to
                    physical form.
                  </li>
                </ol>
              </div>
              {/* image could be thumnail and when you clic make it bigger */}

              <div className="box-image tshirts">
                <img
                  src={foodTshirts}
                  className="food-shirts"
                  alt=" T-shirts with pixel food pattern"
                />
              </div>
            </div>
          </DetailBox>

          <DetailBox title="CHALLENGES" colorClass="blue">
            <ul>
              <li>
                Since I’m not confident in drawing detailed illustrations, I
                focused on pixel art, which allowed me to express my ideas
                clearly while keeping the design simple and cute.
              </li>
              <li>
                I had never used Adobe Dimension before, so learning how to
                arrange 3D mockups and adjust lighting and camera angles took
                some trial and error.
              </li>
              <li>
                Balancing the composition of food elements, the T-shirt, and
                chopsticks in a way that felt playful but not cluttered required
                a lot of tweaking.
              </li>
              <li>
                One of the biggest challenges was adjusting the shadow
                directions. My instructor pointed out that some shadows were
                inconsistent and made the lighting look confusing, so I went
                back and corrected them to create a more believable and polished
                result.
              </li>
              <li>
                Animating the scene in After Effects was a spontaneous idea, and
                it was challenging to make the static poster assets feel alive
                while keeping the timing cute and catchy.
              </li>
            </ul>
          </DetailBox>
            <img
            src={foodPoster}
            className="food-poster"
            alt="Wear What You Crave campaign poster showing a pixel art T-shirt with food graphics"
          />
        </div>
        <div className="back-to-works">
          <Link to="/works" className="back-button">
            ← Back to Works
          </Link>
        </div>
    
      </div>
      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default ThreeDPackagingAd;
