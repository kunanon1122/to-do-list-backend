const express = require("express");

const router = express.Router();
const connection = require("../db");

// ----- Get all columns -----
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

// ----- Post create column -----
router.post("/create-column", (req, res) => {
  const { title } = req.body;

  if (!title) {
    console.error("Error bad request create-column");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const step = title.toLowerCase().replace(" ", "-");

  // Get Check Title or step already exists
  const checkSql =
    "SELECT * FROM todolist.`board-columns` WHERE title = ? OR step = ?";
  connection.query(checkSql, [title, step], (err, results) => {
    if (err) {
      console.error("Error checking existing columns:", err);
      res.status(500).send({ message: "Server error" });
      return;
    }

    if (results.length > 0) {
      res.status(400).send({ message: "Title or step already exists" });
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

      return res.status(200).send({ message: "create column success!" });
    });
  });
});

// ----- Delete column -----
router.delete("/delete-column/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error("Error bad request delete-column");
    res.status(400).send({ message: "bad request" });
    return;
  }

  // Get the step with column id
  const getStepSql = "SELECT step FROM todolist.`board-columns` WHERE id = ?";
  connection.query(getStepSql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching step:", err);
      res.status(500).send({ message: "Server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).send({ message: "Column not found" });
      return;
    }
    const step = results[0].step;

    // Delete the column
    const deleteColumnSql = "DELETE FROM todolist.`board-columns` WHERE id = ?";
    connection.query(deleteColumnSql, [id], (err, results) => {
      if (err) {
        console.error("Error deleting column:", err);
        res.status(500).send({ message: "Server error" });
        return;
      }

      // Delete cards in column with step
      const deleteCardsSql = "DELETE FROM todolist.cards WHERE step = ?";
      connection.query(deleteCardsSql, [step], (err, results) => {
        if (err) {
          console.error("Error deleting cards:", err);
          res.status(500).send({ message: "Server error" });
          return;
        }
      });
    });

    return res.status(200).send({ message: "delete column success!" });
  });
});

module.exports = router;
