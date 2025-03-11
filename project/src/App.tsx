import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLInput from './components/URLInput';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLInput />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;