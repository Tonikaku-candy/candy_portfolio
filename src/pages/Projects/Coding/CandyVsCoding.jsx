// src/pages/Projects/MagicMusic/MagicMusicMv.jsx

import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';

import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import Modal from 'react-modal';

import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';

import SlideData2 from './CandyVsCodingStoryboardData.js';

// image
import color from '../../../assets/ProjectDetails/CandyVsCoding/color-typography.webp';
import logo from '../../../assets/ProjectDetails/CandyVsCoding/logo-variations.webp';

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

  const lastSeg = norm(location?.pathname?.split('/').filter(Boolean).pop());

  const candidates = [...paramCandidates, lastSeg].filter(Boolean);

  const pickKeys = (p) => {
    const keys = new Set();

    keys.add(norm(p.id));
    keys.add(norm(p.slug));
    keys.add(norm(p.link));

    const linkLast = norm((p.link || '').split('/').filter(Boolean).pop());

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
   Component
------------------------- */
function CandyVsCoding() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const [selectedTag, setSelectedTag] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params, projects],
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
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'UI / UX',
    'WEB DEVELOPMENT',
    'STORYTELLING',
  ];

  const tags = [...baseTags, ...baseTags];

  return (
    <>
      <div
        className={`project-detail-page ${
          language === 'ja' ? 'japanese-text' : ''
        }`}
      >
        <ScrollingTagBar tags={tags} />

        {/* Back Button */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">
              {language === 'en' ? '← Back to projects' : '← 制作実績に戻る'}
            </span>
          </Link>
        </div>

        {/* Project Title */}
        <ProjectTitle
          title={
            language === 'en'
              ? 'Candy VS Coding: How I Built My Portfolio'
              : 'Candy VS Coding：ポートフォリオ制作の舞台裏'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />
        {/* Video */}
        <div id="video"></div>

        <FadeInOnScroll>
          <div className="video-wrapper rhythm-video">
            <iframe
              src="https://www.youtube.com/embed/iMnireSu81Q?si=WTw5XHS3H6EqnUIG"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </FadeInOnScroll>

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
              id: 'process',
              label:
                language === 'en' ? (
                  <>
                    Design
                    <br />
                    Process
                  </>
                ) : (
                  <>
                    デザイン
                    <br />
                    プロセス
                  </>
                ),
            },
            {
              id: 'wireframe',
              label:
                language === 'en' ? (
                  <>
                    Portfolio
                    <br />
                    Wireframe
                  </>
                ) : (
                  <>
                    ポートフォリオ
                    <br />
                    ワイヤーフレーム
                  </>
                ),
            },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* Software / Role / Duration */}
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={language === 'en' ? 'SOFTWARE' : '使用ソフト'}
                colorClass="blue"
              >
                <ul>
                  <li>After Effects</li>
                  <li>Photoshop</li>
                  <li>Premiere Pro</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={language === 'en' ? 'ROLE' : '担当'}
                colorClass="red"
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'Motion Designer'
                      : 'モーションデザイン'}
                  </li>

                  <li>{language === 'en' ? 'Editor' : '動画編集'}</li>

                  <li>{language === 'en' ? 'Filming' : '撮影'}</li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={language === 'en' ? 'DURATION' : '制作期間'}
                colorClass="yellow"
                extraClass="small-padding-box"
              >
                <ul>
                  <li className="game">
                    {language === 'en'
                      ? 'Nov 4th – Dec 9th, 2025'
                      : '2025年11月4日〜12月9日'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Overview */}
          <div id="overview"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'OVERVIEW' : '概要'}
              colorClass="pink"
            >
              {language === 'en' ? (
                <p>
                  “Candy vs Coding” is a short parody film that humorously
                  visualizes my journey of learning to code and building my
                  portfolio at BCIT. Inspired by classic arcade fighting games,
                  the story follows me battling{' '}
                  <strong>HTML, CSS, JavaScript, and React</strong>
                  , each representing a unique challenge I faced during the
                  program.
                  <br />
                  <br />
                  The film mixes live-action footage, VFX, and animation created
                  in After Effects and Premiere Pro. It’s both a comedy and a
                  reflection of how creativity, teamwork, and perseverance
                  helped me overcome technical struggles as a designer learning
                  development.
                </p>
              ) : (
                <p>
                  「Candy vs Coding」は、BCITで コーディングを学びながら、この
                  ポートフォリオを制作した経験を
                  ユーモラスに表現した短編パロディ 映像です。
                  <br />
                  <br />
                  昔のアーケード格闘ゲームから着想を得て、
                  <strong>HTML、CSS、JavaScript、React</strong>
                  をそれぞれ敵キャラクターとして登場させ、
                  学習中に直面したさまざまな苦戦を バトルとして表現しました。
                  <br />
                  <br />
                  実写映像にVFXやアニメーションを 組み合わせ、After Effectsと
                  Premiere Proを使用して制作しています。
                  コメディ作品でありながら、デザインを
                  学んできた私が開発に挑戦する中で、
                  創造力やチームワーク、最後まで
                  諦めないことの大切さを表現した作品です。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* Inspiration */}
          <div id="inspiration"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'INSPIRATION' : '着想'}
              colorClass="green"
            >
              {language === 'en' ? (
                <p>
                  I started with <strong>zero computer knowledge</strong>
                  , and coding was a real struggle for me. But I studied hard
                  and built this entire portfolio website from scratch. Many
                  people asked if I actually coded it myself—and some people
                  didn’t even believe me!
                  <br />
                  <br />
                  That’s why I decided to create this video about how I built my
                  portfolio. Instead of making something serious or technical, I
                  wanted to turn my learning journey into something fun and
                  playful.
                  <br />
                  <br />
                  One day, I suddenly thought: my journey at BCIT felt like a
                  fighting game. Every new coding skill was like a boss I had to
                  learn, fight, and defeat. That’s how the “fighting game” idea
                  was born.
                  <br />
                  <br />
                  Here is the storyboard:
                </p>
              ) : (
                <p>
                  私はもともと
                  <strong>パソコンの知識がほとんどない状態</strong>
                  からスタートしたため、コーディングには
                  とても苦戦しました。それでも勉強を続け、
                  このポートフォリオサイトを一から 制作しました。
                  <br />
                  <br />
                  「本当に自分でコーディングしたの？」
                  と聞かれることも多く、中には信じて
                  もらえないこともありました。
                  そこで、ポートフォリオをどのように
                  制作したのかを映像作品にしてみようと 考えました。
                  <br />
                  <br />
                  ただ真面目に技術を説明するのではなく、
                  自分らしく楽しく、遊び心のある方法で
                  学習の過程を表現したいと思いました。
                  <br />
                  <br />
                  あるとき、BCITでの経験はまるで
                  格闘ゲームのようだったと気づきました。
                  新しいコーディングスキルを学ぶたびに、
                  新しいボスと戦っているような感覚が あったからです。そこから
                  「格闘ゲーム」というアイデアが 生まれました。
                  <br />
                  <br />
                  以下は制作したストーリーボードです。
                </p>
              )}

              <div className="project-slider-detail">
                <SlideCard
                  slideData={SlideData2}
                  onImageClick={(img) => setSelectedImage(img)}
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Design Process */}
          <div id="process"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'PORTFOLIO DESIGN PROCESS'
                  : 'ポートフォリオのデザインプロセス'
              }
              colorClass="purple"
            >
              <div>
                {language === 'en' ? (
                  <p>
                    During the design brainstorming phase, I created a color
                    palette and typography system to define the playful,
                    energetic identity of my brand. The bright neon colors and
                    rounded typefaces reflect the mix of Harajuku culture, fun
                    energy, and friendly tone that I always aim for in my
                    creative work.
                  </p>
                ) : (
                  <p>
                    デザインのアイデアを考える段階で、
                    自分のブランドらしい、楽しく
                    エネルギッシュな世界観をつくるために、
                    カラーパレットとタイポグラフィを 設計しました。
                    <br />
                    <br />
                    鮮やかなネオンカラーと丸みのある
                    フォントを使い、原宿カルチャーから
                    影響を受けたカラフルさや遊び心、
                    親しみやすさを表現しています。
                  </p>
                )}

                <div className="image-wrapper">
                  <img src={color} alt="color palette and typography" />
                </div>

                {language === 'en' ? (
                  <p>
                    When I started thinking about my logo, I knew I wanted to
                    use pixel art. Before studying design, I used to run a small
                    handmade fashion brand where I created and sold perler-bead
                    accessories, so pixel art has a special meaning to me.
                    <br />
                    <br />I also wanted a cute character to represent my brand,
                    and that’s when the chameleon idea came to me. The chameleon
                    reflects my creative mindset: the ability to adapt, explore,
                    and grow into new forms, even when I don’t have much
                    experience yet. It reminds me that there is value in trying,
                    changing, and becoming.
                  </p>
                ) : (
                  <p>
                    ロゴを考え始めたとき、ピクセルアートを
                    取り入れたいと思っていました。 デザインを学ぶ前、私は小さな
                    ハンドメイドファッションブランドを
                    運営し、アイロンビーズのアクセサリーを
                    制作・販売していたため、 ピクセルアートは私にとって
                    特別な存在です。
                    <br />
                    <br />
                    また、自分のブランドを象徴する
                    かわいいキャラクターもつくりたいと
                    考えていました。そこで思いついたのが カメレオンです。
                    <br />
                    <br />
                    カメレオンには、新しい環境に適応し、
                    経験のないことにも挑戦しながら、
                    さまざまな形へ変化し成長していく という意味を込めています。
                    挑戦し、変化し続けることそのものに
                    価値があるという、私のクリエイティブに
                    対する考え方を表しています。
                  </p>
                )}

                <div className="image-wrapper">
                  <img src={logo} alt="logo variations" />
                </div>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Wireframe */}
          <div id="wireframe"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'WIREFRAME' : 'ワイヤーフレーム'}
              colorClass="orange"
            >
              {language === 'en' ? (
                <p>
                  Before coding my portfolio website, I designed its layout in
                  Figma to plan the overall structure, user flow, and page
                  balance. This helped me connect design thinking with coding
                  practice. It was difficult to code everything exactly as I
                  designed it, but I followed the plan as closely as possible.
                  Through that process, I learned how important it is to
                  understand coding when designing—you can’t just design
                  whatever you want. Planning is really important.
                  <br />
                  <br />
                  As I continued coding, I kept improving the UI based on my
                  instructor’s feedback. My style is busy and playful, but I
                  focused on making navigation clear and making buttons easy to
                  understand. In the final stage, I decided to add a grid
                  background to the home page. My design mixes solid backgrounds
                  and grid patterns, balancing “busy → solid → busy → solid” as
                  a rhythm throughout the layout.
                </p>
              ) : (
                <p>
                  ポートフォリオサイトをコーディングする
                  前に、Figmaでレイアウトを制作し、
                  サイト全体の構成、ユーザーの動線、
                  ページのバランスを考えました。 デザインを先に設計することで、
                  デザインとコーディングを結びつけながら
                  制作することができました。
                  <br />
                  <br />
                  デザインしたものをそのままコードで
                  再現するのは難しかったですが、 できる限り最初の設計に沿って
                  制作しました。この経験から、 Webデザインでは見た目だけでなく、
                  実装について理解した上で設計することが 大切だと学びました。
                  <br />
                  <br />
                  コーディングを進めながら、講師からの
                  フィードバックをもとにUIも改善しました。
                  私のデザインはカラフルで情報量が多い
                  スタイルなので、ナビゲーションを
                  分かりやすくし、ボタンの役割が
                  直感的に伝わるよう意識しました。
                  <br />
                  <br />
                  最終段階ではホームページにグリッド背景を
                  追加しました。無地の背景とグリッドを 「にぎやか → シンプル →
                  にぎやか → シンプル」と交互に配置することで、
                  ページ全体にリズムをつけています。
                </p>
              )}

              <iframe
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  height: '450px',
                  borderRadius: '8px',
                }}
                src="https://embed.figma.com/design/eX0LRBEzHFmK61GHg2tgZY/Portfolio-Website--%E3%82%B3%E3%83%94%E3%83%BC-?node-id=43-330&embed-host=share"
                allowFullScreen
              ></iframe>
            </DetailBox>
          </FadeInOnScroll>
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

          <Link to="/projects" className="back-button center">
            <span className="button_top">
              {language === 'en' ? 'Back to projects' : '制作実績に戻る'}
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

        {/* Image Modal */}
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          contentLabel={language === 'en' ? 'Expanded image' : '拡大画像'}
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
            onClick={() => setSelectedImage(null)}
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
            alt={language === 'en' ? 'Expanded project' : '拡大画像'}
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

export default CandyVsCoding;
