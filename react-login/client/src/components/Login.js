import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/auth/login", { username, password });
            localStorage.setItem("token", response.data.token);
            onLogin();
            navigate("/userinfo");
        } catch (err) {
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>
                New user? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default Login;
