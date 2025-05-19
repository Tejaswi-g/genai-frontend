// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { GLViewer } from '3dmol';

// const LigandProcessor = () => {
//   const [ECnumber, setECnumber] = useState('');
//   const [ligandId, setLigandId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [pdbContent, setPdbContent] = useState(null);

//   const viewerRef = useRef(null);

//   const handleProcess = async () => {
//     setLoading(true);
//     setError('');
//     setPdbContent(null);

//     try {
//       const response = await axios.post('http://localhost:5004/process', {
//         ECnumber,
//         LIGAND_ID: ligandId
//       });

//       if (response.data.pdb_content) {
//         setPdbContent(response.data.pdb_content);
//       }
//     } catch (err) {
//       setError('Failed to process. Please check the EC number and ligand ID.');
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     if (pdbContent && viewerRef.current) {
//       const viewer = new GLViewer(viewerRef.current);
//       viewer.clear();

//       // Load the model
//       const model = viewer.addModel(pdbContent, 'pdb');

//       // Apply cartoon style for protein
//       viewer.setStyle({}, {
//         cartoon: { color: 'spectrum' }
//       });

//       // Highlight the ligand if ligandId is provided
//       if (ligandId) {
//         viewer.setStyle({ resn: ligandId.toUpperCase() }, {
//           stick: { radius: 0.3, color: 'green' },
//           sphere: { radius: 0.5, color: 'green' }
//         });
//       }

//       viewer.setBackgroundColor('white');
//       viewer.zoomTo();
//       viewer.render();
//     }
//   }, [pdbContent, ligandId]);

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4">AutoDock Ligand Processor</h2>

//       <div className="mb-4">
//         <label className="block font-medium">EC Number:</label>
//         <input
//           type="text"
//           value={ECnumber}
//           onChange={(e) => setECnumber(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="e.g. 3.1.1.1"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block font-medium">Ligand ID:</label>
//         <input
//           type="text"
//           value={ligandId}
//           onChange={(e) => setLigandId(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="e.g. ATP"
//         />
//       </div>

//       <button
//         onClick={handleProcess}
//         disabled={loading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {loading ? 'Processing...' : 'Run AutoDock'}
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       <div className="mt-6">
//         {pdbContent ? (
//           <>
//             <h3 className="text-lg font-semibold mb-2">3D Interaction Visualization:</h3>
//             <div
//               ref={viewerRef}
//               style={{ width: '800px', height: '600px', border: '1px solid #ddd' }}
//             />
//           </>
//         ) : (
//           <p className="text-gray-500">Enter EC Number and Ligand ID to see 3D visualization.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LigandProcessor;








































import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GLViewer } from '3dmol';
import './LigandProcessor.css';


const LigandProcessor = () => {
  const [ECnumber, setECnumber] = useState('');
  const [ligandId, setLigandId] = useState('');
  const [ligandSmiles, setLigandSmiles] = useState('CC(=O)OC1=CC=CC=C1C(=O)O'); // example SMILES
  const [bindingAffinity, setBindingAffinity] = useState('-7.5 kcal/mol'); // example score
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdbContent, setPdbContent] = useState(null);

  const proteinSequence = "MSTAV... (your trypsin sequence here)"; // Replace with actual sequence
  const viewerRef = useRef(null);

  const handleProcess = async () => {
    setLoading(true);
    setError('');
    setPdbContent(null);

    try {
      const response = await axios.post('http://localhost:5004/process', {
        ECnumber,
        LIGAND_ID: ligandId
      });

      if (response.data.pdb_content) {
        setPdbContent(response.data.pdb_content);
      }

      // If backend returns SMILES or affinity, set here:
      // setLigandSmiles(response.data.smiles);
      // setBindingAffinity(response.data.affinity);

    } catch (err) {
      setError('Failed to process. Please check the EC number and ligand ID.');
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (pdbContent && viewerRef.current) {
      const viewer = new GLViewer(viewerRef.current);
      viewer.clear();

      const model = viewer.addModel(pdbContent, 'pdb');

      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });

      if (ligandId) {
        viewer.setStyle(
          { resn: ligandId.toUpperCase() },
          { stick: { radius: 0.3, color: 'green' }, sphere: { radius: 0.5, color: 'green' } }
        );
      }

      viewer.setBackgroundColor('white');
      viewer.zoomTo();
      viewer.render();
    }
  }, [pdbContent, ligandId]);

  return (
    <div className="ligand-container">
  <h2 className="ligand-title">AutoDock Ligand Processor</h2>
  <p className="ligand-description">Trypsin, a pancreatic enzyme crucial for protein digestion and implicated in several diseases</p>

  <div className="form-group">
    <label className="ligand-label">EC Number:</label>
    <input
      type="text"
      value={ECnumber}
      onChange={(e) => setECnumber(e.target.value)}
      className="ligand-input"
      placeholder="e.g. 3.4.21.4"
    />
  </div>

  <div className="form-group">
    <label className="ligand-label">Protein Sequence of Trypsin:</label>
    <textarea
      value={proteinSequence}
      readOnly
      className="ligand-textarea"
      rows={4}
    />
  </div>

  <div className="form-group">
    <label className="ligand-label">Ligand ID:</label>
    <input
      type="text"
      value={ligandId}
      onChange={(e) => setLigandId(e.target.value)}
      className="ligand-input"
      placeholder="e.g. ATP"
    />
  </div>

  <div className="form-group">
    <label className="ligand-label">Ligand SMILES Notation:</label>
    <input
      type="text"
      value={ligandSmiles}
      readOnly
      className="ligand-input"
    />
  </div>

  <div className="form-group">
    <label className="ligand-label">Binding Affinity Score:</label>
    <input
      type="text"
      value={bindingAffinity}
      readOnly
      className="ligand-input"
    />
  </div>

  <button
    onClick={handleProcess}
    disabled={loading}
    className="ligand-button"
  >
    {loading ? 'Processing...' : 'Run AutoDock'}
  </button>

  {error && <p className="ligand-error">{error}</p>}

  <div className="viewer-container">
    {pdbContent ? (
      <>
        <h3 className="ligand-subtitle">3D Interaction Visualization:</h3>
        <div
          ref={viewerRef}
          style={{ width: '100%', height: '600px' }}
        />
      </>
    ) : (
      <p className="placeholder-text">Enter EC Number and Ligand ID to see 3D visualization.</p>
   

        )}
      </div>
    </div>
  );
};

export default LigandProcessor;
