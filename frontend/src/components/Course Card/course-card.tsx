interface CardProps {
  title: string;
  lesson: string;
  status: number;
  image: string;
  onContinue?: () => void;   
}

function Card({ title, lesson, status, image, onContinue }: CardProps) {
  return (
    <div className="course-card">
      <div className="course-card-top">
        <div className="course-card-icon">
          <img src={image} alt="" />
        </div>
        <div className="course-info">
          <h3>{title}</h3>
          <p>Description: <span>{lesson}</span></p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span>Progress</span>
          <span className="status-text">{status}%</span>
        </div>
        <div className="course-progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${status}%` }}
          ></div>
        </div>
      </div>

      <button className="btn-course-continue" onClick={onContinue}>
        Continue Lesson
      </button>
    </div>
  );
}

export default Card;