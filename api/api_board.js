const express = require("express");

const router = express.Router();
const connection = require("../db");

// get all columns
router.get("/columns", (req, res) => {
  const sql = "SELECT * FROM todolist.`board-columns`";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

// get all cards
router.get("/cards", (req, res) => {
  const sql = "SELECT * FROM todolist.`cards`";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

module.exports = router;
