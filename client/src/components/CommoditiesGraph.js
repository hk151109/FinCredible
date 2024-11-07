import React from "react";
import { Line } from "react-chartjs-2";

const CommoditiesGraph = ({ data, title }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data).map(item => parseFloat(item["4. close"])),
        borderColor: "#8e5ea2",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default CommoditiesGraph;
