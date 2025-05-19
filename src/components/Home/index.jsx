// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Welcome to DRUGSeek</h1>

//       {/* Buttons Row */}
//       <div style={styles.buttonRow}>
//         <Link to="/main/predict">
//           <button style={styles.button}>Predict Drug Class</button>
//         </Link>
//         <Link to="/main/chemberta">
//           <button style={{ ...styles.button, backgroundColor: "#6ca0dc" }}>
//             Mask SMILES (ChemBERTa)
//           </button>
//         </Link>
//         <Link to="/main/protein-predictor">
//           <button style={{ ...styles.button, backgroundColor: "#4caf50" }}>
//             Protein Structure Prediction
//           </button>
//         </Link>
//         <Link to="/main/reinforcement">
//           <button style={{ ...styles.button, backgroundColor: "#ff9800" }}>
//             Molecule Generator (Reinforcement)
//           </button>
//         </Link>
//         <Link to="/main/ctimage">
//           <button style={{ ...styles.button, backgroundColor: "#4CAF50" }}>
//             CT Image Segmentation
//           </button>
//         </Link>
//         <Link to="/main/protein-to-smiles">
//   <button>Protein to SMILES Converter</button>
// </Link>
// <Link to="/main/protein-ligand-docking">
//     <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
//       Protein-Ligand Docking Viewer
//     </button>
//   </Link>

//       </div>

//       <p style={styles.description}>
//         DRUGSeek is an AI-powered platform designed to assist researchers in <strong>drug discovery</strong> and <strong>predictive analysis</strong>. 
//         Our goal is to accelerate the identification of potential drug candidates using cutting-edge computational techniques.
//       </p>

//       <div style={styles.cardContainer}>
//         <div style={styles.card}>
//           <h2>🔬 Drug Discovery</h2>
//           <p>
//             Drug discovery is a multi-step process involving <strong>target identification, compound screening, optimization, 
//             and clinical trials</strong>. AI and machine learning are revolutionizing this field by enabling faster and more 
//             accurate predictions.
//           </p>
//         </div>

//         <div style={styles.card}>
//           <h2>🧠 Alzheimer's Disease</h2>
//           <p>
//             Alzheimer’s disease is a neurodegenerative disorder that causes memory loss and cognitive decline. Researchers 
//             are exploring drugs that <strong>target amyloid plaques, tau tangles, and neuroinflammation</strong> to slow disease progression.
//           </p>
//         </div>

//         <div style={styles.card}>
//           <h2>🤖 AI-Powered Prediction</h2>
//           <p>
//             Try our <strong>AI-based drug class predictor</strong> to analyze potential treatments for Alzheimer’s and other diseases. 
//             Enter a <strong>SMILES string</strong> to predict its drug class.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // CSS-in-JS Styling
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },
//   header: {
//     fontSize: "28px",
//     color: "#333",
//     marginBottom: "10px",
//   },
//   buttonRow: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginBottom: "20px",
//     flexWrap: "wrap",
//   },
//   button: {
//     backgroundColor: "#9b7dc7",
//     color: "white",
//     border: "none",
//     padding: "12px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "18px",
//     fontWeight: "bold",
//     transition: "0.3s",
//   },
//   description: {
//     fontSize: "18px",
//     color: "#555",
//     maxWidth: "800px",
//     margin: "0 auto 20px",
//     lineHeight: "1.6",
//   },
//   cardContainer: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     marginTop: "20px",
//     gap: "20px",
//   },
//   card: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     width: "300px",
//     textAlign: "left",
//   },
// };

// export default Home;

















