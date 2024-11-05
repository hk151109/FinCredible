import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './PersonalFinance.css';
import coinimg from './personalfinancecomponents/money-2180330_640.jpg';
import investingimg from './personalfinancecomponents/investing.jpg';
import creditimg from './personalfinancecomponents/credit-card-5141614_640.jpg';
import registerimg from './personalfinancecomponents/cash-register-1885558_640.jpg';

export default function PersonalFinance() {
  return (
    <div className="personalfinance-main-container">
      <div className="personalfinance-page-frame">
        <Navbar />
        <div className="personalfinance-content-section">
          <div className="personalfinance-section">
            <h2 className="personalfinance-title">Personal Finance</h2>
            <p className="personalfinance-subtitle">A beginner's guide to budgeting, saving, credit, and investing.</p>
            <div className="personalfinance-grid">
              <Link to="/money-saving-strategies" className="personalfinance-card-link">
                <div className="personalfinance-card">
                  <img src={coinimg} alt="Money-saving strategies icon" className="personalfinance-card-img" />
                  <h3 className="personalfinance-card-title">Money-saving strategies that actually work</h3>
                  <p className="personalfinance-card-text">8 min read</p>
                </div>
              </Link>
              <Link to="/investing-101" className="personalfinance-card-link">
                <div className="personalfinance-card">
                  <img src={investingimg} alt="Investing strategies icon" className="personalfinance-card-img" />
                  <h3 className="personalfinance-card-title">Investing 101: How to get started</h3>
                  <p className="personalfinance-card-text">6 min read</p>
                </div>
              </Link>
              <Link to="/credit-score-truth" className="personalfinance-card-link">
                <div className="personalfinance-card">
                  <img src={creditimg} alt="Credit score truth icon" className="personalfinance-card-img" />
                  <h3 className="personalfinance-card-title">The truth about credit scores</h3>
                  <p className="personalfinance-card-text">5 min read</p>
                </div>
              </Link>
              <Link to="/side-hustles" className="personalfinance-card-link">
                <div className="personalfinance-card">
                  <img src={registerimg} alt="Side hustle cash icon" className="personalfinance-card-img" />
                  <h3 className="personalfinance-card-title">Side hustles for extra cash</h3>
                  <p className="personalfinance-card-text">7 min read</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="personalfinance-section">
            <h2 className="personalfinance-title">Personal Calculators</h2>
            <div className="personalfinance-grid personalfinance-calculators-grid">
              <Link to="/fd-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-calculator"></i>
                    <i className="fas fa-plus personalfinance-small-icon"></i>
                    <i className="fas fa-percent personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">FD</h3>
                  <p className="personalfinance-card-text">Find out your FD Maturity Details with ease</p>
                </div>
              </Link>
              <Link to="/mf-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-chart-pie"></i>
                    <i className="fas fa-arrow-right personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">MF</h3>
                  <p className="personalfinance-card-text">Find out your Mutual Fund corpus on maturity!</p>
                </div>
              </Link>
              <Link to="/sip-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-wallet"></i>
                    <i className="fas fa-arrow-right personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">SIP</h3>
                  <p className="personalfinance-card-text">How much can you save by starting an SIP? Find out!</p>
                </div>
              </Link>
              <Link to="/cagr-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-chart-line"></i>
                    <i className="fas fa-arrow-right personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">CAGR</h3>
                  <p className="personalfinance-card-text">Figure out the compound annual growth rate in a flash</p>
                </div>
              </Link>
              <Link to="/nsc-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-rupee-sign"></i>
                    <i className="fas fa-arrow-right personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">NSC</h3>
                  <p className="personalfinance-card-text">How much return does NSC give you? Find out!</p>
                </div>
              </Link>
              <Link to="/hra-calculator" className="personalfinance-card-link">
                <div className="personalfinance-calculator-card">
                  <div className="personalfinance-icon-group">
                    <i className="fas fa-landmark"></i>
                    <i className="fas fa-arrow-right personalfinance-small-icon"></i>
                  </div>
                  <h3 className="personalfinance-card-title">HRA</h3>
                  <p className="personalfinance-card-text">The Most Accurate HRA calculator out there</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
