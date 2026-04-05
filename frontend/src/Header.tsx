// Header.tsx
import './Header.css';

function Header() {
  return (
    <header className="fancy-header sticky-header">
      <div className="logo-area">
        {/* Logo teks sederhana namun modern */}
        <span className="logo-main">AcelEdu</span>
        <span className="logo-dot">.</span>
      </div>
      
      <nav className="nav-navigation">
        <a href="#dashboard" className="nav-item active">Dashboard</a>
        <a href="#courses" className="nav-item">My Courses</a>
        <a href="#ai-coach" className="nav-item">AI Coach</a>
        {/* Tombol Call to Action yang menonjol */}
        <button className="upgrade-btn">Upgrade Plan</button>
      </nav>
    </header>
  );
}

export default Header;