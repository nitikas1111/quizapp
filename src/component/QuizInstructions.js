import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../style/QuizInstructions.css'; 

const QuizInstructions = () => {
  return (
    <>
      <Helmet>
        <title>Quiz Instructions - Quiz App</title>
      </Helmet>
      <div className="instructions">
        <h2>Game's Instructions</h2>
        <p>Read Carefully</p>
        <ul id="main-list">
          <li>Duration for quiz is 15 min.</li>
          <li>Each game has 15 questions.</li>
          <li>Each question has 4 options.</li>
        </ul>

        <div className="link-container">
          <span><Link to="/">No, take me back.</Link></span>
          <span><Link to="/quiz/play">Let's play.</Link></span>
        </div>
      </div>
    </>
  );
}

export default QuizInstructions;
