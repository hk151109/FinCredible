import React, { useState } from 'react'; 
import Navbar from '../components/Navbar';  // Import Navbar component
import EmptyTrackings from '../components/EmptyTrackings';  // Import empty list component
import SearchResults from '../components/SearchResults';  // Import SearchResults to show search results
import './TrackerPage.css';  // Import CSS styles

export default function TrackerPage() {
  const [searchQuery, setSearchQuery] = useState('');  // State to manage the search input

  // Handle input changes in the search bar
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);  // Update the search query state
  };

  return (
    <div className="trackerpage-main-container">
      <Navbar />
      <div className="trackerpage-content">
        {/* Left Sidebar with My Trackings */}
        <div className="trackerpage-sidebar">
          <h3>My Trackings</h3>
          <EmptyTrackings />
        </div>
        
        {/* Main content area */}
        <div className="trackerpage-main">
          <div className="trackerpage-search-bar-container">
            <input
              type="text"
              placeholder="Search for news..."
              value={searchQuery}  // Bind input value to state
              onChange={handleInputChange}  // Handle input changes
              className="trackerpage-search-bar"
            />
            <i className="trackerpage-search-icon">🔍</i>  {/* Search icon */}
          </div>

          {/* Pass the search query to SearchResults */}
          <div className="trackerpage-featured-articles">
            {searchQuery.length > 2 ? (
              <SearchResults searchQuery={searchQuery} />  // Pass the query to SearchResults
            ) : (
              <p>Type at least 3 characters to search for news.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
