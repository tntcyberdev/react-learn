import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({ username: "", password: "", age: "", nationality: "" });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            // Register the new user
            await axios.post("http://localhost:5000/auth/register", formData);

            // Automatically log the user in
            const loginResponse = await axios.post("http://localhost:5000/auth/login", {
                username: formData.username,
                password: formData.password,
            });

            // Store the token in localStorage
            localStorage.setItem("token", loginResponse.data.token);

            // Update authentication state and redirect to profile page
            setIsAuthenticated(true);
            navigate("/userinfo");
        } catch (err) {
            alert("Registration failed!");
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                placeholder="Username"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
                placeholder="Age"
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <input
                placeholder="Nationality"
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
