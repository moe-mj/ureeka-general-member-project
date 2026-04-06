import React from 'react';
import './Dashboard.css';
import Card from '../../components/Course Card/course-card';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MOCK_COURSES = [
  { id: 1, title: 'Matematika', lesson: 'Aljabar Linear', status: 65 },
  { id: 2, title: 'Fisika', lesson: 'Termodinamika', status: 30 },
  { id: 3, title: 'Bahasa Inggris', lesson: 'Present Tense', status: 90 },
];

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Recommended Courses by AcelAI Tutor</h1>
          <p className="subtitle">Keep up the great work! Here is your progress.</p>
        </div>
        <button className="logout-btn" onClick={handleLogOut}>Logout</button>
      </header>

      <main className="dashboard-content">
        <div className="courses-grid">
          {MOCK_COURSES.map((course) => (
            <Card 
              key={course.id} 
              title={course.title} 
              lesson={course.lesson} 
              status={course.status} 
            />
          ))}
        </div>
        
        <footer className="dashboard-footer">
          <a href="#view-all" className="view-all-link">View All Learning Paths →</a>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;