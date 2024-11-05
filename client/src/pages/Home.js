import React from 'react'; 
import Navbar from '../components/Navbar';  // Import Navbar component
import HeadlinesHome from '../components/HeadlinesHome';  // Import Headlines component
import ForYou from '../components/ForYou';  // Import ForYou component
import Analytics from '../components/Analytics';  // Import Analytics component
import './Home.css';

export default function Home() {
  return (
    <div className="home-main-container">
      <div className="home-page-frame">
        <Navbar />
        {/* Content Section */}
        <div className="home-content-section">
          <div className="home-headlines-section">
            <HeadlinesHome />
          </div>
          <div className="home-for-you-section">
            <ForYou />
          </div>
          <div className="home-analytics-section">
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  );
}
