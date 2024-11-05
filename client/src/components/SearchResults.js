import React, { Component } from 'react';
import $ from 'jquery';
import './SearchResults.css';

const newsApiKey = '7fe9c7f6ac044f62a5deab66f84ddcec';  // Make sure to replace with your actual API key
const apiMain = 'https://newsapi.org/v2/everything?q=';  // Using v2 API
const apiTail = `&apiKey=${newsApiKey}`;  // Append your API key

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesArray: [],  // To store the fetched articles
    };
    this.getArticles = this.getArticles.bind(this);
  }

  // Method to get articles based on the search query
  getArticles(searchQuery) {
    const url = apiMain + searchQuery + apiTail;

    // Using jQuery to fetch data from the NewsAPI
    $.getJSON(url, (newsData) => {
      this.setState({
        articlesArray: newsData.articles,  // Store fetched articles in state
      });
    }).fail((error) => {
      console.error("API request failed:", error);
    });
  }

  // Lifecycle method that triggers when the component updates (after the query is changed)
  componentDidUpdate(prevProps) {
    // Check if the search query prop has changed before fetching data
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.getArticles(this.props.searchQuery);
    }
  }

  // Function to highlight the search term in the text
  highlightText(text, searchQuery) {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');  // Create regex for the query
    const parts = text.split(regex);  // Split the text into parts based on the query

    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>  // Highlight matched part
      ) : (
        part
      )
    );
  }

  render() {
    const { articlesArray } = this.state;
    const { searchQuery } = this.props;

    return (
      <div className="results-container">
        {articlesArray.length > 0 ? (
          <ul className="results-list">
            {articlesArray.map((article, index) => (
              <li key={index} className="result-item">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <div className="result-title">
                    {this.highlightText(article.title, searchQuery)}
                  </div>
                  <div className="result-description">
                    {this.highlightText(article.description, searchQuery)}
                  </div>
                  <div className="result-author">
                    {article.author || 'Unknown Author'}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found. Try searching for something else.</p>
        )}
      </div>
    );
  }
}

export default SearchResults;
