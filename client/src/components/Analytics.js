import React, { useEffect, useState } from 'react';
import AnalyticsCard from './AnalyticsCard';
import apiService from '../services/apiService';
import './Analytics.css';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const data = await apiService.getAnalyticsData();
      setAnalyticsData(data);
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics">
      <h2>Today's Analytics</h2>
      <div className="analytics-container">
        {analyticsData.length === 0 ? (
          <p>No data available</p>
        ) : (
          analyticsData.map((data, index) => (
            <AnalyticsCard key={index} data={data} />
          ))
        )}
      </div>
    </div>
  );
}
