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

  const handleLogOut = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/');
  };

  // Dashboard.tsx (tambahkan di dalam komponen)
  const handleContinue = async (courseId: string) => {
    try {
      // Ambil daftar module berdasarkan courseId
      const modulesRes = await api.get(`/api/learning/${courseId}/modules`);
      const modules = modulesRes.data;

      if (!modules || modules.length === 0) {
        alert('Belum ada modul untuk course ini.');
        return;
      }

      // Ambil module pertama (diurutkan berdasarkan field 'order' dari backend)
      const firstModule = modules[0];
      // Navigasi ke halaman module
      navigate(`/module/${firstModule.id}`);
    } catch (error) {
      console.error('Gagal mengambil module:', error);
      alert('Gagal memuat modul. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--text-dim)' }}>Loading dashboard</h2>
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
            Learning is fun with AI
          </h1>
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
              status={0}
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