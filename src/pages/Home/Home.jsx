import './home.css';
import ProjectSlider from '../../components/ProjectSlider';
import { Link } from 'react-router-dom';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';

//images
import headerImage from '../../assets/home/header/header.png';
import headerVideo from '../../assets/home/header/candy-fukaya-motion-design-portfolio.mp4';
import greenBg from '../../assets/home/header/green-bg-top.png';
import featuredProjectsTitleImage from '../../assets/home/featured-projects/eye.png';
import aboutMeTitleImage from '../../assets/home/about-me/candy.png';
import aboutMeVideo from '../../assets/home/about-me/kawaii-intro-candy-fukaya.mp4';
import yellowBg from '../../assets/home/about-me/yellow-bg.png';
import letsConnectTitleImage from '../../assets/home/connect/mail.png';
import yellowBgBottom from '../../assets/home/about-me/yellow-bg-bottom.png';
import rainbow from '../../assets/home/connect/rainbow-stripe.png';
import mailIcon from '../../assets/home/connect/mail-icon.png';
import instagramIcon from '../../assets/home/connect/instagram-icon.png';
import linkedinIcon from '../../assets/home/connect/linkedin-icon.png';
import girl from '../../assets/home/connect/girl.png';
import pinkBg from '../../assets/home/connect/pink-bg.png';
import myLookTitleImage from '../../assets/home/my-look/dress-icon.png';
import blueBg from '../../assets/home/my-look/blue-bg-bottom.png';

function Home() {
  // girl comment
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const comment = document.querySelector('.girl-comment');

    function handleScroll() {
      const rect = comment.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100 && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //girl comment end

  return (
    <div>
      {/* header */}
      <div className="hero-wrapper">
        <h1 className="visually-hidden">
          Candy Fukaya – Graphic & Motion Designer Portfolio
        </h1>
        <video
          className="video"
          src={headerVideo}
          autoPlay
          muted
          loop
          playsInline
        ></video>

        <img
          src={greenBg}
          className="green-bg-top"
          alt="section top decoration"
        />
      </div>
      {/* header end */}

      {/* feature products */}
      <section className="featured-projects">
        <div className="featured-title-wrapper">
          <div className="featured-title">
            <div className="featured-title-image-wrapper">
              <img
                src={featuredProjectsTitleImage}
                className="featured-projects-title-image"
                alt="eye emoji"
              />
            </div>
            <div className="subtitles featured">
              <h2>FEATURED PROJECTS</h2>
            </div>
          </div>
        </div>
        <ProjectSlider />
      </section>
      {/* featured products end */}

      {/* about me */}

      <section className="about-section">
        {/* bg */}

        <div className="bg-top">
          <img src={yellowBg} alt="section top decoration" />
        </div>
        <div className="about-title-wrapper">
          <div className="about-title">
            <div className="about-title-image-wrapper">
              <img
                src={aboutMeTitleImage}
                className="about-me-title-image"
                alt="candy emoji"
              />
            </div>
            <div className="subtitles about">
              <h2>ABOUT ME</h2>
            </div>
          </div>
        </div>
        <div className="intro-outline-wrapper">
          <div className="candy-outline-text-top">CANDY CANDY CANDY CANDY</div>
          <div className="candy-outline-text-bottom">
            CANDY CANDY CANDY CANDY
          </div>

          <div className="intro-card">
            <div className="intro-text">
              <h2>HELLO!!&nbsp;!&nbsp; I'M CANDY</h2>
              <p>
                I'm interested in content creation, graphic design, and motion
                design. With a background in fashion design, I love building
                unique, playful worlds inspired by Japanese kawaii culture — a
                Japanese aesthetic centered around cuteness, color, and
                playfulness!
              </p>
              <Link to="/about" className="intro-button">
                More about me
              </Link>
            </div>
            <div className="about-image">
              <video
                className="about-video"
                src={aboutMeVideo}
                autoPlay
                muted
                loop
                playsInline
              />
              {/* <img
                src={aboutMeImage}
                alt="Candy's self-introduction visual with pixel rainbow, flip phone, and bunny"
              /> */}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-bottom">
        <img src={yellowBgBottom} alt="section bottom decoration" />
      </div>

      {/* about me end */}

      {/* connect */}

      <section className="connect-section">
        <div className="rainbow">
          <img src={rainbow} alt="rainbow-stripe" />
        </div>
        <img
          src={letsConnectTitleImage}
          className="lets-connect-title-image"
          alt="mail icon"
        />
        <div className="subtitles connect">
          <h2>LET'S CONNECT</h2>
        </div>
        <div className="social-links">
          <a
            href="mailto:candyfukaya@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mailIcon} alt="Email Icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/candy-f-7207a0356/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn Icon" />
          </a>
          <a
            href="https://www.instagram.com/candy_ramune/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="Instagram Icon" />
          </a>
        </div>
        <div className="girl-comment-wrapper">
          <img src={girl} className="girl-image swing-img" alt="girl" />
          <p className={`girl-comment ${isVisible ? 'visible' : ''}`}>
            {'Hope to hear from you soon!'.split('').map((char, i) => (
              <span
                key={i}
                className="char"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>
      </section>
      <div className="pink-bg-bottom">
        <img src={pinkBg} alt="section bottom decoration" />
      </div>
      {/* connect end */}

      {/* my looks */}
      <section className="my-looks-section">
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
          <h3 className="made-by-me">🩷#MadeByMe🩷</h3>
        </div>
        <PhotoGallery />
        <div className="blue-bg-bottom">
          <img src={blueBg} alt="section bottom decoration" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Home;
