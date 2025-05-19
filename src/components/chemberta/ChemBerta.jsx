import React, { useState } from 'react';
import './App.css';

function ChemBerta() {
  const [userInput, setUserInput] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction('');
  
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Change to application/json
        },
        body: JSON.stringify({ user_input: userInput }),  // Send data as JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();  // Parse JSON response
  
      setPrediction(result.prediction || 'No prediction found.');
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction('Error making prediction.');
    }
  
    setLoading(false);
  };
  

  return (
    <div className="app-container">
      <h1>SMILES Mask Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter SMILES with <mask>"
          value={userInput}
          onChange={handleChange}
          required
          disabled={loading} // Disable input while loading
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {prediction && (
        <div className="prediction-box">
          <h3>Prediction Result:</h3>
          <p dangerouslySetInnerHTML={{ __html: prediction }} id="prediction"></p>
        </div>
      )}
    </div>
  );
}

export default ChemBerta;
