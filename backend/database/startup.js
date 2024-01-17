const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: '',
    database: process.env.DATABASE_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');

    const createTableQuery = `
    CREATE TABLE startups (
        id INT PRIMARY KEY AUTO_INCREMENT,
        company_name VARCHAR(255),
        address VARCHAR(255),
        contact_info VARCHAR(255),
        description TEXT,
        investment_goal DECIMAL(10, 2),
        business_plan_url VARCHAR(255),
        financial_statements_url VARCHAR(255),
        pitch_deck_url VARCHAR(255),
        website_link VARCHAR(255),
        logo_url VARCHAR(255),
        end_date DATE,
        funding_time_limit INT,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date DATETIME,
        is_deleted BOOLEAN DEFAULT false,
        status VARCHAR(255) DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES user(id)
      );
      
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Startup table created!');
    });

    //Create startup highlight table
    // const createHighlightTableQuery = `CREATE TABLE startup_highlights (
    //   id INT AUTO_INCREMENT PRIMARY KEY,
    //   startup_id INT,
    //   highlight_key VARCHAR(255),
    //   highlight_value VARCHAR(255),
    //   FOREIGN KEY (startup_id) REFERENCES startups(id)
    // )`;
    // db.query(createHighlightTableQuery, (err, result) => {
    //     if (err) throw err;
    // });

});

module.exports = db;