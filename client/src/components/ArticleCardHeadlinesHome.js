import React from 'react'; 
import './ArticleCardHeadlinesHome.css';

export default function ArticleCardHeadlinesHome({ article }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="headlinehome-card-link">
      <div className="headlinehome-article-card">
        <h3 className="headlinehome-title">{article.title}</h3>
        <p className="headlinehome-description">{article.description}</p>
        <div className="headlinehome-date-time">
          <span className="headlinehome-time">{new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="headlinehome-date">{new Date(article.published_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </a>
  );
}
