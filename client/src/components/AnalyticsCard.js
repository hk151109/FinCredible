import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './AnalyticsCard.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function AnalyticsCard({ data }) {
  const chartData = {
    labels: data.labels.reverse(), // Reverse to show oldest to latest dates
    datasets: [
      {
        label: `${data.name} Price`,
        data: data.prices.reverse(), // Reverse to match date order
        borderColor: '#4CAF50',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="analytics-card">
      <h3>{data.name}</h3>
      <p>Latest Price: {data.currentPrice}</p>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
