import React from "react";
import ArtworkTable from "./components/ArtworkTable";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <ArtworkTable />
      </div>
    </div>
  );
};

export default App;
