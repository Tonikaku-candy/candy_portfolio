// src/pages/Projects/Bumper/BumperProject.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import './BumperProject.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import ProcessSteps from '../../../components/ProjectDetail/ProcessSteps.jsx';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import projects from '../../../data/ProjectData.js';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';

import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';
import BumperSlideData from './BumperSlideData.js';

// image
import brainstormingImage from '../../../assets/ProjectDetails/Bumper/bumper-origin-visual.webp';

Modal.setAppElement('#root');

/* -----------------------
   resolveProjectIndex
------------------------- */
function resolveProjectIndex(projects, location, params) {
  const norm = (v) =>
    String(v ?? '')
      .replace(/\/+$/, '')
      .toLowerCase();

  const paramCandidates = Object.values(params || {})
    .filter(Boolean)
    .map((v) => norm(v));

  const lastSeg = norm(
    location?.pathname?.split('/').filter(Boolean).pop()
  );

  const candidates = [...paramCandidates, lastSeg].filter(Boolean);

  const pickKeys = (p) => {
    const keys = new Set();

    keys.add(norm(p.id));
    keys.add(norm(p.slug));
    keys.add(norm(p.link));

    const linkLast = norm(
      (p.link || '').split('/').filter(Boolean).pop()
    );

    keys.add(linkLast);

    return keys;
  };

  for (let i = 0; i < projects.length; i++) {
    const keys = pickKeys(projects[i]);

    if (candidates.some((c) => keys.has(c))) {
      return i;
    }
  }

  const path = norm(location?.pathname || '');

  return projects.findIndex((p) => norm(p.link) === path);
}

/* -----------------------
   buildProjectLink
------------------------- */
function buildProjectLink(proj) {
  if (!proj) return '/projects';

  if (proj.link) {
    return proj.link.replace(/\/+$/, '');
  }

  const idOrSlug = proj.slug ?? proj.id;

  return `/projects/${idOrSlug}`;
}

