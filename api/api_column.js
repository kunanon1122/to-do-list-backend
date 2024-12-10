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

// post create column
router.post("/create-column", (req, res) => {
  const { title, step } = req.body;

  if (!title || !step) {
    console.error("Error bad request create-column");
    res.status(400).send("bad request");
    return;
  }

  const sql =
    "INSERT INTO todolist.`board-columns` (title, step) VALUES (?, ?)";
  connection.query(sql, [title, step], (err, results) => {
    if (err) {
      console.error("Error create-column:", err);
      res.status(400).send("something wrong");
      return;
    }
    return res.status(201).send({ message: "create column success!" });
  });
});

module.exports = router;
