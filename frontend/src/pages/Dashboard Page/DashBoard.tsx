// Dashboard.tsx
import './Dashboard.css';
import '../../components/Course Card/course-card';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  }
  return (
    <section className="dashboard-courses-area" id="dashboard">
      <div className="dashboard-courses-header">
        <h2>Recommended Courses by AcelAI Tutor</h2>
        <a href="#view-all" className="view-all-link">View All Path</a>
      </div>

      <div className="courses-grid">
        {/* <Card title='matematika' lesson='matematika' status='50'></Card> */}
      </div>
      <button onClick={handleLogOut}>logout</button>
    </section>
  )
}

export default Dashboard;