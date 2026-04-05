// Dashboard.tsx
import './Dashboard.css';

function Dashboard() {
  return (
    <section className="dashboard-courses-area" id="dashboard">
      <div className="dashboard-courses-header">
        <h2>Recommended Courses by AcelAI Tutor</h2>
        <a href="#view-all" className="view-all-link">View All Path</a>
      </div>

      <div className="courses-grid">
        {/* Course Card 1 */}
        <div className="course-card card-purple-border">
          <div className="course-card-icon math-icon"></div>
          <h3>Matematika Diskret</h3>
          <p>Materi hari ini: Logika Predikat.</p>
          <div className="course-progress-bar">
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <span className="course-status">45% Completed</span>
          <button className="btn-course-continue">Continue Lesson</button>
        </div>

        {/* Course Card 2 */}
        <div className="course-card card-teal-border">
          <div className="course-card-icon physics-icon"></div>
          <h3>Kalkulus</h3>
          <p>Materi hari ini: Dualitas Gelombang-Partikel.</p>
          <div className="course-progress-bar">
            <div className="progress-fill teal-fill" style={{ width: '82%' }}></div>
          </div>
          <span className="course-status">82% Completed</span>
          <button className="btn-course-continue">Continue Lesson</button>
        </div>

        {/* Course Card 3 */}
        <div className="course-card card-amber-border">
          <div className="course-card-icon programming-icon"></div>
          <h3>Modern React (Hooks)</h3>
          <p>Materi hari ini: useState & useEffect.</p>
          <div className="course-progress-bar">
            <div className="progress-fill amber-fill" style={{ width: '15%' }}></div>
          </div>
          <span className="course-status">15% Completed</span>
          <button className="btn-course-continue">Continue Lesson</button>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;