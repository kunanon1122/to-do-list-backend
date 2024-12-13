const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send({ message: "Login: " + username + ", " + password });
});

module.exports = router;