/* -----------------------
   BumperProject
------------------------- */
function BumperProject() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params, projects]
  );

  const { prevProject, nextProject } = useMemo(() => {
    const total = projects.length;

    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return {
        prevProject: null,
        nextProject: null,
      };
    }

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return {
      prevProject: projects[prevIndex] || null,
      nextProject: projects[nextIndex] || null,
    };
  }, [currentIndex, projects]);

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

  return (
    <>
      <div
        className={`project-detail-page ${
          language === 'ja' ? 'japanese-text' : ''
        }`}
      >
        <ScrollingTagBar tags={tags} />

        {/* Back */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">
              {language === 'en'
                ? '← Back to projects'
                : '← 制作実績に戻る'}
            </span>
          </Link>
        </div>

        {/* Title */}
        <ProjectTitle
          title={
            language === 'en'
              ? 'Bumper Opener Video'
              : 'オープニング映像'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {/* Video */}
        <div className="video-wrapper">
          <div id="video"></div>

          <FadeInOnScroll>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/edQKh4PadsY?si=2wn-yiRTmYtBCtMv"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </FadeInOnScroll>
        </div>

        {/* Page Links */}
        <DetailLinks
          links={[
            {
              id: 'video',
              label: language === 'en' ? 'Video' : '動画',
            },
            {
              id: 'overview',
              label: language === 'en' ? 'Overview' : '概要',
            },
            {
              id: 'inspiration',
              label: language === 'en' ? 'Inspiration' : '着想',
            },
            {
              id: 'brainstorming',
              label:
                language === 'en'
                  ? 'Brainstorming'
                  : 'アイデア出し',
            },
            {
              id: 'process',
              label:
                language === 'en'
                  ? 'Process'
                  : '制作プロセス',
            },
            {
              id: 'challenges',
              label:
                language === 'en'
                  ? 'Challenges'
                  : '課題',
            },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* Info */}
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={
                  language === 'en'
                    ? 'SOFTWARE'
                    : '使用ソフト'
                }
                colorClass="blue"
              >
                <ul>
                  <li>After Effects</li>
                  <li>Photoshop</li>
                  <li>Illustrator</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={
                  language === 'en'
                    ? 'ROLE'
                    : '担当'
                }
                colorClass="red"
                extraClass="small-padding-box"
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'Direction & Motion'
                      : 'ディレクション・モーション'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Design & Pixel Art'
                      : 'デザイン・ピクセルアート'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Costume by Me'
                      : '衣装制作'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={
                  language === 'en'
                    ? 'DURATION'
                    : '制作期間'
                }
                colorClass="yellow"
                extraClass="small-padding-box"
              >
                <ul className="tight-paragraph">
                  <li>
                    {language === 'en'
                      ? 'June 4 – June 7, 2025'
                      : '2025年6月4日〜6月7日'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Overview */}
          <div id="overview">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'OVERVIEW'
                    : '概要'
                }
                colorClass="pink"
              >
                {language === 'en' ? (
                  <p>
                    This short animated bumper was created to open a video
                    series.
                    <br />
                    I aimed to reflect my playful, quirky style while
                    showcasing motion graphics skills in Adobe After Effects.
                    <br />
                    The piece explores timing, typography, visual rhythm, and
                    transitions to deliver a fun and cohesive intro.
                  </p>
                ) : (
                  <p>
                    動画シリーズのオープニングとして制作した
                    ショートアニメーションです。
                    <br />
                    <br />
                    Adobe After Effectsを使用し、モーショングラフィックスの
                    スキルを活かしながら、自分らしいカラフルで
                    遊び心のある世界観を表現しました。
                    <br />
                    <br />
                    タイミング、タイポグラフィ、映像のリズム、
                    トランジションを工夫し、短い時間の中でも
                    楽しく印象に残るオープニングを目指しました。
                  </p>
                )}
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Inspiration */}
          <div id="inspiration">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'INSPIRATION'
                    : '着想'
                }
                colorClass="green"
              >
                <div className="box-split">
                  <div className="box-text">
                    {language === 'en' ? (
                      <p>
                        My main inspiration came from my love for colorful,
                        maximalist design — and even a few weird dreams.
                        <br />
                        Like in fashion, I enjoy mixing patterns and wanted the
                        animation to reflect that energy.
                        <br />
                        I also made sure the process was fun for me. I wanted
                        to feel excited every time I watched it — and that
                        feeling guided the creative direction. One key
                        inspiration for this animation was the colorful
                        staircase in my parents' home. It was handmade by my
                        dad, and I painted it myself. That staircase has always
                        been one of my favorite spots — full of color,
                        memories, and creativity.
                        <br />
                        <br />
                        When I was animating a pixel art of a ramen bowl inside
                        an emoji’s mouth, I suddenly thought: what if I added a
                        staircase leading up to the ramen? That idea turned
                        into a quirky way to show my growing obsession with
                        ramen — like I was literally climbing toward it.
                        <br />
                        <br />
                        Including that staircase made the piece feel more
                        personal. It wasn’t just about ramen anymore — it
                        became a tribute to my life, my family, and the playful
                        way I’ve always approached design.
                      </p>
                    ) : (
                      <p>
                        この作品の主なインスピレーションは、
                        カラフルでマキシマリストなデザインが好きなこと、
                        そして時々見るちょっと変な夢から来ています。
                        ファッションと同じように、さまざまな柄や色を
                        組み合わせることが好きなので、そのエネルギーを
                        アニメーションにも取り入れました。
                        <br />
                        <br />
                        制作している自分自身が楽しめることも
                        大切にしました。何度見ても自分がワクワクできる
                        映像にしたいという気持ちが、作品全体の
                        方向性につながっています。
                        <br />
                        <br />
                        特に大きなインスピレーションになったのが、
                        実家にあるカラフルな階段です。この階段は
                        父が手作りし、私自身が色を塗りました。
                        色や思い出、ものづくりの楽しさが詰まった、
                        私のお気に入りの場所の一つです。
                        <br />
                        <br />
                        ラーメンのピクセルアートを絵文字の口の中で
                        動かしていたときに、「ラーメンまで続く階段を
                        つけたら面白いかも」と突然思いつきました。
                        そこから、ラーメンに向かって自分が階段を
                        登っていくような、少し変で遊び心のある
                        アイデアへ発展しました。
                        <br />
                        <br />
                        この階段を取り入れたことで、単なるラーメンの
                        アニメーションではなく、自分の生活や家族、
                        そして昔から大切にしている遊び心まで
                        作品に込めることができました。
                      </p>
                    )}
                  </div>

                  <div className="project-slider-detail">
                    <SlideCard
                      slideData={BumperSlideData}
                      onImageClick={(img) =>
                        setSelectedImage(img)
                      }
                    />
                  </div>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Brainstorming */}
          <div id="brainstorming">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'BRAINSTORMING'
                    : 'アイデア出し'
                }
                colorClass="purple"
              >
                <div className="box-split">
                  <div className="box-text">
                    {language === 'en' ? (
                      <p>
                        At first, I didn’t have a concrete plan. I just knew I
                        wanted to make something energetic and full of
                        personality.
                        <br />
                        While working on a T-shirt design for my{' '}
                        <Link
                          to="/projects/japanese-instagram-project"
                          className="link-pink"
                        >
                          “Japanese teaching Instagram”
                        </Link>{' '}
                        I had the idea to bring that same chaotic vibe into
                        motion.
                        <br />
                        <br />
                        I started by choosing background music that made me
                        want to move — that helped spark the mood I wanted. I
                        also experimented with some of my past pixel art pieces
                        and thought, “This could totally come to life with
                        rhythm and motion.”
                        <br />
                        <br />
                        I didn’t storyboard or sketch much — I prefer to build
                        and adjust as I go — but I tried different layouts,
                        color palettes, and animations until it felt right. It
                        was a very intuitive process, driven by trial and
                        error.
                        <br />
                        <br />
                        I also used some photos and videos I had taken during a
                        trip to Japan — you can't really tell it's Japan from
                        the background, but I liked the personal touch it added
                        to the piece.
                      </p>
                    ) : (
                      <p>
                        最初から具体的な構成を決めていたわけではなく、
                        「エネルギッシュで、自分らしさがたくさん
                        詰まったものをつくりたい」というところから
                        スタートしました。
                        <br />
                        <br />
                        <Link
                          to="/projects/japanese-instagram-project"
                          className="link-pink"
                        >
                          日本語学習Instagram
                        </Link>
                        のTシャツデザインを制作していたとき、
                        そのカオスで楽しい雰囲気を
                        モーションにも取り入れたら面白そうだと
                        思ったことがきっかけです。
                        <br />
                        <br />
                        まず、聴くと自然に体を動かしたくなるような
                        BGMを選び、そこから作品のテンポや雰囲気を
                        考えていきました。以前制作したピクセルアートも
                        試しながら、「これを音楽に合わせて動かしたら
                        面白そう」とアイデアを広げていきました。
                        <br />
                        <br />
                        ストーリーボードやスケッチはあまり細かく
                        作らず、実際に制作しながら調整していく方法で
                        進めました。レイアウト、カラーパレット、
                        アニメーションを何度も試しながら、
                        自分が「これだ」と思える形に近づけていきました。
                        <br />
                        <br />
                        日本旅行中に自分で撮影した写真や映像も
                        一部使用しています。背景だけでは日本だと
                        分かりにくいですが、自分自身の思い出を
                        作品の中に入れられたことも気に入っています。
                      </p>
                    )}
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
            </FadeInOnScroll>
          </div>

          {/* Process */}
          <div id="process">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'PROCESS'
                    : '制作プロセス'
                }
                colorClass="orange"
              >
                <ProcessSteps
                  steps={
                    language === 'en'
                      ? [
                          'Decided on the background music first to set the tone and pacing of the animation.',
                          'Chose what I wanted to show — mainly my original pixel art pieces that reflect my style.',
                          'Created supporting assets that matched the theme and visuals of the pixel animation.',
                          'Synchronized the animation with the rhythm of the music to create an engaging flow.',
                          'Added fun details, such as playful tiny texts and hidden visual elements for viewers to discover.',
                        ]
                      : [
                          '最初にBGMを決め、アニメーション全体の雰囲気とテンポを設定。',
                          '自分らしさを表現できるオリジナルのピクセルアートを中心に、使用する素材を選定。',
                          'ピクセルアニメーションの世界観に合わせて、必要なグラフィック素材を制作。',
                          '音楽のリズムに合わせてアニメーションを調整し、テンポの良い流れを制作。',
                          '小さな文字や隠し要素など、見返したときに発見できる遊び心のあるディテールを追加。',
                        ]
                  }
                />
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Challenges */}
          <div id="challenges">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'CHALLENGES'
                    : '課題'
                }
                colorClass="blue"
              >
                {language === 'en' ? (
                  <p>
                    This was one of my first projects using After Effects — I
                    had only been learning the software for about three weeks.
                    Figuring out how to combine different animations, masks,
                    and effects was both exciting and challenging.
                    <br />
                    <br />
                    Initially, I wanted to create and animate to my own original
                    song, but I realized it would take too much time and shift
                    my focus away from the visuals. So I decided to use a
                    pre-made track and concentrate fully on the animation
                    itself.
                    <br />
                    <br />
                    Another challenge was finding the balance between visual
                    chaos and clarity. I experimented with motion, color, and
                    rhythm to make sure the animation felt dynamic and
                    engaging, without becoming overwhelming.
                  </p>
                ) : (
                  <p>
                    この作品はAfter Effectsを使い始めて
                    約3週間の頃に制作した、初期の作品の一つです。
                    さまざまなアニメーション、マスク、エフェクトを
                    どのように組み合わせるかを考えることは、
                    とても楽しい反面、大きな挑戦でもありました。
                    <br />
                    <br />
                    当初は自分でオリジナル曲も制作し、その曲に合わせて
                    アニメーションをつくる予定でした。しかし、
                    音楽制作まで行うと時間がかかり、映像制作への
                    集中が分散してしまうと考えました。
                    そこで既存の楽曲を使用し、アニメーションそのものに
                    集中することにしました。
                    <br />
                    <br />
                    また、「カオスさ」と「見やすさ」のバランスも
                    課題でした。動き、色、リズムを何度も調整し、
                    情報量が多くても見づらくならず、
                    エネルギッシュで楽しい映像になるよう工夫しました。
                  </p>
                )}
              </DetailBox>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="project-nav">
          {prevProject && (
            <Link
              to={buildProjectLink(prevProject)}
              className="nav-button prev"
            >
              <span className="button_top">
                {language === 'en' ? '← Prev' : '← 前へ'}
              </span>
            </Link>
          )}

          <Link
            to="/projects"
            className="back-button center"
          >
            <span className="button_top">
              {language === 'en'
                ? 'Back to projects'
                : '制作実績に戻る'}
            </span>
          </Link>

          {nextProject && (
            <Link
              to={buildProjectLink(nextProject)}
              className="nav-button next"
            >
              <span className="button_top">
                {language === 'en' ? 'Next →' : '次へ →'}
              </span>
            </Link>
          )}
        </div>

        {/* Modal */}
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() =>
            setSelectedImage(null)
          }
          contentLabel={
            language === 'en'
              ? 'Expanded image'
              : '拡大画像'
          }
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.95)',
              border: 'none',
              padding: 0,
              overflow: 'auto',
              width: '95vw',
              maxWidth: '800px',
              height: 'auto',
              maxHeight: '90vh',
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 50,
            },
          }}
        >
          <button
            onClick={() =>
              setSelectedImage(null)
            }
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '2rem',
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '8px',
              padding: '0 8px',
            }}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt={
              language === 'en'
                ? 'Expanded project'
                : '拡大画像'
            }
            style={{
              width: '100%',
            }}
          />
        </Modal>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default BumperProject;