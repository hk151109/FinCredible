import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="hero-section">
        <h1>About FinCredible</h1>
        <p>Empowering individuals with financial knowledge and tools to make informed investment decisions and achieve financial independence.</p>
      </header>
      
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Harikrishnan Gopal</h3>
            <p>Backend & Frontend Developer</p>
          </div>
          <div className="team-member">
            <h3>Aditya Raut</h3>
            <p>Frontend & Machine Learning Specialist</p>
          </div>
        </div>
      </section>
      
      <section className="project-description">
        <h2>Project Overview</h2>
        <p>Explore the core functionalities of FinCredible, designed to guide users on their financial journey with accurate insights and robust tools.</p>
        <ul className="page-descriptions">
          <li>
            <h3>News Page</h3>
            <p>Latest financial news and market updates from trusted sources to keep you informed.</p>
          </li>
          <li>
            <h3>For You News Page</h3>
            <p>A personalized news feed curated based on your preferences and interests.</p>
          </li>
          <li>
            <h3>Tracker Page</h3>
            <p>Real-time tracking of market indicators and metrics for informed decision-making.</p>
          </li>
          <li>
            <h3>Personal Finance Page</h3>
            <p>Tools for managing personal finance, budgeting, and expense tracking.</p>
          </li>
          <li>
            <h3>Portfolio Tracker</h3>
            <p>Monitor your investment portfolio's performance with detailed analytics.</p>
          </li>
          <li>
            <h3>Stock Price Prediction</h3>
            <p>Leverage LSTM models to predict stock prices, providing a competitive edge.</p>
          </li>
        </ul>
      </section>
      
      <section className="resources-section">
        <h2>Resources</h2>
        <p>For more details on the project design and code, explore the links below:</p>
        <ul>
          <li>
            <a href="https://github.com/hk151109/FinCredible" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
          </li>
          <li>
            <a href="https://www.figma.com/design/yfEhikffyIx3TPIwNrbXOB/User-interface?m=auto&t=NCX4HJKOb4MZo69S-1" target="_blank" rel="noopener noreferrer">Figma Design</a>
          </li>
        </ul>
      </section>
      
      <footer className="cta-section">
        <h2>Ready to Take Control of Your Financial Journey?</h2>
        <p>Join FinCredible today and embark on a path to financial literacy and success.</p>
        <Link to="/register"><button className="cta-button">Get Started</button></Link>
        
      </footer>
    </div>
  );
}

