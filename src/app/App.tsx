import { useState, useEffect } from "react";
import "./styles/variables.css"; 
import "./styles/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { MainPage } from "../pages/MainPage/MainPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route path="/main" element={<MainPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
