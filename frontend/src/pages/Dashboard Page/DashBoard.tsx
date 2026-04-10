import './Dashboard.css';
import Card from '../../components/Course Card/course-card';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressPercent, setProgressPercent] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, coursesRes] = await Promise.all([
          api.get<User>('/api/auth/user'),
          api.get<Course[]>('/api/learning'),
        ]);

        setUser(userRes.data);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to load data, login again');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          logout();
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [logout, navigate]);

  useEffect(() => {
    const fetchProgressForCourses = async () => {
      if (courses.length === 0) {
        return;
      }
      const progressMap: Record<string, number> = {};

      const promises = courses.map(async (course) => {
        try {
          const modulesRes = await api.get(`/api/learning/${course.id}/modules`);
          const modules = modulesRes.data;
          const totalModules = modules.length;
          if (totalModules === 0) {
            progressMap[course.id] = 0;
            return;
          }   

          const progressRes = await api.get(`/api/progress/course/${course.id}`);
          const completedModules = progressRes.data.filter((p: any) => p.isCompleted).length;
          const percent = Math.round((completedModules / totalModules) * 100);
          progressMap[course.id] = percent;
        } catch (err) {
          console.error(`Error fetching progress for course ${course.id}`, err);
          progressMap[course.id] = 0;
        }
      });

      await Promise.all(promises);
      setProgressPercent(progressMap);
    };

    fetchProgressForCourses();
  }, [courses]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/');
  };

  const handleContinue = async (courseId: string) => {
    try {
      const modulesRes = await api.get(`/api/learning/${courseId}/modules`);
      const modules = modulesRes.data;

      if (!modules || modules.length === 0) {
        alert('Belum ada modul untuk course ini.');
        return;
      }

      const firstModule = modules[0];
      navigate(`/module/${firstModule.id}`);
    } catch (error) {
      console.error('Gagal mengambil module:', error);
      alert('Gagal memuat modul. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--text-dim)', fontFamily: "Bitcount Grid Double"}}>Loading Dashboard..</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <h2 style={{ color: '#ef4444' }}>{error}</h2>
        <button onClick={handleLogOut} className="logout-btn">
          Kembali ke Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            Hai, {user?.name}! <br />
          </h1>
          <h2 id = "mokonz">
            Learning is fun with AI
          </h2>
          <p className="subtitle">
            Keep up the great work! Here is your progress.
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogOut}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="courses-grid">
          {courses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              lesson={course.description}
              status={progressPercent[course.id] ?? 0}
              image={`https://placehold.co/48x48/8b5cf6/white?text=${course.title.charAt(0)}`}
              onContinue={() => handleContinue(course.id)}
            />
          ))}
        </div>

        <footer className="dashboard-footer">
          <Link to="/startcd" className="view-all-link">View All Learning Paths</Link>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;