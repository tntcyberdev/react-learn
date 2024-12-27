const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "12345679", // Replace with your MySQL password
    database: "react_todo"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to database: ", db.config.database);
});

module.exports = db;


/* SQL Commands to create the database and tables
CREATE DATABASE react_todo;
USE react_todo;
ALTER TABLE users MODIFY id BINARY(16);
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id BINARY(16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_todos (user_id)
);
*/