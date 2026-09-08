import Footer from '../../components/Footer';
import './Playground.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../components/context/LanguageContext.jsx';

// images
import heart from '../../assets/Playground/heart.png';

import React, { useState, useEffect, useRef } from 'react';
import playgroundProjects from './PlaygroundData';

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// AnimatedTitleコンポーネント
const AnimatedTitle = ({ text, trigger, className }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    let titleAnimation;

    if (titleRef.current && trigger.current) {
      const chars =
        titleRef.current.querySelectorAll('.char');

      gsap.set(chars, {
        y: 40,
        opacity: 0,
      });

      titleAnimation = gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',

        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    return () => {
      if (titleAnimation) {
        titleAnimation.scrollTrigger?.kill();
        titleAnimation.kill();
      }
    };
  }, [trigger, text]);

  return (
    <div
      ref={titleRef}
      className={className}
    >
      <h2>
        {text.split('').map((char, i) => (
          <span
            key={`${text}-${i}`}
            className="char"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

const categories = [
  { value: 'ALL', en: 'ALL', ja: 'すべて' },
  { value: 'MOTION', en: 'MOTION', ja: 'モーション' },
  { value: 'GRAPHIC', en: 'GRAPHIC', ja: 'グラフィック' },
  { value: 'FASHION', en: 'FASHION', ja: 'ファッション' },
  { value: 'WEB', en: 'WEB', ja: 'Web' },
];

export default function Playground() {
  const { language } = useLanguage();

  const [active, setActive] = useState('ALL');
  const playgroundTitleTriggerRef = useRef(null);
  const sectionCenterRef = useRef(null);

  const filtered =
    active === 'ALL'
      ? playgroundProjects
      : playgroundProjects.filter((p) => p.tags.includes(active));

  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => {
      if (
        t.vars?.trigger &&
        t.vars.trigger.classList?.contains('project-block')
      ) {
        t.kill();
      }
    });

    const blocks = gsap.utils.toArray('.project-block');

    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true,
          },
        },
      );
    });

    ScrollTrigger.refresh();
  }, [filtered]);

  return (
    <>
      <div className="playground">
        <div className="grid-overlay-play"></div>

        <div className="playground-section">
          <div
            className="playground-title-wrapper"
            ref={playgroundTitleTriggerRef}
          >
            <div className="playground-title">
              <div className="all-projects-title-image-wrapper">
                <img
                  src={heart}
                  className="playground-title-image"
                  alt="heart icon"
                />
              </div>

              <AnimatedTitle
                text={language === 'en' ? 'PLAYGROUND' : '実験室'}
                trigger={playgroundTitleTriggerRef}
                className={`subtitles playground ${
                  language === 'ja' ? 'japanese-text' : ''
                }`}
              />
            </div>
          </div>

          <p
            className={`playground-intro ${
              language === 'ja' ? 'japanese-text' : ''
            }`}
          >
            {language === 'en'
              ? 'A collection of experimental and personal works — class assignments, practice, and fun projects that show my process of learning and exploring new ideas.'
              : '新しい表現やスキルを試しながら制作した、実験作品や個人制作、練習作品、遊び心のあるアイデアを集めています。'}
          </p>

          <p className="dot"></p>

          {/* カテゴリボタン */}
          <div
            className={`section-center-play ${
              language === 'ja' ? 'japanese-text' : ''
            }`}
            ref={sectionCenterRef}
          >
            {categories.map((cat) => (
              <span
                key={cat.value}
                className={active === cat.value ? 'active-tag' : ''}
                onClick={() => setActive(cat.value)}
                style={{ cursor: 'pointer', margin: '0 8px' }}
              >
                {cat[language]}
              </span>
            ))}
          </div>

          {/* プロジェクト表示 */}
          <div className="project-list">
            {filtered.map((p) => (
              <React.Fragment key={p.id}>
                <div className={`project-block ${p.layout}`}>
                  {p.videoUrl ? (
                    <iframe
                      src={p.videoUrl}
                      title={`Project ${p.id}`}
                      className={`iframe-play ${
                        p.orientation === 'vertical' ? 'vertical' : ''
                      }`}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img
                      src={p.image}
                      alt={`Project ${p.id}`}
                      className={`playground-image ${p.size || ''}`}
                    />
                  )}

                  <div
                    className={`text ${
                      language === 'ja' ? 'japanese-text' : ''
                    }`}
                  >
                    {/* ID 20 */}
                    {p.id === 20 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Lyric Video Practice – Iris Out (Song by Kenshi Yonezu)'
                            : 'IRIS OUT – リリックビデオ'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'This is my first lyric video experiment. The song was composed for the Chainsaw Man movie, and I incorporated visual motifs inspired by its world and symbolism to build a dark, atmospheric style.'
                            : '初めて制作したリリックビデオ。映画「チェンソーマン」のために制作された楽曲の世界観やモチーフを取り入れ、ダークで印象的な映像表現に仕上げました。'}
                        </p>
                      </>
                    )}

                    {/* ID 22 */}
                    {p.id === 22 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Pulling My Logo Out of the Screen'
                            : '画面からロゴを取り出してみた'}
                        </h3>

                        {language === 'en' ? (
                          <p>
                            This animation plays with the idea of breaking the
                            fourth wall. I reach into the screen and pull my logo
                            out by hand, creating a playful moment that reflects
                            my love for humor and motion graphics.
                            <br />
                            <br />
                            To bring the concept even further into the real
                            world, I also made an actual chameleon necklace out
                            of perler beads based on my pixel logo. Turning my
                            digital mascot into a handmade physical item adds a
                            fun, personal touch to the project.
                          </p>
                        ) : (
                          <p>
                            画面の中に手を入れ、自分のロゴを引っ張り出すという
                            アイデアをモーションで表現。ユーモアと
                            モーショングラフィックスを組み合わせた
                            遊び心のある作品です。
                            <br />
                            <br />
                            さらにピクセルロゴをもとに、実際にアイロンビーズで
                            カメレオンのネックレスも制作。デジタルのロゴを
                            現実のアイテムにすることで、作品の世界をリアルに
                            広げました。
                          </p>
                        )}
                      </>
                    )}

                    {/* ID 24 */}
                    {p.id === 24 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Strange Flower Exhibition — Station Poster Design'
                            : '変な花展 — 駅貼りポスターデザイン'}
                        </h3>

                        {language === 'en' ? (
                          <p>
                            A fictional exhibition poster featuring unusual
                            flowers that exist in the real world. The concept
                            explores the strange and unexpected beauty found in
                            nature through dramatic photography, bold
                            typography, and a dark visual style.
                            <br />
                            <br />
                            Designed as a poster for display in train stations,
                            I organized the essential event information so
                            viewers can understand the exhibition at a glance
                            without relying on a QR code.
                          </p>
                        ) : (
                          <p>
                            実在する不思議な花をテーマにした架空の展覧会ポスター。
                            印象的な写真、大胆なタイポグラフィ、ダークな世界観で、
                            自然の中にある奇妙で意外な美しさを表現しました。
                            <br />
                            <br />
                            駅での掲出を想定し、QRコードに頼らなくても
                            一目で展覧会の情報が伝わるようレイアウトしています。
                          </p>
                        )}
                      </>
                    )}

                    {/* ID 25 */}
                    {p.id === 25 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Aesthetic Moments in Japan'
                            : '日本の美しい瞬間'}
                        </h3>

                        {language === 'en' ? (
                          <p>
                            An experimental short-form video created during my
                            internship at Pure Japan Moments.
                            <br />
                            <br />
                            While the account typically focused on informative
                            travel content, I was asked to explore a different
                            creative direction. I used the trending “The Next
                            Station Is” audio and fast-paced transitions between
                            scenes to keep viewers engaged while capturing the
                            atmosphere of Japan.
                            <br />
                            <br />
                            <a
                              href="https://www.instagram.com/pure.japan.moments/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Pure Japan Moments →
                            </a>
                          </p>
                        ) : (
                          <p>
                            Pure Japan Momentsでのインターン中に制作した
                            実験的なショート動画。
                            <br />
                            <br />
                            普段の情報中心の旅行コンテンツとは異なる表現として、
                            トレンド音源「The Next Station Is」と
                            テンポの速いトランジションを使用。
                            日本の雰囲気を伝えながら、視聴者を飽きさせない
                            映像を目指しました。
                            <br />
                            <br />
                            <a
                              href="https://www.instagram.com/pure.japan.moments/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Pure Japan Momentsを見る →
                            </a>
                          </p>
                        )}
                      </>
                    )}

                    {/* ID 21 */}
                    {p.id === 21 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'A Cute Animation About Me Ignoring Break Warnings'
                            : '休憩警告を無視する私'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'This animation shows what I’m like when I’m working in After Effects, completely focused. It was created using my original illustrations drawn in Adobe Illustrator. The story captures a humorous moment when a sudden “Take a break!” error pops up. In the end, the character must choose between Continue and End, and of course, she chooses Continue.'
                            : 'After Effectsでの作業に夢中になっている自分をテーマにしたアニメーション。Illustratorで描いたオリジナルイラストを使用しています。突然「休憩してください！」という警告が現れ、ContinueかEndを選ぶことに。もちろん最後に選ぶのはContinueです。'}
                        </p>
                      </>
                    )}

                    {/* ID 23 */}
                    {p.id === 23 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'ROOM 404 — Book Cover Design'
                            : 'ROOM 404 — ブックカバーデザイン'}
                        </h3>

                        {language === 'en' ? (
                          <p>
                            A fictional book cover inspired by error messages,
                            digital glitches, and the mysterious world behind
                            “404.”
                            <br />
                            <br />
                            I used distorted typography, code-inspired details,
                            and a dark visual style to create an unsettling,
                            tech-driven atmosphere. This project allowed me to
                            explore a visual direction outside of my usual
                            colorful and playful style.
                          </p>
                        ) : (
                          <p>
                            エラーメッセージやデジタルグリッチ、
                            「404」の向こう側にある謎の世界から着想を得た
                            架空のブックカバー。
                            <br />
                            <br />
                            歪んだタイポグラフィやコードを思わせるディテール、
                            ダークなビジュアルを使い、不穏でデジタルな
                            世界観を表現。普段のカラフルで遊び心のある
                            スタイルとは異なる表現に挑戦しました。
                          </p>
                        )}
                      </>
                    )}

                    {/* ID 17 */}
                    {p.id === 17 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Hot to Cold — Starbucks-style 3D Camera Motion'
                            : 'Hot to Cold — 3Dカメラモーション'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'I often burn my tongue on hot drinks, so I turned that moment into a motion piece. This project uses 3D camera tracking and a cylinder effect in After Effects to visualize temperature change. I also designed a logo in Illustrator that changes its expression based on temperature.'
                            : '熱い飲み物でよく舌をやけどする自分の体験をモーション作品にしました。After Effectsの3Dカメラとシリンダーエフェクトを使って温度の変化を表現。Illustratorでは、温度によって表情が変わるロゴもデザインしました。'}
                        </p>
                      </>
                    )}

                    {/* ID 16 */}
                    {p.id === 16 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Dutch Bunny Maker'
                            : 'ダッチうさぎメーカー'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'Dutch Bunny Maker is a game-style animation created using my original illustrations drawn in Adobe Illustrator. I designed all the character parts, UI elements, and pastel visuals to mimic a cute character-customizer game.'
                            : 'Illustratorで描いたオリジナルイラストを使った、キャラクターメーカー風アニメーション。うさぎのパーツやUI、パステルカラーのビジュアルをデザインし、かわいい着せ替えゲームのような世界観に仕上げました。'}
                        </p>
                      </>
                    )}

                    {/* ID 15 */}
                    {p.id === 15 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'How Does an Apple Grow? – Playful Motion Graphic Advertisement Practice'
                            : 'りんごはどうやって育つ？ — モーショングラフィックス'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A short motion graphic showing how an apple grows—from seed to fruit—turned into a playful iPhone-style ad.'
                            : '種からりんごが実るまでの成長過程を、iPhoneの広告風にアレンジした遊び心のあるモーショングラフィックス作品です。'}
                        </p>
                      </>
                    )}

                    {/* ID 14 */}
                    {p.id === 14 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Taste of Fall – Motion Graphic'
                            : 'Taste of Fall — 秋のモーショングラフィックス'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A motion graphics animation inspired by the warmth and coziness of autumn. This piece celebrates Japan’s “season of appetite” through playful motion, color, and rhythm.'
                            : '秋の暖かさや心地よさをイメージしたモーショングラフィックス。「食欲の秋」をテーマに、遊び心のある動きや色、リズムで秋らしさを表現しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 18 */}
                    {p.id === 18 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Costume Design'
                            : '衣装デザイン'}
                        </h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                          {language === 'en' ? (
                            <>
                              I custom-designed the pattern and sewed a
                              kimono-style costume for{' '}
                              <a
                                href="https://www.instagram.com/blueejoy/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Bluee Joy
                              </a>
                              , a Japanese drag queen based in Vancouver, BC
                            </>
                          ) : (
                            <>
                              バンクーバーを拠点に活動する日本人ドラァグクイーン{' '}
                              <a
                                href="https://www.instagram.com/blueejoy/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Bluee Joy
                              </a>
                              さんのために、着物風の衣装をデザイン。
                              パターン制作から縫製まで行いました。
                            </>
                          )}
                        </p>
                      </>
                    )}

                    {/* ID 13 */}
                    {p.id === 13 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Japanese Cream Soda – Motion Graphics'
                            : 'クリームソーダ — モーショングラフィックス'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A motion graphics animation created in After Effects, with a summer vibe. This project was also a practice in liquid animation.'
                            : '夏らしいクリームソーダをテーマにAfter Effectsで制作したモーショングラフィックス。液体アニメーションの練習も兼ねて制作しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 1 */}
                    {p.id === 1 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Tim Hortons Ad – Motion Graphics'
                            : 'Tim Hortons — モーション広告'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A motion graphics ad created in After Effects. Conceptual short video made as personal practice.'
                            : 'After Effectsで制作したTim Hortonsのコンセプト広告。個人練習として制作したショートモーショングラフィックスです。'}
                        </p>
                      </>
                    )}

                    {/* ID 2 */}
                    {p.id === 2 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Yaizu Harazaki Orthodontic – Logo Design'
                            : '焼津原崎矯正歯科 — ロゴデザイン'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A logo design created for a friend’s orthodontic clinic concept near the sea. The design features a tooth with braces inside a seashell, with bubbles and soft blue tones to evoke a coastal feeling. At my friend’s request for something “cute and blue,” I created a friendly and approachable identity with a clean and trustworthy look.'
                            : '海の近くにある矯正歯科を想定して制作したロゴデザイン。貝殻の中に矯正器具をつけた歯を配置し、泡や淡いブルーで海辺の雰囲気を表現しました。「かわいくて青いデザイン」というリクエストをもとに、親しみやすさと清潔感を意識しています。'}
                        </p>
                      </>
                    )}

                    {/* ID 3 */}
                    {p.id === 3 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Boku wa Kuma (I am a Bear) – Music Video (Motion Graphics Practice)'
                            : 'ぼくはくま — ミュージックビデオ'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A self-initiated music video project created in Adobe After Effects, based on the song Boku wa Kuma (I am a Bear) by Hikaru Utada. The visuals were illustrated in a hand-drawn style and kept intentionally simple, inspired by the warm and playful atmosphere of children’s television programs.'
                            : '宇多田ヒカルの「ぼくはくま」をもとに、After Effectsで自主制作したミュージックビデオ。子ども向け番組のような温かく遊び心のある雰囲気をイメージし、手描き風のシンプルなビジュアルで制作しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 19 */}
                    {p.id === 19 && (
                      <>
                        <h3>
                          <span className="icon"></span>
                          {language === 'en'
                            ? 'Dunkin’ Donuts Short Advertisement Video'
                            : 'Dunkin’ Donuts — ショート広告'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A short promotional video highlighting Dunkin’s cheerful brand image. Focused on morning energy, color harmony, and positive visual rhythm.'
                            : 'Dunkin’の明るく楽しいブランドイメージを表現したショート広告。朝のエネルギー感や色の組み合わせ、ポジティブな映像のリズムを意識して制作しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 11 */}
                    {p.id === 11 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Tote Bag Design'
                            : 'トートバッグデザイン'}
                        </h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                          {language === 'en'
                            ? 'A tote bag featuring an original pixel art illustration of bunnies, UFO puddings, and pastel cosmic motifs. Playful, kawaii, and inspired by Harajuku fashion.'
                            : 'うさぎ、UFOプリン、パステルカラーの宇宙モチーフをピクセルアートで描いたオリジナルトートバッグ。原宿ファッションから着想を得た、かわいく遊び心のあるデザインです。'}
                        </p>
                      </>
                    )}

                    {/* ID 4 */}
                    {p.id === 4 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Holiday Battle Card – Card Game Design'
                            : 'Holiday Battle Card — カードゲームデザイン'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A card game concept created in Adobe Illustrator for a class project. Players draw “holiday cards” based on random prompts and compete by debating which card best matches the given theme. Each card includes playful illustrations, humorous titles, and rating stats (Relax, Fun, Fatigue, Productivity), creating a mix of strategy and comedy.'
                            : '授業課題としてIllustratorで制作したカードゲーム。「休日」をテーマにしたカードを引き、お題に最も合うカードを議論して競うゲームです。ユーモアのあるタイトルやイラスト、Relax・Fun・Fatigue・Productivityのステータスを取り入れ、戦略と笑いを組み合わせました。'}
                        </p>
                      </>
                    )}

                    {/* ID 5 */}
                    {p.id === 5 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Phone Case Design'
                            : 'スマホケースデザイン'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A custom phone case design created in Adobe Illustrator, featuring original illustrations of myself and my pet. I not only designed the artwork but also printed it on an actual case, which I now use personally. This project highlights both illustration and product design skills, turning personal creativity into a practical, everyday item.'
                            : 'Illustratorで描いた自分とペットのオリジナルイラストを使ったスマホケース。デザインだけでなく実際にケースへプリントし、普段使いできるアイテムとして制作しました。イラストとプロダクトデザインを組み合わせた作品です。'}
                        </p>
                      </>
                    )}

                    {/* ID 6 */}
                    {p.id === 6 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Konbiniya Storefront Poster'
                            : 'Konbiniya — 店頭ポスターデザイン'}
                        </h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                          {language === 'en' ? (
                            <>
                              A storefront poster created for{' '}
                              <a
                                href="https://konbiniya.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Konbiniya
                              </a>
                              , a Japanese convenience store, as part of a
                              school assignment. I redesigned the logo and
                              developed a promotional poster highlighting
                              popular Japanese snacks and drinks. Inspired by
                              the actual store entrance, which resembles a
                              character’s face, I incorporated that playful
                              element into the design to connect the poster
                              with the store’s unique identity.
                            </>
                          ) : (
                            <>
                              授業課題として、日本の商品を扱う{' '}
                              <a
                                href="https://konbiniya.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Konbiniya
                              </a>
                              の店頭ポスターを制作。ロゴをリデザインし、
                              人気のお菓子や飲み物を紹介する
                              プロモーションポスターに仕上げました。
                              キャラクターの顔のように見える実際の店舗入口から
                              着想を得て、その特徴を遊び心のあるデザインとして
                              取り入れています。
                            </>
                          )}
                        </p>
                      </>
                    )}

                    {/* ID 7 */}
                    {p.id === 7 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Parallax Motion Graphics'
                            : 'パララックス・モーショングラフィックス'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'My first After Effects project using the parallax effect, created in class with the concept of studying abroad at BCIT.'
                            : 'BCITへの留学をテーマに、授業で初めて制作したAfter Effects作品。パララックス効果を使ったモーショングラフィックスです。'}
                        </p>
                      </>
                    )}

                    {/* ID 8 */}
                    {p.id === 8 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Katz Alley – Bowling Alley Logo Design'
                            : 'Katz Alley — ボウリング場ロゴデザイン'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'A logo design created in Adobe Illustrator for a class assignment. The concept reimagines a bowling alley brand called “Katz Alley,” using pastel colors and playful typography to create a fun, welcoming identity. The colorful bowling pins and gradient logo lettering emphasize a cheerful, family-friendly atmosphere.'
                            : '授業課題としてIllustratorで制作した架空のボウリング場「Katz Alley」のロゴ。パステルカラーや遊び心のあるタイポグラフィ、カラフルなボウリングピンを使い、明るく親しみやすい雰囲気を表現しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 12 */}
                    {p.id === 12 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Kimono-Inspired Handmade Fashion'
                            : '着物から着想を得たハンドメイドファッション'}
                        </h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                          {language === 'en'
                            ? 'A fashion school project where I designed and handmade garments with kimono-inspired sleeves, layered skirts, and obi belt details. Patterns were drafted from scratch to highlight creativity in both design and construction.'
                            : '服飾学校の課題として、着物風の袖やレイヤードスカート、帯のディテールを取り入れた衣装をデザイン・縫製。パターンも一から制作し、デザインから服作りまで行いました。'}
                        </p>
                      </>
                    )}

                    {/* ID 9 */}
                    {p.id === 9 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Fruity Parade – Online Fruit Shop App Design'
                            : 'Fruity Parade — フルーツショップアプリ'}
                        </h3>

                        <p>
                          {language === 'en'
                            ? 'An online fruit shop app design created in Adobe Illustrator as a class project. The concept, “Fruity Parade,” combines a playful shopping experience with a unique “Fruit Roulette” feature, where customers can spin the wheel for $5 to win a random fruit deal. The design emphasizes a pastel aesthetic, intuitive UI, and the joyful experience of shopping for fresh fruits online.'
                            : '授業課題としてIllustratorで制作したオンラインフルーツショップのアプリデザイン。「Fruity Parade」をテーマに、5ドルでルーレットを回してランダムなフルーツを購入できる「Fruit Roulette」機能を考案。パステルカラーと使いやすいUIで、楽しいショッピング体験を表現しました。'}
                        </p>
                      </>
                    )}

                    {/* ID 10 */}
                    {p.id === 10 && (
                      <>
                        <h3>
                          {language === 'en'
                            ? 'Kawaii Night Market – Tri-Fold Brochure Design'
                            : 'Kawaii Night Market — 三つ折りパンフレット'}
                        </h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                          {language === 'en'
                            ? 'A tri-fold brochure created as a school assignment for a conceptual “Kawaii Night Market.” The design features a neon aesthetic inspired by retro night markets, with vibrant colors on a dark background to create a playful, eye-catching look. The brochure includes a detailed vendor map, event highlights, and a QR code to follow the event online.'
                            : '授業課題として制作した架空の「Kawaii Night Market」の三つ折りパンフレット。レトロなナイトマーケットから着想を得たネオンカラーとダークな背景で、楽しく目を引くデザインに仕上げました。会場マップやイベント情報、SNSへアクセスできるQRコードも掲載しています。'}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <img
                  src={p.line}
                  className="line bottom"
                  alt="section divider"
                />
              </React.Fragment>
            ))}
          </div>

          <div className="diagonal-bottom-play"></div>
        </div>
      </div>

      <div className="footer-detail">
        <Footer />
      </div>
    </>
  );
}