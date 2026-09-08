import './Home.css';
import ProjectSlider from '../../components/ProjectSlider';
import { Link } from 'react-router-dom';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../../components/AnimatedTitle';
import { useLanguage } from '../../components/context/LanguageContext.jsx';

// icon
import EyeIcon from '../../components/EyeIcon';

// images
import headerVideo from '../../assets/home/header/candy-fukaya-motion-design-portfolio.mp4';
import headerVideo2 from '../../assets/home/header/candy-fukaya-motion-design-portfolio2.mp4';
import headerVideoWebm from '../../assets/home/header/candy-fukaya-motion-design-portfolio.webm';
import headerVideoWebm2 from '../../assets/home/header/candy-fukaya-motion-design-portfolio2.webm';
import headerVideoMobile from '../../assets/home/header/candy-fukaya-motion-design-portfolio-mobile.mp4';
import headerVideoWebmMobile from '../../assets/home/header/candy-fukaya-motion-design-portfolio-mobile.webm';

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

import playgroundTitleImage from '../../assets/Playground/heart.png';

import myLookTitleImage from '../../assets/home/my-look/rainbow.png';
import sewingMachine from '../../assets/home/my-look/sewing-machine.webp';
import tomato from '../../assets/home/my-look/tomato-pin-cushion.webp';
import thread from '../../assets/home/my-look/colorful-thread.webp';
import placeHolder from '../../assets/home/header/candy-fukaya-portfolio-placeholder.webp';
import placeHolder2 from '../../assets/home/header/candy-fukaya-portfolio-placeholder2.webp';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  // language
  const { language } = useLanguage();

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Girl comment text
  const girlComment =
    language === 'en'
      ? 'Hope to hear from you soon!'
      : 'お気軽にご連絡ください！';

  return (
    <div>
      {/* =========================
          HEADER
      ========================== */}

      <div className="hero-wrapper">
        <div className="video-timer">
          {currentTime}
        </div>

        <h1 className="visually-hidden">
          {language === 'en'
            ? 'Candy Fukaya – Graphic & Motion Designer Portfolio'
            : 'Candy Fukaya – グラフィック・モーションデザイナー ポートフォリオ'}
        </h1>

        <video
          className="video"
          autoPlay
          muted
          loop
          playsInline
          poster={placeHolder2}
        >
          {isMobile ? (
            <>
              <source
                src={headerVideoMobile}
                type="video/mp4"
              />

              <source
                src={headerVideoWebmMobile}
                type="video/webm"
              />
            </>
          ) : (
            <>
              <source
                src={headerVideoWebm2}
                type="video/webm"
              />

              <source
                src={headerVideo2}
                type="video/mp4"
              />
            </>
          )}

          <track
            src="/captions/hero-video-captions.vtt"
            kind="captions"
            srcLang="en"
            label="English captions"
            default
          />

          Your browser does not support the video tag.
        </video>
      </div>

      {/* =========================
          FEATURED PROJECTS
      ========================== */}

      <section className="featured-projects">
        <div className="featured-title-wrapper">
          <div className="featured-title">

            <div className="featured-title-image-wrapper">
              <EyeIcon className="featured-projects-title-image" />
            </div>

            <AnimatedTitle
              text={
                language === 'en'
                  ? 'FEATURED PROJECTS'
                  : 'ピックアップ作品'
              }
              trigger=".featured-projects"
              className={`subtitles featured ${
                language === 'ja'
                  ? 'japanese-text'
                  : ''
              }`}
            />

          </div>
        </div>

        <ProjectSlider />
      </section>

      {/* =========================
          ABOUT ME
      ========================== */}

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

              <AnimatedTitle
                text={
                  language === 'en'
                    ? 'ABOUT ME'
                    : '私について'
                }
                trigger=".about-section"
                className={`subtitles about ${
                  language === 'ja'
                    ? 'japanese-text'
                    : ''
                }`}
              />

            </div>

          </div>

          <div className="intro-outline-wrapper">

            <img
              src={lollipop}
              className="lollipop"
              alt="heart lollipop"
            />

            <div className="candy-text-wrapper">

              <div className="candy-outline-text-top">
                CANDY CANDY CANDY CANDY
              </div>

              <div className="candy-outline-text-bottom">
                CANDY CANDY CANDY CANDY
              </div>

              <div className="intro-card">

                <div
                  className={`intro-text ${
                    language === 'ja'
                      ? 'japanese-text'
                      : ''
                  }`}
                >

                  <h2>
                    {language === 'en'
                      ? "HELLO!!  I'M CANDY"
                      : 'HELLO!! CANDYです'}
                  </h2>

                  <p>
                    {language === 'en'
                      ? `I'm interested in content creation, graphic design, and motion design. With a background in fashion design, I love building unique, playful worlds inspired by Japanese kawaii culture — a Japanese aesthetic centered around cuteness, color, and playfulness!`
                      : 'コンテンツ制作、グラフィックデザイン、モーションデザインを中心に制作しています。服飾デザインの経験を活かし、日本の「かわいい」文化からインスピレーションを得た、カラフルで遊び心のある世界観をつくることが好きです。'}
                  </p>

                  <Link
                    to="/about"
                    className="intro-button"
                  >
                    <span className="button_top">
                      {language === 'en'
                        ? 'More about me'
                        : 'もっと見る'}
                    </span>
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

        <img
          src={jellyBeans}
          className="jelly"
          alt="jelly beans"
        />

        <div className="diagonal-bottom"></div>

      </section>

      {/* =========================
          CONNECT
      ========================== */}

      <section className="connect-section">

        <div className="rainbow">
          <img
            src={rainbow}
            alt="rainbow-stripe"
          />
        </div>

        <img
          src={letsConnectTitleImage}
          className="lets-connect-title-image"
          alt="mail icon"
        />

        <AnimatedTitle
          text={
            language === 'en'
              ? "LET'S CONNECT"
              : 'お問い合わせ'
          }
          trigger=".connect-section"
          className={`subtitles connect ${
            language === 'ja'
              ? 'japanese-text'
              : ''
          }`}
        />

        <div className="social-links">

          {/* EMAIL */}
          <a
            className="shiny"
            href="mailto:candyfukaya@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={mailIcon}
              alt="Email Icon"
            />
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/candy-f-7207a0356/"
            target="_blank"
            rel="noopener noreferrer"
            className="shiny"
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn Icon"
            />
          </a>

          {/* INSTAGRAM */}
          <a
            className="shiny"
            href="https://www.instagram.com/candy_ramune/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagramIcon}
              alt="Instagram Icon"
            />
          </a>

        </div>

        <div className="girl-comment-wrapper">

          <img
            src={girl}
            className="girl-image swing-img"
            alt="girl"
          />

          <p
            className={`girl-comment ${
              isVisible ? 'visible' : ''
            } ${
              language === 'ja'
                ? 'japanese-text'
                : ''
            }`}
          >
            {girlComment
              .split('')
              .map((char, i) => (
                <span
                  key={`${language}-${i}`}
                  className="char"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {char === ' '
                    ? '\u00A0'
                    : char}
                </span>
              ))}
          </p>

        </div>

        <div className="diagonal-bottom-connect"></div>

      </section>

      {/* =========================
          PLAYGROUND
      ========================== */}

      <section className="playground-preview">

        <div className="playground-preview-title-wrapper">

          <div className="playground-title-image-wrapper">

            <img
              src={playgroundTitleImage}
              className="playground-title-image"
              alt="heart icon"
            />

          </div>

          <AnimatedTitle
            text={
              language === 'en'
                ? 'PLAYGROUND'
                : '実験室'
            }
            trigger=".playground-preview"
            className={`subtitles playground-preview-title ${
              language === 'ja'
                ? 'japanese-text'
                : ''
            }`}
          />

        </div>

        <p
          className={`playground-preview-description ${
            language === 'ja'
              ? 'japanese-text'
              : ''
          }`}
        >
          {language === 'en'
            ? 'A collection of experimental and personal works, practice projects, and playful ideas created while exploring new creative skills and concepts'
            : '新しい表現やスキルを試しながら制作した、実験作品や個人制作、練習作品、遊び心のあるアイデアを集めています。'}
        </p>

        <Link
          to="/playground"
          className="playground-preview-card preview-rotate-left"
        >

          <div className="playground-preview-tags">

            <span className="playground-preview-tag">
              Motion
            </span>

            <span className="playground-preview-tag">
              Graphic
            </span>

            <span className="playground-preview-tag">
              Fashion
            </span>

            <span className="playground-preview-tag">
              Web
            </span>

          </div>

          <h3
            className={
              language === 'ja'
                ? 'japanese-text'
                : ''
            }
          >
            {language === 'en'
              ? 'Go Check My Playground'
              : '実験室をのぞいてみる'}
          </h3>

        </Link>

      </section>

      {/* =========================
          MY SEWING WORKS
      ========================== */}

      <section className="my-looks-section">

        <div className="diagonal-top-mylooks"></div>

        <div className="grid-overlay-mylooks"></div>

        <img
          src={sewingMachine}
          className="sewing-machine"
          alt="pink sewing machine"
        />

        <img
          src={tomato}
          className="tomato"
          alt="tomato sewing cushion"
        />

        <img
          src={thread}
          alt="colorful thread"
          className="thread"
        />

        <div className="my-look-title-wrapper">

          <div className="my-look-title">

            <div className="my-look-title-image-wrapper">

              <img
                src={myLookTitleImage}
                className="my-look-title-image"
                alt="rainbow icon"
              />

            </div>

            <AnimatedTitle
              text={
                language === 'en'
                  ? 'MY SEWING WORKS'
                  : '私の洋裁作品'
              }
              trigger=".my-looks-section"
              className={`subtitles look ${
                language === 'ja'
                  ? 'japanese-text'
                  : ''
              }`}
            />

            <h3 className="made-by-me">
              🩷#MadeByMe🩷
            </h3>

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