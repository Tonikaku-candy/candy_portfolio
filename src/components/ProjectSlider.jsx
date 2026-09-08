import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import projectData from './ProjectSliderData';
import './ProjectSlider.css';
import { Link } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext.jsx';

function ProjectSlider() {
  const { language } = useLanguage();

  return (
    <div className="project-slider">
      <Splide
        options={{
          type: 'loop',
          perPage: 3,
          focus: 'center',
          gap: '2rem',
          arrows: true,
          pagination: true,
          breakpoints: {
            768: {
              perPage: 1,
            },
          },
        }}
      >
        {projectData.map((project) => (
          <SplideSlide key={project.id}>
            <Link to={project.link} className="slide-card-link">
              <div className="slide-card">
                <div
                  className="slide-card-content-bg"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />

                <div
                  className={`slide-text ${
                    language === 'ja' ? 'japanese-text' : ''
                  }`}
                >
                  <h3>{project.title[language]}</h3>

                  <p>{project.description[language]}</p>

                  <h4>{project.subtitle}</h4>
                </div>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default ProjectSlider;