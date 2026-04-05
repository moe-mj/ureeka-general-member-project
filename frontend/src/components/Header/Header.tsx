import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css'; 

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Your Logo</h1>
      </div>
      <nav>
        {user ? (
          <div className="user-info">
            <span className="user-name">Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
            <button onClick={() => navigate('/register')} className="register-btn">Sign Up</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;