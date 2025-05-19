// import React, { useState } from 'react';



// function SmilePred() {
//   const [smiles, setSmiles] = useState('');
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!smiles.trim()) {
//       setError('Please enter a SMILES string');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('http://localhost:8081/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ smiles }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Prediction failed');
//       }
      
//       const data = await response.json();
//       setPrediction(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Molecular Property Classifier</h1>
//         <p>Using Vision Transformer (ViT) Model</p>
//       </header>
      
//       <main className="main-content">
//         <form onSubmit={handleSubmit} className="prediction-form">
//           <div className="form-group">
//             <label htmlFor="smiles">SMILES String:</label>
//             <input
//               type="text"
//               id="smiles"
//               value={smiles}
//               onChange={(e) => setSmiles(e.target.value)}
//               placeholder="e.g., CCO for ethanol"
//               required
//             />
//           </div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Predicting...' : 'Predict'}
//           </button>
//         </form>
        
//         {error && (
//           <div className="error-message">
//             <p>Error: {error}</p>
//           </div>
//         )}
        
//         {prediction && !error && (
//           <div className="prediction-result">
//             <h2>Prediction Result</h2>
//             <p><strong>SMILES:</strong> {prediction.smiles}</p>
//             <p><strong>Predicted Class:</strong> {prediction.predicted_class}</p>
//           </div>
//         )}
//       </main>
      
//       <footer className="footer">
//         <p>Molecular Classification App</p>
//       </footer>
//     </div>
//   );
// }

// export default SmilePred;































import React, { useState } from 'react';
import './SmilePred.css'; // Add a CSS file for styling

function SmilePred() {
  const [smiles, setSmiles] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!smiles.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8081/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smiles }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="smile-container">
      <h1 className="title">Molecular Property Classifier</h1>
      <p className="subtitle">Powered by Vision Transformer (ViT)</p>

      <form className="predict-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={smiles}
          onChange={(e) => setSmiles(e.target.value)}
          className="smiles-input"
          placeholder="Enter SMILES (e.g., CCO for ethanol)"
        />
        <button type="submit" className="predict-button" disabled={loading}>
          {loading ? <div className="loader"></div> : 'Predict'}
        </button>
      </form>

      {error && <div className="error-msg">🚫 {error}</div>}

      {prediction && !error && (
        <div className="result-card">
          <h3>✅ Prediction Result</h3>
          <p><strong>SMILES:</strong> {prediction.smiles}</p>
          <p><strong>Predicted Class:</strong> {prediction.predicted_class}</p>
        </div>
      )}
    </div>
  );
}

export default SmilePred;
