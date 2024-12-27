import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import UserInfo from "./components/UserInfo";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        // Add any additional login logic here
      };


    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div style={{ padding: "20px" }}>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onLogin={handleLogin}/>} />
                <Route path="/userinfo" element={<UserInfo />}
                />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
