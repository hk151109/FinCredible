import React from 'react';
import './EmptyTrackings.css';  // Import styles

export default function EmptyTrackings() {
  return (
    <div className="empty-trackings">
      <div className="tracking-item">
        <img src="apple-logo.png" alt="Apple" className="tracking-logo" />
        <span>Apple Inc. (AAPL)</span>
      </div>
      <div className="tracking-item">
        <img src="tesla-logo.png" alt="Tesla" className="tracking-logo" />
        <span>Tesla Inc. (TSLA)</span>
      </div>
      <div className="tracking-item">
        <img src="amazon-logo.png" alt="Amazon" className="tracking-logo" />
        <span>Amazon.com Inc. (AMZN)</span>
      </div>
    </div>
  );
}
