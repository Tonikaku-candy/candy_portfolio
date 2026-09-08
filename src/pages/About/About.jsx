// src/pages/About/About.jsx
import './About.css';
import PhotoGallery from '../../components/PhotoGallery';
import Footer from '../../components/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../../components/AnimatedTitle';
import UfoAnimation from '../../components/Gsap/UfoAnimation';
import { useLanguage } from '../../components/context/LanguageContext.jsx';

// images & icons
import myLookTitleImage from '../../assets/home/my-look/rainbow.png';
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
import davinci from '../../assets/About/icons/DaVinci-Resolve-Studio-icon.png';
import profileBg from '../../assets/About/sakura-bg.webp';
import profile1 from '../../assets/About/candy-profile1.webp';
import profile2 from '../../assets/About/candy-profile2.webp';
import colorfulChameleon from '../../assets/About/colorful-chameleon.webp';
import sewingMachine from '../../assets/home/my-look/sewing-machine.webp';
import tomato from '../../assets/home/my-look/tomato-pin-cushion.webp';
import thread from '../../assets/home/my-look/colorful-thread.webp';
import speechBubble from '../../assets/About/speech-bubble2.png';
import jordan from '../../assets/About/jordan-profile-photo.png';
import sunny from '../../assets/About/sunny-profile-photo.png';
import branden from '../../assets/About/branden-profile-photo.png';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { language } = useLanguage();
  // HELLO section refs
  const helloWrapRef = useRef(null);
  const helloTitleRef = useRef(null);
  const helloSubRef = useRef(null);
  const helloPhotoRef = useRef(null);

  // モバイル用プロフィール画像のrefを追加
  const mobilePhotoRef = useRef(null);

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
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    )
      .fromTo(
        helloSubRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2',
      )
      .fromTo(
        helloPhotoRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.1',
      );

    return () => {
      tl.kill();
      // ScrollTrigger.getAll().forEach((st) => st.kill());
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
      { threshold: 0.5 },
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
          ease: 'back.out(1.8)', // ちょい弾む
          delay: i * 0.12,
          transformOrigin: '50% 50%',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
    });

    return () => {
      // ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    if (!mobilePhotoRef.current) return;

    gsap.fromTo(
      mobilePhotoRef.current,
      { opacity: 0, y: 50 }, // 下から上に移動しながらフェードイン
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mobilePhotoRef.current,
          start: 'top 80%', // モバイル画像が画面の80%に入ったらアニメーション開始
          toggleActions: 'play none none none',
          once: true,
        },
      },
    );

    return () => {
      // ScrollTrigger.getAll().forEach((st) => st.kill()); // 不要な重複を避けるためコメントアウト
    };
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* =========================
          HELLO
      ========================== */}
      <div className="hello-section" ref={helloWrapRef}>
        <div className="hello-content-wrapper">
          <div
            className={`hello-text ${language === 'ja' ? 'japanese-text' : ''}`}
          >
            <h1 ref={helloTitleRef}>
              {language === 'en' ? (
                <>
                  <span className="hello-title-top">HELLO, I'M</span>
                  <br />
                  <span className="hello-title-bottom">CANDY!</span>
                </>
              ) : (
                <>
                  <span className="hello-title-top">こんにちは！</span>
                  <br />
                  <span className="hello-title-bottom">CANDYです</span>
                </>
              )}
            </h1>

            <p className="hello-subtitle" ref={helloSubRef}>
              {language === 'en' ? (
                <>
                  Creating a colorful world <br />
                  inspired by Japanese <br />
                  kawaii culture ✨
                </>
              ) : (
                <>
                  日本の「かわいい」文化を
                  <br />
                  取り入れた、カラフルな世界を
                  <br />
                  つくっています ✨
                </>
              )}
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

            <p
              className={`about-profile-text ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
            >
              {language === 'en' ? 'Hover me!' : 'Hover me!'}
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          ABOUT
      ========================== */}
      <div className="about-page-section">
        <div className="diagonal-top-about"></div>
        <div className="grid-overlay-about"></div>

        <div
          className="about-profile-image-wrapper mobile"
          ref={mobilePhotoRef}
        >
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

          <p
            className={`about-profile-text mobile ${
              language === 'ja' ? 'japanese-text' : ''
            }`}
          >
            {language === 'en' ? 'Tap me!' : 'Tap me!'}
          </p>
        </div>

        <div className="about-card" ref={aboutCardRef}>
          <div className="about-card-inner"></div>

          <AnimatedTitle
            text={language === 'en' ? 'ABOUT ME' : '私について'}
            trigger={aboutCardRef}
            className={`about-section-title ${
              language === 'ja' ? 'japanese-text' : ''
            }`}
          />

          <div className="about-page-content">
            <div
              className={`about-page-text ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
            >
              <h3>{language === 'en' ? 'I’m Candy!' : 'Candyです！'}</h3>

              {language === 'en' ? (
                <>
                  <p>
                    I’m a multidisciplinary designer originally from Japan, with
                    a background in fashion and experience across{' '}
                    <strong>
                      graphic design, motion graphics, video editing, digital
                      content and front-end development
                    </strong>
                    <br />
                    <br />
                    My journey into digital design started from an unexpected
                    place. Before I began studying digital design, I had{' '}
                    <strong>almost no experience with technology</strong>.
                    <br /> In a relatively short time, I grew from a complete
                    beginner into a multidisciplinary designer and discovered a{' '}
                    <strong>true passion for creating digital work</strong>{' '}
                    along the way. I’m proud of how much I’ve grown and how
                    quickly I’ve been able to turn new skills into creative
                    projects.
                    <br />
                    <br />
                    My creative style is inspired by Japanese kawaii culture,
                    Harajuku fashion, and pixel art. I love bold colors, playful
                    aesthetics, and visuals that spark joy or curiosity.
                    <br />
                    <br />I come from a fashion design background, where I made
                    handmade clothes and accessories. That experience taught me
                    how to express personality through design, something I now
                    bring into my digital projects.
                  </p>

                  <br />

                  <div className="about-box">
                    <p>
                      I’m also a fan of Japanese comedy, and I enjoy creating
                      work that’s a little silly or chaotic but always made with
                      full sincerity. Whether it’s an animation or a quirky
                      interface, my goal is to make people smile and enjoy the
                      moment.
                    </p>

                    <div className="ufo-wrapper">
                      <UfoAnimation />
                    </div>
                  </div>

                  <p className="ufo-bottom-text">
                    I may be quiet and shy in person, but my imagination is
                    anything but. I’m always thinking of odd, funny ideas and
                    unexpected ways to tell a story. One of my creative mottos
                    is: <strong>“Make something silly, seriously.”</strong> I
                    believe humor, when treated with care, can be just as
                    powerful as any serious message.
                  </p>

                  <br />

                  <p>
                    I like working ahead and pushing myself beyond just meeting
                    deadlines because I truly want to improve, experiment, and
                    keep learning. Even when I struggle, I stay committed. My
                    dedication and sense of responsibility are traits I’m proud
                    of, rooted in my Japanese upbringing.
                    <br />
                    <br />
                    My personal logo
                    <strong> — a colorful chameleon — </strong>
                    reflects this mindset. It symbolizes the ability to adapt,
                    explore, and grow into new creative forms, even without much
                    experience. It reminds me that there’s value in trying,
                    changing, and becoming.
                    <br />
                    <br />
                    Right now, I’m focused on growing as a designer who can turn
                    unique ideas into meaningful, memorable experiences. Cute,
                    strange, funny, and made to make people happy.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    日本出身のさまざまな分野のデザインに取り組むデザイナーです。
                    ファッションをバックグラウンドに持ち、
                    <strong>
                      グラフィックデザイン、モーショングラフィックス、
                      動画編集、デジタルコンテンツ制作、 フロントエンド開発
                    </strong>
                    など、幅広い分野で制作しています。
                    <br />
                    <br />
                 私がデジタルデザインを学び始めた頃は、
                    <strong>
                      テクノロジーに関する経験がほとんどありませんでした。
                    </strong>
                    <br />
                    それでも比較的短い期間で、まったくの初心者から幅広い分野に取り組めるようになり、その過程で
                    <strong>デジタル作品をつくることへの本当の楽しさ</strong>
                    を見つけました。
                    新しく身につけたスキルをすぐに作品へとつなげながら、
                    ここまで成長できたことを誇りに思っています。
                    <br />
                    <br />
                    私のクリエイティブスタイルは、日本の「かわいい」文化や原宿ファッション、ピクセルアートから影響を受けています。大胆な色使いと遊び心のある、見る人を楽しい気持ちにするデザインが好きです。
                    <br />
                    <br />
                    もともとはファッションデザインを学び、
                    洋服やアクセサリーをハンドメイドで制作していました。
                    その経験を通して、 デザインで個性を表現することを学び、
                    今ではその感覚をデジタル作品にも活かしています。
                  </p>

                  <br />

                  <div className="about-box">
                    <p>
                     日本のお笑いも大好きで、ユーモアやちょっと変わったアイデアを作品に取り入れることも好きです。遊び心を大切にしながら、見た人が思わず笑顔になったり、楽しんでもらえたりするような作品づくりを目指しています。
                    </p>

                    <div className="ufo-wrapper">
                      <UfoAnimation />
                    </div>
                  </div>

                  <p className="ufo-bottom-text">
                    実際の私は静かで少し人見知りですが、頭の中はいつもアイデアでいっぱいです。ちょっと変で面白い発想や、意外な表現を考えることが好きです。私のクリエイティブのモットーは、
                    <strong>「くだらないことを、真剣に。」</strong>
                    <br />
                    ユーモアも丁寧につくり込むことで、人の心を動かせると考えています。
                  </p>

                  <br />

                  <p>
                    制作には余裕を持って取り組み、より良いものを目指して試行錯誤することを大切にしています。新しいことに挑戦し、学び続けることも好きです。うまくいかないときも途中で諦めず、最後までやり切る責任感と粘り強さが私の強みです。
                    <br />
                    <br />
                    私のパーソナルロゴである
                    <strong>「カラフルなカメレオン」</strong>
                    は、新しい環境に適応し、さまざまな表現に挑戦しながら成長していく姿を象徴しています。
                    <br />
                    <br />
                    ユニークなアイデアを形にし、誰かの記憶に残る、楽しいデザインをつくっていきたいです。
                  </p>
                </>
              )}
            </div>
          </div>

          {/* =========================
              TECHNICAL SKILLS
          ========================== */}
          <div className="skills-card technical">
            <h2
              className={`about-section-title skill ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
            >
              {language === 'en' ? 'TECHNICAL SKILLS' : '使用ツール・スキル'}
            </h2>

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

              <div className="icon-with-label">
                <img src={davinci} alt="DaVinci Resolve" />
                <span className="label">DaVinci Resolve</span>
              </div>
            </div>
          </div>

          {/* =========================
              EXTRA SKILLS
          ========================== */}
          <div className="skills-card extra">
            <h2
              className={`about-section-title extra relative-version ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
            >
              {language === 'en' ? 'EXTRA SKILLS' : 'その他のスキル'}
            </h2>

            <div className="chameleon-wrapper">
              <img
                src={colorfulChameleon}
                alt="Colorful Chameleon Logo"
                className="colorful-chameleon"
              />
            </div>

            <ul
              className={`extra-skills-list ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
            >
              <li>
                {language === 'en' ? (
                  <>
                    Social Media <br />
                    Content Creation
                  </>
                ) : (
                  <>
                    SNSコンテンツ
                    <br />
                    制作
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Flexible <br />
                    Creative Thinking
                  </>
                ) : (
                  <>
                    柔軟な
                    <br />
                    発想力
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Detail-Oriented
                    <br /> & Reliable
                  </>
                ) : (
                  <>
                    細部へのこだわり
                    <br />＆ 責任感
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Storytelling <br />
                    with Humor
                  </>
                ) : (
                  <>
                    ユーモアのある
                    <br />
                    ストーリーテリング
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Fashion Coordination <br />& Creative Styling
                  </>
                ) : (
                  <>
                    ファッション
                    <br />
                    コーディネート
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Garment Construction <br />
                    (Industrial Sewing)
                  </>
                ) : (
                  <>
                    縫製・服飾制作
                    <br />
                    （工業用ミシン）
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Voiceover <br />& Narration
                  </>
                ) : (
                  <>
                    ボイスオーバー
                    <br />＆ ナレーション
                  </>
                )}
              </li>

              <li>
                {language === 'en' ? (
                  <>
                    Japanese Language <br />
                    Instruction
                  </>
                ) : (
                  <>
                    日本語
                    <br />
                    指導
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* =========================
            CLASSMATES
        ========================== */}
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
                text={
                  language === 'en'
                    ? 'WHAT MY CLASSMATES SAY'
                    : 'クラスメイトから見た私'
                }
                trigger={sayTitleRef}
                className={`subtitles say ${
                  language === 'ja' ? 'japanese-text' : ''
                }`}
              />
            </div>
          </div>

          <div className="classmates-grid" ref={classmatesGridRef}>
            {/* JORDAN */}
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

              <p className={language === 'ja' ? 'japanese-text' : ''}>
                {language === 'en'
                  ? `Candy’s creativity and enthusiasm shine through in every project. Even though she can be a little shy in daily life, her confidence and energy on screen reveal her true talent. She has a unique attitude and imagination, and I believe she’s a superstar in the making.`
                  : `Candyの創造力と情熱は、どの作品からも伝わってきます。普段は少しシャイなところもありますが、画面の中では自信とエネルギーにあふれ、本来の才能が輝いています。独自の感性と想像力を持っていて、これからさらに輝いていく存在だと思います。`}
              </p>
            </div>

            {/* SUNNY */}
            <div className="classmate-card">
              <img
                src={sunny}
                className="profile-photo"
                alt="Sunny's profile photo"
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

              <p className={language === 'ja' ? 'japanese-text' : ''}>
                {language === 'en'
                  ? `Candy is one of the most hardworking and caring classmates I know. The more you get to know her, the more her true charm and talents shine through. She’s not only creative and dedicated, but also someone who leaves a lasting impression. I feel lucky to be in the same class and to see firsthand just how amazing she is.`
                  : `Candyは、私が知っている中でも特に努力家で、思いやりのあるクラスメイトの一人です。知れば知るほど、本当の魅力や才能が伝わってきます。クリエイティブで努力家なだけでなく、とても印象に残る人です。同じクラスで、彼女の素晴らしさを間近で見られたことを幸運に思います。`}
              </p>
            </div>

            {/* BRANDEN */}
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

              <p className={language === 'ja' ? 'japanese-text' : ''}>
                {language === 'en'
                  ? `Candy is hilarious and always makes people laugh, sometimes without even trying. At the same time, she’s one of the hardest-working and most productive students I know, like a one-person creative agency handling design, social media, and more. Her unique mix of humor and dedication is a rare strength, and it makes her stand out in the best way.`
                  : `Candyはとても面白く、本人が狙っていないときでさえ周りを笑わせてくれます。それと同時に、私が知る中でも特に努力家で行動力のある学生の一人です。デザインやSNSなどを一人でこなす、まるで一人クリエイティブエージェンシーのような存在です。ユーモアと努力をあわせ持つところが彼女ならではの強みで、それが大きな魅力になっています。`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MY SEWING WORKS
      ========================== */}
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
              text={language === 'en' ? 'MY SEWING WORKS' : '私の洋裁作品'}
              trigger={myLooksRef}
              className={`subtitles look ${
                language === 'ja' ? 'japanese-text' : ''
              }`}
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
