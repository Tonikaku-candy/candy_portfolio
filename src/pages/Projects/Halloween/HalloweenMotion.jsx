// src/pages/Projects/Halloween/HalloweenMotion.jsx

import React, { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import projects from '../../../data/ProjectData.js';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// image
import Color from '../../../assets/ProjectDetails/halloween/color-palette.webp';

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
    keys.add(norm((p.link || '').split('/').filter(Boolean).pop()));

    return keys;
  };

  for (let i = 0; i < projects.length; i++) {
    const keys = pickKeys(projects[i]);

    if (candidates.some((c) => keys.has(c))) {
      return i;
    }
  }

  return projects.findIndex((p) => norm(p.link) === norm(location.pathname));
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
function HalloweenMotion() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params],
  );

  const { prevProject, nextProject } = useMemo(() => {
    const total = projects.length;

    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return {
        prevProject: null,
        nextProject: null,
      };
    }

    return {
      prevProject: projects[(currentIndex - 1 + total) % total],
      nextProject: projects[(currentIndex + 1) % total],
    };
  }, [currentIndex]);

  const baseTags = [
    'CONTENT CREATION',
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

        {/* Top Back Button */}
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
              ? 'Halloween Geometric Motion Loop'
              : 'ハロウィン・モーションループ'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {/* Main Video */}
        <div className="video-wrapper">
          <div id="video"></div>

          <FadeInOnScroll>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4WA7PxyCIqE?si=rKW6TAwVMHHjydmU"
              title="Halloween Geometric Motion Loop"
              frameBorder="0"
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
              id: 'wip',
              label:
                language === 'en' ? (
                  <>
                    Behind-the-Scenes
                    <br />
                    Short Video
                  </>
                ) : (
                  <>
                    制作の舞台裏
                    <br />
                    ショート動画
                  </>
                ),
            },
            {
              id: 'neonversion',
              label: language === 'en' ? 'Neon Version' : 'ネオンバージョン',
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
                  <li>After Effects</li>
                  <li>Illustrator</li>
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
                      ? 'Direction & Motion'
                      : 'ディレクション・モーション'}
                  </li>
                  <li>{language === 'en' ? 'Design' : 'デザイン'}</li>
                  <li>
                    {language === 'en' ? 'Illustration' : 'イラストレーション'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <DetailBox
                size="S"
                title={language === 'en' ? 'DURATION' : '制作期間'}
                colorClass="yellow"
              >
                <ul>
                  <li>
                    {language === 'en'
                      ? 'Oct 27 – 29, 2025'
                      : '2025年10月27日〜29日'}
                  </li>
                </ul>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* OVERVIEW */}
          <div id="overview">
            <FadeInOnScroll>
              <DetailBox
                title={language === 'en' ? 'OVERVIEW' : '概要'}
                colorClass="pink"
              >
                {language === 'en' ? (
                  <p>
                    This geometric motion design is a personal project created
                    to celebrate the Halloween season.
                    <br />
                    It was designed as a seamless loop using a grid system in
                    After Effects.
                    <br />
                    All shapes were illustrated directly inside the software,
                    keeping each element simple while building a rhythmic
                    composition.
                    <br />
                    Later, I redesigned the color palette using the same base
                    file to create a custom wallpaper.
                  </p>
                ) : (
                  <p>
                    ハロウィンをテーマに制作した、個人制作の
                    モーショングラフィックス作品です。
                    <br />
                    <br />
                    After Effects上でグリッドを使用し、
                    シームレスに繰り返すループアニメーションとして
                    制作しました。
                    <br />
                    <br />
                    すべての図形をAfter Effects内で制作し、
                    一つひとつの形はシンプルにしながら、
                    動きと配置によってリズムのある画面を 構成しています。
                    <br />
                    <br />
                    その後、同じデザインをベースに カラーパレットを変更し、
                    オリジナルの壁紙にも展開しました。
                  </p>
                )}
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* INSPIRATION */}
          <div id="inspiration">
            <FadeInOnScroll>
              <DetailBox
                title={language === 'en' ? 'INSPIRATION' : '着想'}
                colorClass="green"
              >
                <div className="box-split">
                  <div className="box-text">
                    {language === 'en' ? (
                      <p>
                        This piece was inspired by geometric patterns and bold
                        color palettes often used in modern motion graphics.
                        <br />
                        <br />
                        I chose four main colors for each variation—originally I
                        wanted many more, but limiting the palette helped
                        maintain clarity and balance.
                        <br />
                        <br />
                        Since I made this on Halloween day, the aesthetic
                        naturally shifted toward bright, festive colors rather
                        than a spooky theme. My goal was to create a fun,
                        minimal, loop-friendly animation that still captured
                        seasonal energy.
                      </p>
                    ) : (
                      <p>
                        現代のモーショングラフィックスでよく見られる
                        幾何学模様と、大胆なカラーパレットから
                        インスピレーションを得ました。
                        <br />
                        <br />
                        各バージョンでは4色をメインカラーとして
                        使用しています。最初はもっと多くの色を
                        使いたいと考えていましたが、
                        色数を絞ることで画面が整理され、
                        全体のバランスも取りやすくなりました。
                        <br />
                        <br />
                        ハロウィンの時期に制作した作品ですが、
                        怖い雰囲気ではなく、明るく楽しい
                        ハロウィンカラーを選びました。
                        シンプルな図形を使いながら、
                        季節感とエネルギーを感じられる
                        楽しいループアニメーションを目指しました。
                      </p>
                    )}
                  </div>

                  <div className="image-wrapper">
                    <img
                      src={Color}
                      alt={
                        language === 'en' ? 'Color palette' : 'カラーパレット'
                      }
                    />
                  </div>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* WIP */}
          <div id="wip">
            <FadeInOnScroll>
              <DetailBox
                title={
                  language === 'en'
                    ? 'Behind-the-Scenes Short Clip'
                    : '制作の舞台裏ショート動画'
                }
                colorClass="purple"
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: '1 1 400px' }}>
                    {language === 'en' ? (
                      <p>
                        After completing the first version of the motion piece,
                        I casually recorded a small behind-the-scenes moment and
                        that ended up inspiring a new idea. While working in
                        Illustrator, I imagined the ghost character literally
                        popping out of the canvas and entering the animation
                        itself.
                        <br />
                        <br />
                        While creating the ghost illustration, I built it from
                        simple geometric shapes. At first, the design was just a
                        combination of circles and rounded rectangles, but once
                        the pieces came together and the character started to
                        feel “alive,” the idea of it jumping out of the screen
                        became even more fun and believable.
                        <br />
                        <br />
                        Since I happened to be wearing a Halloween costume in
                        class that day, I decided to include that real WIP
                        moment inside the clip. It felt playful and matched the
                        spirit of the project, so I let that spontaneity guide
                        the direction.
                        <br />
                        <br />
                        When I later shared the short video on LinkedIn, my
                        instructor commented that showing myself designing in
                        costume was a fun and effective way to promote the work.
                        That unexpected feedback motivated me to develop the
                        idea further and integrate the WIP moment into the final
                        narrative of the project.
                      </p>
                    ) : (
                      <p>
                        最初のモーション作品を完成させたあと、
                        制作中の様子を何気なく撮影したことから、
                        新しいアイデアが生まれました。
                        Illustratorでゴーストを制作しているときに、
                        「このキャラクターが画面から本当に
                        飛び出してきたら面白いかも」と思いつきました。
                        <br />
                        <br />
                        ゴーストのイラストは、円や角丸の長方形など、
                        シンプルな幾何学図形を組み合わせて
                        制作しています。最初は単純な図形の集まり
                        でしたが、形を組み合わせてキャラクターらしく
                        なっていくにつれて、「画面から飛び出す」
                        というアイデアがさらに面白く感じられました。
                        <br />
                        <br />
                        その日は偶然、授業でハロウィンの仮装を
                        していたので、実際に制作している様子も
                        ショート動画の中に取り入れました。
                        予定していた演出ではありませんでしたが、
                        その偶然が作品の遊び心のある雰囲気に
                        合っていたため、そのままアイデアとして 発展させました。
                        <br />
                        <br />
                        後日このショート動画をLinkedInに投稿したところ、
                        講師から「仮装しながらデザインしている姿を見せるのは、作品のプロモーションとして
                        面白く効果的だった」とコメントをもらいました。
                        そのフィードバックをきっかけに、
                        制作過程そのものも作品のストーリーとして
                        見せるアイデアへ発展しました。
                      </p>
                    )}
                  </div>

                  <div className="instagram-iframe">
                    <iframe
                      src="https://www.youtube.com/embed/-UeP_cdZlZQ"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      allowFullScreen
                      title="Behind the scenes"
                      style={{ borderRadius: '12px' }}
                    ></iframe>
                  </div>
                </div>
              </DetailBox>
            </FadeInOnScroll>
          </div>

          {/* NEON VERSION */}
          <div id="neonversion">
            <FadeInOnScroll>
              <DetailBox
                title={language === 'en' ? 'NEON VERSION' : 'ネオンバージョン'}
                colorClass="purple"
              >
                {language === 'en' ? (
                  <p>
                    After finishing the Halloween palette, I created a “Neon
                    Version” to explore how color alone can change the mood of a
                    geometric loop.
                    <br />
                    <br />
                    Switching to neon colors makes the animation feel more
                    energetic and futuristic even though the shapes and timing
                    remain exactly the same.
                    <br />
                    <br />I also turned this version into a wallpaper because I
                    wanted something that makes me happy and gives me energy
                    every time I open my laptop. I added my name and my Japanese
                    motto meaning “Every day is super lucky.”
                  </p>
                ) : (
                  <p>
                    ハロウィンカラーのバージョンを完成させたあと、
                    色だけで作品の印象がどのくらい変わるのか
                    試してみたいと思い、 「ネオンバージョン」を制作しました。
                    <br />
                    <br />
                    図形やアニメーションのタイミングは
                    まったく同じですが、ネオンカラーに変更することで、
                    よりエネルギッシュで未来的な印象になりました。
                    <br />
                    <br />
                    また、パソコンを開くたびに自分が楽しく、
                    元気になれるものが欲しかったので、
                    このデザインを壁紙にもしました。
                    自分の名前と、日本語のモットーである
                    「毎日が大ラッキーの連続だ！」もデザインに加えています。
                  </p>
                )}

                <div className="video-wrapper">
                  <FadeInOnScroll>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/JZ6zt0kjZ-U?si=-li7LZ0jxb2--G0X"
                      title="Neon Version"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </FadeInOnScroll>
                </div>
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
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default HalloweenMotion;
