import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import "./CalculatorFunctions.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const MutualFundCalculator = () => {
  const [method, setMethod] = useState("lumpsum");  // "monthly" or "lumpsum"
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [lumpsumInvestment, setLumpsumInvestment] = useState("");
  const [expectedReturns, setExpectedReturns] = useState("");
  const [tenure, setTenure] = useState(5);  // Set initial value to 5 years
  const [totalAmount, setTotalAmount] = useState(null);
  const [investedAmount, setInvestedAmount] = useState(null);
  const [returnsGenerated, setReturnsGenerated] = useState(null);

  const calculateSIPMaturity = (monthlyInvestment, rate, tenure) => {
    const monthlyRate = rate / (12 * 100); // Monthly rate of return
    const months = tenure * 12;
    const maturity = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return maturity.toFixed(2);
  };

  const calculateLumpsumMaturity = (lumpsumInvestment, rate, tenure) => {
    const ratePerPeriod = rate / 100;
    const totalAmount = lumpsumInvestment * Math.pow(1 + ratePerPeriod, tenure);
    return totalAmount.toFixed(2);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (expectedReturns && tenure) {
      let maturityValue, investedAmt;
      if (method === "lumpsum" && lumpsumInvestment) {
        maturityValue = calculateLumpsumMaturity(
          parseFloat(lumpsumInvestment),
          parseFloat(expectedReturns),
          tenure
        );
        investedAmt = parseFloat(lumpsumInvestment);
      } else if (method === "monthly" && monthlyInvestment) {
        maturityValue = calculateSIPMaturity(
          parseFloat(monthlyInvestment),
          parseFloat(expectedReturns),
          tenure
        );
        investedAmt = parseFloat(monthlyInvestment) * tenure * 12;
      } else {
        alert("Please fill all required fields.");
        return;
      }

      const returns = (maturityValue - investedAmt).toFixed(2);
      setTotalAmount(maturityValue);
      setInvestedAmount(investedAmt.toFixed(2));
      setReturnsGenerated(returns);
    } else {
      alert("Please enter all values.");
    }
  };

  // Data for the line graph
  const generateGraphData = () => {
    let dataPoints = [];
    for (let i = 1; i <= tenure; i++) {
      let amount;
      if (method === "lumpsum") {
        amount = calculateLumpsumMaturity(parseFloat(lumpsumInvestment), parseFloat(expectedReturns), i);
      } else {
        amount = calculateSIPMaturity(parseFloat(monthlyInvestment), parseFloat(expectedReturns), i);
      }
      dataPoints.push({ x: i, y: amount });
    }
    return dataPoints;
  };

  const data = {
    labels: Array.from({ length: tenure }, (_, i) => i + 1),
    datasets: [
      {
        label: "Investment Growth Over Time",
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
  const goToFDCalculator = () => {
    navigate('/fd-calculator'); // Navigates to the MF Calculator page
  }
  return (
    <div className="container">
      <div className="calcgrid">
        {/* Investment Summary Section */}
        <div className="card">
          <h2>Mutual Fund Calculator:</h2>
          <div className="summary">
            <div>
              <p className="font-semibold">Invested Amount</p>
              <p className="text-green">₹{investedAmount || 0}</p>
            </div>
            <div>
              <p className="font-semibold">Returns Generated</p>
              <p className="text-green">₹{returnsGenerated || 0}</p>
            </div>
            <div>
              <p className="font-semibold">Total Amount</p>
              <p className="text-green">₹{totalAmount || 0}</p>
            </div>
          </div>

          {/* Input Fields Section */}
          <h3>Input fields:</h3>
          <form onSubmit={handleCalculate}>
            <div className="input-group">
              <label>Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="lumpsum">Lumpsum</option>
                <option value="monthly">Monthly Investment (SIP)</option>
              </select>
            </div>

            {method === "lumpsum" ? (
              <div className="input-group">
                <label>Lumpsum Investment</label>
                <input
                  type="number"
                  value={lumpsumInvestment}
                  onChange={(e) => setLumpsumInvestment(e.target.value)}
                  placeholder="₹ 5,00,000"
                  required
                />
              </div>
            ) : (
              <div className="input-group">
                <label>Monthly Investment</label>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  placeholder="₹ 10,000"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Expected Annual Returns (%)</label>
              <input
                type="number"
                value={expectedReturns}
                onChange={(e) => setExpectedReturns(e.target.value)}
                placeholder="10%"
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

            <button type="submit">Calculate Total Amount</button>
          </form>

          {/* <div className="explanation">
            <h4>Explanation</h4>
            <p>
              Mutual funds are investment vehicles that pool money from multiple investors to invest in securities like stocks, bonds, and other assets. You can choose between a lump-sum investment or a systematic investment plan (SIP) to grow your wealth.
            </p>
          </div> */}
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
            <button onClick={goToFDCalculator}>FD Calculator</button>
            <button onClick={goToSIPCalculator}>SIP Calculator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundCalculator;
