import React, { useEffect, useState } from 'react';
import './ForYou.css';
import apiService from '../services/apiService';
import ArticleCardForYou from './ArticleCardForYou';

export default function ForYou() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await apiService.getForYouArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="foryou-container">
      <div className="foryou-header">For You</div>
      <div className="scrollable-foryou">
        {articles.map((article, index) => (
          <ArticleCardForYou key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
