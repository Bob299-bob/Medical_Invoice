const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Get Medicines
app.get("/api/medicines", (req, res) => {
  const sql = "SELECT * FROM medicines";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error getting medicines",
      });
    }

    res.json(result);
  });
});

// Save Invoice
app.post("/api/invoice", (req, res) => {
  const { name, medicine, quantity, price, total } = req.body;

  const sql = `
    INSERT INTO invoices
    (customer_name, medicine, quantity, price, total)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, medicine, quantity, price, total], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Invoice save failed",
      });
    }

    res.json({
      message: "Invoice saved successfully",
      invoiceId: result.insertId,
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
