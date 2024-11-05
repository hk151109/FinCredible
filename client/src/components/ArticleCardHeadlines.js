import React from 'react';
import './ArticleCardHeadlines.css';

export default function ArticleCardHeadlines({ article }) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Date not available';

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="headline-card-link">
      <div className="article-card-headlines">
        {article.image && (
          <div className="image-wrapper">
            <img src={article.image} alt={article.title} className="headline-image" />
          </div>
        )}
        <div className="text-content">
          <h3>{article.title}</h3>
          <p className="headline-description">{article.description}</p>
          <p className="published-date">{formattedDate}</p>
        </div>
      </div>
    </a>
  );
}
