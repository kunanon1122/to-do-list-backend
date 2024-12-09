const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send("AA");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.end("Login: " + username + ", " + password);
});

app.listen(8085, () => {
  console.log("Server is running");
});
