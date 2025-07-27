import React from 'react';
import './EmptyTrackings.css';
import appleLogo from '../assets/apple-logo.png';
import teslaLogo from '../assets/tesla-logo.png';
import amazonLogo from '../assets/amazon-logo.png';

export default function EmptyTrackings() {
  return (
    <div className="empty-trackings">
      <div className="tracking-item">
        <img src={appleLogo} alt="Apple" className="tracking-logo" />
        <span>Apple Inc. (AAPL)</span>
      </div>
      <div className="tracking-item">
        <img src={teslaLogo} alt="Tesla" className="tracking-logo" />
        <span>Tesla Inc. (TSLA)</span>
      </div>
      <div className="tracking-item">
        <img src={amazonLogo} alt="Amazon" className="tracking-logo" />
        <span>Amazon.com Inc. (AMZN)</span>
      </div>
    </div>
  );
}
