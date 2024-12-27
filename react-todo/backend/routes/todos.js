const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Unauthorized!" });

    jwt.verify(token, "supersecretkey", (err, decoded) => {
        if (err) return res.status(403).json({ error: "Unauthorized!" });
        req.user = decoded;
        next();
    });
};

// Get all todos for authenticated user
router.get("/", authenticateToken, (req, res) => {
    const sql = "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC";
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create new todo
router.post("/", authenticateToken, (req, res) => {
    const { title } = req.body;
    const sql = "INSERT INTO todos (user_id, title) VALUES (?, ?)";
    db.query(sql, [req.user.id, title], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ title, completed: false });
    });
});

// Update todo
router.put("/:id", authenticateToken, (req, res) => {
    const { title, completed } = req.body;
    
    const sql = "UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [title, completed, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Todo not found" });
        res.json({ id: req.params.id, title, completed });
    });
});

// Delete todo
router.delete("/:id", authenticateToken, (req, res) => {
    const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Todo not found" });
        res.json({ message: "Todo deleted successfully" });
    });
});

module.exports = router;