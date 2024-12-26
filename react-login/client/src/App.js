import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route
                    path="/userinfo"
                    element={isAuthenticated ? <UserInfo /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
