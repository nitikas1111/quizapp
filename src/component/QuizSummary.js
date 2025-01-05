import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../style/QuizSummary.css'; 
import { Helmet } from 'react-helmet';

const QuizSummary = () => {
    const location = useLocation();
    const { state } = location;

    if (!state) {
        return <div className="summary-box">No data available</div>;
    }

    const { score, numberOfQuestions, numberOfAnsweredQuestions, correctAnswers, wrongAnswers } = state;

    // Calculate the percentage
    const percentage = (score / numberOfQuestions) * 100;

    // Determine the remark
    let remark = '';
    if (percentage <= 30) {
        remark = 'You need more practice';
    } else if (percentage > 30 && percentage <= 50) {
        remark = 'Better luck next time';
    } else if (percentage > 50 && percentage <= 70) {
        remark = 'You can do better';
    } else if (percentage > 70 && percentage <= 85) {
        remark = 'You did great';
    } else if (percentage > 85) {
        remark = 'You are a genius';
    }

    return (
        <>
            <Helmet>
                <title>Quiz Result</title>
            </Helmet>
            <div className="summary-box">
                <h1>Quiz Result</h1>
                <p><strong>Score:</strong> {score}</p>
                <p><strong>Total Questions:</strong> {numberOfQuestions}</p>
                <p><strong>Questions Answered:</strong> {numberOfAnsweredQuestions}</p>
                <p><strong>Correct Answers:</strong> {correctAnswers}</p>
                <p><strong>Wrong Answers:</strong> {wrongAnswers}</p>
                <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
                <p className="remark"><strong>Remark:</strong> {remark}</p>

                <div className="navigation-links">
                    <ul>
                        <li><Link to="/">Back to Home</Link></li>
                        <li><Link to="/quiz/play">Play Again</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default QuizSummary;
