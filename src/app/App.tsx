import { useState, useEffect } from "react";
import "./styles/variables.css"; 
import "./styles/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage/AuthPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
