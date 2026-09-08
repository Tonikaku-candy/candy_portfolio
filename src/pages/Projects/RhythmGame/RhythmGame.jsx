// src/pages/Projects/RhythmGame/RhythmGame.jsx

import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useMemo } from 'react';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';

import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import '../../Projects/RhythmGame/RhythmGame.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// image
import gardenEelBubbles from '../../../assets/ProjectDetails/RhythmGame/garden-eel-bubbles.gif';
import ending from '../../../assets/ProjectDetails/RhythmGame/ending.gif';
import gameCover from '../../../assets/ProjectDetails/RhythmGame/rhythm-heaven-game-cover.webp';

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
   Component
------------------------- */
function RhythmGame() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params]
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
  }, [currentIndex]);

  const baseTags = [
    'CONTENT CREATION',
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'MUSIC SYNC',
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
          className={`long ${
            language === 'ja' ? 'japanese-text' : ''
          }`}
          title={
            language === 'en'
              ? `Rhythm Game Animation\nin After Effects`
              : 'リズムゲーム風アニメーション'
          }
        />

        {/* Short Video */}
        <div className="video-wrapper rhythm-video">
          <div id="short"></div>

          <FadeInOnScroll>
            <iframe
              src="https://www.youtube.com/embed/FirjiKAvp8U?si=U27l5qBcxGKhgS_I"
              title="Rhythm Game Short Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </FadeInOnScroll>
        </div>

        {/* Page Links */}
        <DetailLinks
          links={[
            {
              id: 'short',
              label:
                language === 'en'
                  ? 'Short Video'
                  : 'ショート動画',
            },
            {
              id: 'overview',
              label:
                language === 'en'
                  ? 'Overview'
                  : '概要',
            },
            {
              id: 'inspiration',
              label:
                language === 'en'
                  ? 'Inspiration'
                  : '着想',
            },
            {
              id: 'story',
              label:
                language === 'en'
                  ? 'Storytelling'
                  : 'ストーリー',
            },
            {
              id: 'production',
              label:
                language === 'en'
                  ? 'Production'
                  : '制作',
            },
            {
              id: 'feedback',
              label:
                language === 'en'
                  ? 'Feedback'
                  : 'フィードバック',
            },
            {
              id: 'video',
              label:
                language === 'en'
                  ? 'Full Video'
                  : 'フル動画',
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
                  <li>Photoshop</li>
                  <li>Premiere Pro</li>
                  <li>After Effects</li>
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
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'Motion Designer'
                      : 'モーションデザイン'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Visual Storyteller'
                      : 'ビジュアルストーリーテリング'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Editor'
                      : '動画編集'}
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
                      ? 'June 15th – July 2nd, 2025'
                      : '2025年6月15日〜7月2日'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* Overview */}
          <div id="overview"></div>

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
                <>
                  <p>
                    This project was originally assigned as a
                    “Mythbusters-style 2D animation”, requiring music,
                    narration, sound effects, and motion graphics.
                  </p>

                  <p>
                    Instead of a typical myth animation, I created a
                    rhythm game–style animation in After Effects. It
                    focuses on precise beat synchronization and visual
                    effects, capturing the quick and satisfying feel
                    of hitting the beat.
                  </p>

                  <p>
                    A small video in the top right corner simulates
                    actual gameplay, visually reinforcing the concept
                    that this is a rhythm game.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    この作品はもともと、
                    「Mythbusters風の2Dアニメーション」を制作する
                    課題として始まりました。音楽、ナレーション、
                    効果音、モーショングラフィックスを
                    組み合わせることが条件でした。
                  </p>

                  <p>
                    しかし一般的なMythbusters風の作品ではなく、
                    After Effectsを使って
                    リズムゲーム風のアニメーションを制作しました。
                    音楽のビートと動きを正確に合わせ、
                    タイミングよく操作したときのような
                    気持ちよさを映像で表現しています。
                  </p>

                  <p>
                    画面右上には実際のゲームプレイをイメージした
                    小さな映像を配置し、
                    「リズムゲームをプレイしている」という
                    世界観が伝わるようにしました。
                  </p>
                </>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* Inspiration */}
          <div id="inspiration"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'INSPIRATION'
                  : '着想'
              }
              colorClass="green"
            >
              {language === 'en' ? (
                <p>
                  Since I wasn’t very familiar with Mythbusters,
                  
                  　I decided to create something that I would genuinely
                  enjoy making.
                  <br />
                  Because timing was an important skill to practice,
                
                  I chose a rhythm-game style animation.
                  <br />
                  <br />
                  I referenced the game “Rhythm Heaven,”
                
                  but I’ve actually never played it and I don’t
                  usually play games.
                  
                  Instead, I studied gameplay videos and reimagined
                  
                  what a rhythm game could look like in my own style.
                </p>
              ) : (
                <p>
                  私はMythbustersにあまり馴染みがなかったため、
                  自分自身が本当に楽しみながら制作できるものに
                  したいと考えました。
                  <br />
                  <br />
                  また、この課題ではアニメーションの
                  タイミングを練習することも重要だったため、
                  音楽と動きを合わせるリズムゲームという
                  アイデアを選びました。
                  <br />
                  <br />
                  参考にしたのは「リズム天国」です。
                  実はこのゲームをプレイしたことはなく、
                  普段もあまりゲームをしません。
                  そこでゲームプレイ動画を研究し、
                  「自分だったらどんなリズムゲームを
                  つくるだろう？」と考えながら、
                  自分らしい世界観にアレンジしました。
                </p>
              )}

              <div className="image-wrapper small">
                <img
                  src={gameCover}
                  alt={
                    language === 'en'
                      ? 'Rhythm Heaven game cover'
                      : 'リズム天国のゲームカバー'
                  }
                  className="game-cover"
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Story */}
          <div id="story"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'Humor & Storytelling'
                  : 'ユーモアとストーリー'
              }
              colorClass="purple"
            >
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}
              >
                {language === 'en' ? (
                  <p>
                    The original brief was to create a
                    Mythbusters-style animation.
                    <br />
                    Instead of a traditional myth story, I turned the
                    assignment itself into the “myth” — imagining
                    what would happen if I ignored the teacher’s
                    project and played a rhythm game instead.
                    <br />
                    <br />
                    To keep the tone playful, I ended the video with
                    the line{' '}
                    <i>
                      “Candy’s grade to be decided… no one knows what
                      happened to her after.”
                    </i>
                    <br />
                    The whole piece is designed to be humorous,
                    energetic, and self-aware.
                  </p>
                ) : (
                  <p>
                    元の課題はMythbusters風の
                    アニメーションを制作するというものでした。
                    <br />
                    <br />
                    そこで一般的な「神話」を扱うのではなく、
                    <strong>課題そのものを“神話”にする</strong>
                    というアイデアを考えました。
                    「先生から出された課題を無視して、
                    代わりにリズムゲームを始めたらどうなる？」
                    というストーリーです。
                    <br />
                    <br />
                    最後には、
                    <i>
                      「Candyの成績は審議中……
                      その後彼女がどうなったのかは誰も知らない。」
                    </i>
                    という文章を入れています。
                    <br />
                    <br />
                    課題でありながら、自分自身をネタにした
                    ユーモアと勢いのあるストーリーにしました。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={ending}
                    alt={
                      language === 'en'
                        ? 'Ending screen'
                        : 'エンディング画面'
                    }
                  />
                </div>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Production */}
          <div id="production"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'PRODUCTION HIGHLIGHTS'
                  : '制作のポイント'
              }
              colorClass="orange"
            >
              {language === 'en' ? (
                <p>
                  In my previous project, the{' '}
                  <Link
                    to="/projects/bumper"
                    className="link-pink"
                  >
                    “Bumper Opener”
                  </Link>
                  , my main goal was simply to get comfortable with
                  After Effects by adding lots of motion and
                  experimenting with timing.
                  <br />
                  <br />
                  This time, I wanted to challenge myself further by
                  creating custom assets such as particles. For
                  example, in the garden eel scene, I designed bubbles
                  and waves using particle effects, which added a
                  greater sense of depth and atmosphere to the
                  animation.
                </p>
              ) : (
                <p>
                  前作の{' '}
                  <Link
                    to="/projects/bumper"
                    className="link-pink"
                  >
                    「Bumper Opener」
                  </Link>
                  では、After Effectsに慣れることを目的に、
                  さまざまな動きやタイミングを試しました。
                  <br />
                  <br />
                  今回はそこからさらに一歩進み、
                  パーティクルなどの素材も自分で制作することに
                  挑戦しました。
                  <br />
                  <br />
                  例えばチンアナゴのシーンでは、
                  パーティクルエフェクトを使って
                  泡や波を制作しています。
                  これによって映像に奥行きと
                  水中らしい雰囲気を加えることができました。
                </p>
              )}

              <div className="gif-wrapper small">
                <img
                  src={gardenEelBubbles}
                  alt={
                    language === 'en'
                      ? 'Garden eel scene with particles'
                      : 'パーティクルを使用したチンアナゴのシーン'
                  }
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Feedback */}
          <div id="feedback"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'FEEDBACK'
                  : 'フィードバック'
              }
              colorClass="pink"
            >
              {language === 'en' ? (
                <p>
                  At first, my teacher pointed out that my rhythm game
                  animation seemed far from the original
                  “Mythbusters-style” assignment.
                  <br />
                  <br />
                  However, once I reframed the project by turning the
                  teacher himself into the “myth,” the class reacted
                  with laughter, and even my teacher admitted,
                  “Now this is a myth.”
                  <br />
                  <br />
                  My classmates also enjoyed the unexpected flow —
                  starting serious, suddenly switching into a game
                  screen, and ending with an ambiguous conclusion.
                  They said the unpredictability made it entertaining
                  and memorable.
                </p>
              ) : (
                <p>
                  最初、講師からは
                  「リズムゲームのアニメーションは、
                  元のMythbusters風という課題から
                  かなり離れている」と指摘されました。
                  <br />
                  <br />
                  そこで、講師自身をストーリーの
                  「myth」にするという形に設定し直しました。
                  するとクラスから笑いが起こり、
                  講師からも
                  <strong>「これならmythだね」</strong>
                  と言ってもらうことができました。
                  <br />
                  <br />
                  クラスメイトからも、
                  真面目な雰囲気で始まったと思ったら
                  突然ゲーム画面に変わり、
                  最後も曖昧な結末で終わるという
                  予想できない展開が面白く、
                  印象に残ったという反応をもらいました。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>
        </div>

        {/* Full Video */}
        <div id="video"></div>

        <div className="video-wrapper rhythm-video">
          <FadeInOnScroll>
            <iframe
              src="https://www.youtube.com/embed/p9sW7Ym1-bU?si=g0LenSje5iPrbO5s"
              title="Rhythm Game Full Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
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
                {language === 'en'
                  ? '← Prev'
                  : '← 前へ'}
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
                {language === 'en'
                  ? 'Next →'
                  : '次へ →'}
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default RhythmGame;