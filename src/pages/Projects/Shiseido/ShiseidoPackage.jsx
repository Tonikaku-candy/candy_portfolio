// src/pages/Projects/Shiseido/ShiseidoPackage.jsx

import { useParams, useLocation, Link } from 'react-router-dom';
import React, { useMemo } from 'react';

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
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// images
import Poster from '../../../assets/ProjectDetails/Shiseido/ultimune-final-poster.webp';
import Moodboard from '../../../assets/ProjectDetails/Shiseido/ultimune-moodboard.webp';
import Process from '../../../assets/ProjectDetails/Shiseido/ultimune-horse-process.webp';
import Package from '../../../assets/ProjectDetails/Shiseido/shiseido-ultimune-packag.webp';

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
function ShiseidoPackage() {
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
    'ILLUSTRATION',
    'GRAPHIC DESIGN',
    'PACKAGING',
    'POSTER DESIGN',
    'BRANDING',
    'BEAUTY VISUALS',
    'COSMETICS DESIGN',
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

        {/* TITLE */}
        <ProjectTitle
          className={`long-title ${
            language === 'ja' ? 'japanese-text' : ''
          }`}
          title={
            language === 'en'
              ? 'Shiseido Ultimune Package Design'
              : 'SHISEIDO アルティミューン パッケージデザイン'
          }
        />

        {/* HERO */}
        <FadeInOnScroll>
          <img
            src={Poster}
            alt={
              language === 'en'
                ? 'Shiseido Ultimune New Year concept poster'
                : 'SHISEIDO アルティミューン新年限定コンセプトポスター'
            }
            className="instagram-image"
          />
        </FadeInOnScroll>

        {/* LINKS */}
        <DetailLinks
          links={[
            {
              id: 'overview',
              label: language === 'en' ? 'Overview' : '概要',
            },
            {
              id: 'moodboard',
              label:
                language === 'en' ? (
                  <>
                    Research &
                    <br />
                    Moodboard
                  </>
                ) : (
                  <>
                    リサーチ＆
                    <br />
                    ムードボード
                  </>
                ),
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
              id: 'product',
              label:
                language === 'en'
                  ? 'Product Design'
                  : 'プロダクトデザイン',
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
                  <li>Illustrator</li>
                  <li>Photoshop</li>
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
                      ? 'Graphic Designer'
                      : 'グラフィックデザイン'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Illustrator'
                      : 'イラストレーション'}
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
                <ul className="tight-paragraph">
                  <li>
                    {language === 'en'
                      ? 'Nov 21 - 23, 2025'
                      : '2025年11月21日〜23日'}
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
                  This is an unofficial concept project inspired by
                  Shiseido’s 2026 New Year edition.
                  <br />
                  <br />
                  I created a geometric horse illustration representing
                  the Year of the Horse, blended with Shiseido’s camellia
                  motifs and signature Ultimune red. The concept includes
                  a poster design and a packaging mockup.
                </p>
              ) : (
                <p>
                  SHISEIDOの2026年ニューイヤー限定デザインを
                  イメージして制作した、非公式のコンセプト作品です。
                  <br />
                  <br />
                  2026年の干支である「午」をモチーフに、
                  幾何学的な馬のイラストを制作しました。
                  SHISEIDOを象徴する椿のモチーフと、
                  アルティミューンの特徴的な赤を組み合わせ、
                  ポスターとパッケージのデザインへ展開しています。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* MOODBOARD */}
          <div id="moodboard"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'RESEARCH & MOODBOARD'
                  : 'リサーチ＆ムードボード'
              }
              colorClass="green"
            >
              {language === 'en' ? (
                <>
                  <p>
                    To develop this concept, I researched Shiseido’s
                    visual identity, focusing on its signature reds,
                    soft gradients, and minimal-yet-luxurious aesthetic.
                    I also analyzed previous limited-edition Ultimune
                    releases to understand how the brand incorporates
                    cultural themes.
                    <br />
                    <br />
                    The target audience I envisioned was women in their
                    late 20s to 40s who enjoy high-end skincare and
                    prefer designs that are minimal, elegant, and subtly
                    cute with just the right amount of vibrance.
                  </p>

                  <br />

                  <p>
                    For the Lunar New Year direction, I explored motifs
                    connected to the Year of the Horse and the symbolism
                    of camellia (tsubaki), which represents beauty,
                    strength, and renewal. Since camellia extract is also
                    an ingredient used in Ultimune formulas, I felt this
                    motif was essential. These ideas guided the color
                    palette, composition, and geometric illustration
                    style throughout the project.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    コンセプトを考えるために、
                    SHISEIDOのビジュアルアイデンティティを
                    リサーチしました。
                    特徴的な赤、柔らかなグラデーション、
                    ミニマルでありながら高級感のある表現に注目し、
                    過去のアルティミューン限定デザインも調べました。
                    そこから、ブランドが文化的なモチーフを
                    どのようにデザインへ取り入れているのかを
                    分析しました。
                    <br />
                    <br />
                    ターゲットには、高級スキンケアに関心があり、
                    ミニマルで上品ながらも、
                    少し華やかさやかわいらしさのあるデザインを好む
                    20代後半〜40代の女性を想定しました。
                  </p>

                  <br />

                  <p>
                    ニューイヤーの方向性として、
                    2026年の干支である「午」と、
                    椿をモチーフとして取り入れました。
                    椿には美しさ、強さ、再生といったイメージがあり、
                    SHISEIDOとも関わりの深い花です。
                    <br />
                    <br />
                    これらの要素をもとに、
                    カラーパレット、レイアウト、
                    幾何学的なイラストの方向性を決めていきました。
                  </p>
                </>
              )}

              <div className="image-wrapper">
                <img
                  src={Moodboard}
                  alt={
                    language === 'en'
                      ? 'Moodboard'
                      : 'ムードボード'
                  }
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* PROCESS */}
          <div id="process"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'DESIGN PROCESS'
                  : 'デザインプロセス'
              }
              colorClass="purple"
            >
              {language === 'en' ? (
                <p>
                  I designed a 2026 New Year concept for Shiseido’s
                  Ultimune because the brand has released special New
                  Year editions in the past. Since 2026 is the Year of
                  the Horse, I created a design centered around a
                  geometric horse motif.
                  <br />
                  <br />
                  Shiseido’s holiday collections often use gold accents,
                  so I incorporated gold elements into the horse
                  illustration to match the brand’s visual identity. I
                  wanted to avoid a retro look that might feel outdated,
                  so I explored geometric patterns to create a modern and
                  stylish impression.
                  <br />
                  <br />
                  During the design process, I experimented with
                  different shapes and compositions to find a balance
                  that felt bold yet elegant. The final illustration
                  features clean geometric forms and layered gradients,
                  with a camellia flower blended into the silhouette to
                  symbolize beauty, harmony, and renewal.
                </p>
              ) : (
                <p>
                  SHISEIDOでは過去にもニューイヤー限定デザインが
                  発売されていることから、
                  2026年のアルティミューン限定デザインを
                  自分なりに考えてみました。
                  <br />
                  <br />
                  2026年は午年なので、
                  幾何学的な馬のモチーフを中心にデザインしています。
                  SHISEIDOのホリデーコレクションでは
                  ゴールドが使用されることも多いため、
                  ブランドの華やかな印象に合わせて
                  馬のイラストにもゴールドを取り入れました。
                  <br />
                  <br />
                  一方で、干支をそのまま表現すると
                  レトロな印象になりすぎる可能性があるため、
                  幾何学模様を使って、
                  モダンでスタイリッシュな表現を目指しました。
                  <br />
                  <br />
                  制作中はさまざまな形や構図を試しながら、
                  大胆さと上品さのバランスを調整しました。
                  最終的には、シンプルな幾何学図形と
                  重なり合うグラデーションで馬を表現し、
                  シルエットの中に椿の花を組み合わせています。
                </p>
              )}

              <div className="image-wrapper">
                <img
                  src={Process}
                  alt={
                    language === 'en'
                      ? 'Design process'
                      : '馬のイラスト制作プロセス'
                  }
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* PRODUCT */}
          <div id="product"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'PRODUCT DESIGN'
                  : 'プロダクトデザイン'
              }
              colorClass="orange"
            >
              {language === 'en' ? (
                <>
                  <p>
                    For the final product design, I placed the geometric
                    horse illustration onto the Ultimune bottle and box,
                    carefully adjusting shapes and colors so the artwork
                    blended naturally with Shiseido’s signature red
                    aesthetic.
                    <br />
                    <br />
                    The gold accents highlight the New Year theme, while
                    the camellia motif connects back to both Japanese
                    culture and the Ultimune formula itself. My goal was
                    to create a limited-edition look that feels modern,
                    elegant, and visually charming—something collectors
                    would want to display rather than simply use.
                  </p>

                  <br />

                  <p>
                    The scattered shapes surrounding the horse
                    illustration came from an idea I discovered while
                    experimenting with different geometric compositions.
                    As I moved and rearranged the shapes during the
                    design process, I found that these accents added a
                    sense of movement and rhythm to the overall visual.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    最終デザインでは、幾何学的な馬のイラストを
                    アルティミューンのボトルと箱に配置しました。
                    SHISEIDOを象徴する赤の世界観になじむように、
                    図形の配置や色を細かく調整しています。
                    <br />
                    <br />
                    ゴールドのアクセントによって
                    ニューイヤーらしい特別感を加え、
                    椿のモチーフによって日本らしさと
                    SHISEIDOのブランドイメージをつなげました。
                    <br />
                    <br />
                    普段使いのパッケージというだけでなく、
                    思わず飾っておきたくなるような、
                    モダンで上品な限定デザインを目指しました。
                  </p>

                  <br />

                  <p>
                    馬の周りに散らした小さな図形は、
                    幾何学的な構図を試している中で生まれた
                    アイデアです。
                    <br />
                    <br />
                    図形を動かしながら配置を検討していたところ、
                    周囲に散らすことで画面に動きとリズムが
                    生まれることに気づき、
                    最終デザインにも取り入れました。
                  </p>
                </>
              )}

              <div
                className="image-wrapper"
                style={{ marginTop: '2rem' }}
              >
                <img
                  src={Package}
                  alt={
                    language === 'en'
                      ? 'Packaging Mockup'
                      : 'パッケージモックアップ'
                  }
                />
              </div>
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
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default ShiseidoPackage;