const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");

  const privacyTableQuery = `
  CREATE TABLE privacy_Table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    para_item VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    is_deleted BOOLEAN NOT NULL,
    status VARCHAR(255) NOT NULL
);`;

  const AbouePgae = `
  CREATE TABLE IF NOT EXISTS aboutpage_Table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT
  )
`;

  const createcuratedPage = `
  CREATE TABLE IF NOT EXISTS curated_Table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT
  )
`;

  const createnomineeTable = `
  CREATE TABLE IF NOT EXISTS nomineetwo_Table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    ParentName VARCHAR(255),
    Relationship VARCHAR(255),
    ContactNumber VARCHAR(15),
    created_date DATETIME NOT NULL,
  updated_date DATETIME,
  is_deleted BOOLEAN NOT NULL,
  status VARCHAR(255) NOT NULL
  )
`;
  const createImageTable = `

CREATE TABLE imagetwo_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_data LONGBLOB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

  const createchartQuery = `
  CREATE TABLE chartone_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    data INT NOT NULL,
    borderColor VARCHAR(255) NOT NULL,
    borderWidth INT NOT NULL,
    fill BOOLEAN NOT NULL
  );
  `;

  const MissionPage = `
CREATE TABLE IF NOT EXISTS mission_Table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT
)
`;

  const RaiseTableQuery = `
  CREATE TABLE IF NOT EXISTS raise_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    your_name VARCHAR(255),
    registered_company_name VARCHAR(255),
    company_email VARCHAR(255),
    website VARCHAR(255),
    company_linkedin VARCHAR(255),
    founder_linkedin VARCHAR(255),
    previous_fundraising TEXT,
    product_description TEXT,
    traction_description TEXT,
    revenue_description TEXT,
    team_size INT,
    community_round_reason TEXT,
    mudrank_fit_description TEXT,
    existing_commitments TEXT,
    private_round_interest ENUM('Yes', 'No'),
    pitch_file VARCHAR(255)
  )
`;

  const FrequentlyTableQuery = `
CREATE TABLE frequently_Table(
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL,
  created_date DATETIME NOT NULL,
  updated_date DATETIME,
  is_deleted BOOLEAN NOT NULL,
  status VARCHAR(255) NOT NULL
);
`;
  const FooterTableQuery = `
CREATE TABLE footertwo_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name JSON NOT NULL,
  created_date DATETIME NOT NULL,
  updated_date DATETIME,
  is_deleted BOOLEAN NOT NULL,
  status VARCHAR(255) NOT NULL
);

`;

  const AboutContentQuery = `
CREATE TABLE htmlcontent_Table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT
);

`;

  const faqTableQuery = `
CREATE TABLE faq_Table(
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL,
  created_date DATETIME NOT NULL,
  updated_date DATETIME,
  is_deleted BOOLEAN NOT NULL,
  status VARCHAR(255) NOT NULL
);

`;

  const browseTableQuery = `
CREATE TABLE IF NOT EXISTS browse_Table (
  id INT PRIMARY KEY AUTO_INCREMENT,
  describe_item VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  created_date DATETIME NOT NULL,
  updated_date DATETIME,
  is_deleted BOOLEAN NOT NULL,
  status VARCHAR(255) NOT NULL
);`;

  const FounderTableQuery = `CREATE TABLE Founder_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  textone VARCHAR(255),
  heading VARCHAR(255),
  paratext TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_deleted BOOLEAN NOT NULL,
  status ENUM('Active', 'Inactive')
);
`;

  const FundraisingTableQuery = `
  CREATE TABLE fundraising_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Image VARCHAR(255),
    title VARCHAR(255),
    paragraph TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN,
    status ENUM('Active', 'Inactive')
  )
`;

  const StartUpTableQuery = `
  CREATE TABLE IF NOT EXISTS StartUp_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Image VARCHAR(255),
    title VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN,
    status ENUM('Active', 'Inactive')
  )
`;
  // create the table
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS investor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    postal_code VARCHAR(20),
    kyc_verified BOOLEAN,
    created_date DATETIME,
    updated_date DATETIME,
    is_deleted BOOLEAN,
    status VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES investor_users(id)
  )
`;

  // Create the "investment" table
  const createInvestmentTableQuery = `
   CREATE TABLE IF NOT EXISTS investment (
     id INT PRIMARY KEY AUTO_INCREMENT,
     investor_id INT,
     startup_id INT,
     amount DECIMAL(10, 2),
     investment_date DATETIME,
     created_date DATETIME,
     updated_date DATETIME,
     is_deleted BOOLEAN,
     status VARCHAR(255),
     FOREIGN KEY (investor_id) REFERENCES investor(id),
     FOREIGN KEY (startup_id) REFERENCES startups(id)
   )
 `;

  //create KYC documents table
  const createKYCDOcumentsTableQuery = `
  CREATE TABLE IF NOT EXISTS kyc_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date_of_birth DATE,
    document_number VARCHAR(50),
    access_token VARCHAR(255),
    status ENUM('valid', 'invalid', 'pending') DEFAULT 'pending',
    created_date DATETIME,
    updated_date DATETIME,
    is_deleted BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES investor_users(id)
  );
  `;

  //create  Bank details table
  const createBankDetailsTableQuery = `
  CREATE TABLE IF NOT EXISTS bank_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    ifsc_code VARCHAR(11),
    account_number VARCHAR(50),
    account_holder_name VARCHAR(255),
    bank_name VARCHAR(255),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES investor_users(id)
  );
`;

const createInvestorUSerQuery = `
CREATE TABLE IF NOT EXISTS investor_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20) UNIQUE,
  verified BOOLEAN DEFAULT false,
  otp VARCHAR(6),
  otp_expiry TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  token VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN DEFAULT false, -- Add is_deleted column
  is_logged_out BOOLEAN DEFAULT false, -- Add is_logged_out column
  role ENUM('admin', 'superadmin', 'investor', 'customer') DEFAULT 'investor' -- Add role column with ENUM type
);
`;


  
  const paymentTable = `CREATE TABLE payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    razorpay_order_id VARCHAR(255) NOT NULL,
    razorpay_payment_id VARCHAR(255) NOT NULL,
    razorpay_signature VARCHAR(255) NOT NULL,
    payment_status ENUM('valid', 'pending', 'failed') NOT NULL DEFAULT 'pending',
    payment_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES investor_users(id)
  );  
  `;
  // for pancard accesstoken table

  db.query(createInvestorUSerQuery, (err, result) => {
    if (err) throw err;
    console.log("Investment table created successfully");
    db.end();
  });
});

module.exports = db;
