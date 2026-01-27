import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Review from './pages/Review';
import PageTracker from './components/PageTracker';

function App() {
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;