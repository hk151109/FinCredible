import axios from 'axios';

const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
const API_KEY1 = process.env.REACT_APP_ALPHAVANTAGE_API_KEY;
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Assuming the newsfilter API key is stored in .env as REACT_APP_NEWS_API_KEY

const apiService = {

  // Fetch all alerts
  getAlerts: async () => {
    try {
      const response = await axios.get('/api/alerts');
      return response.data;
    } catch (err) {
      console.error('Error fetching alerts:', err);
      return [];
    }
  },

  // Delete an alert
  deleteAlert: async (id) => {
    try {
      await axios.delete(`/api/alerts/${id}`);
    } catch (err) {
      console.error('Error deleting alert:', err);
    }
  },

  // Fetch news headlines from Finnhub API
  // Update the getHeadlines function to include images
  getHeadlines: async () => {
    try {
      const response = await axios.get('https://finnhub.io/api/v1/news', {
        params: {
          category: 'general',
          token: API_KEY,
        },
      });
  
      if (response.data && Array.isArray(response.data)) {
        return response.data.map(article => ({
          title: article.headline,
          description: article.summary,
          published_at: article.datetime ? new Date(article.datetime * 1000).toISOString() : null, // Convert Unix timestamp to ISO format if necessary
          url: article.url,
          image: article.image, // Ensure image is fetched
        }));
      } else {
        console.warn('Invalid data format from Finnhub API:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching headlines:', error);
      return [];
    }
  },
  


  // Fetch personalized news articles (General + Crypto)
  getForYouArticles: async () => {
    try {
      const generalNewsResponse = await axios.get('https://finnhub.io/api/v1/news', {
        params: {
          category: 'merger',
          token: API_KEY,
        },
      });

      const cryptoNewsResponse = await axios.get('https://finnhub.io/api/v1/news', {
        params: {
          category: 'crypto',
          token: API_KEY,
        },
      });

      const processArticles = (data) => {
        return data.map(article => ({
          title: article.headline,
          description: article.summary,
          published_at: article.datetime ? new Date(article.datetime * 1000).toISOString() : null, // Convert Unix timestamp to ISO format
          url: article.url,
          image: article.image, // Ensure image is fetched
        }));
      };

      const generalNews = Array.isArray(generalNewsResponse.data) ? processArticles(generalNewsResponse.data) : [];
      const cryptoNews = Array.isArray(cryptoNewsResponse.data) ? processArticles(cryptoNewsResponse.data) : [];

      return [...generalNews, ...cryptoNews];
    } catch (error) {
      console.error('Error fetching personalized articles:', error);
      return [];
    }
  },


  // Fetch stock analytics data from Alpha Vantage
  getAnalyticsData: async () => {
    try {
      const stockSymbols = ['IBM', 'AAPL', 'TSLA']; // Example stock symbols
      const analyticsData = await Promise.all(
        stockSymbols.map(async (symbol) => {
          const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: symbol,
              apikey: API_KEY1,
            },
          });
          const timeSeries = response.data['Time Series (Daily)'];

          // Extract the dates and closing prices
          const labels = Object.keys(timeSeries).slice(0, 7); // Get last 7 days
          const prices = labels.map(date => parseFloat(timeSeries[date]['4. close']));

          return {
            name: symbol,
            prices, // Closing prices for the graph
            labels, // Dates for the graph
            currentPrice: prices[0], // Latest closing price
          };
        })
      );
      return analyticsData;
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return [];
    }
  },

  // Fetch news for a specific keyword using NewsFilter API
  getNews: async (keyword) => {
    try {
      const response = await axios.get('https://newsfilter.io/public/news', {
        params: {
          q: keyword,
          apikey: NEWS_API_KEY,
        },
      });

      if (response.data && Array.isArray(response.data.articles)) {
        return response.data.articles.map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          published_at: article.publishedAt,
        }));
      } else {
        console.warn('Invalid data format from NewsFilter API:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
};

export default apiService;
