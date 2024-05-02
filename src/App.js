import React from 'react';
import './App.css';
import Home from './components/Home';
import APOD from './components/APOD'; // Import the Apod component
import Mars from './components/Mars'
import Earth from './components/Earth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Change here

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes */}
        <Routes> {/* Change here */}
          <Route path="/" exact element={<Home />} /> 
          <Route path="/apod" element={<APOD />} /> 
          <Route path="/mars" element={<Mars />} />
          <Route path="/earth" element={<Earth />} />
        </Routes> {/* Change here */}
      </div>
    </Router>
  );
}

export default App;
