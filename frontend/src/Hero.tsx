import './Hero.css';

function Hero() {
  return (
    <section className="hero-edu-container">
      <div className="hero-edu-grid">
        <div className="hero-edu-text">
          <span className="badge-ai">🤖 AI-Personalized</span>
          <h1>Welcome Back,<br/><span>Mojo Acel</span>!</h1>
          <p>AI Tutor Anda telah menyiapkan kurikulum Matematika Diskret hari ini. Siap untuk melompat ke tantangan berikutnya?</p>
          <div className="hero-edu-actions">
            <button className="btn-start-learning">Continue Learning</button>
            <button className="btn-view-path">View Path</button>
          </div>
        </div>
        <div className="hero-edu-graphic-placeholder">
          <div className="ai-brain-icon"></div>
        </div>
      </div>
    </section>
  )
}
export default Hero;