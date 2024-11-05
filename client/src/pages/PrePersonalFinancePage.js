import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for internal navigation
import PreNavbar from '../components/PreNavbar'; // Import Navbar component
import './PrePersonalFinance.css'; // Import Personal Finance styles
import coinimg from './personalfinancecomponents/money-2180330_640.jpg';
import investingimg from './personalfinancecomponents/investing.jpg';
import creditimg from './personalfinancecomponents/credit-card-5141614_640.jpg';
import registerimg from './personalfinancecomponents/cash-register-1885558_640.jpg';

export default function PrePersonalFinance() {
  return (
    <div className="prepersonalfinance-main-container">
      <div className="prepersonalfinance-page-frame">
        <PreNavbar />
        <div className="prepersonalfinance-content-section">
          <div className="prepersonalfinance-section">
            <h2 className="prepersonalfinance-title">Personal Finance</h2>
            <p className="prepersonalfinance-subtitle">
              A beginner's guide to budgeting, saving, credit, and investing.
            </p>
            <div className="prepersonalfinance-grid">
              <Link to="/money-saving-strategies" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-card">
                  <img
                    src={coinimg}
                    alt="Money-saving strategies icon"
                    className="prepersonalfinance-card-img"
                  />
                  <h3 className="prepersonalfinance-card-title">Money-saving strategies</h3>
                  <p className="prepersonalfinance-card-text">8 min read</p>
                </div>
              </Link>
              <Link to="/investing-101" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-card">
                  <img
                    src={investingimg}
                    alt="Investing strategies icon"
                    className="prepersonalfinance-card-img"
                  />
                  <h3 className="prepersonalfinance-card-title">Investing 101: How to get started</h3>
                  <p className="prepersonalfinance-card-text">6 min read</p>
                </div>
              </Link>
              <Link to="/credit-score-truth" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-card">
                  <img
                    src={creditimg}
                    alt="Credit score truth icon"
                    className="prepersonalfinance-card-img"
                  />
                  <h3 className="prepersonalfinance-card-title">The truth about credit scores</h3>
                  <p className="prepersonalfinance-card-text">5 min read</p>
                </div>
              </Link>
              <Link to="/side-hustles" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-card">
                  <img
                    src={registerimg}
                    alt="Side hustle cash icon"
                    className="prepersonalfinance-card-img"
                  />
                  <h3 className="prepersonalfinance-card-title">Side hustles for extra cash</h3>
                  <p className="prepersonalfinance-card-text">7 min read</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="prepersonalfinance-section">
            <h2 className="prepersonalfinance-title">Personal Calculators</h2>
            <div className="prepersonalfinance-grid calculators-grid">
              <Link to="/fd-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-calculator"></i>
                    <i className="fas fa-plus prepersonalfinance-small-icon"></i>
                    <i className="fas fa-percent prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">FD</h3>
                  <p className="prepersonalfinance-card-text">Find out your FD Maturity Details with ease</p>
                </div>
              </Link>
              <Link to="/mf-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-chart-pie"></i>
                    <i className="fas fa-arrow-right prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">MF</h3>
                  <p className="prepersonalfinance-card-text">Find out your Mutual Fund corpus on maturity!</p>
                </div>
              </Link>
              <Link to="/sip-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-wallet"></i>
                    <i className="fas fa-arrow-right prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">SIP</h3>
                  <p className="prepersonalfinance-card-text">How much can you save by starting an SIP? Find out!</p>
                </div>
              </Link>
              <Link to="/cagr-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-chart-line"></i>
                    <i className="fas fa-arrow-right prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">CAGR</h3>
                  <p className="prepersonalfinance-card-text">Figure out the compound annual growth rate in a flash</p>
                </div>
              </Link>
              <Link to="/nsc-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-rupee-sign"></i>
                    <i className="fas fa-arrow-right prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">NSC</h3>
                  <p className="prepersonalfinance-card-text">How much return does NSC give you? Find out!</p>
                </div>
              </Link>
              <Link to="/hra-calculator" className="prepersonalfinance-card-link">
                <div className="prepersonalfinance-calculator-card">
                  <div className="prepersonalfinance-icon-group">
                    <i className="fas fa-landmark"></i>
                    <i className="fas fa-arrow-right prepersonalfinance-small-icon"></i>
                  </div>
                  <h3 className="prepersonalfinance-card-title">HRA</h3>
                  <p className="prepersonalfinance-card-text">The Most Accurate HRA calculator out there</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
