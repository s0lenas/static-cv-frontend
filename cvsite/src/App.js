import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Home } from './components/Home';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const postToAPI = async () => {
      console.log("Attempting to send a POST request");
      const apiURL = "https://keiru8niga.execute-api.eu-west-1.amazonaws.com/increment/IncrementCount"

      try{
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'increment',
          }),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      
        const result = await response.json();
        console.log('Success:', result);
      
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    postToAPI();
  }, []);

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
