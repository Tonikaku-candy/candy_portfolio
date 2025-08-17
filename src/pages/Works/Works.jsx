import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TagBar from '../../components/TagBar';
import Footer from '../../components/Footer';
import projects from '../../data/ProjectData';

import '../../components/TagBar.css';
import './Works.css';

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

  return (
    <>
      <div className="works">
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
          <div className="all-projects-title-wrapper">
            <div className="all-projects-title">
              <div className="all-projects-title-image-wrapper">
                <img
                  src={eyeIcon}
                  className="all-projects-title-image"
                  alt="eye icon"
                />
              </div>
              <div className="subtitles all-projects">
                <h2>ALL PROJECTS</h2>
              </div>
            </div>
          </div>

          {/* カテゴリーフィルター */}
          <div className="section-center">
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
          <div className="projects-grid">
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
      </div>

      <Footer />
    </>
  );
}

export default Works;
