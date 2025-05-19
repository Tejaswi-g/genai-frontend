// import React, { useState } from "react";
// import axios from "axios";
// import "./UseModel.css";

// const Reinforcement = () => {
//   const [inputData, setInputData] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handlePrediction = async () => {
//     if (!inputData.trim()) {
//       setError("Please enter a valid SMILES string");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);
      
//       const response = await axios.post(
//         "http://localhost:5000/predict/reinforcement",
//         { SMILES: inputData }
//       );
      
//       if (response.data && response.data.top_results) {
//         setResult(response.data);
//       } else {
//         setError("No valid results returned from the server");
//       }
//     } catch (err) {
//       console.error("Error fetching prediction:", err);
//       setError(err.response?.data?.detail || "Failed to get prediction. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="header-section">
//         <h2>Drug Molecule Generator</h2>
//         <p>Enter a SMILES string to generate potential drug molecules using reinforcement learning</p>
//       </div>

//       <div className="input-section">
//         <textarea
//           value={inputData}
//           onChange={(e) => setInputData(e.target.value)}
//           placeholder="Enter SMILES string (e.g., CCO)"
//           rows={3}
//         />
//         <button 
//           className="button" 
//           onClick={handlePrediction}
//           disabled={isLoading}
//         >
//           {isLoading ? "Generating..." : "Generate Molecules"}
//         </button>
//         {error && <div className="error">{error}</div>}
//       </div>

//       {result && (
//         <div className="results-section">
//           <h3>Generated Molecules</h3>
//           <div className="molecules-grid">
//             {result.top_results.map((smile, index) => (
//               <div key={index} className="molecule-card">
//                 <div className="molecule-structure">
//                   <div className="smiles-code">{smile}</div>
//                 </div>
//                 <div className="molecule-properties">
//                   <div className="property">
//                     {/* <span className="property-name">SMILES:</span>
//                     <span className="property-value">{smile}</span> */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reinforcement;







import React, { useState } from "react"; 
import axios from "axios";
import './Reinforcement.css';


const commonMolecules = [
  { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
  { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
  { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O" },
  { name: "Paracetamol", smiles: "CC(=O)NC1=CC=C(C=C1)O" },
  { name: "Morphine", smiles: "CN1CC[C@]23C4=C5C=CC(O)=C4O[C@H]2[C@@H](O)C=C[C@H]3[C@H]1C5" }
];

const Reinforcement = () => {
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async () => {
    if (!inputData.trim()) {
      setError("Please enter a valid SMILES string");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:9000/predict/reinforcement",
        { SMILES: inputData }
      );
      if (response.data && response.data.top_results) {
        setResult(response.data);
      } else {
        setError("No valid results returned from the server");
      }
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError(err.response?.data?.detail || "Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedSMILES = e.target.value;
    if (selectedSMILES !== "") {
      setInputData(selectedSMILES);
    }
  };

  return (
    <div className="reinforcement-container">
      <div className="header-section">
        <h2>Drug Molecule Generator</h2>
        <p>Enter a SMILES string to generate potential drug molecules using reinforcement learning</p>
      </div>

      <div className="input-section">
        <select onChange={handleDropdownChange} defaultValue="">
          <option value="" disabled>Select a common molecule</option>
          {commonMolecules.map((mol, index) => (
            <option key={index} value={mol.smiles}>
              {mol.name}
            </option>
          ))}
        </select>

        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter SMILES string (e.g., CCO)"
        />
        <button className="button" onClick={handlePrediction} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Generating...
            </>
          ) : "Generate Molecules"}
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      {result && (
        <div className="results-section">
          <h3>Generated Molecules</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Structure</th>
                <th>SMILES</th>
                <th>LogP</th>
                <th>pIC50</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {result.top_results.map((item, index) => (
                <tr key={index} className={item.Reward === result.max_reward ? 'highlight' : ''}>
                  <td>
                    <img 
                      src={`data:image/png;base64,${item.image}`} 
                      alt="Molecule" 
                      className="molecule-image"
                    />
                    {item.Reward === result.max_reward && (
                      <span className="best-badge">Best</span>
                    )}
                  </td>
                  <td className="smiles-code">{item.SMILES}</td>
                  <td className="numeric-value">{item.LogP}</td>
                  <td className="numeric-value">{item.pIC50}</td>
                  <td className="numeric-value">{item.Reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reinforcement;






