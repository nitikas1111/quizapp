import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import QuizInstructions from './component/QuizInstructions';
import Play from './component/Play';
import QuizSummary from './component/QuizSummary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/instructions" element={<QuizInstructions />} />
        <Route path="/quiz/play" element={<Play />} /> {/* Correct path */}
        <Route path="/quiz/summary" element={<QuizSummary/>}/>
      </Routes>
    </Router>
  );
}

export default App;
