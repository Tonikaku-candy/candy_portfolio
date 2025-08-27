// src/pages/About/About.jsx
import './About.css';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../../components/AnimatedTitle';
import UfoAnimation from '../../components/Gsap/UfoAnimation';

// images & icons
import myLookTitleImage from '../../assets/home/my-look/dress-icon.png';
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
import profileBg from '../../assets/About/sakura-bg.webp';
import profile1 from '../../assets/About/candy-profile1.webp';
import profile2 from '../../assets/About/candy-profile2.webp';
import colorfulChameleon from '../../assets/About/colorful-chameleon.webp';
import sewingMachine from '../../assets/home/my-look/sewing-machine.webp';
import tomato from '../../assets/home/my-look/tomato-pin-cushion.webp';
import thread from '../../assets/home/my-look/colorful-thread.webp';
import speechBubble from '../../assets/About/speech-bubble.png';
import jordan from '../../assets/About/jordan-profile-photo.png';
import sunny from '../../assets/About/sunny-profile-photo.png';
import branden from '../../assets/About/branden-profile-photo.png';

gsap.registerPlugin(ScrollTrigger);

function About() {
  // HELLO section refs
  const helloWrapRef = useRef(null);
  const helloTitleRef = useRef(null);
  const helloSubRef = useRef(null);
  const helloPhotoRef = useRef(null);

  // Section refs for AnimatedTitle
  const aboutCardRef = useRef(null);
  const classmatesGridRef = useRef(null);

  const sayTitleRef = useRef(null);
  const myLooksRef = useRef(null);

  // ---- 1) HELLOセクション：スクロールで順番フェードイン ----
  useEffect(() => {
    if (!helloWrapRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: helloWrapRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.fromTo(
      helloTitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        helloSubRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        helloPhotoRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.1'
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ---- 2) カメレオン：IntersectionObserver ----
  useEffect(() => {
    const target = document.querySelector('.chameleon-wrapper');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const chameleon = document.querySelector('.colorful-chameleon');
        if (!chameleon) return;
        if (entry.isIntersecting) {
          chameleon.classList.remove('animate');
          void chameleon.offsetWidth; // restart CSS animation
          chameleon.classList.add('animate');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // ---- 3) Classmate Cards fade in ----
  useEffect(() => {
    if (!classmatesGridRef.current) return;

    const cards = classmatesGridRef.current.querySelectorAll('.classmate-card');

    cards.forEach((card, i) => {
  gsap.fromTo(
    card,
    { autoAlpha: 0, y: 24, scale: 0.9 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.8)',   // ちょい弾む
      delay: i * 0.12,
      transformOrigin: '50% 50%',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
});

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* hello section */}
      <div className="hello-section" ref={helloWrapRef}>
        <div className="hello-content-wrapper">
          <div className="hello-text">
            <h1 ref={helloTitleRef}>
              <span className="hello-title-top">HELLO, I'M</span>
              <br />
              <span className="hello-title-bottom">CANDY!</span>
            </h1>
            <p className="hello-subtitle" ref={helloSubRef}>
              Creating a colorful world <br />
              inspired by Japanese <br />
              kawaii culture ✨
            </p>
          </div>
          <div className="about-profile-image-wrapper" ref={helloPhotoRef}>
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
            <p className="about-profile-text">Hover me!</p>
          </div>
        </div>
      </div>

      {/* about section */}
      <div className="about-page-section">
        <div className="diagonal-top-about"></div>
        <div className="grid-overlay-about"></div>

        <div className="about-profile-image-wrapper mobile">
          <img
            src={profileBg}
            alt="sakura background"
            className="about-profile-bg mobile"
          />
          <img
            src={profile2}
            alt="Candy profile picture hover"
            className="about-profile-image side mobile"
          />
          <img
            src={profile1}
            alt="Candy profile picture"
            className="about-profile-image front mobile"
          />
          <p className="about-profile-text mobile">Top me!</p>
        </div>

        {/* Section Title & Text Box */}
        <div className="about-card" ref={aboutCardRef}>
          <div className="about-card-inner"></div>
          <AnimatedTitle
            text="ABOUT ME"
            trigger={aboutCardRef}
            className="about-section-title"
          />

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
                <br />I come from a fashion design background, where I made
                handmade clothes and accessories. That experience taught me how
                to express personality through design — something I now bring
                into my digital projects.
              </p>
              <br />
              <div className="about-box">
                <p>
                  I’m also a fan of Japanese comedy, and I enjoy creating work
                  that’s a little silly or chaotic — but always made with full
                  sincerity. Whether it’s an animation or a quirky interface, my
                  goal is to make people smile and enjoy the moment.
                </p>
                <div className="ufo-wrapper">
                  <UfoAnimation />
                </div>
              </div>

              <p className="ufo-bottom-text">
                I may be quiet and shy in person, but my imagination is anything
                but. I’m always thinking of odd, funny ideas and unexpected ways
                to tell a story. One of my creative mottos is:{' '}
                <strong>“Make something silly, seriously.”</strong>I believe
                humor, when treated with care, can be just as powerful as any
                serious message.
              </p>

              <br />

              <p>
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
          <div className="skills-card extra">
            <h2 className="about-section-title extra relative-version">
              EXTRA SKILLS
            </h2>
            <div className="chameleon-wrapper">
              <img
                src={colorfulChameleon}
                alt="Colorful Chameleon Logo"
                className="colorful-chameleon"
              />
            </div>
            <ul className="extra-skills-list">
              <li>Social Media Content Creation</li>
              <li>Flexible Creative Thinking</li>
              <li>Detail-Oriented & Reliable</li>
              <li>Storytelling with Humor</li>
              <li>Fashion Coordination & Creative Styling</li>
              <li>Garment Construction (Industrial Sewing)</li>
              <li>Voiceover / Narration</li>
              <li>Japanese Language Instruction</li>
            </ul>
          </div>
        </div>

        <div className="classmates-section">
          <div className="say-title-wrapper">
            <div className="say-title" ref={sayTitleRef}>
              <div className="say-title-image-wrapper">
                <img
                  src={speechBubble}
                  className="say-title-image"
                  alt="speech bubble icon"
                />
              </div>
              <AnimatedTitle
                text="WHAT MY CLASSMATES SAY"
                trigger={sayTitleRef}
                className="subtitles say"
              />
            </div>
          </div>

          <div className="classmates-grid" ref={classmatesGridRef}>
            <div className="classmate-card">
              <img
                src={jordan}
                className="profile-photo"
                alt="Jordan's profile photo"
              />
              <h3>
                <a
                  href="https://jordanasseff.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  Jordan
                </a>
              </h3>
              <p>
                Candy’s creativity and enthusiasm shine through in every
                project. Even though she can be a little shy in daily life, her
                confidence and energy on screen reveal her true talent. She has
                a unique attitude and imagination, and I believe she’s a
                superstar in the making.
              </p>
            </div>
            {/* sunny */}
            <div className="classmate-card">
              <img
                src={sunny}
                className="profile-photo"
                alt="sunny's profile photo"
              />
              <h3>
                <a
                  href="https://jisun-ju.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  Sunny
                </a>
              </h3>
              <p>
                Candy is one of the most hardworking and caring classmates I
                know. The more you get to know her, the more her true charm and
                talents shine through. She’s not only creative and dedicated,
                but also someone who leaves a lasting impression. I feel lucky
                to be in the same class and to see firsthand just how amazing
                she is.
              </p>
            </div>
            {/* branden */}
            <div className="classmate-card">
              <img
                src={branden}
                className="profile-photo"
                alt="Branden's profile photo"
              />
              <h3>
                <a
                  href="https://taito.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  Branden
                </a>
              </h3>
              <p>
                Candy is hilarious and always makes people laugh, sometimes
                without even trying. At the same time, she’s one of the
                hardest-working and most productive students I know — like a
                one-person creative agency handling design, social media, and
                more. Her unique mix of humor and dedication is a rare strength,
                and it makes her stand out in the best way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* my looks */}
      <div className="my-looks-about-section" ref={myLooksRef}>
        <img
          src={sewingMachine}
          alt="pink sewing machine image"
          className="sewing-machine about"
        />
        <img
          src={tomato}
          alt="tomato sewing cushion image"
          className="tomato about"
        />
        <img
          src={thread}
          alt="colorful thread image"
          className="thread about"
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
            <AnimatedTitle
              text="MY SEWING WORKS"
              trigger={myLooksRef}
              className="subtitles look"
            />
            <h3 className="made-by-me about">🩷#MadeByMe🩷</h3>
          </div>
          <h3 className="made-by-me about mobile">🩷#MadeByMe🩷</h3>
        </div>

        <PhotoGallery />
      </div>

      <div className="footer-about">
        <Footer />
      </div>
    </>
  );
}

export default About;
