import React, { useState } from 'react';
import axios from 'axios';

const SuggestionPage = () => {
  const [inputData, setInputData] = useState('');
  const [suggestion, setSuggestion] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/ml/predict', { data: inputData });
      setSuggestion(response.data.prediction);
    } catch (error) {
      console.error('Error getting suggestion:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Get Your Suggestion</h2>
      <input
        type="text"
        placeholder="Enter data"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleSubmit}>Get Suggestion</button>
      {suggestion && <p>Suggestion: {suggestion}</p>}
    </div>
  );
};

export default SuggestionPage;
