import React from "react";
import SecretSanta from "./components/SecretSanta";
import "./styles.css";
import Header from "./components/HeaderPage";


function App() {
  return (
    <div className="App">
      <Header/>
      <SecretSanta />
    </div>
  );
}

export default App;
