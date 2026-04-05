
import Header from './Header'
import Hero from './Hero'
import DashBoard from './DashBoard'
import Footer from './Footer'
import './App.css'

function App() {
  return (
    // 'app-layout' adalah container utama yang mengatur posisi Header di atas, Dashboard di tengah, Footer di bawah.
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Hero />
        <DashBoard />
      </main>
      <Footer />
    </div>
  )
}

export default App