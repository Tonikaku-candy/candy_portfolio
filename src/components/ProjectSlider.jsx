import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import projectData from './ProjectSliderData';
import './ProjectSlider.css';
import { Link } from 'react-router-dom';

function ProjectSlider() {
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
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* <img src={project.image} alt={project.title} /> */}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <h4>{project.subtitle}</h4>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default ProjectSlider;
