import React, { useState } from 'react';
import axios from 'axios';
import './RecommendStock.css';

function RecommendStock() {
    const [symbol, setSymbol] = useState('');
    const [num, setNum] = useState(5);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/recommend`, {
                params: { symbol, num },
            });
            setRecommendations(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching recommendations');
            console.error(err);
        }
    };

    return (
        <div className="recommendation-form-container">
            <h2>Get Stock Recommendations</h2>
            <form className="recommendation-form">
                <div className="recommendation-input-group">
                    <input
                        type="text"
                        value={symbol}
                        placeholder="Enter stock symbol"
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                    />
                </div>
                <div className="recommendation-input-group">
                    <input
                        type="number"
                        value={num}
                        placeholder="Number of recommendations"
                        onChange={(e) => setNum(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="recommendation-button" onClick={fetchRecommendations}>
                    Get Recommendations
                </button>
            </form>
            {error && <p className="recommendation-error">{error}</p>}
            <ul className="recommendation-list">
                {recommendations.map((rec, index) => (
                    <li key={index} className="recommendation-item">
                        {rec.Symbol} - {rec.Name} ({rec.Sector})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecommendStock;
