import './App.css';
import { Route, Routes } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Home } from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div>
          <NavigationBar />
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="about" element={<About />}/>
            <Route path="experience" element={<Experience />}/>
            <Route path="skills" element={<Skills />}/>
          </Routes>
          <Footer />
    </div>
  );
}

export default App;
