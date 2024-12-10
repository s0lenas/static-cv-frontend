import './App.css';
import { Route, Routes } from "react-router-dom";
import NavigationBar from './NavigationBar';
import { About } from './About';
import { Skills } from './Skills';
import { Experience } from './Experience';
import { Home } from './Home';

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
    </div>
  );
}

export default App;
