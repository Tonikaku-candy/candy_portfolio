// src/pages/Projects/ThreeDPackaging/ThreeDPackagingAd.jsx

import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer';
import '../ProjectsDetailLayout.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import './ThreeDPackagingAd.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle';
import ProcessSteps from '../../../components/ProjectDetail/ProcessSteps.jsx';
import projects from '../../../data/ProjectData.js';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// slide
import SlideCard from '../../../components/ProjectDetail/SlideCard';
import SlideData from '../../../pages/Projects/ThreeDPackaging/ThreeDSlideData.js';

// image
import SushiGif from '../../../assets/ProjectDetails/ThreeD/sushi.gif';

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

function ThreeDPackagingAd() {
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
    '3D DESIGN',
    'FASHION',
    'MOTION GRAPHICS',
    'GRAPHIC DESIGN',
    'BRANDING',
    'ANIMATION',
    'KAWAII',
    'PACKAGING DESIGN',
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
              ? `3D PACKAGING AD\n- Apparel Motion Design`
              : '3Dパッケージ広告'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {/* Video */}
        <div className="video-wrapper poster">
          <div id="video"></div>

          <FadeInOnScroll>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/G6H-fgIViEs?si=yS7B24LdF6afEX3V"
              title="3D Packaging Ad"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </FadeInOnScroll>
        </div>

        {/* Links */}
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
                  <li>Adobe Dimension</li>
                  <li>Photoshop</li>
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
                extraClass="small-padding-box"
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? '3D Packaging Design'
                      : '3Dパッケージデザイン'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Pixel Art Illustration'
                      : 'ピクセルアート'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'Motion Graphics & Animation'
                      : 'モーショングラフィックス'}
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
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'July 27, 2025 (Animated Promo Video)'
                      : '2025年7月27日（動画）'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'June 6–14, 2025 (3D Packaging Mockup)'
                      : '2025年6月6日〜14日（3D）'}
                  </li>

                  <li>
                    {language === 'en'
                      ? 'May 1–2, 2024 (Pixel Pattern Design)'
                      : '2024年5月1日〜2日（ピクセル）'}
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
                    This project was originally created for my own apparel
                    brand, Candelicious, to showcase pixel-style food
                    illustrations as part of a clothing design.
                    <br />
                    <br />
                    However, I later adapted the designs for a 3D packaging
                    assignment using Adobe Dimension. The goal was to explore
                    how my personal creative work could be transformed into
                    promotional materials using Adobe Dimension and After
                    Effects.
                    <br />
                    <br />
                    I also printed the design on an actual T-shirt, bringing
                    the digital concept into the real world as a tangible
                    product.
                  </p>
                ) : (
                  <p>
                    このプロジェクトはもともと、
                    自身のアパレルブランド「Candelicious」のために
                    制作した、食べ物をモチーフにした
                    ピクセルアートのデザインから始まりました。
                    <br />
                    <br />
                    その後、Adobe Dimensionを使用する
                    3Dパッケージ制作の課題でこのデザインを
                    アレンジし、3D作品へ展開しました。
                    <br />
                    <br />
                    さらにAfter Effectsを使って
                    プロモーション映像も制作し、
                    自分のオリジナルデザインを
                    3Dやモーションへどのように展開できるか
                    試しています。
                    <br />
                    <br />
                    デザインは実際のTシャツにもプリントし、
                    デジタル上のアイデアを実物のプロダクトとしても
                    形にしました。
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
                {language === 'en' ? (
                  <p>
                    I’ve always loved being creative, but instead of
                    traditional drawing, I found that pixel art gives me a fun
                    and accessible way to express my ideas visually. Its
                    simplicity allows me to focus on color, shape, and
                    personality—which matches my playful style perfectly.
                    <br />
                    <br />
                    Since I also love food, I thought it would be fun to turn
                    my favorite foods into pixel designs. The idea of combining
                    food and fashion felt natural to me, and I wanted to bring
                    a playful and appetizing vibe to my brand. The inspiration
                    behind this project is really just a mix of my personal
                    tastes: pixel art, cute foods, and bold, fun visuals.
                  </p>
                ) : (
                  <p>
                    ものづくりは昔から好きですが、
                    細かいイラストを描くことよりも、
                    ピクセルアートの方が自分のアイデアを
                    楽しく表現できると感じています。
                    <br />
                    <br />
                    シンプルな形だからこそ、
                    色やシルエット、キャラクター性に集中でき、
                    自分の遊び心のあるデザインスタイルにも
                    合っていると感じました。
                    <br />
                    <br />
                    また、食べることも好きなので、
                    好きな食べ物をピクセルアートにしたら
                    面白いのではないかと考えました。
                    食べ物とファッションを組み合わせ、
                    「おいしそう」で「かわいい」
                    遊び心のあるデザインを目指しています。
                    <br />
                    <br />
                    ピクセルアート、かわいい食べ物、
                    大胆で楽しいビジュアルという、
                    自分の好きなものを組み合わせたことが
                    この作品の原点です。
                  </p>
                )}
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
                        This project started with a food-themed pixel pattern I
                        originally created for my apparel brand, Candelicious.
                        While working on the 3D packaging assignment, I thought
                        it would be fun to transform my 2D design into a
                        playful promotional concept that blends fashion and
                        food.
                        <br />
                        <br />
                        I surrounded the clothing mockups with real food photos
                        and added a photo of a hand holding chopsticks, as if
                        it were picking up the food on the T-shirt, to make the
                        visuals more dynamic and quirky. The phrase “Wear What
                        You Crave” came naturally as a fun tagline that
                        connects the themes of fashion and food.
                        <br />
                        <br />
                        I began by thinking about what kind of items would best
                        reflect my brand identity. Since I’m Japanese and love
                        pixel art, I decided to combine both. I made a small
                        list of cute foods and chose ramen, sushi, and onigiri
                        because they’re fun to draw and popular with many
                        people. I also included California rolls and other
                        recognizable sushi types so the design would feel
                        familiar to people outside of Japan as well.
                      </p>
                    ) : (
                      <p>
                        このプロジェクトは、アパレルブランド
                        「Candelicious」のために制作した
                        食べ物モチーフのピクセルパターンから
                        スタートしました。
                        <br />
                        <br />
                        3Dパッケージの課題に取り組む中で、
                        もともとの2Dデザインを使って、
                        ファッションと食べ物を組み合わせた
                        プロモーションにしたら面白いのではないかと
                        考えました。
                        <br />
                        <br />
                        衣服の3Dモックアップの周りに
                        実際の食べ物の写真を配置し、
                        Tシャツに描かれた食べ物を
                        箸でつまんでいるように見せることで、
                        少しシュールで動きのあるビジュアルにしました。
                        <br />
                        <br />
                        そこから、ファッションと食べ物をつなぐ
                        キャッチコピーとして
                        <strong>「Wear What You Crave」</strong>
                        という言葉を考えました。
                        <br />
                        <br />
                        モチーフを考える際には、
                        日本らしさと自分の好きなピクセルアートを
                        組み合わせたいと思い、
                        ラーメン、寿司、おにぎりを選びました。
                        <br />
                        <br />
                        また、日本国外の人にも親しみやすいように、
                        カリフォルニアロールなど、
                        海外でもよく知られている寿司も
                        デザインに取り入れています。
                      </p>
                    )}
                  </div>

                  <div className="box-image sushi">
                    <img
                      src={SushiGif}
                      className="sushi-wip"
                      alt={
                        language === 'en'
                          ? 'Pixel art sushi design'
                          : '寿司のピクセルアート'
                      }
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
                          'Started by designing pixel-style food illustrations (like ramen, sushi, and onigiri) in Photoshop.',
                          'Used Adobe Dimension to apply the pattern to a 3D T-shirt model and set up the packaging scene.',
                          'Composed the layout with food images and added a hand holding chopsticks for a playful touch.',
                          'Created an animated version of the static poster in After Effects to bring the design to life.',
                          'Printed the actual T-shirt to turn the digital design into a real-world product.',
                          'Also created matching earrings using the same food motifs to expand the brand identity.',
                        ]
                      : [
                          'Photoshopでラーメン、寿司、おにぎりなどの食べ物をピクセルアートで制作。',
                          'Adobe Dimensionを使い、ピクセルパターンを3DのTシャツモデルに適用してシーンを制作。',
                          '食べ物の写真や箸を持つ手を配置し、遊び心のあるレイアウトを制作。',
                          '静止画のポスターをAfter Effectsでアニメーション化し、プロモーション映像へ展開。',
                          'デザインを実際のTシャツにプリントし、実物のプロダクトとして制作。',
                          '同じ食べ物モチーフを使ったイヤリングも制作し、ブランドの世界観を広げました。',
                        ]
                  }
                />

                <div className="project-slider-detail canada">
                  <SlideCard
                    slideData={SlideData}
                    onImageClick={(img) =>
                      setSelectedImage(img)
                    }
                  />
                </div>
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
                  <>
                    <p>
                      Since I’m not confident in drawing detailed
                      illustrations, I focused on pixel art, which allowed me
                      to express my ideas clearly while keeping the design
                      simple and cute.
                    </p>

                    <p>
                      I had never used Adobe Dimension before, so learning how
                      to arrange 3D mockups and adjust lighting and camera
                      angles took some trial and error.
                    </p>

                    <p>
                      Balancing the composition of food elements, the T-shirt,
                      and chopsticks in a way that felt playful but not
                      cluttered required a lot of tweaking.
                    </p>

                    <p>
                      One of the biggest challenges was adjusting the shadow
                      directions. My instructor pointed out that some shadows
                      were inconsistent and made the lighting look confusing,
                      so I went back and corrected them to create a more
                      believable and polished result.
                    </p>

                    <p>
                      Animating the scene in After Effects was a spontaneous
                      idea, and it was challenging to make the static poster
                      assets feel alive while keeping the timing cute and
                      catchy.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      細かいイラストを描くことにはあまり自信が
                      なかったため、シンプルでかわいく、
                      自分のアイデアを表現しやすい
                      ピクセルアートを選びました。
                    </p>

                    <p>
                      Adobe Dimensionを使用するのは
                      この作品が初めてだったため、
                      3Dモックアップの配置やライティング、
                      カメラアングルの調整には
                      試行錯誤が必要でした。
                    </p>

                    <p>
                      また、食べ物、Tシャツ、箸を
                      楽しく見せながらも画面がごちゃごちゃしないよう、
                      バランスを何度も調整しました。
                    </p>

                    <p>
                      特に難しかったのが影の方向です。
                      講師から、一部の影の向きが統一されておらず、
                      光の方向が分かりにくくなっていると
                      フィードバックをもらいました。
                      そこで影を一つずつ見直し、
                      より自然で完成度の高い見た目になるよう
                      修正しました。
                    </p>

                    <p>
                      After Effectsでアニメーションにすることは
                      制作途中で思いついたアイデアだったため、
                      静止画として制作した素材をどのように動かせば
                      生き生きと見えるかも挑戦の一つでした。
                      かわいさとテンポの良さを意識しながら
                      動きを調整しました。
                    </p>
                  </>
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
            style={{ width: '100%' }}
          />
        </Modal>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default ThreeDPackagingAd;