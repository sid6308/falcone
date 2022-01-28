import { Routes, Route } from "react-router-dom";
import Falcone from "./components/Falcone";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Reset } from "./components/Reset";

function App() {
  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={Home}></Route>
        <Route path="/" element={Reset}></Route>
      </Routes> */}
      <Falcone />
      <Footer />
    </>
  );
}

export default App;
