import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagBar from '../../components/TagBar';
import Footer from '../../components/Footer';
import projects from '../../data/ProjectData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// language
import { useLanguage } from '../../components/context/LanguageContext.jsx';

import '../../components/TagBar.css';
import './Works.css';

// icon
import EyeIcon from '../../components/EyeIcon';

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// AnimatedTitleコンポーネント
const AnimatedTitle = ({ text, trigger, className }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && trigger.current) {
      const chars = titleRef.current.querySelectorAll('.char');

      gsap.fromTo(
        chars,
        { y: 40, opacity: 0 },
        {
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
        }
      );
    }
  }, [trigger, text]);

  return (
    <div ref={titleRef} className={className}>
      <h2>
        {text.split('').map((char, i) => (
          <span key={`${text}-${i}`} className="char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

// scrolling tab bar
const baseTags = [
  'CONTENT CREATION',
  'FASHION',
  'MOTION GRAPHICS',
  'GRAPHIC DESIGN',
  'BRANDING',
  'SOCIAL MEDIA',
  'MARKETING',
  'WEB DEVELOPMENT',
  'UI / UX',
];

const tags = [...baseTags, ...baseTags, ...baseTags];

function Works() {
  const { language } = useLanguage();

  const [selectedTag, setSelectedTag] = useState('');

  const allProjectsTitleTriggerRef = useRef(null);
  const projectsGridRef = useRef(null);
  const sectionCenterRef = useRef(null);

  // フィルター表示用
  // valueはProjectDataのcategoryと照合する英語名
  const filterTags = [
    {
      value: '',
      en: 'All',
      ja: 'すべて',
    },
    {
      value: 'Content Creation',
      en: 'Content Creation',
      ja: 'コンテンツ制作',
    },
    {
      value: 'Motion Graphics',
      en: 'Motion Graphics',
      ja: 'モーショングラフィックス',
    },
    {
      value: 'Graphic Design',
      en: 'Graphic Design',
      ja: 'グラフィックデザイン',
    },
    {
      value: 'Branding',
      en: 'Branding',
      ja: 'ブランディング',
    },
    {
      value: 'Web Development',
      en: 'Web Development',
      ja: 'Web開発',
    },
  ];

  // プロジェクトグリッドのフェードインアニメーション
  useEffect(() => {
    if (projectsGridRef.current) {
      const cards =
        projectsGridRef.current.querySelectorAll('.project-card');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <div className="works">
        <div className="grid-overlay-works"></div>

        {/* タグバー */}
        <div className="work-section">
          <TagBar
            tags={tags}
            activeTag={selectedTag}
            onTagClick={setSelectedTag}
          />
        </div>

        {/* プロジェクト一覧セクション */}
        <section className="all-projects-section">
          <div
            className="all-projects-title-wrapper"
            ref={allProjectsTitleTriggerRef}
          >
            <div className="all-projects-title">
              <div className="all-projects-title-image-wrapper">
                <EyeIcon className="all-projects-title-image" />
              </div>

              <AnimatedTitle
                text={
                  language === 'en'
                    ? 'ALL PROJECTS'
                    : '制作実績'
                }
                trigger={allProjectsTitleTriggerRef}
                className={`subtitles all-projects ${
                  language === 'ja' ? 'japanese-text' : ''
                }`}
              />
            </div>
          </div>

          {/* カテゴリーフィルター */}
          <div
            className={`section-center ${
              language === 'ja' ? 'japanese-text' : ''
            }`}
            ref={sectionCenterRef}
          >
            {filterTags.map((tag) => (
              <span
                key={tag.value || 'all'}
                className={
                  selectedTag === tag.value
                    ? 'active-tag'
                    : ''
                }
                onClick={() => setSelectedTag(tag.value)}
                style={{
                  cursor: 'pointer',
                  margin: '0 8px',
                }}
              >
                {tag[language]}
              </span>
            ))}
          </div>

          {/* プロジェクトカード表示 */}
          <div
            className="projects-grid"
            ref={projectsGridRef}
          >
            {projects
              .filter(
                (project) =>
                  !selectedTag ||
                  project.category.some(
                    (cat) =>
                      cat.toLowerCase() ===
                      selectedTag.toLowerCase()
                  )
              )
              .map((project) => (
                <Link
                  to={project.link}
                  key={project.id}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div className="project-card">
                    <img
                      src={project.image}
                      alt={project.title[language]}
                      className="project-image"
                    />

                    <div
                      className={`project-info ${
                        language === 'ja'
                          ? 'japanese-text'
                          : ''
                      }`}
                    >
                      <h3 className="project-title">
                        {project.title[language]}
                      </h3>

                      <ul className="project-description">
                        {project.description[language].map(
                          (point, index) => (
                            <li key={index}>
                              {point}
                            </li>
                          )
                        )}
                      </ul>

                      {/* Categoryは英語のまま */}
                      <p className="project-tags">
                        {project.category.join(', ')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        <div className="diagonal-bottom-works"></div>
      </div>

      <Footer />
    </>
  );
}

export default Works;