// PredictionChart.js
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function PredictionChart() {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState(null);
  const [tomorrowPrediction, setTomorrowPrediction] = useState(null);
  const [mse, setMSE] = useState(null);
  const [error, setError] = useState(null);

  
  const fetchData = () => {
    const url = `http://127.0.0.1:5000/predict/${ticker.toUpperCase()}`;

    axios.get(url)
      .then(response => {
        const result = response.data;
        setData({
          predicted: JSON.parse(result['predicted']),
          original: JSON.parse(result['original']),
        });
        setTomorrowPrediction(JSON.parse(result['tommrw_prdctn']));
        setMSE(JSON.parse(result['mn_sqre_err']));
        setError(null);
      })
      .catch(err => {
        setError('Error fetching data. Please try again.');
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    setTicker(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter ticker symbol"
      />
      <button onClick={fetchData}>Predict</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tomorrowPrediction && mse && (
        <div>
          <h4 style={{ color: 'limegreen' }}>Tomorrow's Prediction: {tomorrowPrediction}</h4>
          <h4 style={{ color: 'limegreen' }}>MSE: {mse}</h4>
        </div>
      )}

      {data && (
        <Line
          data={{
            labels: Array.from({ length: data.predicted.length }, (_, i) => i + 1),
            datasets: [
              {
                label: 'Prediction',
                data: data.predicted,
                borderColor: 'rgb(247, 33, 4)',
                borderWidth: 2,
                fill: false,
              },
              {
                label: 'Original',
                data: data.original,
                borderColor: 'rgb(26, 26, 239)',
                borderWidth: 2,
                fill: false,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Data Point',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Value',
                },
                beginAtZero: false,
              },
            },
            elements: { point: { radius: 0 } },
            animation: { duration: 1000 },
          }}
        />
      )}
    </div>
  );
}

export default PredictionChart;
