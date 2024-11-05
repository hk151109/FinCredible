import React from 'react';

const NewsList = ({ articles }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title} - {article.published_at}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
