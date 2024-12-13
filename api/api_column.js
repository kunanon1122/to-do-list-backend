const express = require("express");

const router = express.Router();
const connection = require("../db");

// get all columns
router.get("/columns", (req, res) => {
  const sql = "SELECT * FROM todolist.`board-columns`";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send({ message: "Server error" });
      return;
    }
    res.json(results);
  });
});

// post create column
router.post("/create-column", (req, res) => {
  const { title } = req.body;

  if (!title) {
    console.error("Error bad request create-column");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const step = title.toLowerCase().replace(" ", "-");

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
