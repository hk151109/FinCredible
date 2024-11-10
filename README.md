# FinCredible

## 🔍 Project Overview

**FinCredible** is a comprehensive finance platform designed for investment enthusiasts. It aggregates personalized financial news, supports stock portfolio management, provides machine learning-driven stock recommendations, and offers real-time market analysis, empowering users to make informed investment decisions.

## 📖 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributors](#contributors)
- [Future Enhancements](#future-enhancements)

## 🛠️ Tech Stack
### Frontend
- **React.js**: For building dynamic and responsive user interfaces.
- **JavaScript, HTML, CSS**: Core technologies for designing components and styling.
- **Redux**: Manages state for user preferences, portfolio tracking, and news updates.

### Backend
- **Node.js**: Provides server-side logic and API routing.
- **Express.js**: Handles server logic and routes for RESTful API interactions.
- **JWT (JSON Web Tokens)**: Ensures secure user authentication with session management.
- **Flask**: Hosts the machine learning model as a microservice, enabling smooth backend integration.

### Database
- **MongoDB**: A NoSQL database for storing user data, portfolios, news, and stock data used for machine learning predictions.

### Machine Learning
- **Python (scikit-learn)**: Used to build a stock recommendation model based on cosine similarity, offering users personalized stock suggestions.

## ✨ Features
- **User Authentication and Information Management**:  
  Secure account creation, login, and profile management using JWT and Google Login for flexible authentication options.
  
- **Aggregated Finance News**:  
  Real-time news collection from various sources, allowing users to filter content by categories like stocks, commodities, and economic updates.

- **Personalized News Feed**:  
  Customizable feed powered by Alpha Vantage API data and user-selected preferences, delivering relevant news.

- **News Tracker**:  
  Users can search and view news articles based on specific keywords for targeted content retrieval.

- **Portfolio Management**:  
  Enables users to add, remove, and monitor stocks with visual analytics, providing insights into stock performance over time.

- **Analytics Dashboard**:  
  Displays key market indicators such as NIFTY and SENSEX, offering a comprehensive view of market trends.

- **Stock Recommendation System**:  
  Recommends stocks based on cosine similarity, considering features like price and market cap to assist users in informed decision-making.

- **Personal Finance Tools**:  
  Provides financial calculators for FD, SIP, Mutual Funds, CAGR, NSC, and HRA, supporting various investment and savings calculations.

## 🚀 Installation
### Steps to Get Started
1. **Clone the repository**:
```
git clone https://github.com/hk151109/FinCredible.git
cd FinCredible
```

2. **Install dependencies**:
- Backend:
  ```
  cd server
  npm install
  ```
- Frontend:
  ```
  cd client
  npm install
  ```

3. **Configure Environment Variables**:
- **Backend**: Create a `.env` file in the `server` directory with the following variables:
  ```
  MONGO_URI='your-mongodb-connection-string'
  SESSION_SECRET='your-session-secret-key'
  GOOGLE_CLIENT_ID='your-google-client-id'
  GOOGLE_CLIENT_SECRET='your-google-client-secret'
  GOOGLE_REFRESH_TOKEN='your-google-refresh-token'
  EMAIL_USERNAME='your-email-username'
  PORT=8080
  ```

- **Frontend**: Create a `.env` file in the `client` directory with the following variables:
  ```
  REACT_APP_ALPHA_VANTAGE_API_KEY='your-alpha-vantage-api-key'
  REACT_APP_NEWS_API_KEY='your-news-api-key'
  REACT_APP_MARKETAUX_API_KEY='your-marketaux-api-key'
  REACT_APP_FINNHUB_API_KEY='your-finnhub-api-key'
  ```

## 🔧 Environment Variables
Make sure the following environment variables are set:

### Frontend Environment Variables:
- **`REACT_APP_ALPHA_VANTAGE_API_KEY`**: API key for Alpha Vantage.
- **`REACT_APP_NEWS_API_KEY`**: API key for News API.
- **`REACT_APP_MARKETAUX_API_KEY`**: API key for Marketaux API.
- **`REACT_APP_FINNHUB_API_KEY`**: API key for Finnhub API.

### Backend Environment Variables:
- **`MONGO_URI`**: MongoDB connection string.
- **`SESSION_SECRET`**: Secret key for session handling.
- **`GOOGLE_CLIENT_ID`**: Google OAuth client ID for Google Login.
- **`GOOGLE_CLIENT_SECRET`**: Google OAuth client secret.
- **`GOOGLE_REFRESH_TOKEN`**: Google OAuth refresh token.
- **`EMAIL_USERNAME`**: Email username for sending notifications (if needed).
- **`PORT`**: The port for running the backend server.

## 🎯 Usage
1. **Start the Flask server for the recommendation model**:
```
cd server
cd recommendation_service
python app.py
```

2. **Start the backend server**:
```
cd server
npm start
```

3. **Run the frontend**:
```
cd client
npm start
```

4. **Access the application**:
Open `http://localhost:3000` in your browser.

## 📸 Screenshots

- **Home Page (Before Login)**:  
  ![Home Page (Before Login)](assets/home_page_before_login.png)
  
- **Login Page**:  
  ![Login Page](assets/login_page.png)

- **Register Page**:  
  ![Register Page](assets/register_page.png)

- **Home Page (After Login)**:  
  ![Home Page (After Login)](assets/home_page_after_login.png)

- **News Tracker Page**:  
  ![News Tracker Page](assets/news_tracker.png)

- **Personal Finance Page**:  
  ![Personal Finance Page](assets/personal_finance.png)

- **Mutual Fund Calculator**:  
  ![Mutual Fund Calculator](assets/mutual_fund_calculator.png)

- **SIP Calculator**:  
  ![SIP Calculator](assets/sip_calculator.png)

- **Portfolio Management Page**:  
  ![Portfolio Management Page](assets/portfolio_management.png)

- **Stock Performance in Portfolio**:  
  ![Stock Performance](assets/stock_performance.png)

- **Add Shares to Portfolio**:  
  ![Add Shares to Portfolio](assets/add_shares.png)

- **Portfolio Analytics**:  
  ![Portfolio Analytics](assets/portfolio_analytics.png)

- **Analytics Dashboard**:  
  ![Analytics Dashboard](assets/analytics_dashboard.png)

- **Stock Recommendation Page**:  
  ![Stock Recommendation](assets/stock_recommendation.png)

- **User Accounts Page**:  
  ![User Accounts](assets/user_accounts.png)

## 🤝 Contributors
- **Harikrishnan Gopal** – Full Stack Developer
- **Aditya Raut** – Full Stack Developer, ML Engineer

## 🚀 Future Enhancements
- **Enhanced Machine Learning Models**:  
Improve recommendation accuracy by exploring ensemble learning and additional financial indicators.

- **Mobile Application**:  
Develop a dedicated mobile app for on-the-go access to finance news and portfolio management.

- **Additional Market Insights**:  
Include analytics and visualizations for global financial markets, sector performance, and custom indicators.

- **Real-Time Notifications**:  
Implement push notifications for major market events and stock updates to keep users informed in real time.

- **AI-based Personalized Financial Advice**:  
Integrate advanced AI models to offer tailored financial advice based on user portfolios and preferences.

