import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./CalculatorFunctions.css"; // Import your CSS
import { useNavigate } from 'react-router-dom';


Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const SIPCalculator = () => {
  const [method, setMethod] = useState("normal"); // "normal" or "stepup"
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [expectedReturns, setExpectedReturns] = useState("");
  const [stepUpPercentage, setStepUpPercentage] = useState("");
  const [tenure, setTenure] = useState(5); // Initial value in years
  const [totalValue, setTotalValue] = useState(null);
  const [investedAmount, setInvestedAmount] = useState(null);
  const [estimatedReturns, setEstimatedReturns] = useState(null);

  // Function to calculate Normal SIP Maturity
  const calculateNormalSIP = (monthlyInvestment, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    const maturity =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    return maturity;
  };

  // Function to calculate Step-up SIP Maturity
  const calculateStepUpSIP = (
    monthlyInvestment,
    rate,
    tenure,
    stepUpPercent
  ) => {
    const annualRate = rate / 100;
    const monthlyRate = annualRate / 12;
    const months = tenure * 12;
    const stepUpRate = stepUpPercent / 100;

    let totalAmount = 0;
    let currentMonthlyInvestment = monthlyInvestment;
    let totalInvested = 0;

    for (let year = 1; year <= tenure; year++) {
      for (let month = 1; month <= 12; month++) {
        totalAmount =
          (totalAmount + currentMonthlyInvestment) * (1 + monthlyRate);
        totalInvested += currentMonthlyInvestment;
      }
      currentMonthlyInvestment *= 1 + stepUpRate; // Increase investment annually
    }

    return { totalAmount, totalInvested };
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (expectedReturns && tenure && monthlyInvestment) {
      let maturityValue, investedAmt;
      if (method === "normal") {
        maturityValue = calculateNormalSIP(
          parseFloat(monthlyInvestment),
          parseFloat(expectedReturns),
          tenure
        );
        investedAmt = parseFloat(monthlyInvestment) * tenure * 12;
      } else if (method === "stepup" && stepUpPercentage) {
        const result = calculateStepUpSIP(
          parseFloat(monthlyInvestment),
          parseFloat(expectedReturns),
          tenure,
          parseFloat(stepUpPercentage)
        );
        maturityValue = result.totalAmount;
        investedAmt = result.totalInvested;
      } else {
        alert("Please fill all required fields.");
        return;
      }

      const returns = maturityValue - investedAmt;
      setTotalValue(maturityValue.toFixed(2));
      setInvestedAmount(investedAmt.toFixed(2));
      setEstimatedReturns(returns.toFixed(2));
    } else {
      alert("Please enter all values.");
    }
  };

  // Data for the line graph
  const generateGraphData = () => {
    let dataPoints = [];
    let investedAmounts = [];
    for (let i = 1; i <= tenure; i++) {
      let amount, investedAmt;
      if (method === "normal") {
        amount = calculateNormalSIP(
          parseFloat(monthlyInvestment),
          parseFloat(expectedReturns),
          i
        );
        investedAmt = parseFloat(monthlyInvestment) * i * 12;
      } else {
        const result = calculateStepUpSIP(
          parseFloat(monthlyInvestment),
          parseFloat(expectedReturns),
          i,
          parseFloat(stepUpPercentage)
        );
        amount = result.totalAmount;
        investedAmt = result.totalInvested;
      }
      dataPoints.push({ x: i, y: amount });
      investedAmounts.push({ x: i, y: investedAmt });
    }
    return { dataPoints, investedAmounts };
  };

  const graphData = generateGraphData();

  const data = {
    labels: Array.from({ length: tenure }, (_, i) => i + 1),
    datasets: [
      {
        label: "Total Value",
        data: graphData.dataPoints.map((point) => point.y),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Invested Amount",
        data: graphData.investedAmounts.map((point) => point.y),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period (Years)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
    },
  };

  const navigate = useNavigate(); // Initialize the hook

  const goToMfCalculator = () => {
    navigate('/mf-calculator'); // Navigates to the MF Calculator page
  }
  const goToFDCalculator = () => {
    navigate('/fd-calculator'); // Navigates to the MF Calculator page
  }

  return (
    <div className="container">
      <div className="calcgrid">
        {/* Investment Summary Section */}
        <div className="card">
          <h2>SIP Calculator:</h2>
          <div className="summary">
            <div>
              <p className="font-semibold">Invested Amount</p>
              <p className="text-green">₹{investedAmount || 0}</p>
            </div>
            <div>
              <p className="font-semibold">Estimated Returns</p>
              <p className="text-green">₹{estimatedReturns || 0}</p>
            </div>
            <div>
              <p className="font-semibold">Total Value</p>
              <p className="text-green">₹{totalValue || 0}</p>
            </div>
          </div>

          {/* Input Fields Section */}
          <h3>Input Fields:</h3>
          <form onSubmit={handleCalculate}>
            <div className="input-group">
              <label>Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="normal">Normal SIP</option>
                <option value="stepup">Step-up SIP</option>
              </select>
            </div>

            <div className="input-group">
              <label>Monthly SIP Amount</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                placeholder="₹ 10,000"
                required
              />
            </div>

            {method === "stepup" && (
              <div className="input-group">
                <label>Annual Step-up Percentage (%)</label>
                <input
                  type="number"
                  value={stepUpPercentage}
                  onChange={(e) => setStepUpPercentage(e.target.value)}
                  placeholder="5%"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Expected Return per year (%)</label>
              <input
                type="number"
                value={expectedReturns}
                onChange={(e) => setExpectedReturns(e.target.value)}
                placeholder="12%"
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

            <button type="submit">Calculate</button>
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
            <button onClick={goToMfCalculator}>MF Calculator</button>
            <button onClick={goToFDCalculator}>FD Calculator</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;