// import React, { useState } from 'react';
// import axios from 'axios';
// import './ProteinToSmilesConverter.css';

// const ProteinToSmilesConverter = ({ darkMode }) => {
//   // Example protein sequence (Insulin A chain)
//   const exampleSequence = "GIVEQCCTSICSLYQLENYCNFVNQHLCGSHLVEALYLVCGERGFFYTPKT";

//   const [proteinSequence, setProteinSequence] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [smilesResult, setSmilesResult] = useState('');
//   const [moleculeImage, setMoleculeImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!proteinSequence.trim()) {
//       setError('Please enter a protein sequence');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSmilesResult('');
//     setMoleculeImage(null);

//     try {
//       const response = await axios.post('http://localhost:5000/api/protein-to-smiles', {
//         input: proteinSequence,
//         vis: true
//       });

//       setSmilesResult(response.data.smiles);
//       if (response.data.image) {
//         setMoleculeImage(response.data.image);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred during conversion');
//       console.error('Error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVisualize = async () => {
//     if (!smilesResult) return;
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/visualize-smiles', {
//         smiles: smilesResult
//       }, {
//         responseType: 'blob'
//       });
      
//       const imageUrl = URL.createObjectURL(response.data);
//       setMoleculeImage(imageUrl);
//     } catch (err) {
//       setError('Failed to generate visualization');
//       console.error('Visualization error:', err);
//     }
//   };

//   const loadExample = () => {
//     setProteinSequence(exampleSequence);
//     setError(null);
//   };

//   return (
//     <div className={`protein-converter ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="converter-header">
//         <h2>
//           <i className="fas fa-dna"></i>
//           Protein to SMILES Converter
//         </h2>
//         <p>Convert protein sequences to chemical structures</p>
//       </div>
      
//       <div className="converter-layout">
//         {/* Left Side - Input */}
//         <div className="input-section">
//           <div className="input-card">
//             <div className="input-header">
//               <h3>
//                 <i className="fas fa-keyboard"></i>
//                 Input Protein Sequence
//               </h3>
//               <div className="input-tips">
//                 <i className="fas fa-lightbulb"></i>
//                 <span>Tip: Enter standard amino acid codes (A-Z)</span>
//               </div>
//             </div>
            
//             <form onSubmit={handleSubmit} className="converter-form">
//               <div className="form-group">
//                 <textarea
//                   id="proteinSequence"
//                   value={proteinSequence}
//                   onChange={(e) => setProteinSequence(e.target.value)}
//                   placeholder="Example: GIVEQCCTSICSLYQLENYCNFVNQHLCGSHLVEALYLVCGERGFFYTPKT"
//                   rows={8}
//                 />
//                 <div className="input-footer">
//                   <span className="char-count">
//                     {proteinSequence.length} characters
//                   </span>
//                   <div className="input-actions">
//                     <button 
//                       type="button" 
//                       className="example-button"
//                       onClick={loadExample}
//                     >
//                       <i className="fas fa-vial"></i>
//                       Load Example
//                     </button>
//                     <button 
//                       type="button" 
//                       className="clear-button"
//                       onClick={() => setProteinSequence('')}
//                       disabled={!proteinSequence.length}
//                     >
//                       <i className="fas fa-eraser"></i>
//                       Clear
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="action-buttons">
//                 <button 
//                   type="submit" 
//                   className="convert-button"
//                   disabled={isLoading || !proteinSequence.length}
//                 >
//                   {isLoading ? (
//                     <span className="loading-spinner">
//                       <span className="spinner"></span>
//                       Converting...
//                     </span>
//                   ) : (
//                     <>
//                       <i className="fas fa-exchange-alt"></i>
//                       Convert to SMILES
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>

//             {error && (
//               <div className="error-message">
//                 <i className="fas fa-exclamation-triangle"></i>
//                 {error}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side - Output or Info */}
//         <div className="output-section">
//           {smilesResult ? (
//             <div className="result-container">
//               <div className="result-header">
//                 <h3>
//                   <i className="fas fa-flask"></i>
//                   Conversion Result
//                 </h3>
//               </div>
              
//               <div className="smiles-result">
//                 <div className="smiles-label">SMILES Notation:</div>
//                 <div className="smiles-code">{smilesResult}</div>
//               </div>
              
//               {!moleculeImage ? (
//                 <button 
//                   onClick={handleVisualize}
//                   className="visualize-button"
//                 >
//                   <i className="fas fa-atom"></i>
//                   Visualize Structure
//                 </button>
//               ) : (
//                 <div className="visualization">
//                   <div className="visualization-header">
//                     <h4>
//                       <i className="fas fa-project-diagram"></i>
//                       Molecular Structure
//                     </h4>
//                   </div>
//                   <div className="molecule-viewer">
//                     <img 
//                       src={moleculeImage} 
//                       alt="Molecule structure" 
//                       className="molecule-image"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="info-panel">
//               <h3>
//                 <i className="fas fa-info-circle"></i>
//                 About Protein to SMILES Conversion
//               </h3>
//               <div className="info-content">
//                 <p>This tool converts protein sequences to their corresponding SMILES notation, which represents the molecular structure.</p>
                
