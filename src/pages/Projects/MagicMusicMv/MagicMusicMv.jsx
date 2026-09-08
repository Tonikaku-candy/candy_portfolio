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

import SlideData from './MagicMusicStoryboardData.js';

// image
import production1 from '../../../assets/ProjectDetails/MagicMusicMv/production.gif';
import production2 from '../../../assets/ProjectDetails/MagicMusicMv/production-before-after.gif';
import production3 from '../../../assets/ProjectDetails/MagicMusicMv/karate-scene.gif';
import production4 from '../../../assets/ProjectDetails/MagicMusicMv/sunset-scene.gif';
import production5 from '../../../assets/ProjectDetails/MagicMusicMv/fashion-show-scene.gif';

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
function MagicMusicMv() {
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
    'MOTION GRAPHICS',
    'AFTER EFFECTS',
    'MUSIC VIDEO',
    'HANDMADE CLOTHES',
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
          title={
            language === 'en'
              ? 'Magic Music - Music Video'
              : 'Magic Music - ミュージックビデオ'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {/* Video */}
        <div id="video"></div>

        <FadeInOnScroll>
          <div className="video-wrapper rhythm-video">
            <iframe
              src="https://www.youtube.com/embed/VN9nHoXtddE?si=pGI9K4UByQIAX1P3"
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
              id: 'production',
              label: language === 'en' ? 'Production' : '制作',
            },
            {
              id: 'challenges',
              label: language === 'en' ? 'Challenges' : '課題と解決',
            },
          ]}
        />

        <div className="detail-box-wrapper">
          {/* Info */}
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
                  <li>
                    {language === 'en'
                      ? 'Editor'
                      : '動画編集'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Costume Maker / Stylist'
                      : '衣装制作・スタイリング'}
                  </li>
                  <li>
                    {language === 'en' ? 'Filming' : '撮影'}
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
                  <li className="game">
                    {language === 'en'
                      ? 'July 19th – August 9th, 2025'
                      : '2025年7月19日〜8月9日'}
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
                  A fan-made music video created in Adobe After Effects,
                  focusing on beat-synced motion, bold type, and colorful
                  visuals. Clothes are mostly handmade by Candy, blending
                  fashion craft with motion design to create a playful,
                  Harajuku-inspired mood.
                  <br />
                  <br />
                  My goal was to take something silly seriously. Instead of one
                  unified style, the video embraces variety—mixing aesthetics,
                  tones, and textures so each scene feels unexpected and fresh.
                  The intent is to keep viewers constantly surprised, visually
                  stimulated, and never sure what comes next.
                  <br />
                  <br />
                  Many scenes were filmed on green screen and composited later.
                  Early planning began with a detailed storyboard, which I will
                  introduce in the following section. This helped translate
                  initial sketches into live-action shots, later composited
                  digitally.
                  <br />
                  <br />
                  Overall, the mood is colorful, surreal, and intentionally
                  chaotic—combining humor, absurdity, visual metaphors, and
                  cultural references into a vibrant journey.
                </p>
              ) : (
                <p>
                  Adobe After Effectsを使用して制作したファンメイドの
                  ミュージックビデオです。音楽のビートに合わせた
                  モーション、大胆なタイポグラフィ、カラフルな映像表現を
                  取り入れています。映像内で着用している衣装の多くも
                  自分で制作し、ファッションとモーションデザインを
                  組み合わせて、原宿カルチャーを感じる遊び心のある
                  世界観に仕上げました。
                  <br />
                  <br />
                  この作品で大切にしたテーマは
                  <strong>「くだらないことを、真剣に。」</strong>
                  です。一つのスタイルに統一するのではなく、
                  シーンごとに異なる雰囲気や色、質感を取り入れ、
                  次に何が起こるのか予想できない映像を目指しました。
                  <br />
                  <br />
                  多くのシーンはグリーンスクリーンで撮影し、
                  後から合成しています。制作前には細かく
                  ストーリーボードを作成し、アイデアを実写映像へ
                  落とし込んでいきました。
                  <br />
                  <br />
                  全体を通して、カラフルでシュール、
                  そしてあえてカオスな世界観にしています。
                  ユーモアや少しくだらないアイデア、視覚的な比喩、
                  カルチャー要素を詰め込んだ作品です。
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
                <>
                  <p>
                    This project was inspired by Harajuku street fashion,
                    playful pop visuals, and the energetic rhythm of Kaela
                    Kimura’s song “Magic Music.” Because the song itself is
                    bright and fun — and the official MV is already chaotic —
                    I wanted to push this energy even further by turning my
                    project into something like “colorful visual overload.”
                  </p>

                  <br />

                  <p>
                    Instead of keeping it safe with a traditional lyric video,
                    I took the opportunity of having my teacher’s support to
                    experiment wildly. It was my first time using green screen
                    compositing, and I decided to appear in the video myself —
                    though often hiding behind sunglasses or digital effects to
                    disguise my face. Ironically, this shyness turned into a
                    strange and funny part of the video’s personality.
                  </p>

                  <br />

                  <p>
                    Overall, the video is colorful, surreal, and intentionally
                    chaotic — combining humor, absurdity, visual metaphors, and
                    cultural references into what I call a “crazy MV packed
                    with everything I wanted to try.”
                  </p>
                </>
              ) : (
                <>
                  <p>
                    原宿のストリートファッションやポップで遊び心のある
                    ビジュアル、そして木村カエラさんの
                    「Magic Music」のエネルギッシュなリズムから
                    インスピレーションを得ました。楽曲そのものが
                    明るく楽しい上に、公式MVもかなりカオスなので、
                    そのエネルギーをさらに広げた
                    「カラフルな情報過多」のような映像を
                    つくりたいと考えました。
                  </p>

                  <br />

                  <p>
                    一般的なリリックビデオにするのではなく、
                    講師から自由に挑戦していいと言ってもらえたことを
                    きっかけに、やってみたかった表現を思い切って
                    詰め込みました。グリーンスクリーン合成も
                    この作品で初めて挑戦しました。
                  </p>

                  <br />

                  <p>
                    自分自身も映像に出演していますが、顔を出すのが
                    少し恥ずかしかったため、サングラスをかけたり、
                    デジタルエフェクトで顔を隠したりしています。
                    その恥ずかしさも結果的に、作品のちょっと変で
                    面白い雰囲気の一部になりました。
                  </p>

                  <br />

                  <p>
                    全体として、ユーモア、シュールな表現、
                    視覚的な比喩、カルチャー要素など、
                    自分が試してみたかったことを全部詰め込んだ
                    「やりたいこと全部盛りMV」です。
                  </p>
                </>
              )}

              <div className="project-slider-detail">
                <SlideCard
                  slideData={SlideData}
                  onImageClick={(img) => setSelectedImage(img)}
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Production */}
          <div id="production"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'PRODUCTION' : '制作プロセス'}
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
                    Although the MV may appear random, the chaos is carefully
                    structured. <strong>At 0:44–0:49, </strong>I built a
                    sequence around image references: a pixelated clip
                    humorously labeled “4K,” a reveal of a hidden green suit,
                    and rotobrush/mask work that allowed text to appear only on
                    my face and hands.
                  </p>
                ) : (
                  <p>
                    一見ランダムでカオスに見えるMVですが、実はシーン同士が
                    つながるように細かく構成しています。
                    <strong>0:44〜0:49</strong>では、あえて画質を
                    ピクセル化した映像に「4K」と表示するジョークや、
                    隠していたグリーンスーツを見せる演出、
                    Rotobrushとマスクを使って顔と手だけに文字が
                    表示される演出を制作しました。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={production1}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                {language === 'en' ? (
                  <p>
                    <strong>From 0:51 to 1:09,</strong> I created a sequence
                    based on the lyric “sexy girl.” A woman at the beach turns
                    around to reveal a clown face, blows a kiss, and a heart
                    flies out. In the next karate scene, the heart gets punched
                    to the right in rhythm with the beat. Finally, during the
                    stage performance, the heart flies in from the left, hits
                    the singer’s head, and shatters. These three moments are
                    linked together through the recurring heart motif.
                  </p>
                ) : (
                  <p>
                    <strong>0:51〜1:09</strong>では、歌詞の
                    「sexy girl」をきっかけに、3つのシーンを
                    ハートでつなげました。ビーチにいる女性が
                    振り返るとピエロの顔になり、投げキッスから
                    ハートが飛び出します。
                    <br />
                    <br />
                    次の空手シーンでは、そのハートを音楽のビートに
                    合わせて右へパンチ。さらにステージのシーンでは、
                    左から飛んできたハートが歌手の頭にぶつかって
                    砕けます。同じハートを使うことで、
                    異なるシーンにつながりを持たせています。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={production2}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                {language === 'en' ? (
                  <p>
                    The karate and stage scenes were especially meaningful
                    because they reinterpret animations I had previously
                    created in my{' '}
                    <Link to="/projects/rhythm-game" className="link-pink">
                      “Rhythm Game Animation project”
                    </Link>
                    , now brought into live-action form. I had imagined doing
                    them myself back when I first made the animation, so this
                    MV gave me the chance to realize that idea in practice.
                  </p>
                ) : (
                  <p>
                    空手とステージのシーンは、以前制作した
                    <Link to="/projects/rhythm-game" className="link-pink">
                      「リズムゲーム・アニメーション」
                    </Link>
                    の動きを実写で再現したものです。
                    元のアニメーションを制作していたときから
                    「いつか自分で実際にやってみたい」と思っていたため、
                    このMVでそのアイデアを形にすることができました。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={production3}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                {language === 'en' ? (
                  <p>
                    <strong>At 1:25,</strong> the opening scene reappears in an
                    evening version to signal the ending. These details show
                    how the humor and chaos were tied back into a deliberate
                    framework.
                  </p>
                ) : (
                  <p>
                    <strong>1:25</strong>では、冒頭と同じシーンを
                    夕方のバージョンとして再登場させ、
                    映像が終わりに向かっていることを表現しました。
                    カオスな演出の中にも、このようなつながりを
                    意識して構成しています。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={production4}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                {language === 'en' ? (
                  <p>
                    <strong>From 1:14 to 1:22,</strong> I staged a fashion show
                    scene to showcase the clothes I had personally designed.
                    Since the song is titled “Magic Music,” I also added a
                    playful moment where I cast a spell on a dress form,
                    transforming it as if my handmade clothing came to life.
                    This sequence allowed me to integrate my background in
                    fashion design into the MV in both a literal and surreal
                    way. Because the green screen setup muted the colors of my
                    rainbow outfit in other scenes, this became the place where
                    I could highlight it more directly.
                  </p>
                ) : (
                  <p>
                    <strong>1:14〜1:22</strong>では、自分でデザイン・
                    制作した衣装を見せるため、ファッションショーの
                    シーンをつくりました。
                    <br />
                    <br />
                    曲名が「Magic Music」なので、トルソーに魔法を
                    かけると、自分で制作した服が現れるという
                    遊び心のある演出も取り入れています。
                    ファッションを学んできた経験を、少しシュールな
                    方法でMVに組み込みました。
                    <br />
                    <br />
                    他のグリーンスクリーンのシーンでは虹色の衣装が
                    きれいに映りにくかったため、このシーンでは
                    衣装そのものもしっかり見せられるようにしました。
                  </p>
                )}

                <div className="gif-wrapper small">
                  <img
                    src={production5}
                    alt="production scene"
                    loading="lazy"
                  />
                </div>

                {language === 'en' ? (
                  <p>
                    This MV was something I could only create at this point in
                    my life. I included playful details such as featuring
                    classmates and my teacher’s face in unexpected places,
                    along with small hidden elements scattered throughout.
                    Because of these layers, the video feels fresh each time
                    you watch it, always offering new discoveries.
                  </p>
                ) : (
                  <p>
                    このMVには、クラスメイトや先生の顔を思いがけない
                    場所に登場させたり、小さな隠し要素を散りばめたりと、
                    この時だからこそつくれた遊びもたくさん
                    入れています。
                    <br />
                    <br />
                    一度見ただけでは気づかない細かい仕掛けを入れることで、
                    見返すたびに新しい発見がある作品を目指しました。
                  </p>
                )}
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* Challenges */}
          <div id="challenges"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'CHALLENGES & SOLUTIONS'
                  : '課題と解決方法'
              }
              colorClass="orange"
            >
              {language === 'en' ? (
                <>
                  <p>
                    One of the biggest challenges came from using the Rotobrush
                    tool. It made my computer extremely slow, especially since
                    I shot some footage on my phone where the frame rate
                    couldn’t be controlled. This meant I had to constantly
                    adjust the composition’s frame rate whenever applying the
                    Rotobrush.
                  </p>

                  <br />

                  <p>
                    Through trial and error, I learned that pre-combining all
                    clips into a single video before applying the Rotobrush
                    solved this issue. This way, I no longer had to change
                    frame rate settings for every composition.
                  </p>

                  <br />

                  <p>
                    Another challenge was managing the large file size caused
                    by using many nested compositions. To avoid slowing down my
                    computer, I realized I could have split the project into a
                    “first half” and “second half,” then combined them at the
                    end. This workflow would have kept the files lighter and
                    more efficient.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    制作で特に苦戦したのがRotobrushです。
                    Rotobrushを使用するとパソコンの動作が非常に
                    重くなりました。また、一部の映像をスマートフォンで
                    撮影していたため、素材ごとにフレームレートが異なり、
                    Rotobrushを使用するたびにコンポジションの
                    フレームレートを調整する必要がありました。
                  </p>

                  <br />

                  <p>
                    試行錯誤する中で、Rotobrushをかける前に
                    複数のクリップを一つの映像にまとめておけば、
                    この問題を解決できることを学びました。
                    これにより、コンポジションごとにフレームレートを
                    変更する必要がなくなりました。
                  </p>

                  <br />

                  <p>
                    また、多くのコンポジションを入れ子にしたことで
                    ファイルが大きくなり、パソコンが重くなったことも
                    課題でした。今後同じような長い映像を制作する場合は、
                    プロジェクトを「前半」と「後半」に分けて制作し、
                    最後にまとめることで、より軽く効率的に
                    作業できると学びました。
                  </p>
                </>
              )}
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

export default MagicMusicMv;