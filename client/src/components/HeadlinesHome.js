import React, { useEffect, useState } from 'react';
import './HeadlinesHome.css';
import apiService from '../services/apiService';
import ArticleCardHeadlinesHome from './ArticleCardHeadlinesHome';

export default function Headlines() {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getHeadlines();
      setHeadlines(data);
    };

    fetchData();
  }, []);

  return (
    <div className="headlines-container">
      <div className="headlines-header-home">Headlines</div>
      <div className="scrollable-headlines">
        {headlines.map((headline, index) => (
          <ArticleCardHeadlinesHome key={index} article={headline} />
        ))}
      </div>
    </div>
  );
}
