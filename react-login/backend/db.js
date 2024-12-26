const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your MySQL username
    password: "12345679", // Replace with your MySQL password
    database: "react_login_app"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

module.exports = db;
