import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackerList = () => {
  const [trackings, setTrackings] = useState([]);

  const fetchTrackings = async () => {
    const response = await axios.get('/api/trackings');
    setTrackings(response.data);
  };

  useEffect(() => {
    fetchTrackings();
  }, []);

  return (
    <ul>
      {trackings.map((tracking, index) => (
        <li key={index}>
          <a href={`/news/${tracking.keyword}`}>{tracking.keyword}</a>
        </li>
      ))}
    </ul>
  );
};

export default TrackerList;
