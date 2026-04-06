import './Dashboard.css';
import Card from '../../components/Course Card/course-card';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_COURSES = [
  { id: 1, title: 'Matematika', lesson: 'Kalkulus', status: 65, image: 'https://thumbs.dreamstime.com/b/abstract-mathematic-logo-vector-icon-abstract-mathematic-logo-vector-icon-suitable-business-education-math-symbol-276165936.jpg' },
  { id: 2, title: 'Fisika', lesson: 'Termodinamika', status: 30,image: 'https://img.freepik.com/vektor-premium/web-logo-fisika-logo-objek-sekolah_627820-42.jpg'},
  { id: 3, title: 'Bahasa Inggris', lesson: 'Present Tense', status: 90,image: 'https://media.istockphoto.com/id/1306202376/id/vektor/logo-atau-ikon-vektor-dengan-big-ben-untuk-belajar-bahasa-inggris.jpg?s=1024x1024&w=is&k=20&c=Nyx7IXO0foF8LKcMHLE8eSUGCEj2Gwpv8M8BOydk9ZY='},
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
          <h1>Learning is fun with AI</h1>
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
              image={course.image}
            />
          ))}
        </div>

        <footer className="dashboard-footer">
          <Link to="/startcd">View All Learning Paths</Link>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;