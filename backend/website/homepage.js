const express = require("express");
const router = express.Router();
const connection = require("../database.js");

/* Blog Routes */

// Get all blog
router.get("/blog", (req, res) => {
  if (req.query.adminid) {
    const Dquery = "SELECT * FROM user where id = ?";
    connection.query(Dquery, [req.query.adminid], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch investors" });
        return;
      }
      if (result[0].token == req.query.token) {
        const query = "SELECT * FROM blog";
        connection.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching investors: ", err);
            res.status(500).json({ error: "Failed to fetch investors" });
            return;
          }
          setTimeout(() => {
            res.json(results);
          }, 1000);
        });
      } else {
        res.status(400).json({ message: "missing token" });
      }
    });
  } else {
    const query = "SELECT * FROM blog";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching investors: ", err);
        res.status(500).json({ error: "Failed to fetch investors" });
        return;
      }
      setTimeout(() => {
        res.json(results);
      }, 1000);
    });
  }
});

// Create blog data
router.post("/blog", (req, res) => {
  const Dquery = "SELECT * FROM user where id = 26";
  connection.query(Dquery, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }
    const blog = req.body;
    const currentDate = new Date().toISOString();
    blog.created_date = currentDate;
    blog.updated_date = currentDate;
    blog.is_deleted = 0;
    if (result[0].token == req.query.token) {
      const query = "INSERT INTO blog SET ?";
      connection.query(query, blog, (err, result) => {
        if (err) {
          console.error("Error creating investor: ", err);
          res.status(500).json({ error: "Failed to create investor" });
          return;
        }
        res.json({
          message: "blog created",
          id: result.insertId,
        });
      });
    } else {
      res.status(400).json({ message: "missing token" });
    }
  });
});

// Update a blog
router.post("/blog/:id", (req, res) => {
  const blogId = req.params.id;
  const updatedBlog = req.body;
  const currentDate = new Date().toISOString();
  updatedBlog.updated_date = currentDate;

  const query = "UPDATE blog SET ? WHERE id = ?";
  connection.query(query, [updatedBlog, blogId], (err, result) => {
    if (err) {
      console.error("Error updating blog: ", err);
      res.status(500).json({ error: "Failed to update blog" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.json({ message: "Blog updated", success: true });
  });
});

// Delete a blog
router.delete("/blog/:id", (req, res) => {
  const Dquery = "SELECT * FROM user where id = ?";
  connection.query(Dquery, [req.query.adminid], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch investors" });
      return;
    }

    const blogId = req.params.id;
    if (result[0].token == req.query.token) {
      const query = "UPDATE blog SET is_deleted = 1 WHERE id = ?";
      connection.query(query, [blogId], (err, result) => {
        if (err) {
          console.error("Error deleting blog: ", err);
          res.status(500).json({ error: "Failed to delete blog" });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Blog not found" });
          return;
        }

        res.json({ message: "Blog deleted" });
      });
    } else {
      res.status(400).json({ message: "missing token" });
    }
  });
});

/* Happy Customers Routes */

//create customer
router.post("/customer", (req, res) => {
  const blog = req.body;
  const currentDate = new Date().toISOString();
  blog.created_date = currentDate;
  blog.updated_date = currentDate;
  blog.is_deleted = 0;

  const query = "INSERT INTO h_customer SET ?";
  connection.query(query, blog, (err, result) => {
    if (err) {
      console.error("Error creating h_customer: ", err);
      res.status(500).json({ error: "Failed to create customer" });
      return;
    }
    res.json({
      message: "customer created",
      id: result.insertId,
    });
  });
});

router.get("/customer", (req, res) => {
  const query = "SELECT * FROM h_customer";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching customer: ", err);
      res.status(500).json({ error: "Failed to fetch customer" });
      return;
    }
    setTimeout(() => {
      res.json(results);
    }, 1000);
  });
});

// Update a customer
router.post("/customer/:id", (req, res) => {
  const customerId = req.params.id;
  const updatedcustomer = req.body;
  const currentDate = new Date().toISOString();
  updatedcustomer.updated_date = currentDate;

  const query = "UPDATE h_customer SET ? WHERE id = ?";
  connection.query(query, [updatedcustomer, customerId], (err, result) => {
    if (err) {
      console.error("Error updating customer: ", err);
      res.status(500).json({ error: err });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "customer not found" });
      return;
    }
    res.json({ message: "customer updated" });
  });
});

// Delete a customer
router.delete("/customer/:id", (req, res) => {
  const customerId = req.params.id;

  const query = "UPDATE h_customer SET is_deleted = 1 WHERE id = ?";
  connection.query(query, [customerId], (err, result) => {
    if (err) {
      console.error("Error deleting customer: ", err);
      res.status(500).json({ error: "Failed to delete customer" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "customer not found" });
      return;
    }
    res.json({ message: "customer deleted" });
  });
});

/* Partners Routes */

//create partners
router.post("/partners", (req, res) => {
  const blog = req.body;
  const currentDate = new Date().toISOString();
  blog.created_date = currentDate;
  blog.updated_date = currentDate;
  blog.is_deleted = 0;

  const query = "INSERT INTO partners SET ?";
  connection.query(query, blog, (err, result) => {
    if (err) {
      console.error("Error creating partners: ", err);
      res.status(500).json({ error: "Failed to create partners" });
      return;
    }
    res.json({
      message: "partners created",
      id: result.insertId,
    });
  });
});

// Get all partners
router.get("/partners", (req, res) => {
  const query = "SELECT * FROM partners";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching partners: ", err);
      res.status(500).json({ error: "Failed to fetch partners" });
      return;
    }
    setTimeout(() => {
      res.json(results);
    }, 1000);
  });
});

// Update a partners
router.put("/partners/:id", (req, res) => {
  const partnersId = req.params.id;
  const updatedpartners = req.body;
  const currentDate = new Date().toISOString();
  updatedpartners.updated_date = currentDate;

  const query = "UPDATE partners SET ? WHERE id = ?";
  connection.query(query, [updatedpartners, partnersId], (err, result) => {
    if (err) {
      console.error("Error updating partners: ", err);
      res.status(500).json({ error: "Failed to update partners" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "partners not found" });
      return;
    }

    res.json({ message: "partners updated" });
  });
});

// Delete a partners
router.delete("/partners/:id", (req, res) => {
  const partnersId = req.params.id;

  const query = "UPDATE partners SET is_deleted = 1 WHERE id = ?";
  connection.query(query, [partnersId], (err, result) => {
    if (err) {
      console.error("Error deleting partners: ", err);
      res.status(500).json({ error: "Failed to delete partners" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "partners not found" });
      return;
    }

    res.json({ message: "partners deleted" });
  });
});

module.exports = router;
