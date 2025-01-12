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

// get card by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error("Error bad request get-card-by-id");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const sql =
    "SELECT id, title, step, priority, tag, description, CONVERT_TZ(create_date, '+00:00', '+07:00') AS create_date, CONVERT_TZ(update_date, '+00:00', '+07:00') AS update_date FROM todolist.cards WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error get-card-by-id:", err);
      res.status(400).send({ message: "something wrong" });
      return;
    }

    res.json(results[0]);
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

      return res.status(200).send({ message: "create card success!" });
    }
  );
});

// put update card description
router.put("/update-card-description", (req, res) => {
  const { id, description } = req.body;

  if (!id) {
    console.error("Error bad request update-card-description");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const sql = "UPDATE todolist.cards SET description = ? WHERE id = ?";
  connection.query(sql, [description, id], (err, results) => {
    if (err) {
      console.error("Error update-card-description:", err);
      res.status(400).send({ message: "something wrong" });
      return;
    }

    return res
      .status(200)
      .send({ message: "update card description success!" });
  });
});

// put update step card
router.put("/update-step-card", (req, res) => {
  const { id, step } = req.body;

  if (!id || !step) {
    console.error("Error bad request update-step-card");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const sql = "UPDATE todolist.cards SET step = ? WHERE id = ?";
  connection.query(sql, [step, id], (err, results) => {
    if (err) {
      console.error("Error update-step-card:", err);
      res.status(400).send({ message: "something wrong" });
      return;
    }

    return res.status(200).send({ message: "update step card success!" });
  });
});

// delete card
router.delete("/delete-card", (req, res) => {
  const { id } = req.body;

  if (!id) {
    console.error("Error bad request delete-card");
    res.status(400).send({ message: "bad request" });
    return;
  }

  const sql = "DELETE FROM todolist.cards WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error delete-card:", err);
      res.status(400).send({ message: "something wrong" });
      return;
    }

    return res.status(200).send({ message: "delete card success!" });
  });
});

module.exports = router;
