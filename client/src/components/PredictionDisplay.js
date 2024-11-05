import React from 'react';
import { Line } from 'react-chartjs-2';

const PredictionDisplay = ({ predictionData }) => {
  const { predicted, original } = predictionData;

  const data = {
    labels: Array.from({ length: predicted.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Prediction',
        data: predicted,
        fill: false,
        borderColor: 'rgba(247, 33, 4, 0.8)',
        tension: 0.3,
      },
      {
        label: 'Actual Price',
        data: original,
        fill: false,
        borderColor: 'rgba(26, 26, 239, 0.8)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="graph-container">
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default PredictionDisplay;
