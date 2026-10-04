import React from "react";
import Navbar from "./components/Navbar";
import Side from "./components/Side";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Medical from "./pages/Medical";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="flex">
        <Side />

        <div className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<Medical />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;