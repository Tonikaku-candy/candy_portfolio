// src/pages/Projects/Instagram/JapaneseInstagramProject.jsx

import React, { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import '../../../components/TagBar.css';
import DetailBox from '../../../components/ProjectDetail/DetailBox';
import '../../../components/ProjectDetail/DetailBox.css';
import Footer from '../../../components/Footer';
import '../ProjectsDetailLayout.css';
import '../../Projects/Instagram/JapaneseInstagramProject.css';
import ScrollingTagBar from '../../../components/ProjectDetail/ScrollingTagBar';
import '../../../components/ProjectDetail/ScrollingTagBar.css';
import ProjectTitle from '../../../components/ProjectDetail/ProjectTitle';
import DetailLinks from '../../../components/ProjectDetail/DetailLinks.jsx';
import projects from '../../../data/ProjectData.js';
import FadeInOnScroll from '../../../components/FadeInOnScroll.jsx';
import { useLanguage } from '../../../components/context/LanguageContext.jsx';

// images
import instagramImage from '../../../components/assets/japanese-instagram-content-posts.webp';
import image2 from '../../../assets/ProjectDetails/Instagram/instagram-insights.webp';
import image1 from '../../../assets/ProjectDetails/Instagram/instagram-insights2.webp';

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
function JapaneseInstagramProject() {
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
    'CONTENT CREATION',
    'SOCIAL MEDIA',
    'JAPANESE LANGUAGE',
    'MARKETING',
    'INSTAGRAM',
    'DESIGN',
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
              ? 'INSTAGRAM CONTENT CREATION'
              : 'Instagram コンテンツ制作'
          }
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
            {/* HERO */}
            <FadeInOnScroll>
              <img
                src={instagramImage}
                alt={
                  language === 'en'
                    ? 'Sample layout of Instagram content posts for Japanese learning project'
                    : '日本語学習Instagramコンテンツの投稿デザイン'
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
                  id: 'concept',
                  label:
                    language === 'en'
                      ? 'Concept'
                      : 'コンセプト',
                },
                {
                  id: 'strategy',
                  label:
                    language === 'en'
                      ? 'Strategy'
                      : '戦略',
                },
                {
                  id: 'engagement',
                  label:
                    language === 'en'
                      ? 'Engagement'
                      : '成果',
                },
                {
                  id: 'instagram',
                  label: 'Instagram',
                },
              ]}
            />

            <div className="detail-box-wrapper">
              {/* SOFTWARE / ROLE / DURATION */}
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
                      <li>Photoshop</li>
                      <li>Instagram Insights</li>
                      <li>CapCut</li>
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
                          ? 'Content Creator'
                          : 'コンテンツ制作'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'Japanese Language Instructor'
                          : '日本語指導'}
                      </li>

                      <li>
                        {language === 'en'
                          ? 'Social Media Manager'
                          : 'SNS運用'}
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
                          ? 'Feb – June, 2025'
                          : '2025年2月〜6月'}
                      </li>
                    </ul>
                  </DetailBox>
                </FadeInOnScroll>
              </div>

              {/* OVERVIEW */}
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
                        This Instagram project began as a group
                        assignment for our Social Media class. I led
                        the content creation and account strategy to
                        build a playful, emotional learning experience
                        using Japanese phrases.
                        <br />
                        <br />
                        The aim was to make Japanese learning fun,
                        shareable, and stylish — something that
                        doesn’t feel like a textbook.
                      </p>
                    ) : (
                      <p>
                        このInstagramプロジェクトは、
                        Social Mediaの授業で行った
                        グループ課題としてスタートしました。
                        私は主にコンテンツ制作と
                        アカウント戦略を担当しました。
                        <br />
                        <br />
                        日本語のフレーズを使いながら、
                        楽しく、感情に残る学習体験を
                        つくることを目指しています。
                        教科書のような堅い日本語学習ではなく、
                        思わずシェアしたくなるような、
                        楽しくスタイリッシュな
                        コンテンツを意識して制作しました。
                      </p>
                    )}
                  </DetailBox>
                </FadeInOnScroll>
              </div>

              {/* CONCEPT */}
              <div id="concept"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'CONCEPT & INSPIRATION'
                      : 'コンセプト＆着想'
                  }
                  colorClass="green"
                >
                  {language === 'en' ? (
                    <p>
                      The idea came from my past experience as a
                      Japanese tutor — I realized that students want
                      to learn practical and fun phrases they can
                      actually use in real life.
                      <br />
                      <br />
                      I also noticed that most Japanese learning
                      content online tends to be either too formal or
                      too boring. To make things more engaging, I
                      combined casual language with elements of
                      Japanese subculture such as anime references,
                      slang, and gag-style humor.
                    </p>
                  ) : (
                    <p>
                      このアイデアは、以前日本語を教えていた
                      経験から生まれました。
                      学習者は文法だけではなく、
                      実際の日常生活で使える
                      実用的で楽しい日本語も学びたいのでは
                      ないかと感じていました。
                      <br />
                      <br />
                      また、オンライン上の日本語学習コンテンツは
                      真面目すぎたり、少し堅い印象のものも
                      多いと感じていました。
                      <br />
                      <br />
                      そこで、カジュアルな日本語に
                      アニメ、スラング、ギャグなどの
                      日本のサブカルチャー要素を組み合わせ、
                      より親しみやすく楽しい
                      コンテンツを目指しました。
                    </p>
                  )}
                </DetailBox>
              </FadeInOnScroll>

              {/* STRATEGY */}
              <div id="strategy"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'CONTENT MARKETING STRATEGY'
                      : 'コンテンツマーケティング戦略'
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
                    <div style={{ flex: '1 1 400px' }}>
                      {language === 'en' ? (
                        <p>
                          Since most of our audience browses Instagram
                          casually, I focused on creating short,
                          visually engaging posts with a playful and
                          approachable tone.
                          <br />
                          <br />
                          Each post follows a specific theme such as
                          “Otaku Terms,” “Useless Words,” or
                          “Abbreviations,” making the content easy to
                          understand and enjoy—even for those without
                          deep grammar knowledge.
                          <br />
                          <br />
                          I intentionally included quirky, “useless”
                          Japanese words—phrases you’ll never find in a
                          textbook and probably never need in real
                          life—because I felt they added a unique and
                          unexpected charm that sets our account apart
                          from typical Japanese learning pages.
                          <br />
                          <br />
                          I also maintained consistency in layout,
                          color palette, and character voice to
                          establish a strong and recognizable brand
                          identity for the account.
                          <br />
                          <br />
                          For Reels, I focused on creating short,
                          relatable videos that highlight cultural
                          differences between Japan and Western
                          countries.
                          <br />
                          <br />
                          Since Reels are often shown to random users
                          who may not be actively learning Japanese, I
                          avoided direct language instruction.
                          Instead, I used humor and everyday situations
                          to grab attention and drive more viewers to
                          our main Instagram page.
                        </p>
                      ) : (
                        <p>
                          Instagramは気軽に閲覧するユーザーが
                          多いため、短時間で内容が伝わり、
                          視覚的にも楽しめる投稿を意識しました。
                          <br />
                          <br />
                          投稿には「オタク用語」
                          「役に立たない日本語」
                          「略語」など、
                          毎回分かりやすいテーマを設定しました。
                          文法の知識があまりなくても
                          楽しめる構成にしています。
                          <br />
                          <br />
                          特に「役に立たない日本語」では、
                          教科書には載っていないような、
                          おそらく実生活でもほとんど使わない
                          ちょっと変な言葉をあえて紹介しました。
                          一般的な日本語学習アカウントとは違う、
                          予想外の面白さをつくることが目的です。
                          <br />
                          <br />
                          また、レイアウト、カラーパレット、
                          キャラクターの話し方などを統一し、
                          アカウント全体で認識しやすい
                          ブランドイメージをつくりました。
                          <br />
                          <br />
                          Reelsでは、日本と海外の文化の違いを
                          テーマにした、短く共感しやすい
                          動画を中心に制作しました。
                          <br />
                          <br />
                          Reelsは日本語を勉強していない人にも
                          おすすめとして表示されるため、
                          あえて直接的な日本語レッスンにはせず、
                          ユーモアや日常のシチュエーションから
                          興味を持ってもらい、
                          アカウントへの流入につなげることを
                          意識しました。
                        </p>
                      )}
                    </div>

                    {/* Instagram Reel */}
                    <div className="instagram-iframe">
                      <iframe
                        className="instagram"
                        src="https://www.instagram.com/reel/DGn8h_dvgyp/embed"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        allowFullScreen
                        title="Instagram Reel"
                        style={{ borderRadius: '12px' }}
                      ></iframe>
                    </div>
                  </div>
                </DetailBox>
              </FadeInOnScroll>

              {/* ENGAGEMENT */}
              <div id="engagement"></div>

              <FadeInOnScroll>
                <DetailBox
                  title={
                    language === 'en'
                      ? 'ENGAGEMENT HIGHLIGHTS'
                      : 'エンゲージメント実績'
                  }
                  colorClass="orange"
                >
                  {language === 'en' ? (
                    <>
                      <p>
                        Even with only a few followers, our Reels
                        managed to reach large audiences—proving that
                        humor, cultural references, and unexpected
                        twists can be powerful tools for engagement.
                        <br />
                        <br />
                        One of our most popular Reels was a parody of
                        the viral “PPAP” song. We turned it into a
                        silly Japanese pun: “I have a Negi” + “I have
                        a Toro” = <i>Negitoro</i> (a type of sushi).
                      </p>

                      <ul>
                        <li>
                          <strong>2,432 views</strong> on one Reel
                          (96.1% from non-followers)
                        </li>
                        <li>
                          <strong>99 interactions</strong> total
                        </li>
                        <li>
                          <strong>
                            79 likes, 13 shares, and 5 saves
                          </strong>
                        </li>
                        <li>
                          <strong>11h 33m</strong> of total watch time
                        </li>
                      </ul>

                      <br />

                      <div className="image-wrapper">
                        <img
                          src={image1}
                          alt="Instagram Reel insights for Negitoro PPAP parody"
                        />
                      </div>

                      <p>
                        This Reel is a playful parody of the viral
                        “PPAP” song (Pen-Pineapple-Apple-Pen). We
                        combined “I have a Negi” + “I have a Toro” =
                        Negitoro, a popular Japanese sushi made with
                        tuna and green onion.
                        <br />
                        <br />
                        It’s silly, it’s unexpected—and that’s exactly
                        why it grabbed attention. By referencing
                        internet culture and blending it with Japanese
                        food vocabulary, we made something both
                        memorable and fun to share.
                      </p>

                      <br />
                      <br />

                      <p>
                        Another featured a word game battle presented
                        with intense, mock-serious visuals.
                      </p>

                      <ul>
                        <li>
                          <strong>2,019 views</strong> on one Reel
                          (95.7% from non-followers)
                        </li>
                        <li>
                          <strong>122 interactions</strong> total
                        </li>
                        <li>
                          <strong>
                            80 likes, 29 shares, and 9 saves
                          </strong>
                        </li>
                        <li>
                          <strong>6h 17m</strong> of total watch time
                        </li>
                        <li>
                          Top discovery source:{' '}
                          <strong>Reels tab (70.2%)</strong>
                        </li>
                      </ul>

                      <p>
                        These results confirmed that short-form
                        content blending Japanese culture with
                        internet humor resonates well—even with users
                        who aren't actively studying Japanese.
                      </p>

                      <div className="image-wrapper">
                        <img
                          src={image2}
                          alt="Instagram Reel insights for Shiritori video"
                        />
                      </div>

                      <p>
                        This Reel features a Japanese word game,
                        Shiritori, styled like an intense battle scene.
                        By combining language play with dramatic
                        visuals, we turned a simple concept into
                        something attention-grabbing and fun to watch.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        フォロワー数がまだ少ない状態でも、
                        Reelsは多くのユーザーにリーチしました。
                        ユーモア、文化的なネタ、
                        予想外の展開を取り入れることが、
                        エンゲージメントにつながることを
                        確認できました。
                        <br />
                        <br />
                        特に反応が良かったReelの一つが、
                        話題になった「PPAP」のパロディです。
                        「I have a Negi」＋「I have a Toro」
                        ＝ <i>Negitoro（ネギトロ）</i>
                        という、日本語のダジャレを使った
                        動画を制作しました。
                      </p>

                      <ul>
                        <li>
                          1本のReelで
                          <strong>2,432回再生</strong>
                          （96.1%が非フォロワー）
                        </li>

                        <li>
                          合計
                          <strong>99件のインタラクション</strong>
                        </li>

                        <li>
                          <strong>
                            79いいね・13シェア・5保存
                          </strong>
                        </li>

                        <li>
                          合計視聴時間
                          <strong>11時間33分</strong>
                        </li>
                      </ul>

                      <br />

                      <div className="image-wrapper">
                        <img
                          src={image1}
                          alt="ネギトロPPAP動画のInstagramインサイト"
                        />
                      </div>

                      <p>
                        このReelは、PPAP
                        （Pen-Pineapple-Apple-Pen）を
                        パロディにした動画です。
                        <br />
                        <br />
                        「I have a Negi」と
                        「I have a Toro」を組み合わせて
                        「Negitoro（ネギトロ）」になるという、
                        あえてくだらない日本語のダジャレを
                        コンテンツにしました。
                        <br />
                        <br />
                        インターネット文化と日本食の言葉を
                        組み合わせることで、
                        覚えやすく、シェアしたくなるような
                        コンテンツを目指しました。
                      </p>

                      <br />
                      <br />

                      <p>
                        もう一つ反応が良かったのが、
                        「しりとり」を本気のバトルのように
                        演出したReelです。
                      </p>

                      <ul>
                        <li>
                          1本のReelで
                          <strong>2,019回再生</strong>
                          （95.7%が非フォロワー）
                        </li>

                        <li>
                          合計
                          <strong>122件のインタラクション</strong>
                        </li>

                        <li>
                          <strong>
                            80いいね・29シェア・9保存
                          </strong>
                        </li>

                        <li>
                          合計視聴時間
                          <strong>6時間17分</strong>
                        </li>

                        <li>
                          最大の流入元：
                          <strong>Reelsタブ 70.2%</strong>
                        </li>
                      </ul>

                      <p>
                        この結果から、日本文化と
                        インターネット上のユーモアを
                        組み合わせたショート動画は、
                        日本語を積極的に勉強していない
                        ユーザーにも届きやすいことが分かりました。
                      </p>

                      <div className="image-wrapper">
                        <img
                          src={image2}
                          alt="しりとり動画のInstagramインサイト"
                        />
                      </div>

                      <p>
                        このReelでは、日本語の言葉遊び
                        「しりとり」を、
                        緊迫したバトルシーンのように演出しました。
                        <br />
                        <br />
                        シンプルな言葉遊びに
                        大げさでドラマチックな映像表現を
                        組み合わせることで、
                        思わず見たくなる楽しいコンテンツにしました。
                      </p>
                    </>
                  )}

                  <br />

                  <div className="text-center">
                    <div id="instagram"></div>

                    <a
                      href="https://www.instagram.com/atarashiivancouver/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="colorful-button"
                    >
                      <span className="button_top">
                        {language === 'en'
                          ? 'Visit our Instagram'
                          : 'Instagramを見る'}
                      </span>
                    </a>
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
          </>
        )}
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}

export default JapaneseInstagramProject;