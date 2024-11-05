import React, { useEffect, useState } from 'react';
import './Headlines.css';
import apiService from '../services/apiService';
import ArticleCardHeadlines from './ArticleCardHeadlines';

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
      <div className="headlines-head">Headlines</div>
      <div className="scrollable-headlines">
        {headlines.map((headline, index) => (
          <ArticleCardHeadlines key={index} article={headline} />
        ))}
      </div>
    </div>
  );
}
