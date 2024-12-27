import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserInfo from "./components/UserInfo";

function App() {
  // User Auth
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Add any additional login logic here
  };

  return (
    <main className="main">
      <div class="container">

        <Router>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/register"
                element={<Register onLogin={handleLogin} />}
              />
              <Route path="/userinfo" element={<UserInfo />} />
              <Route path="/todos" element={isAuthenticated ? 
                <TodoList /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>

      </div>
    </main>
  );
}

export default App;

