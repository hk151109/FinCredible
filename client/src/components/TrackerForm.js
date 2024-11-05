import React, { useState } from 'react';
import axios from 'axios';

const TrackerForm = ({ onSearchComplete }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword) {
      try {
        const response = await axios.get(`/api/news/${keyword}`);
        onSearchComplete(response.data);  // Pass the results back to the parent component
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default TrackerForm;
