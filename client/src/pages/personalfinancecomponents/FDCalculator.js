import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import "./CalculatorFunctions.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const FixedDepositCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rateOfInterest, setRateOfInterest] = useState("");
  const [tenure, setTenure] = useState(5);  // Set initial value to 5 years
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateMaturity = (principal, rate, tenure) => {
    const ratePerPeriod = rate / 100;
    const totalAmount = principal * Math.pow(1 + ratePerPeriod, tenure);
    return totalAmount.toFixed(2);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (principal && rateOfInterest && tenure) {
      const calculatedAmount = calculateMaturity(
        parseFloat(principal),
        parseFloat(rateOfInterest),
        tenure
      );
      setMaturityAmount(calculatedAmount);
    } else {
      alert("Please enter all the values.");
    }
  };

  // Data for the line graph
  const generateGraphData = () => {
    let dataPoints = [];
    for (let i = 1; i <= tenure; i++) {
      let amount = calculateMaturity(parseFloat(principal), parseFloat(rateOfInterest), i);
      dataPoints.push({ x: i, y: amount });
    }
    return dataPoints;
  };

  const data = {
    labels: Array.from({ length: tenure }, (_, i) => i + 1),
    datasets: [
      {
        label: "Maturity Value Over Time",
        data: generateGraphData().map(point => point.y),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        pointBackgroundColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period (Years)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)"
        }
      }
    },
  };

  const navigate = useNavigate(); // Initialize the hook

  const goToSIPCalculator = () => {
    navigate('/sip-calculator'); // Navigates to the MF Calculator page
  }
  const goToMFCalculator = () => {
    navigate('/mf-calculator'); // Navigates to the MF Calculator page
  }

  return (
    <div className="container">
      <div className="calcgrid">
        {/* Investment Summary Section */}
        <div className="card">
          <h2>FD Calculator:</h2>
          <div className="summary">
            <div>
              <p className="font-semibold">Total Investment</p>
              <p className="text-green">₹{principal || 0}</p>
            </div>
            <div>
              <p className="font-semibold">Total Interest</p>
              <p className="text-green">
                ₹{maturityAmount ? (maturityAmount - principal).toFixed(2) : 0}
              </p>
            </div>
            <div>
              <p className="font-semibold">Maturity Value</p>
              <p className="text-green">₹{maturityAmount || 0}</p>
            </div>
          </div>

          {/* Input Fields Section */}
          <h3>Input fields:</h3>
          <form onSubmit={handleCalculate}>
            <div className="input-group">
              <label>Amount Invested</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="₹ 5,00,000"
                required
              />
            </div>
            <div className="input-group">
              <label>Annual Interest Rate</label>
              <input
                type="number"
                value={rateOfInterest}
                onChange={(e) => setRateOfInterest(e.target.value)}
                placeholder="5%"
                required
              />
            </div>

            <div className="input-group">
              <label>Time Period (Years): {tenure} years</label>
              <input
                type="range"
                min="1"
                max="30"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="slider"
              />
            </div>

            <button type="submit">Calculate Maturity Amount</button>
          </form>


        </div>

        {/* Graph Section */}
        <div className="card">
            <div className="graphsection">
                <h4>Investment Growth Over Time</h4>
                <Line data={data} options={options} />
            </div>
          <br></br>
          <div className="popular-calculators">
            <h4>Popular Calculators</h4>
            <button onClick={goToMFCalculator}>MF Calculator</button>
            <button onClick={goToSIPCalculator}>SIP Calculator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculator;
