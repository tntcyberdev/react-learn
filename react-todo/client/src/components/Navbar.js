import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/");
    };

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><Link className="nav-link" to="/" >Home</Link></li>
                    
                        {isAuthenticated ? (
                        <>
                        
                        <li class="nav-item"><Link className="nav-link" to="/todos">My Todos</Link></li>
                        <li class="nav-item"><Link className="nav-link" to="/userinfo" style={{ marginRight: "10px" }}>Profile</Link></li>
                        <li class="nav-item"><button onClick={handleLogoutClick}>Logout</button></li>
                        </>
                        ) : (
                        <>
                        <li class="nav-item"><Link className="nav-link" to="/login" style={{ marginRight: "10px" }}>Login</Link></li>
                        <li class="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        </>
                        )}
                    </ul>
                </div>
            </div>    
        </nav>
    );
}

export default Navbar;
