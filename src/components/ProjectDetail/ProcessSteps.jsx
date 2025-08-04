import SlideCard from '../../components/ProjectDetail/SlideCard';
import '../ProjectDetail/ProcessSteps.css';

function ProcessSteps({ steps, slideData }) {
  const hasSlides = slideData && slideData.length > 0;

  return (
    <div className="process-card-wrapper">
      <div className="process-text">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div className="phase-label-line">
              <span className="phase-label">{`Phase0${index + 1}`}</span>
              <div className="dotted-line"></div>
            </div>
            <p className="step-text">{step}</p>
          </div>
        ))}
      </div>

      {hasSlides && (
        <div className="process-image-below">
          <SlideCard slideData={slideData} />
        </div>
      )}
    </div>
  );
}

export default ProcessSteps;
