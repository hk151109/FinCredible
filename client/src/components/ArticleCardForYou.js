import React from 'react';
import './ArticleCardForYou.css';

export default function ArticleCardForYou({ article }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="foryou-card-link">
      <div className="article-card-foryou">
        {article.image && (
          <img src={article.image} alt={article.title} className="foryou-card-image" />
        )}
        <div className="foryou-card-content">
          <h3 className="foryou-card-title">{article.title}</h3>
          <p className="foryou-card-description">{article.description}</p>
          <div className="foryou-card-date-time">
            <span className="foryou-card-time">
              {new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="foryou-card-date">
              {new Date(article.published_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
