import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import '../../Projects/Canada/CanadaPromotionalVideo.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import projects from '../../../data/ProjectData.js';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// slide
import SlideData from './CanadaSlideData.js';
import SlideCard from '../../../components/ProjectDetail/SlideCard';

// images
import screenShot from '../../../assets/ProjectDetails/Canada/canada_video_editing_what_scene.webp';
import wall from '../../../assets/ProjectDetails/Canada/canada_awesome_wall.webp';

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
   Component
------------------------- */
function CanadaPromotionalVideo() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);

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
    'VIDEO EDITING',
    'PROMOTIONAL VIDEO',
    'MARKETING',
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

        {/* BACK */}
        <div className="back-to-works top">
          <Link to="/projects" className="back-button top">
            <span className="button_top">
              {language === 'en'
                ? '← Back to projects'
                : '← 制作実績に戻る'}
            </span>
          </Link>
        </div>

        {/* TITLE */}
        <ProjectTitle
          className={`long-title ${
            language === 'ja' ? 'japanese-text' : ''
          }`}
          title={
            language === 'en'
              ? `“Canada Ain’t What I Thought!”\nPlayful Travel Campaign Film`
              : '「思ってたカナダと違う！」\n旅行プロモーション映像'
          }
        />

        {/* VIDEO */}
        <div id="video"></div>

        <FadeInOnScroll>
          <div className="video-wrapper canada">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/o0zuYan30wI?si=G6HFcPcZ5pCGQiz3"
              title="Canada Promotional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </FadeInOnScroll>

        {/* LINKS */}
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
              id: 'concept',
              label:
                language === 'en'
                  ? 'Concept'
                  : 'コンセプト',
            },
            {
              id: 'approach',
              label:
                language === 'en'
                  ? 'Approach'
                  : '方向性',
            },
            {
              id: 'music',
              label:
                language === 'en'
                  ? 'Music'
                  : '音楽・編集',
            },
            {
              id: 'production',
              label:
                language === 'en'
                  ? 'Production'
                  : '制作',
            },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* SOFTWARE / ROLE / DURATION */}
          <div className="project-grid">
            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={language === 'en' ? 'SOFTWARE' : '使用ソフト'}
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
                title={language === 'en' ? 'ROLE' : '担当'}
                colorClass="red"
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'Creative Director'
                      : 'クリエイティブディレクション'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Video Editor'
                      : '動画編集'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Lyric Writer'
                      : '作詞'}
                  </li>
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
                  <li>
                    {language === 'en'
                      ? 'Re-edited August 4th, 2025'
                      : '2025年8月4日 再編集'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'March 20th – April 11th, 2025'
                      : '2025年3月20日〜4月11日'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* OVERVIEW */}
          <div id="overview"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'OVERVIEW' : '概要'}
              colorClass="pink"
            >
              {language === 'en' ? (
                <p>
                  This project was a promotional video created for a
                  fictional company chosen in our video storytelling
                  class.
                  <br />
                  <br />
                  Our group selected a travel agency, and the goal was
                  to produce a 2–5 minute piece based on the storyboard
                  we developed in the previous term.
                </p>
              ) : (
                <p>
                  Video Storytellingの授業で、
                  架空の企業を想定して制作した
                  プロモーション映像です。
                  <br />
                  <br />
                  私たちのグループは旅行会社をテーマに選び、
                  前学期に制作したストーリーボードをもとに、
                  2〜5分の映像作品を制作することが
                  課題の目的でした。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* CONCEPT */}
          <div id="concept"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'CONCEPT & DIRECTION'
                  : 'コンセプト＆方向性'
              }
              colorClass="green"
            >
              {language === 'en' ? (
                <p>
                  At first, we planned a typical story of an
                  international student who feels lonely after arriving
                  in Canada but eventually finds joy through online
                  friendships during the pandemic.
                  <br />
                  <br />
                  However, I was in charge of directing and editing,
                  and I asked myself “Do I really want to make this
                  story?” I noticed that the team wasn’t very
                  enthusiastic either, so I proposed something more fun
                  to create, something that would reflect our real
                  experiences.
                </p>
              ) : (
                <p>
                  当初は、カナダに来た留学生が孤独を感じながらも、
                  パンデミック中にオンラインで友達と出会い、
                  徐々に前向きになっていくという
                  比較的オーソドックスなストーリーを
                  考えていました。
                  <br />
                  <br />
                  しかし、ディレクションと編集を担当していた私は、
                  「本当にこのストーリーをつくりたいのかな？」
                  と疑問を持つようになりました。
                  <br />
                  <br />
                  チーム全体もあまりワクワクしていないように
                  感じたため、もっと自分たちが楽しんで制作でき、
                  実際の経験も反映できる内容にしようと
                  新しいアイデアを提案しました。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* APPROACH */}
          <div id="approach"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'NEW APPROACH & INSPIRATION'
                  : '新しい方向性＆着想'
              }
              colorClass="purple"
            >
              {language === 'en' ? (
                <p>
                  Rather than making a sugar-coated promotional video,
                  I wanted to start with the reality: “Canada wasn’t
                  exactly what I expected.”
                  <br />
                  <br />
                  I had high expectations before coming here, but faced
                  many surprises like being placed in a language school
                  full of people from my own country, or realizing how
                  different the environment was from what the travel
                  agents told me.
                  <br />
                  <br />
                  Over time, though, I found joy in multicultural life,
                  especially the shared food and culture, and
                  eventually came to love living in Canada. This
                  personal experience shaped the new storyline: a
                  humorous musical-style journey from disappointment
                  to appreciation.
                </p>
              ) : (
                <p>
                  きれいな部分だけを見せる一般的な旅行PRではなく、
                  <strong>
                    「カナダ、思ってたのとちょっと違う！」
                  </strong>
                  というリアルな感情から
                  ストーリーを始めることにしました。
                  <br />
                  <br />
                  カナダへ来る前は大きな期待を持っていましたが、
                  実際に来てみると、
                  語学学校に同じ国の人がたくさんいたり、
                  留学エージェントから聞いていたイメージと
                  現実が違ったりと、
                  さまざまなギャップがありました。
                  <br />
                  <br />
                  しかし生活していく中で、
                  多文化な環境や、さまざまな国の食べ物、
                  文化を共有する楽しさに気づき、
                  最終的にはカナダでの生活が
                  好きになっていきました。
                  <br />
                  <br />
                  その実体験をもとに、
                  「期待外れ」から「好き」へ変化していく過程を、
                  ユーモアのあるミュージカル風の
                  ストーリーとして表現しました。
                </p>
              )}

              <br />

              <h3 className="story-plan-heading">
                {language === 'en'
                  ? 'Here is the story plan:'
                  : 'ストーリープラン：'}
              </h3>

              <div className="project-slider-detail canada-slide">
                <SlideCard
                  slideData={SlideData}
                  onImageClick={setSelectedImage}
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* MUSIC */}
          <div id="music"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'MUSIC & EDITING'
                  : '音楽＆編集'
              }
              colorClass="orange"
            >
              {language === 'en' ? (
                <p>
                  I wrote the lyrics in Japanese and generated the song
                  using the AI music tool Suno. Since AI outcomes vary
                  each time, I generated several tracks and chose the
                  one with the most catchy, upbeat, and memorable
                  melody.
                  <br />
                  <br />
                  I also structured the video to include dramatic
                  cutscenes between musical sections, making it more
                  engaging and not just a simple music video.
                </p>
              ) : (
                <p>
                  歌詞は自分で日本語で作詞し、
                  AI音楽ツールのSunoを使って楽曲を制作しました。
                  <br />
                  <br />
                  AIでは生成するたびに異なる楽曲ができるため、
                  複数のバージョンを生成し、
                  その中から最もキャッチーで明るく、
                  印象に残るメロディを選びました。
                  <br />
                  <br />
                  また、単純なミュージックビデオにならないよう、
                  楽曲の合間にドラマチックな
                  カットシーンを入れ、
                  ストーリーとして楽しめる構成にしています。
                </p>
              )}

              <div className="text-center">
                <a
                  href="https://suno.com/playlist/80ca1620-0b76-44f5-b7d8-a86db1bb8f7a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="suno-link"
                >
                  {language === 'en'
                    ? 'Listen to other versions'
                    : '他のバージョンを聴く'}
                </a>
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* PRODUCTION */}
          <div id="production"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'PRODUCTION HIGHLIGHTS'
                  : '制作のポイント'
              }
              colorClass="pink"
            >
              {language === 'en' ? (
                <>
                  <p>
                    The video features a mix of scripted acting,
                    vlog-style dialogue, original music, and comedic
                    exaggeration. We wanted it to feel like a musical,
                    but with a twist showing the honest experience of
                    an international student, with both the ups and
                    downs.
                    <br />
                    <br />
                    I also used Adobe After Effects for adding motion
                    graphics, transitions, and subtle visual effects to
                    make the storytelling more dynamic and polished.
                    <br />
                    <br />
                    Screenshot from Adobe After Effects, showing the
                    “What!?!!” comic-style cut scene created with Loto
                    Blush font. This editing process involved layering
                    video footage with animated speech bubbles to
                    enhance the playful, musical style of the campaign
                    film.
                  </p>
                </>
              ) : (
                <p>
                  映像では、台本に沿った演技、
                  Vlog風の会話、オリジナル楽曲、
                  少し大げさなコメディ表現を組み合わせました。
                  <br />
                  <br />
                  ミュージカルのような楽しい雰囲気を持たせながら、
                  留学生生活の良い部分だけでなく、
                  期待とのギャップや大変だった部分も
                  ユーモラスに見せています。
                  <br />
                  <br />
                  また、After Effectsを使用して
                  モーショングラフィックス、
                  トランジション、視覚効果を追加し、
                  ストーリーにより動きとテンポを加えました。
                  <br />
                  <br />
                  下の画像はAfter Effectsで制作した
                  「What!?!!」のコミック風カットシーンです。
                  実写映像にアニメーションした吹き出しや
                  タイポグラフィを重ねることで、
                  コミカルでミュージカルらしい
                  演出にしています。
                </p>
              )}

              <div className="image-wrapper small">
                <img
                  src={screenShot}
                  alt={
                    language === 'en'
                      ? "Adobe After Effects editing screenshot of 'What!?!' comic-style cut scene"
                      : 'After Effectsで制作したコミック風カットシーン'
                  }
                  onClick={() => setSelectedImage(screenShot)}
                />
              </div>

              {language === 'en' ? (
                <p>
                  During the lyric{' '}
                  <strong>“Canada is awesome now!”</strong>, we
                  intentionally matched the scene with a Vancouver
                  mural that says <em>“MORE AWESOME NOW”</em>.
                  <br />
                  <br />
                  This coincidence created a powerful visual pun,
                  linking the song lyric directly with real urban
                  street art. It emphasized the playful yet genuine
                  discovery of joy in Canada.
                </p>
              ) : (
                <p>
                  歌詞の
                  <strong>「Canada is awesome now!」</strong>
                  の部分では、
                  バンクーバーに実際にある
                  <em>「MORE AWESOME NOW」</em>
                  と書かれた壁画に合わせて
                  シーンを構成しました。
                  <br />
                  <br />
                  歌詞と実際の街のアートが偶然リンクしたことを
                  利用した、視覚的な言葉遊びです。
                  カナダでの生活の楽しさに
                  気づいていくストーリーを、
                  遊び心のある方法で表現しました。
                </p>
              )}

              <div className="image-wrapper small">
                <img
                  src={wall}
                  alt={
                    language === 'en'
                      ? "Vancouver mural with 'MORE AWESOME NOW' text"
                      : 'MORE AWESOME NOWと書かれたバンクーバーの壁画'
                  }
                  onClick={() => setSelectedImage(wall)}
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>
        </div>

        {/* PREV / NEXT */}
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

        {/* MODAL */}
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
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
            alt={
              language === 'en'
                ? 'Expanded project image'
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

export default CanadaPromotionalVideo;