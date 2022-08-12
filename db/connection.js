const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password 
    password: '',
    database: 'election'
  });

  db.connect(err => {
    if (err) throw err;
    console.log("For the thousands in attendence and the millions watching around the world...Let's get ready to track the employees!");
    
  });
  



  module.exports = db;