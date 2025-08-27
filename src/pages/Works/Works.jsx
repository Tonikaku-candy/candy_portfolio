import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagBar from '../../components/TagBar';
import Footer from '../../components/Footer';
import projects from '../../data/ProjectData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../../components/TagBar.css';
import './Works.css';

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// AnimatedTitleコンポーネントを統合
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

// images
import eyeIcon from '../../assets/home/featured-projects/eye.png';

// scrolling tab bar
const baseTags = [
  'CONTENT CREATION',
  'FASHION',
  'MOTION GRAPHICS',
  'GRAPHIC DESIGN',
  'BRANDING',
  'SOCIAL MEDIA',
  'MARKETING',
];

const tags = [...baseTags, ...baseTags, ...baseTags]; // タグを繰り返し表示（スクロール用など）

function Works() {
  const [selectedTag, setSelectedTag] = useState('');
  const allProjectsTitleTriggerRef = useRef(null);
  const projectsGridRef = useRef(null);
  const sectionCenterRef = useRef(null);

  // 新しいuseEffectフックを追加してセクションのフェードインを管理

  // プロジェクトグリッドのフェードインアニメーション
  useEffect(() => {
    if (projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll('.project-card');

      cards.forEach((card, i) => {
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
                <img
                  src={eyeIcon}
                  className="all-projects-title-image"
                  alt="eye icon"
                />
              </div>
              {/* AnimatedTitleコンポーネントを適用 */}
              <AnimatedTitle
                text="ALL PROJECTS"
                trigger={allProjectsTitleTriggerRef}
                className="subtitles all-projects"
              />
            </div>
          </div>

          {/* カテゴリーフィルター */}
          <div className="section-center" ref={sectionCenterRef}>
            {[
              'All',
              'Content Creation',
              'Motion Graphics',
              'Graphic Design',
              'Branding',
            ].map((tag, index) => (
              <span
                key={index}
                className={
                  selectedTag === tag || (tag === 'All' && selectedTag === '')
                    ? 'active-tag'
                    : ''
                }
                onClick={() => setSelectedTag(tag === 'All' ? '' : tag)}
                style={{ cursor: 'pointer', margin: '0 8px' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* プロジェクトカード表示 */}
          <div className="projects-grid" ref={projectsGridRef}>
            {projects
              .filter(
                (project) =>
                  !selectedTag ||
                  project.category.some(
                    (cat) => cat.toLowerCase() === selectedTag.toLowerCase()
                  )
              )
              .map((project, index) => (
                <Link
                  to={project.link}
                  key={index}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="project-card">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                    <div className="project-info">
                      <h3 className="project-title">{project.title}</h3>
                      <ul className="project-description">
                        {project.description.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
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
