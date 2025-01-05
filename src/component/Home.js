import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../style/Home.css'; 
import logo from '../logo.png'; 

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quiz App - Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div className="logo">
            <img src={logo} alt="Logo" /> 
          </div>
          <div>
            <h1>React Quiz</h1>
          </div>
          <div className="play-button">
            <ul>
              <li><Link to="/quiz/instructions">Play</Link></li>
            </ul>
          </div>
          <div className="auth-button">
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
