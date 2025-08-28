import Footer from '../../components/Footer';
import './Playground.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// images
import heart from '../../assets/Playground/heart.png';

import React, { useState, useEffect, useRef } from 'react';
import playgroundProjects from './PlaygroundData';

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// AnimatedTitleコンポーネントを統合
const AnimatedTitle = ({ text, trigger, className }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && trigger.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      // 初期状態を透明に
      gsap.set(chars, { y: 40, opacity: 0 });

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [trigger]);

  return (
    <div ref={titleRef} className={className}>
      <h2>
        {text.split('').map((char, i) => (
          <span key={i} className="char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

const categories = ['ALL', 'MOTION', 'GRAPHIC', 'FASHION', 'WEB'];

export default function Playground() {
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
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    // ← レイアウト変わった時に再計算
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

              {/* AnimatedTitleコンポーネントを適用 */}
              <AnimatedTitle
                text="PLAYGROUND"
                trigger={playgroundTitleTriggerRef}
                className="subtitles playground"
              />
            </div>
          </div>

          <p className="playground-intro">
            A collection of experimental and personal works — class assignments,
            practice, and fun projects that show my process of learning and
            exploring new ideas.
          </p>

          <p className="dot"></p>

          {/* カテゴリボタン */}
          <div className="section-center-play" ref={sectionCenterRef}>
            {categories.map((cat, index) => (
              <span
                key={index}
                className={
                  active === cat.toUpperCase() ||
                  (cat === 'All' && active === 'ALL')
                    ? 'active-tag'
                    : ''
                }
                onClick={() =>
                  setActive(cat === 'All' ? 'ALL' : cat.toUpperCase())
                }
                style={{ cursor: 'pointer', margin: '0 8px' }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* プロジェクト表示（交互レイアウト） */}
          <div className="project-list">
            {filtered.map((p) => (
              <React.Fragment key={p.id}>
                <div className={`project-block ${p.layout}`}>
                  {/* 本体 */}
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

                  <div className="text">
                    {p.id === 1 && (
                      <>
                        <h3>
                          <span className="icon"></span>Tim Hortons Ad – Motion
                          Graphics
                        </h3>
                        <p>
                          A motion graphics ad created in After Effects.
                          Conceptual short video made as personal practice.
                        </p>
                      </>
                    )}

                    {p.id === 2 && (
                      <>
                        <h3>Yaizu Harazaki Orthodontic – Logo Design</h3>
                        <p>
                          A logo design created for a friend’s orthodontic
                          clinic concept near the sea. The design features a
                          tooth with braces inside a seashell, with bubbles and
                          soft blue tones to evoke a coastal feeling. At my
                          friend’s request for something “cute and blue,” I
                          created a friendly and approachable identity with a
                          clean and trustworthy look.
                        </p>
                      </>
                    )}

                    {p.id === 3 && (
                      <>
                        <h3>
                          Boku wa Kuma(I am a bear) – Music Video (Motion
                          Graphics Practice)
                        </h3>
                        <p>
                          A self-initiated music video project created in Adobe
                          After Effects, based on the song Boku wa Kuma (I am a
                          Bear) by Hikaru Utada. The visuals were illustrated in
                          a hand-drawn style and kept intentionally simple,
                          inspired by the warm and playful atmosphere of
                          children’s television programs.
                        </p>
                      </>
                    )}

                    {p.id === 11 && (
                      <>
                        <h3>Tote Bag Design</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          A tote bag featuring an original pixel art
                          illustration of bunnies, UFO puddings, and pastel
                          cosmic motifs. Playful, kawaii, and inspired by
                          Harajuku fashion.
                        </p>
                      </>
                    )}

                    {p.id === 4 && (
                      <>
                        <h3>Holiday Battle Card – Card Game Design</h3>
                        <p>
                          A card game concept created in Adobe Illustrator for a
                          class project. Players draw “holiday cards” based on
                          random prompts and compete by debating which card best
                          matches the given theme. Each card includes playful
                          illustrations, humorous titles, and rating stats
                          (Relax, Fun, Fatigue, Productivity), creating a mix of
                          strategy and comedy.
                        </p>
                      </>
                    )}

                    {p.id === 5 && (
                      <>
                        <h3>Phone Case Design</h3>
                        <p>
                          A custom phone case design created in Adobe
                          Illustrator, featuring original illustrations of
                          myself and my pet. I not only designed the artwork but
                          also printed it on an actual case, which I now use
                          personally. This project highlights both illustration
                          and product design skills, turning personal creativity
                          into a practical, everyday item.
                        </p>
                      </>
                    )}

                    {p.id === 6 && (
                      <>
                        <h3>Konbiniya Storefront Poster</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          A storefront poster created for{' '}
                          <a
                            href="https://konbiniya.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Konbiniya
                          </a>
                          , a Japanese convenience store, as part of a school
                          assignment. I redesigned the logo and developed a
                          promotional poster highlighting popular Japanese
                          snacks and drinks. Inspired by the actual store
                          entrance, which resembles a character’s face, I
                          incorporated that playful element into the design to
                          connect the poster with the store’s unique identity.
                        </p>
                      </>
                    )}

                    {p.id === 7 && (
                      <>
                        <h3>Parallax Motion Graphics</h3>
                        <p>
                          My first After Effects project using the parallax
                          effect, created in class with the concept of studying
                          abroad at BCIT.
                        </p>
                      </>
                    )}

                    {p.id === 8 && (
                      <>
                        <h3>Katz Alley – Bowling Alley Logo Design</h3>
                        <p>
                          A logo design created in Adobe Illustrator for a class
                          assignment. The concept reimagines a bowling alley
                          brand called “Katz Alley,” using pastel colors and
                          playful typography to create a fun, welcoming
                          identity. The colorful bowling pins and gradient logo
                          lettering emphasize a cheerful, family-friendly
                          atmosphere.
                        </p>
                      </>
                    )}
                    {p.id === 12 && (
                      <>
                        <h3>Kimono-Inspired Handmade Fashion</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          A fashion school project where I designed and handmade
                          garments with kimono-inspired sleeves, layered skirts,
                          and obi belt details. Patterns were drafted from
                          scratch to highlight creativity in both design and
                          construction.
                        </p>
                      </>
                    )}

                    {p.id === 9 && (
                      <>
                        <h3>Fruity Parade – Online Fruit Shop App Design</h3>
                        <p>
                          An online fruit shop app design created in Adobe
                          Illustrator as a class project. The concept, “Fruity
                          Parade,” combines a playful shopping experience with a
                          unique “Fruit Roulette” feature, where customers can
                          spin the wheel for $5 to win a random fruit deal. The
                          design emphasizes a pastel aesthetic, intuitive UI,
                          and the joyful experience of shopping for fresh fruits
                          online.
                        </p>
                      </>
                    )}

                    {p.id === 10 && (
                      <>
                        <h3>Kawaii Night Market – Tri-Fold Brochure Design</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          A tri-fold brochure created as a school assignment for
                          a conceptual “Kawaii Night Market.” The design
                          features a neon aesthetic inspired by retro night
                          markets, with vibrant colors on a dark background to
                          create a playful, eye-catching look. The brochure
                          includes a detailed vendor map, event highlights, and
                          a QR code to follow the event online.
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
