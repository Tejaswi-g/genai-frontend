import { Routes, Route} from "react-router-dom";
import styles from "./styles.module.css";
import SmilePred from "../SmilePred";
import ChemBerta from "../chemberta/ChemBerta";
import ProteinPredictor from "../proteinpredictor/ProteinPredictor";
import Reinforcement from "../reinforcement/reinforcement";
import Home from "../Home";
import CTImage from "../lungdiagnosis/CTImage";
import ProteinToSmilesConverter from "../protein2smiles/ProteinToSmilesConverter";
import LigandProcessor from "../autodocking/auto";
import Visualization from "../visualization";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>DRUGSeek</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
  Logout
</button>

      </nav>

      <Routes>
        {/* Remove "/main" from paths */}
        <Route path="*" element={<Home />} />
        <Route path="predict" element={<SmilePred />} />
        <Route path="/chemberta" element={<ChemBerta />} />
        <Route path="/protein-predictor" element={<ProteinPredictor />} />
        <Route path="/reinforcement" element={<Reinforcement />} /> 
        <Route path="/ctimage" element={<CTImage />} />
        <Route path="/protein-to-smiles" element={<ProteinToSmilesConverter />} />
        <Route path="/protein-ligand-docking" element={<LigandProcessor/>} />
        <Route path="visualization" element={<Visualization />} />

      </Routes>
    </div>
  );
};

export default Main;
