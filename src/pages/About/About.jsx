import './About.css';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect } from 'react';

// images
import ufoImage from '../../assets/About/rabbit-ufo.svg';
import lightImage from '../../assets/About/light.svg';
import girlImage from '../../assets/About/girl.png';
import aboutBlueBgTop from '../../assets/About/blue-bg-top.png';
import profilePicture from '../../assets/About/candy-profile-picture.JPG';
import myLookTitleImage from '../../assets/home/my-look/dress-icon.png';
import aboutYellowBgTop from '../../assets/About/about-yellow-bg-top.png';
import aboutYellowBgBottom from '../../assets/About/about-yellow-bg-bottom.png';

//icons
import illustratorIcon from '../../assets/About/icons/illustrator-icon.png';
import aftereffectsIcon from '../../assets/About/icons/aftereffects-icon.png';
import canvaIcon from '../../assets/About/icons/canva-icon.png';
import capcutIcon from '../../assets/About/icons/capcut-icon.png';
import cssIcon from '../../assets/About/icons/css-icon.png';
import figmaIcon from '../../assets/About/icons/figma-icon.png';
import htmlIcon from '../../assets/About/icons/html-icon.png';
import indesignIcon from '../../assets/About/icons/indesign-icon.png';
import javascriptIcon from '../../assets/About/icons/javascript-icon.png';
import photoshopIcon from '../../assets/About/icons/photoshop-icon.png';
import premiereproIcon from '../../assets/About/icons/premierepro-icon.png';
import reactIcon from '../../assets/About/icons/react-icon.png';
import tailwindIcon from '../../assets/About/icons/tailwind-icon.png';
import wordpressIcon from '../../assets/About/icons/wordpress-icon.png';
import profileBg from '../../assets/About/sakura-bg.jpg';
import profile1 from '../../assets/About/candy-profile1.png';
import profile2 from '../../assets/About/candy-profile2.png';
import colorfulChameleon from '../../assets/About/colorful-chameleon.png';





