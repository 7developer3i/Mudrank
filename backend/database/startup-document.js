const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  database: process.env.DATABASE_NAME,
});

// Create the documents table
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database!");
  try {
    const documetQuery = `
      CREATE TABLE documents (
        id INT NOT NULL AUTO_INCREMENT,
        document_type VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        startup_id INT NOT NULL,
        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
        status VARCHAR(255) NOT NULL DEFAULT 'Pending',
        PRIMARY KEY (id),
        FOREIGN KEY (startup_id) REFERENCES startups (id)
      );
      `
    db.query(documetQuery, (err, result) => {
      if (err) throw err;
      console.log("Documents table created successfully");
    });
  } catch (error) {
    console.error(`Error creating documents table: ${error.message}`);
  }
});

module.exports = db;