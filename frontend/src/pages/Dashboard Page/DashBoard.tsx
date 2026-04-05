// Dashboard.tsx
import './Dashboard.css';
import '../../components/Course Card/course-card';

function Dashboard() {
  return (
    <section className="dashboard-courses-area" id="dashboard">
      <div className="dashboard-courses-header">
        <h2>Recommended Courses by AcelAI Tutor</h2>
        <a href="#view-all" className="view-all-link">View All Path</a>
      </div>

      <div className="courses-grid">
        {/* <Card title='matematika' lesson='matematika' status='50'></Card> */}
      </div>
    </section>
  )
}

export default Dashboard;