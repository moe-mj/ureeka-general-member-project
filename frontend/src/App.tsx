import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./Hero";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Hero />
        <Outlet />  
      </main>
      <Footer />
    </div>
  );
}

export default App;