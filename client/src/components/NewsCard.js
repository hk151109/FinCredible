import React from 'react';
import './ArticleCardForYou.css';

export default function ArticleCardForYou({ article }) {
  return (
    <div className="article-card-foryou">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <p>{article.date}</p>
    </div>
  );
}
