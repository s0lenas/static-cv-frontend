import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Home } from './components/Home';
import Footer from './components/Footer';

function App() {
  const [visitorCount, setvisitorCount] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    const postToAPI = async () => {
      console.log("Attempting to send a POST request");
      const apiURL = "https://keiru8niga.execute-api.eu-west-1.amazonaws.com/increment/saveToDB"

      try{
        const response = await fetch(apiURL, {
          method: 'POST',
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      
        const result = await response.json();
        console.log('Success:', result);

        if (result?.Attributes?.count !== undefined) {
          setvisitorCount(result.Attributes.count);
        } else {
          console.warn('Unexpected response structure: ', result);
        }
      
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    if (!hasFetched.current){
      hasFetched.current = true;
      postToAPI();
    }
  }, []);

  return (
    <div>
          <NavigationBar visitorCount={visitorCount} />
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
