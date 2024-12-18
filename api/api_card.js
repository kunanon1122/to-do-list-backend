const express = require("express");

const router = express.Router();
const connection = require("../db");

// get all cards
router.get("/cards", (req, res) => {
  const sql = "SELECT * FROM todolist.`cards`";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send({ message: "Server error" });
      return;
    }
    res.json(results);
  });
});

// post create card
router.post("/create-card", (req, res) => {
  const { title, step, priority, tag } = req.body;

  if (!title || !step) {
    console.error("Error bad request create-card");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const priorityValue = priority ? priority : "";
  const tagValue = tag ? tag : "";

  const sql =
    "INSERT INTO todolist.cards (title, step, priority, tag) VALUES (?, ?,?,?)";
  connection.query(
    sql,
    [title, step, priorityValue, tagValue],
    (err, results) => {
      if (err) {
        console.error("Error create-card:", err);
        res.status(400).send({ message: "something wrong" });
        return;
      }
      return res.status(201).send({ message: "create card success!" });
    }
  );
});

module.exports = router;
