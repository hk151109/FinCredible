import React, { useState } from 'react';
import PredictionDisplay from '../components/PredictionDisplay';
import './MLPredictionPage.css';

const MLPredictionPage = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [predictionData, setPredictionData] = useState(null);

  const handlePredict = async () => {
    const response = await fetch(`/api/ml/predict/${stockSymbol}`);
    const data = await response.json();
    setPredictionData(data);
  };

  return (
    <div className="contain">
      <div className="input">
        <label htmlFor="comp">Enter Company Ticker</label>
        <input
          type="text"
          id="comp"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <button onClick={handlePredict}>Predict</button>
      </div>
      {predictionData && <PredictionDisplay predictionData={predictionData} />}
    </div>
  );
};

export default MLPredictionPage;