//                 <div className="info-features">
//                   <h4>
//                     <i className="fas fa-star"></i>
//                     Features:
//                   </h4>
//                   <ul>
//                     <li><i className="fas fa-check"></i> Accurate sequence to structure conversion</li>
//                     <li><i className="fas fa-check"></i> Interactive molecular visualization</li>
//                     <li><i className="fas fa-check"></i> Supports standard amino acid sequences</li>
//                     <li><i className="fas fa-check"></i> Handles large protein sequences</li>
//                   </ul>
//                 </div>
                
//                 <div className="info-example">
//                   <h4>
//                     <i className="fas fa-list-ol"></i>
//                     Example Protein:
//                   </h4>
//                   <div className="example-info">
//                     <p>Insulin A Chain (51 amino acids):</p>
//                     <div className="example-code">GIVEQCCTSICSLYQLENYCNFVNQHLCGSHLVEALYLVCGERGFFYTPKT</div>
//                     <button 
//                       className="example-button secondary"
//                       onClick={loadExample}
//                     >
//                       <i className="fas fa-vial"></i>
//                       Try this example
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProteinToSmilesConverter;


import React, { useState } from 'react';
import axios from 'axios';
import './ProteinToSmilesConverter.css';

const ProteinToSmilesConverter = ({ darkMode }) => {
  // Example protein sequence (Insulin A chain)
  const exampleSequence = "GIVEQCCTSICSLYQLENYCNFVNQHLCGSHLVEALYLVCGERGFFYTPKT";

  const [proteinSequence, setProteinSequence] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [smilesResult, setSmilesResult] = useState('');
  const [moleculeImage, setMoleculeImage] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proteinSequence.trim()) {
      setError('Please enter a protein sequence');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSmilesResult('');
    setMoleculeImage(null);

    try {
      const response = await axios.post('http://localhost:8000/api/protein-to-smiles', {
        input: proteinSequence,
        vis: true
      });

      setSmilesResult(response.data.smiles);
      if (response.data.image) {
        setMoleculeImage(response.data.image);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during conversion');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualize = async () => {
    if (!smilesResult) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/visualize-smiles', {
        smiles: smilesResult
      }, {
        responseType: 'blob'
      });
      
      const imageUrl = URL.createObjectURL(response.data);
      setMoleculeImage(imageUrl);
    } catch (err) {
      setError('Failed to generate visualization');
      console.error('Visualization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = () => {
    setProteinSequence(exampleSequence);
    setError(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const resetForm = () => {
    setProteinSequence('');
    setSmilesResult('');
    setMoleculeImage(null);
    setError(null);
  };

  const downloadImage = () => {
    if (!moleculeImage) return;
    
    const link = document.createElement('a');
    link.href = moleculeImage;
    link.download = 'molecule-structure.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`protein-converter ${darkMode ? 'dark-mode' : ''}`}>
      <div className="converter-header">
        <h2>Protein to SMILES Converter</h2>
        <p>Transform protein sequences into molecular structures with ease</p>
      </div>
      
      <div className="converter-layout">
        {/* Left Side - Input */}
        <div className="input-section">
          <div className="input-card">
            <div className="input-header">
              <h3>
                <span role="img" aria-label="keyboard">⌨️</span>
                Input Protein Sequence
              </h3>
              <div className="input-tips">
                <span role="img" aria-label="lightbulb">💡</span>
                <span>Use standard amino acid codes</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="converter-form">
              <div className="form-group">
                <div className="sequence-toolbar">
                  <button 
                    type="button" 
                    className="toolbar-button"
                    onClick={loadExample}
                    title="Load example sequence"
                  >
                    <span role="img" aria-label="vial">🧪</span>
                    Example
                  </button>
                  <button 
                    type="button" 
                    className="toolbar-button"
                    onClick={() => setProteinSequence('')}
                    disabled={!proteinSequence.length}
                    title="Clear input"
                  >
                    <span role="img" aria-label="eraser">🧽</span>
                    Clear
                  </button>
                </div>
                <textarea
                  id="proteinSequence"
                  value={proteinSequence}
                  onChange={(e) => setProteinSequence(e.target.value)}
                  placeholder="Enter protein sequence (e.g., GIVEQCCTSICSLYQLENYCN...)"
                  rows={8}
                  className="sequence-input"
                />
                <div className="input-footer">
                  <div className="sequence-stats">
                    <span className="char-count">
                      <span role="img" aria-label="text-width">📏</span>
                      {proteinSequence.length} characters
                    </span>
                    {proteinSequence.length > 0 && (
                      <span className="amino-count">
                        <span role="img" aria-label="cubes">🧊</span>
                        {proteinSequence.length} amino acids
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button 
                  type="button" 
                  className="secondary-button"
                  onClick={resetForm}
                  disabled={isLoading || (!proteinSequence && !smilesResult)}
                >
                  <span role="img" aria-label="redo">↩️</span>
                  Reset
                </button>
                <button 
                  type="submit" 
                  className="convert-button"
                  disabled={isLoading || !proteinSequence.length}
                >
                  {isLoading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span role="img" aria-label="exchange">🔄</span>
                      Convert to SMILES
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="error-message">
                <span role="img" aria-label="warning">⚠️</span>
                {error}
              </div>
            )}
          </div>
          
          {/* Information Card (Only shown when no result yet) */}
          {!smilesResult && (
            <div className="info-card">
              <div className="info-header">
                <span role="img" aria-label="info">ℹ️</span>
                <h4>About This Tool</h4>
              </div>
              <div className="info-content">
                <p>This tool converts protein sequences to SMILES notation, representing the molecular structure of peptides.</p>
                
                <div className="features-grid">
                  <div className="feature-item">
                    <span role="img" aria-label="check">✅</span>
                    <span>Accurate conversion</span>
                  </div>
                  <div className="feature-item">
                    <span role="img" aria-label="check">✅</span>
                    <span>Interactive visualization</span>
                  </div>
                  <div className="feature-item">
                    <span role="img" aria-label="check">✅</span>
                    <span>Standard amino acids</span>
                  </div>
                  <div className="feature-item">
                    <span role="img" aria-label="check">✅</span>
                    <span>Large sequences</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Output */}
        <div className="output-section">
          {smilesResult ? (
            <div className="result-container">
              <div className="result-header">
                <h3>
                  <span role="img" aria-label="flask">🧪</span>
                  Conversion Result
                </h3>
                <div className="result-actions">
                  <button 
                    className="action-button" 
                    onClick={() => copyToClipboard(smilesResult)}
                    title="Copy SMILES"
                  >
                    <span role="img" aria-label="copy">📋</span>
                    {showCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              
              <div className="smiles-result">
                <div className="smiles-label">
                  <span>SMILES Notation</span>
                  <span className="smiles-info" title="Simplified Molecular Input Line Entry System">
                    <span role="img" aria-label="question">❓</span>
                  </span>
                </div>
                <div className="smiles-code">
                  {smilesResult}
                </div>
              </div>
              
              <div className="visualization-section">
                {!moleculeImage ? (
                  <button 
                    onClick={handleVisualize}
                    className="visualize-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner">
                        <span className="spinner"></span>
                        Generating...
                      </span>
                    ) : (
                      <>
                        <span role="img" aria-label="atom">⚛️</span>
                        Visualize Structure
                      </>
                    )}
                  </button>
                ) : (
                  <div className="visualization">
                    <div className="visualization-header">
                      <h4>
                        <span role="img" aria-label="diagram">📊</span>
                        Molecular Structure
                      </h4>
                      <div className="viz-actions">
                        <button 
                          className="action-button" 
                          onClick={downloadImage}
                          title="Download image"
                        >
                          <span role="img" aria-label="download">⬇️</span>
                        </button>
                        <button 
                          className="action-button" 
                          onClick={() => setMoleculeImage(null)}
                          title="Reset visualization"
                        >
                          <span role="img" aria-label="redo">↩️</span>
                        </button>
                      </div>
                    </div>
                    <div className="molecule-viewer">
                      <img 
                        src={moleculeImage} 
                        alt="Molecule structure" 
                        className="molecule-image"
                      />
                    </div>
                    <div className="viewer-controls">
                      <div className="control-hint">
                        <span role="img" aria-label="info">ℹ️</span>
                        <span>Showing 2D representation of the molecular structure</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="info-panel">
              <h3>
                <span role="img" aria-label="graduation-cap">🎓</span>
                What is SMILES?
              </h3>
              <div className="info-content">
                <p>SMILES (Simplified Molecular Input Line Entry System) is a notation that represents molecular structures as strings of characters.</p>
                
                <div className="info-example">
                  <h4>
                    <span role="img" aria-label="flask">🧪</span>
                    Example:
                  </h4>
                  <div className="example-info">
                    <p>The amino acid Alanine (A) in SMILES notation:</p>
                    <div className="example-code">CC(N)C(=O)O</div>
                    <p className="example-explanation">
                      Where: C = carbon, N = nitrogen, O = oxygen, () = branches, = = double bond
                    </p>
                  </div>
                </div>
                
                <div className="why-use">
                  <h4>
                    <span role="img" aria-label="question">❓</span>
                    Why Use SMILES?
                  </h4>
                  <ul className="benefits-list">
                    <li><span role="img" aria-label="arrow">➡️</span> Compact representation of complex molecules</li>
                    <li><span role="img" aria-label="arrow">➡️</span> Compatible with computational chemistry tools</li>
                    <li><span role="img" aria-label="arrow">➡️</span> Enables chemical database searching</li>
                    <li><span role="img" aria-label="arrow">➡️</span> Facilitates structure visualization</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="converter-footer">
        <div className="footer-content">
          <p>Use this tool for educational and research purposes only</p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              <span role="img" aria-label="book">📚</span>
              Documentation
            </a>
            <a href="#" className="footer-link">
              <span role="img" aria-label="help">❓</span>
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinToSmilesConverter;