import './Home.css';
import ProjectSlider from '../../components/ProjectSlider';
import { Link } from 'react-router-dom';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../../components/AnimatedTitle'; // 新しいコンポーネントを使用

// images
import headerVideo from '../../assets/home/header/candy-fukaya-motion-design-portfolio.mp4';
import headerVideoWebm from '../../assets/home/header/candy-fukaya-motion-design-portfolio.webm';

import featuredProjectsTitleImage from '../../assets/home/featured-projects/eye.png';
import aboutMeTitleImage from '../../assets/home/about-me/fireworks.png';
import aboutMeVideo from '../../assets/home/about-me/kawaii-intro-candy-fukaya.mp4';
import lollipop from '../../assets/home/about-me/heart-lollipop.webp';
import jellyBeans from '../../assets/home/about-me/jelly-beans.webp';

import letsConnectTitleImage from '../../assets/home/connect/mail3.png';
import rainbow from '../../assets/home/connect/rainbow-stripe.webp';
import mailIcon from '../../assets/home/connect/mail-icon.png';
import instagramIcon from '../../assets/home/connect/instagram-icon.png';
import linkedinIcon from '../../assets/home/connect/linkedin-icon.png';
import girl from '../../assets/home/connect/girl.webp';

import myLookTitleImage from '../../assets/home/my-look/rainbow.png';
import sewingMachine from '../../assets/home/my-look/sewing-machine.webp';
import tomato from '../../assets/home/my-look/tomato-pin-cushion.webp';
import thread from '../../assets/home/my-look/colorful-thread.webp';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  // time
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // slider animation
    const sliderRef = useRef(null);



  // girl comment
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const comment = document.querySelector('.girl-comment');
    if (!comment) return;

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

  return (
    <div>
      {/* header */}
      <div className="hero-wrapper">
        <div className="video-timer">{currentTime}</div>

        <h1 className="visually-hidden">
          Candy Fukaya – Graphic & Motion Designer Portfolio
        </h1>
        <video
      className="video"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={headerVideoWebm} type="video/webm" />
      <source src={headerVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      </div>
      {/* header end */}

      {/* feature projects */}
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
            {/* タイトルだけ AnimatedTitle で一文字ずつアニメーション */}
            <AnimatedTitle
              text={'FEATURED PROJECTS'}
              trigger=".featured-projects"
              className="subtitles featured"
            />
          </div>
        </div>
        <ProjectSlider />
      </section>
      {/* feature projects end */}

      {/* about me */}
      <section className="about-section">
        <div className="diagonal-top"></div>
        <div className="grid-overlay"></div>
        <div className="about-section-inner">
          <div className="about-title-wrapper">
            <div className="about-title">
              <div className="about-title-image-wrapper">
                <img
                  src={aboutMeTitleImage}
                  className="about-me-title-image"
                  alt="fireworks icon"
                />
              </div>
              {/* タイトルだけ AnimatedTitle */}
              <AnimatedTitle
                text={'ABOUT ME'}
                trigger=".about-section"
                className="subtitles about"
              />
            </div>
          </div>

          <div className="intro-outline-wrapper">
      <img src={lollipop} className="lollipop" alt="heart lollipop" />

            <div className="candy-text-wrapper">
              <div className="candy-outline-text-top">
                CANDY CANDY CANDY CANDY
              </div>
              <div className="candy-outline-text-bottom">
                CANDY CANDY CANDY CANDY
              </div>

              <div className="intro-card">
                <div className="intro-text">
                  <h2>HELLO!!&nbsp;&nbsp; I'M CANDY</h2>
                  <p>
                    I'm interested in content creation, graphic design, and
                    motion design. With a background in fashion design, I love
                    building unique, playful worlds inspired by Japanese kawaii
                    culture — a Japanese aesthetic centered around cuteness,
                    color, and playfulness!
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
                </div>
              </div>
            </div>
          </div>
        </div>
     <img src={jellyBeans} className="jelly" alt="jelly beans" />
        <div className="diagonal-bottom"></div>
      </section>
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
        {/* タイトルだけ AnimatedTitle */}
        <AnimatedTitle
          text={"LET'S CONNECT"}
          trigger=".connect-section"
          className="subtitles connect"
        />
        <div className="social-links">
          <a
            className="shiny"
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
            className="shiny"
          >
            <img src={linkedinIcon} alt="LinkedIn Icon" />
          </a>
          <a
            className="shiny"
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
      {/* connect end */}

      {/* my looks */}
      <section className="my-looks-section">
        <div className="diagonal-top-mylooks"></div>
        <div className="grid-overlay-mylooks"></div>
        <img
          src={sewingMachine}
          className="sewing-machine"
          alt="pink sewing machine image"
        />
        <img
          src={tomato}
          className="tomato"
          alt="tomato sewing cushion image"
        />
        <img src={thread} alt="colorful thread image" className="thread" />

        <div className="my-look-title-wrapper">
          <div className="my-look-title">
            <div className="my-look-title-image-wrapper">
              <img
                src={myLookTitleImage}
                className="my-look-title-image"
                alt="rainbow icon"
              />
            </div>
            {/* タイトルだけ AnimatedTitle */}
            <AnimatedTitle
              text={'MY SEWING WORKS'}
              trigger=".my-looks-section"
              className="subtitles look"
            />
            <h3 className="made-by-me">🩷#MadeByMe🩷</h3>
          </div>
        </div>
        <PhotoGallery />
        <div className="diagonal-bottom-mylooks"></div>
      </section>

      <Footer className="footer-home" />
    </div>
  );
}

export default Home;
