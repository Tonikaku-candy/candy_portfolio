// src/pages/Projects/VancouverBrochure/VancouverBrochure.jsx

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
import Cover from '../../../assets/ProjectDetails/VancouverBrochure/brochure-cover.webp';
import VersionOne from '../../../assets/ProjectDetails/VancouverBrochure/brochure-v1.webp';
import FinalDesign from '../../../assets/ProjectDetails/VancouverBrochure/brochure-final.webp';

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
function VancouverBrochure() {
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
    'GRAPHIC DESIGN',
    'EDITORIAL DESIGN',
    'PRINT DESIGN',
    'INFORMATION DESIGN',
    'BROCHURE',
    'TYPOGRAPHY',
    'LAYOUT DESIGN',
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
              ? 'Vancouver Architecture Brochure'
              : 'バンクーバー建築散策パンフレット'
          }
          className={language === 'ja' ? 'japanese-text' : ''}
        />

        {/* HERO */}
        <FadeInOnScroll>
          <img
            src={Cover}
            alt={
              language === 'en'
                ? 'Downtown Vancouver Architecture Walk brochure'
                : 'バンクーバー建築散策パンフレット'
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
              id: 'version-one',
              label:
                language === 'en' ? (
                  <>
                    Version
                    <br />
                    One
                  </>
                ) : (
                  '初稿'
                ),
            },
            {
              id: 'improvements',
              label:
                language === 'en' ? (
                  <>
                    Feedback &
                    <br />
                    Improvements
                  </>
                ) : (
                  <>
                    フィードバック
                    <br />
                    ＆改善
                  </>
                ),
            },
            {
              id: 'final-design',
              label:
                language === 'en' ? (
                  <>
                    Final
                    <br />
                    Design
                  </>
                ) : (
                  '最終デザイン'
                ),
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
                      ? 'Information Designer'
                      : '情報デザイン'}
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
                      ? 'July 2026'
                      : '2026年7月'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Revised August 2026'
                      : '2026年8月 改訂'}
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
                  Vancouver Architecture Brochure is a personal project
                  designed as a self-guided walking tour featuring six
                  architectural landmarks in downtown Vancouver.
                  <br />
                  <br />
                  I designed the brochure as a visitor guide that could be
                  distributed at hotels and other tourist locations. The route
                  is planned so visitors can reach the starting point by public
                  transit and explore the city on foot. The final design
                  combines architectural information, transit directions, a
                  walking route, and a detailed map in a compact tri-fold
                  format.
                </p>
              ) : (
                <p>
                  バンクーバーのダウンタウンにある6つの建築スポットを
                  巡る、セルフガイド形式の建築散策パンフレットを
                  個人制作しました。
                  <br />
                  <br />
                  ホテルや観光案内所などで旅行者に配布されることを
                  想定したガイドです。公共交通機関でスタート地点まで
                  アクセスし、そこから徒歩で街を巡れるルートを
                  設計しました。
                  <br />
                  <br />
                  最終版では、建築情報、交通案内、散策ルート、
                  詳細な地図をコンパクトな三つ折りパンフレットに
                  まとめています。
                </p>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* VERSION ONE */}
          <div id="version-one"></div>

          <FadeInOnScroll>
            <DetailBox
              title={language === 'en' ? 'VERSION ONE' : '初稿'}
              colorClass="green"
            >
              {language === 'en' ? (
                <p>
                  For the first version, I created a clean and minimal design
                  that could appeal to a wide range of age groups. I used fresh
                  blue tones as the primary color palette to give the brochure
                  a simple and approachable look.
                  <br />
                  <br />
                  The brochure introduced six architectural landmarks with
                  basic building information, walking distance, estimated time,
                  and a simplified map showing the route through downtown
                  Vancouver.
                </p>
              ) : (
                <p>
                  初稿では、幅広い年齢層に親しみやすい、
                  シンプルでクリーンなデザインを目指しました。
                  爽やかなブルーをメインカラーに使用し、
                  見やすく落ち着いた印象にまとめています。
                  <br />
                  <br />
                  6つの建築スポットについて、建物の基本情報、
                  徒歩距離、所要時間を掲載し、
                  ダウンタウンを巡るルートが分かる
                  シンプルな地図も制作しました。
                </p>
              )}

              <div
                className="image-wrapper"
                style={{ marginTop: '2rem' }}
              >
                <img
                  src={VersionOne}
                  alt={
                    language === 'en'
                      ? 'First version of Vancouver architecture brochure'
                      : 'バンクーバー建築散策パンフレットの初稿'
                  }
                />
              </div>
            </DetailBox>
          </FadeInOnScroll>

          {/* IMPROVEMENTS */}
          <div id="improvements"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'FEEDBACK & IMPROVEMENTS'
                  : 'フィードバックと改善'
              }
              colorClass="purple"
            >
              {language === 'en' ? (
                <>
                  <p>
                    Feedback suggested that the first design felt too
                    business-oriented and did not fully communicate the
                    excitement of travel and exploring Vancouver.
                    <br />
                    <br />
                    There were also usability issues. The map showed numbered
                    destinations, but did not explain how visitors could reach
                    the starting point. Important information such as “About
                    the Guide” was also placed on the back panel, making it
                    easy to overlook.
                    <br />
                    <br />
                    Based on this feedback, I revised both the visual design
                    and the information structure to create a more engaging
                    and practical travel guide.
                  </p>

                  <br />

                  <ul>
                    <li>
                      Added an illustration of people walking to create a more
                      enjoyable and travel-focused atmosphere
                    </li>

                    <li>
                      Added photos of the featured architecture to the front
                      cover so visitors can immediately see what they will
                      discover on the tour
                    </li>

                    <li>
                      Recreated the map in Illustrator with a simpler and
                      clearer visual style
                    </li>

                    <li>
                      Added major landmarks and parks, including Canada Place
                      and BC Place, to provide more context for navigating the
                      city
                    </li>

                    <li>
                      Replaced the rigid visual style with rounded shapes,
                      curved elements, and softer image treatments to create a
                      more friendly and inviting design
                    </li>

                    <li>
                      Added a clear starting point and directions from
                      Yaletown–Roundhouse Station to help visitors begin the
                      walking tour
                    </li>

                    <li>
                      Reorganized the information hierarchy so important guide
                      information is easier to find
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    初稿へのフィードバックでは、
                    「ビジネス向けの資料のように見え、
                    旅行やバンクーバーを散策するワクワク感が
                    十分に伝わっていない」という意見がありました。
                    <br />
                    <br />
                    また、使いやすさにも改善点がありました。
                    地図には各スポットの番号を表示していましたが、
                    スタート地点までの行き方が分かりにくく、
                    「このガイドについて」などの重要な情報も
                    裏面に配置されていたため、
                    見落とされやすい状態でした。
                    <br />
                    <br />
                    そこでフィードバックをもとに、
                    ビジュアルだけでなく情報設計も見直し、
                    より楽しく実用的な観光ガイドへ改善しました。
                  </p>

                  <br />

                  <ul>
                    <li>
                      歩いている人のイラストを追加し、
                      街歩きの楽しさが伝わる雰囲気に変更
                    </li>

                    <li>
                      表紙に建築スポットの写真を追加し、
                      どのような場所を巡るツアーなのか
                      一目で分かるように改善
                    </li>

                    <li>
                      Illustratorで地図を作り直し、
                      よりシンプルで分かりやすいデザインに変更
                    </li>

                    <li>
                      Canada PlaceやBC Place、公園などの
                      主要ランドマークを追加し、
                      現在地や街の位置関係を把握しやすく改善
                    </li>

                    <li>
                      直線的で硬い印象だったデザインを見直し、
                      丸みのある図形や曲線、柔らかい写真表現を
                      取り入れて親しみやすい印象に変更
                    </li>

                    <li>
                      Yaletown–Roundhouse Stationから
                      スタート地点までの行き方を追加し、
                      散策を始めやすい構成に改善
                    </li>

                    <li>
                      情報の優先順位と配置を見直し、
                      重要な情報を見つけやすく整理
                    </li>
                  </ul>
                </>
              )}
            </DetailBox>
          </FadeInOnScroll>

          {/* FINAL DESIGN */}
          <div id="final-design"></div>

          <FadeInOnScroll>
            <DetailBox
              title={
                language === 'en'
                  ? 'FINAL DESIGN'
                  : '最終デザイン'
              }
              colorClass="orange"
            >
              {language === 'en' ? (
                <p>
                  The final design transforms the brochure into a more inviting
                  and practical travel guide while maintaining a clean and
                  easy-to-follow layout.
                  <br />
                  <br />
                  Softer shapes, architectural photography, and playful
                  illustrations create a more enjoyable sense of exploration,
                  while the redesigned map and clearer information hierarchy
                  make the walking tour easier to navigate.
                  <br />
                  <br />
                  The final brochure balances visual appeal with functionality,
                  helping visitors discover Vancouver’s architecture and enjoy
                  exploring the city on foot.
                </p>
              ) : (
                <p>
                  最終版では、初稿の見やすさを残しながら、
                  より親しみやすく実用的な観光ガイドへ
                  デザインを改善しました。
                  <br />
                  <br />
                  柔らかな図形、建築写真、遊び心のあるイラストを
                  取り入れることで、街を散策する楽しさが
                  伝わるデザインにしています。
                  また、地図と情報の優先順位を見直すことで、
                  実際にパンフレットを見ながら
                  ルートを歩きやすい構成にしました。
                  <br />
                  <br />
                  見た目の楽しさと使いやすさの両方を大切にし、
                  バンクーバーの建築を知りながら
                  街歩きを楽しめるパンフレットを目指しました。
                </p>
              )}

              <div
                className="image-wrapper"
                style={{ marginTop: '2rem' }}
              >
                <img
                  src={FinalDesign}
                  alt={
                    language === 'en'
                      ? 'Final Vancouver architecture walking tour brochure'
                      : 'バンクーバー建築散策パンフレットの最終デザイン'
                  }
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

export default VancouverBrochure;