import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to DRUGSeek</h1>
      <p style={styles.subtitle}>
        Your AI-powered toolkit for Alzheimer's drug discovery & protein analysis.
      </p>

      {/* Tool Cards */}
      <div style={styles.cardContainer}>
        <ToolCard
          title="🧬 ViT - Ligand Classifier"
          desc="Alzheimer’s ligand classifier using ViT on acetylcholine-based drugs."
          color="#A66DD4"
          to="/main/predict"
          buttonText="Classify Ligand"
        />
        <ToolCard
          title="🧪 ChemBERTa"
          desc="Mask and predict missing SMILES fragments for Alzheimer’s research."
          color="#6CA0DC"
          to="/main/chemberta"
          buttonText="Mask SMILES"
        />
        <ToolCard
          title="🧠 De-novo Drug Generator"
          desc="Use reinforcement learning to generate novel drug candidates."
          color="#F3A712"
          to="/main/reinforcement"
          buttonText="Generate Molecules"
        />
        <ToolCard
          title="🔬 3D Protein structure visualization"
          desc="Predict 3D structures of proteins for target analysis."
          color="#4CAF50"
          to="/main/protein-predictor"
          buttonText="Predict Structure"
        />
        <ToolCard
          title="🧬 Protein-Ligand Docking"
          desc="Visualize and analyze 3D docking between proteins and ligands."
          color="#00BFA6"
          to="/main/protein-ligand-docking"
          buttonText="View Docking"
        />

        <ToolCard
          title="🔁 Protein to SMILES"
          desc="Convert protein sequences to SMILES using GenAI models."
          color="#FF708D"
          to="/main/protein-to-smiles"
          buttonText="Convert Now"
        />
        <ToolCard
          title="🧫 CT Image Segmentation"
          desc="Segment and analyze CT images for disease diagnosis."
          color="#845EC2"
          to="/main/ctimage"
          buttonText="Segment CT Image"
        />
        <ToolCard
          title="3d visualization"
          desc="Visualize and interact with NIfTI (.nii) brain scans for medical imaging analysis."
          color="#FF9F1C"
          to="/main/visualization"
          buttonText="View 3d"
        />

      </div>

      {/* Platform Description */}
      <p style={styles.description}>
        DRUGSeek is an AI-powered platform designed to assist researchers in <strong>drug discovery</strong> and <strong>predictive analysis</strong>.
        Our goal is to accelerate the identification of potential drug candidates using cutting-edge computational techniques.
      </p>

      {/* Informational Cards */}
      <div style={styles.cardContainer}>
        <InfoCard
          title="🔬 Drug Discovery"
          text="Drug discovery is a multi-step process involving target identification, compound screening, optimization, and clinical trials. AI and machine learning are revolutionizing this field by enabling faster and more accurate predictions."
        />
        <InfoCard
          title="🧠 Alzheimer's Disease"
          text="Alzheimer’s disease is a neurodegenerative disorder that causes memory loss and cognitive decline. Researchers are exploring drugs that target amyloid plaques, tau tangles, and neuroinflammation to slow disease progression."
        />
        <InfoCard
          title="🤖 AI-Powered Prediction"
          text="Try our AI-based drug class predictor to analyze potential treatments for Alzheimer’s and other diseases. Enter a SMILES string to predict its drug class."
        />
      </div>
    </div>
  );
};

// Reusable Tool Card
const ToolCard = ({ title, desc, color, to, buttonText }) => (
  <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
    <h2 style={styles.cardTitle}>{title}</h2>
    <p style={styles.cardDescription}>{desc}</p>
    <Link to={to}>
      <button style={{ ...styles.button, backgroundColor: color }}>{buttonText}</button>
    </Link>
  </div>
);

// Reusable Info Card
const InfoCard = ({ title, text }) => (
  <div style={styles.infoCard}>
    <h2 style={styles.cardTitle}>{title}</h2>
    <p style={styles.cardDescription}>{text}</p>
  </div>
);

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#F9FAFC",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#3A3A3A",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    marginBottom: "40px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    padding: "24px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
    padding: "24px",
    width: "320px",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#333",
  },
  cardDescription: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: 1.6,
  },
  button: {
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  description: {
    textAlign: "center",
    fontSize: "17px",
    color: "#555",
    maxWidth: "900px",
    margin: "0 auto 40px",
    lineHeight: "1.8",
  },
};

export default Home;