function About() {
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      const chameleon = document.querySelector('.colorful-chameleon');
      if (entry.isIntersecting) {
        chameleon.classList.remove('animate'); // アニメ用クラスを一度外す
        void chameleon.offsetWidth; // リフローさせて強制再描画
        chameleon.classList.add('animate'); // もう一回つける
      }
    },
    { threshold: 0.5 }
  );

  const target = document.querySelector('.chameleon-wrapper');
  if (target) observer.observe(target);

  return () => observer.disconnect();
}, []);

  return (
    <>
      {/* hello section */}
      <div className="hello-section">
        <div className="hello-content-wrapper">
          <div className="hello-text">
            <h1>
              <span className="hello-title-top">HELLO, I'M</span>
              <br />
              <span className="hello-title-bottom">CANDY!</span>
            </h1>
            <p className="hello-subtitle">
              Creating a colorful world <br />
              inspired by Japanese <br />
              kawaii culture ✨
            </p>
          </div>

          <div className="ufo-wrapper">
            <img src={lightImage} alt="light" className="light" />
            <img src={ufoImage} alt="rabbit-ufo" className="ufo" />
            <img src={girlImage} alt="girl" className="girl" />
          </div>
        </div>
      </div>

      {/* hello section end */}

      {/* about section */}
      <div className="about-page-section">
        <img
          src={aboutBlueBgTop}
          alt="section bottom decoration"
          className="about-blue-bg"
        />
        {/* Section Title & Text Box */}
        <div className="about-card">
          <h2 className="about-section-title">ABOUT</h2>
          <div className="about-page-content">
            <div className="about-page-text">
              <h3>I’m Candy!</h3>
              <p>
                I’m a New Media student at BCIT, originally from Japan.
                <br />
                <br />
                Before starting this program, I had almost no experience with
                technology — I could barely use a computer. But through this
                journey, I’ve discovered a true passion for creating digital
                work that blends fun, weirdness, and heartfelt expression.
                <br />
                <br />
                My creative style is inspired by Japanese kawaii culture,
                Harajuku fashion, and pixel art. I love bold colors, playful
                aesthetics, and visuals that spark joy or curiosity.
                <br />
                <br />
                I come from a fashion design background, where I made handmade
                clothes and accessories. That experience taught me how to
                express personality through design — something I now bring into
                my digital projects.
                <br />
                <br />
                I’m also a fan of Japanese comedy, and I enjoy creating work
                that’s a little silly or chaotic — but always made with full
                sincerity. Whether it’s an animation or a quirky interface, my
                goal is to make people smile and enjoy the moment.
                <br />I may be quiet and shy in person, but my imagination is
                anything but. I’m always thinking of odd, funny ideas and
                unexpected ways to tell a story. One of my creative mottos is:{' '}
                <strong>“Make something silly, seriously.”</strong> I believe
                humor, when treated with care, can be just as powerful as any
                serious message.
                <br />
                <br />
                I like working ahead and pushing myself beyond just meeting
                deadlines because I truly want to improve, experiment, and keep
                learning. Even when I struggle, I stay committed. My dedication
                and sense of responsibility are traits I’m proud of — rooted in
                my Japanese upbringing.
                <br />
                <br />
                My personal logo<strong> — a colorful chameleon — </strong>
                reflects this mindset. It symbolizes the ability to adapt,
                explore, and grow into new creative forms, even without much
                experience. It reminds me that there’s value in trying,
                changing, and becoming.
                <br />
                <br />
                Right now, I’m focused on growing as a designer who can turn
                unique ideas into meaningful, memorable experiences. Cute,
                strange, funny — and made to make people happy.
              </p>
            </div>
            <div className="about-profile-image-wrapper">
              <img
                src={profileBg}
                alt="sakura background"
                className="about-profile-bg"
              />

              <img
                src={profile2}
                alt="Candy profile picture hover"
                className="about-profile-image side"
              />

              <img
                src={profile1}
                alt="Candy profile picture"
                className="about-profile-image front"
              />
            </div>

            {/* <div className="about-profile-image-wrapper">
              <img
                src={profilePicture}
                alt="Candy profile picture"
                className="about-profile-image"
              />
            </div> */}
          </div>

          {/* Technical Skills */}
          <div className="skills-card technical">
            <h2 className="about-section-title skill">TECHNICAL SKILLS</h2>
            <div className="skills-icons">
              <div className="icon-with-label">
                <img src={photoshopIcon} alt="Photoshop" />
                <span className="label">Photoshop</span>
              </div>

              <div className="icon-with-label">
                <img src={illustratorIcon} alt="Illustrator" />
                <span className="label">Illustrator</span>
              </div>

              <div className="icon-with-label">
                <img src={indesignIcon} alt="InDesign" />
                <span className="label">InDesign</span>
              </div>
              <div className="icon-with-label">
                <img src={aftereffectsIcon} alt="After Effects" />
                <span className="label">After Effects</span>
              </div>

              <div className="icon-with-label">
                <img src={premiereproIcon} alt="Premiere Pro" />
                <span className="label">Premiere Pro</span>
              </div>

              <div className="icon-with-label">
                <img src={figmaIcon} alt="Figma" />
                <span className="label">Figma</span>
              </div>

              <div className="icon-with-label">
                <img src={canvaIcon} alt="Canva" />
                <span className="label">Canva</span>
              </div>

              <div className="icon-with-label">
                <img src={htmlIcon} alt="HTML" />
                <span className="label">HTML</span>
              </div>

              <div className="icon-with-label">
                <img src={cssIcon} alt="CSS" />
                <span className="label">CSS</span>
              </div>

              <div className="icon-with-label">
                <img src={javascriptIcon} alt="JavaScript" />
                <span className="label">JavaScript</span>
              </div>

              <div className="icon-with-label">
                <img src={reactIcon} alt="React" />
                <span className="label">React</span>
              </div>

              <div className="icon-with-label">
                <img src={tailwindIcon} alt="Tailwind CSS" />
                <span className="label">Tailwind</span>
              </div>

              <div className="icon-with-label">
                <img src={wordpressIcon} alt="WordPress" />
                <span className="label">WordPress</span>
              </div>

              <div className="icon-with-label">
                <img src={capcutIcon} alt="CapCut" />
                <span className="label">CapCut</span>
              </div>
            </div>
          </div>

          {/* Extra Skills */}
          <div className="chameleon-wrapper">
  <img
    src={colorfulChameleon}
    alt="Colorful Chameleon Logo"
    className="colorful-chameleon"
  />
</div>
       
          <div className="skills-card extra">
       
            <h2 className="about-section-title extra">EXTRA SKILLS</h2>
            <ul className="extra-skills-list">
              <li>Content Creation for Social Media</li>
              <li>Flexible Creative Thinking</li>
              <li>Detail-Oriented & Reliable</li>
              <li>Storytelling with Humor</li>
              <li>Fashion Coordination</li>
              <li>Garment Construction (Industrial Sewing)</li>
              <li>Voiceover / Narration</li>
              <li>Japanese Language Instruction</li>
            </ul>
          </div>
        </div>
      </div>

      {/* my looks */}

      <div className="my-looks-about-section">
        <img
          src={aboutYellowBgTop}
          alt="section bottom decoration"
          className="about-yellow-bg-top"
        />
        <div className="my-look-title-wrapper">
          <div className="my-look-title">
            <div className="my-look-title-image-wrapper">
              <img
                src={myLookTitleImage}
                className="my-look-title-image"
                alt="dress icon"
              />
            </div>
            <div className="subtitles look">
              <h2>MY LOOKS</h2>
            </div>
          </div>
          <h3 className="made-by-me-about">🩷#MadeByMe🩷</h3>
        </div>
        <PhotoGallery />
        <img
          src={aboutYellowBgBottom}
          alt="section bottom decoration"
          className="about-yellow-bg-bottom"
        />
      </div>
      <div className="footer-about">
        <Footer />
      </div>
    </>
  );
}

export default About;
