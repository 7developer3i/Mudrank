const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

//Create Profile Module

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    const sql = `
        CREATE TABLE IF NOT EXISTS profile (
          id INT(11) NOT NULL AUTO_INCREMENT,
          user_id INT(11) NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20) NOT NULL,
          address VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          postal_code VARCHAR(20) NOT NULL,
          created_date DATETIME NOT NULL,
          updated_date DATETIME NOT NULL,
          is_deleted BOOLEAN NOT NULL DEFAULT 0,
          status VARCHAR(20) NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (user_id) REFERENCES user(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        );
      `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Profile table created successfully');
        db.end();
    });
});


module.exports = db;