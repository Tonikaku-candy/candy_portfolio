// src/pages/Projects/Fashion/FashionZineAndEventProject.jsx

import React, { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox.jsx';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer.jsx';
import '../ProjectsDetailLayout.css';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar.jsx';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle.jsx';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import projects from '../../../data/ProjectData.js';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

import Flipbook from './Flipbook.jsx';

// photo slide
import SlideCard from '../../../components/ProjectDetail/SlideCard.jsx';
import '../../../components/ProjectDetail/SlideCard.css';
import FashionZineAndEventSlideData from './FashionZineAndEventSlideData.js';

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
function FashionZineAndEventProject() {
  const { language } = useLanguage();

  const params = useParams();
  const location = useLocation();

  const currentIndex = useMemo(
    () => resolveProjectIndex(projects, location, params),
    [location, params]
  );

  const { prevProject, nextProject, notFound } = useMemo(() => {
    const total = projects.length;

    if (total === 0 || currentIndex == null || currentIndex < 0) {
      return {
        prevProject: null,
        nextProject: null,
        notFound: true,
      };
    }

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return {
      prevProject: projects[prevIndex] || null,
      nextProject: projects[nextIndex] || null,
      notFound: false,
    };
  }, [currentIndex]);

  const baseTags = [
    'EVENT ORGANIZE',
    'FASHION ZINE',
    'LOGO DESIGN',
    'POSTER DESIGN',
    'LANDING PAGE',
    'BRANDING',
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
          title={
            language === 'en'
              ? 'FASHION ZINE AND EVENT'
              : 'ファッションZINE ＆ イベント'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {notFound ? (
          <div className="project-not-found">
            <p>
              {language === 'en'
                ? 'Can not find project'
                : 'プロジェクトが見つかりません。'}
            </p>

            <Link to="/projects" className="back-button center">
              {language === 'en'
                ? 'Back to Projects'
                : '制作実績に戻る'}
            </Link>
          </div>
        ) : (
          <>
            {/* LINKS */}
            <DetailLinks
              links={[
                {
                  id: 'magazine',
                  label:
                    language === 'en'
                      ? 'Magazine'
                      : 'ZINE',
                },
                {
                  id: 'overview',
                  label:
                    language === 'en'
                      ? 'Overview'
                      : '概要',
                },
                {
                  id: 'design',
                  label:
                    language === 'en'
                      ? 'Design Concept'
                      : 'デザイン',
                },
                {
                  id: 'landing',
                  label:
                    language === 'en' ? (
                      <>
                        Landing Page
                        <br />
                        (1st Project)
                      </>
                    ) : (
                      <>
                        ランディングページ
                        <br />
                        （第1プロジェクト）
                      </>
                    ),
                },
                {
                  id: 'website',
                  label:
                    language === 'en' ? (
                      <>
                        Official Website
                        <br />
                        (2nd Project)
                      </>
                    ) : (
                      <>
                        公式Webサイト
                        <br />
                        （第2プロジェクト）
                      </>
                    ),
                },
                {
                  id: 'history',
                  label:
                    language === 'en'
                      ? 'Event History'
                      : 'イベントの歴史',
                },
              ]}
            />

            {/* FLIPBOOK */}
            <div id="magazine"></div>

            <FadeInOnScroll>
              <Flipbook />
            </FadeInOnScroll>

            <div className="detail-box-wrapper">
              {/* INFO */}
              <div className="project-grid">
                <FadeInOnScroll>
                  <DetailBox
                    size="S"
                    title={
                      language === 'en'
                        ? 'SOFTWARE'
                        : '使用ツール'
                    }
                    colorClass="blue"
                  >
                    <ul>
                      <li>InDesign</li>
                      <li>Photoshop</li>
                      <li>Illustrator</li>
                      <li>Visual Studio Code</li>
                      <li>Tailwind CSS</li>
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
                          ? 'Event Page Developer'
                          : 'イベントページ開発'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'Graphic Designer (Logo & Poster)'
                          : 'グラフィックデザイン（ロゴ・ポスター）'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'Editor & Layout Designer'
                          : '編集・レイアウトデザイン'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'Art Director'
                          : 'アートディレクション'}
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
                    <ul className="tight-paragraph">
                      <li>
                        {language === 'en'
                          ? 'September 2025 — Official Website'
                          : '2025年9月 — 公式Webサイト'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'March 2025 — Logo, Poster & Landing Page'
                          : '2025年3月 — ロゴ・ポスター・ランディングページ'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'June–July 2025 — Fashion Zine'
                          : '2025年6月〜7月 — ファッションZINE'}
                      </li>
                    </ul>
                  </DetailBox>
                </FadeInOnScroll>
              </div>

              {/* OVERVIEW */}
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
                    <p>
                      As one of the organizers of{' '}
                      <strong>Harajuku Walk YVR</strong>, I was
                      responsible for coding the event detail page,
                      designing the Instagram logo, producing the
                      event poster, and later creating a full fashion
                      zine.
                      <br />
                      <br />
                      The zine was designed after the event using
                      photos captured on the day. In addition to the
                      editorial layouts, I also designed advertisement
                      pages and the back cover to replicate the look
                      and feel of a real magazine.
                      <br />
                      <br />
                      This project combined photography, typography,
                      and playful layouts to capture the energy of
                      Tokyo street style in a printed format while
                      showcasing Harajuku-inspired fashion culture.
                    </p>
                  ) : (
                    <p>
                      <strong>Harajuku Walk YVR</strong>
                      の運営メンバーの一人として、
                      イベントページのコーディング、
                      Instagramロゴ、イベントポスター、
                      そしてイベント後のファッションZINE制作を
                      担当しました。
                      <br />
                      <br />
                      ZINEにはイベント当日に撮影した写真を使用し、
                      エディトリアルページだけでなく、
                      広告ページや裏表紙も制作することで、
                      実際のファッション誌のような構成を
                      目指しました。
                      <br />
                      <br />
                      写真、タイポグラフィ、
                      遊び心のあるレイアウトを組み合わせ、
                      原宿ファッションのカラフルで自由な
                      エネルギーを紙面で表現しています。
                    </p>
                  )}
                </DetailBox>
              </FadeInOnScroll>

              {/* DESIGN CONCEPT */}
              <div id="design"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'DESIGN CONCEPT'
                      : 'デザインコンセプト'
                  }
                  colorClass="green"
                >
                  {language === 'en' ? (
                    <p>
                      As an organizer of Harajuku Walk YVR, I focused
                      on building a consistent and playful brand
                      identity across different media.
                      <br />
                      <br />
                      For the <strong>Instagram logo</strong>, I used
                      many bold shapes and created multiple color
                      variations to capture the fun, pop-like energy
                      of Harajuku culture. The final version, chosen
                      by the other organizers, was in pink—matching
                      the cheerful theme of the event.
                      <br />
                      <br />
                      The <strong>event poster</strong> expressed
                      Harajuku fashion’s pop, colorful, and busy
                      atmosphere, while I carefully designed outlines
                      and contrasting backgrounds to keep event
                      details clear and readable.
                      <br />
                      <br />
                      The <strong>fashion zine</strong> was designed
                      after the event using photos taken on the day.
                      I also created an advertisement page for our{' '}
                      <Link
                        to="/projects/japanese-instagram-project"
                        className="link-pink"
                      >
                        “Japanese teaching Instagram”
                      </Link>
                      , the back cover design, and fictional
                      promotional product visuals to enhance the
                      feeling of a real magazine.
                      <br />
                      <br />
                      I designed each spread to feel playful and
                      dynamic, allowing readers to experience the
                      different fashion looks of the participants as
                      they flip through the zine.
                    </p>
                  ) : (
                    <p>
                      Harajuku Walk YVRの運営メンバーとして、
                      ロゴ、ポスター、ZINEなど
                      異なる媒体でも統一感のある、
                      遊び心のあるブランドイメージを
                      つくることを意識しました。
                      <br />
                      <br />
                      <strong>Instagramロゴ</strong>
                      では、大胆な図形を組み合わせ、
                      原宿カルチャーのポップで楽しい雰囲気を
                      表現しました。
                      複数のカラーバリエーションを制作し、
                      最終的には他の運営メンバーによって
                      イベントの明るい雰囲気に合う
                      ピンクのデザインが選ばれました。
                      <br />
                      <br />
                      <strong>イベントポスター</strong>
                      では、原宿ファッションらしい
                      ポップでカラフルな情報量の多い世界観を
                      表現しながら、
                      文字にアウトラインを付けたり、
                      背景とのコントラストを調整したりすることで、
                      イベント情報の読みやすさも意識しました。
                      <br />
                      <br />
                      <strong>ファッションZINE</strong>
                      はイベント後に制作し、
                      当日撮影した写真を使用しています。
                      また、
                      <Link
                        to="/projects/japanese-instagram-project"
                        className="link-pink"
                      >
                        「日本語学習Instagram」
                      </Link>
                      の広告ページや裏表紙、
                      架空のプロモーション商品ビジュアルも制作し、
                      本物のファッション誌のような
                      世界観をつくりました。
                      <br />
                      <br />
                      ページをめくるたびに、
                      参加者それぞれのファッションを
                      楽しめるような、
                      動きのあるレイアウトを意識しています。
                    </p>
                  )}

                  <div className="project-slider-detail">
                    <SlideCard
                      slideData={FashionZineAndEventSlideData}
                    />
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              {/* LANDING PAGE */}
              <div id="landing"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'EVENT LANDING PAGE (First Project)'
                      : 'イベントLP（第1プロジェクト）'
                  }
                  colorClass="purple"
                >
                  {language === 'en' ? (
                    <p>
                      This was the{' '}
                      <strong>first event website</strong> I created
                      for Harajuku Walk YVR — a one-page landing site
                      designed to introduce the event to newcomers and
                      those unfamiliar with Harajuku fashion.
                      <br />
                      <br />
                      It aimed to{' '}
                      <strong>
                        explain the concept quickly and visually
                      </strong>{' '}
                      through bright photos, playful colors, and clear
                      event details, making it easy for first-time
                      participants to understand what the event was
                      about.
                      <br />
                      <br />
                      Built with <strong>Tailwind CSS</strong>, the
                      site featured a responsive design and simple
                      navigation for a friendly user experience.
                    </p>
                  ) : (
                    <p>
                      Harajuku Walk YVRのために最初に制作した
                      <strong>イベントWebサイト</strong>
                      です。
                      <br />
                      <br />
                      原宿ファッションを知らない人や
                      初めてイベントに参加する人にも、
                      イベントの内容を分かりやすく伝えるための
                      1ページ構成のランディングページとして
                      制作しました。
                      <br />
                      <br />
                      明るい写真、遊び心のあるカラー、
                      分かりやすいイベント情報を使い、
                      <strong>
                        コンセプトを短時間で視覚的に理解できること
                      </strong>
                      を意識しました。
                      <br />
                      <br />
                      Tailwind CSSを使用して実装し、
                      レスポンシブデザインと
                      シンプルなナビゲーションによって、
                      初めて訪れる人にも使いやすい
                      Webサイトを目指しました。
                    </p>
                  )}

                  <div className="text-center">
                    <a
                      href="https://purinp1.github.io/harajukuwalkvyr/?fbclid=..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="colorful-button"
                    >
                      <span className="button_top">
                        {language === 'en'
                          ? 'View Live Website'
                          : 'Webサイトを見る'}
                      </span>
                    </a>
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              {/* OFFICIAL WEBSITE */}
              <div id="website"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'OFFICIAL WEBSITE (Second Project)'
                      : '公式Webサイト（第2プロジェクト）'
                  }
                  colorClass="pink"
                >
                  {language === 'en' ? (
                    <p>
                      After the first landing page, I created a{' '}
                      <strong>full official website</strong> to expand
                      the community and showcase more aspects of the
                      event.
                      <br />
                      <br />
                      The official site focused on{' '}
                      <strong>
                        event storytelling and community building
                      </strong>
                      , featuring sections for fashion styles, zine
                      release, past photos, and more.
                      <br />
                      <br />
                      Its goal was to{' '}
                      <strong>
                        celebrate Harajuku culture in Vancouver
                      </strong>{' '}
                      through interactive design and vibrant visuals
                      that reflect the diversity of participants.
                    </p>
                  ) : (
                    <p>
                      最初のランディングページ制作後、
                      コミュニティをさらに広げ、
                      イベントについてより詳しく紹介するために
                      <strong>公式Webサイト</strong>
                      を制作しました。
                      <br />
                      <br />
                      公式サイトでは、
                      <strong>
                        イベントのストーリーとコミュニティづくり
                      </strong>
                      を重視し、
                      ファッションスタイルの紹介、
                      ZINE、過去のイベント写真など、
                      より多くのコンテンツを掲載しています。
                      <br />
                      <br />
                      参加者の多様なファッションを反映した
                      カラフルなビジュアルと
                      インタラクティブなデザインを通して、
                      <strong>
                        バンクーバーで原宿カルチャーを楽しむ
                      </strong>
                      コミュニティの魅力を伝えることを
                      目指しました。
                    </p>
                  )}

                  <div className="text-center">
                    <a
                      href="https://purinp1.github.io/harajuku-walk-yvr/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="colorful-button"
                    >
                      <span className="button_top">
                        {language === 'en'
                          ? 'View Live Website'
                          : 'Webサイトを見る'}
                      </span>
                    </a>
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              {/* HISTORY */}
              <div id="history"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'EVENT HISTORY'
                      : 'イベントの歴史'
                  }
                  colorClass="orange"
                >
                  {language === 'en' ? (
                    <p>
                      In February 2016, I co-organized the very first
                      Harajuku Fashion Walk in Vancouver together with
                      my friend. The event was even featured in the{' '}
                      <a
                        href="https://vancouversun.com/news/staff-blogs/vancouvers-first-harajuku-fashion-walk-with-video"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-pink"
                      >
                        Vancouver Sun
                      </a>
                      .
                      <br />
                      <br />
                      After being held twice in the past, the event
                      took a long break. In April 2025, a new team of
                      organizers decided to bring it back — and I was
                      invited to join them as one of the organizers.
                    </p>
                  ) : (
                    <p>
                      2016年2月、友人と一緒に
                      バンクーバー初となる
                      Harajuku Fashion Walkを企画・開催しました。
                      このイベントは{' '}
                      <a
                        href="https://vancouversun.com/news/staff-blogs/vancouvers-first-harajuku-fashion-walk-with-video"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-pink"
                      >
                        Vancouver Sun
                      </a>
                      にも取り上げられました。
                      <br />
                      <br />
                      過去に2回開催した後、
                      イベントは長期間休止していましたが、
                      2025年4月に新しい運営チームによって
                      復活することになり、
                      私も再び運営メンバーの一人として
                      参加しました。
                    </p>
                  )}
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
          </>
        )}
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default FashionZineAndEventProject;