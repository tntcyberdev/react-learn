const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SECRET = "supersecretkey"; // Use a more secure secret in production

// Register User with UUID
router.post("/register", async (req, res) => {
    const { username, password, age, nationality } = req.body;
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (id, username, password, age, nationality) VALUES (?, ?, ?, ?, ?)";
    
    console.log("username: ", username, "id: ", id);//debug

    db.query(sql, [id, username, hashedPassword, age, nationality], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User registered successfully!" });
    });
});

// Login User
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials!" });

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials!" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1h" });
        res.json({ token });
    });
});

// Get User Info
router.get("/userinfo", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Unauthorized!" });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Unauthorized!" });

        const sql = "SELECT username, age, nationality FROM users WHERE id = ?";
        db.query(sql, [decoded.id], (err, results) => {
            if (err || results.length === 0) return res.status(404).json({ error: "User not found!" });
            res.json(results[0]);
        });
    });
});

// Update Age and Nationality
router.put("/update", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Unauthorized!" });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Unauthorized!" });

        const { age, nationality } = req.body;
        const sql = "UPDATE users SET age = ?, nationality = ? WHERE id = ?";
        db.query(sql, [age, nationality, decoded.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Profile updated successfully!" });
        });
    });
});

module.exports = router;
