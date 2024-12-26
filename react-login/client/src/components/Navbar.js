import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/userinfo" style={{ marginRight: "10px" }}>Profile</Link>
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
