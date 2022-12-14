import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/landing-page/LandingPage";
import LoginPage from "./components/views/login-page/LoginPage";
import RegisterPage from "./components/views/register-page/RegisterPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;