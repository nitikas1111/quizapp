import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../style/Play.css';
import questionData from '../question.json';
import isEmpty from '../utils/is-empty';
import classnames from 'classnames';

const Play = () => {
    const [state, setState] = useState({
        question: questionData,
        currentQuestion: null,
        nextQuestion: null,
        previousQuestion: null,
        numberOfQuestions: questionData.length,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        nextButtonDisabled: false,
        previousButtonDisabled: true,
        timeRemaining: {}
    });

    const navigate = useNavigate();
    let interval = null;

    useEffect(() => {
        displayQuestions();
        setTimer();
        handleDisableButton();
        return () => clearInterval(interval);
    }, [state.currentQuestionIndex]);

    const displayQuestions = () => {
        const { currentQuestionIndex, question } = state;
        if (!isEmpty(question) && currentQuestionIndex < state.numberOfQuestions) {
            const currentQuestion = question[currentQuestionIndex];
            const nextQuestion = question[currentQuestionIndex + 1];
            const previousQuestion = question[currentQuestionIndex - 1];
            const answer = currentQuestion ? currentQuestion.answer : '';
            setState(prevState => ({
                ...prevState,
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            }));
        } else {
            endGame();
        }
    };

    const handleOptionClick = (e) => {
        const selectedAnswer = e.target.innerHTML;
        const { answer } = state;

        if (selectedAnswer && answer && selectedAnswer.toLowerCase() === answer.toLowerCase()) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    };

    const handleNextButtonClick = () => {
        if (state.nextQuestion !== null) {
            setState(prevState => ({
                ...prevState,
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }));
        }
    };

    const handlePreviousButtonClick = () => {
        if (state.previousQuestion !== null) {
            setState(prevState => ({
                ...prevState,
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }));
        }
    };

    const handleQuitButtonClick = () => {
        if (window.confirm("Are you sure you want to quit?")) {
            navigate('/');
        }
    };

    const handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'nextbttn':
                handleNextButtonClick();
                break;
            case 'prevbttn':
                handlePreviousButtonClick();
                break;
            case 'quitbttn':
                handleQuitButtonClick();
                break;
            default:
                break;
        }
    };

    const correctAnswer = () => {
        setState(prevState => ({
            ...prevState,
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (state.currentQuestionIndex >= state.numberOfQuestions) {
                endGame();
            }
        });
    };

    const wrongAnswer = () => {
        setState(prevState => ({
            ...prevState,
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (state.currentQuestionIndex >= state.numberOfQuestions) {
                endGame();
            }
        });
    };

    const setTimer = () => {
        const countDownTime = Date.now() + 60000;
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setState(prevState => ({
                    ...prevState,
                    timeRemaining: {
                        minutes: 0,
                        seconds: 0
                    }
                }), () => {
                    endGame();
                });
            } else {
                setState(prevState => ({
                    ...prevState,
                    timeRemaining: {
                        minutes,
                        seconds
                    }
                }));
            }
        }, 1000);
    };

    const handleDisableButton = () => {
        setState(prevState => ({
            ...prevState,
            previousButtonDisabled: prevState.previousQuestion === null || prevState.currentQuestionIndex === 0,
            nextButtonDisabled: prevState.nextQuestion === null || prevState.currentQuestionIndex + 1 === prevState.numberOfQuestions
        }));
    };

    const endGame = () => {
        alert('Quiz has ended');
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
        };
        console.log(playerStats);
        setTimeout(() => {
            navigate('/quiz/summary', { state: playerStats });
        }, 1000);
    };

    const { currentQuestion, currentQuestionIndex, numberOfQuestions, timeRemaining, previousButtonDisabled, nextButtonDisabled } = state;

    return (
        <>
            <Helmet>
                <title>Quiz Page</title>
            </Helmet>
            <div className="quiz-container">
                <div className="progress-bar">
                    {currentQuestionIndex + 1} of {numberOfQuestions}
                </div>
                <div className="timer">
                    {timeRemaining.minutes}:{timeRemaining.seconds}
                </div>
                <div className="question">
                    {currentQuestion ? (
                        <h4>{currentQuestion.question}</h4>
                    ) : (
                        <h4>No question available</h4>
                    )}
                </div>
                <div className="option-container">
                    {currentQuestion && (
                        <>
                            <p onClick={handleOptionClick} className="option">{currentQuestion.optionA}</p>
                            <p onClick={handleOptionClick} className="option">{currentQuestion.optionB}</p>
                            <p onClick={handleOptionClick} className="option">{currentQuestion.optionC}</p>
                            <p onClick={handleOptionClick} className="option">{currentQuestion.optionD}</p>
                        </>
                    )}
                </div>
                <div className="navigation-buttons">
                    <button id="prevbttn" onClick={handleButtonClick} className={classnames('nav-button', 'previous-button', { active: !previousButtonDisabled })}>Previous</button>
                    <button id="nextbttn" onClick={handleButtonClick} className={classnames('nav-button', 'next-button', { done: nextButtonDisabled })}>Next</button>
                    <button id="quitbttn" onClick={handleButtonClick} className="nav-button quit-button">Quit</button>
                </div>
            </div>
        </>
    );
};

export default Play;
