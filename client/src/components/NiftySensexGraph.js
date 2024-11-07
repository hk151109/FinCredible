import React from "react";
import { Line } from "react-chartjs-2";

const NiftySensexGraph = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Market Performance",
        data: Object.values(data).map(item => parseFloat(item["4. close"])),
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default NiftySensexGraph;
