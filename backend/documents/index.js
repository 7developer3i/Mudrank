const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const connection = require("../database.js");

// Set up a multer storage engine for saving files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = uuidv4() + ext;
    cb(null, fileName);
  },
});

// Set up a multer instance for handling file uploads
const upload = multer({ storage });

// Route for uploading an MOA file
router.post("/upload/docs", upload.array("files", 4), function (req, res) {
  try {
    const files = req.files;
    const documentType = req.body.documentType;
    const startup_id = req.body.startup_id;
    const status = "verified";
    const created_date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const updated_date = created_date;

    const documents = []; // an array to store the merged data

    for (let i = 0; i < files.length; i++) {
      documents.push({
        file: files[i],
        documentType: documentType[i],
      });
    }

    documents.forEach((files) => {
      const filePath = files.file.path;
      const filePath_new = path.basename(filePath);
      const query = `INSERT INTO startup_documents (document_type, file_name, file_path, startup_id, created_date, updated_date, status) 
      VALUES ('${files.documentType}', '${files.file.originalname}', 'uploads//${filePath_new}', '${startup_id}', '${created_date}', '${updated_date}', '${status}')`;

      connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(`File ${files.file.originalname} inserted successfully`);
      });
    });
    res
      .status(200)
      .send({ success: true, message: "Documents save successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading files");
  }
});

// Define a route to fetch startup documents by ID
router.get("/startup/:startupId/documents", (req, res) => {
  try {
    const startupId = req.params.startupId;
    const sql = "SELECT * FROM startup_documents WHERE startup_id = ?";
    connection.query(sql, [startupId], (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

router.post("/documents/type", (req, res) => {
  const type = req.body.type;
  const startup_id = req.body.startupId;
  try {
    const sql =
      "SELECT * FROM startup_documents WHERE document_type = ? and startup_id = ?";
    connection.query(sql, [type, startup_id], (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving documents");
      } else {
        res.send(results);
      }
    });
  } catch (error) {
    res.status(500).send({success:false, message:"Internal server error"})
  }
});

// route to display the file contents in an input field for editing
router.get("/edit-file/:fileId", (req, res) => {
  const fileId = req.params.fileId;
  connection.query(
    "SELECT file_name FROM startup_documents WHERE id = ?",
    [fileId],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        const filePath = results[0].file_name;
        res.status(200).send({success:true, fileName:filePath});
      } else {
        res.send("File not found.");
      }
    }
  );
});

module.exports = router;
