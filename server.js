const express = require("express");

const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(bodyParser.urlencoded());
app.use("/api/board/", require("./api/api_board"));
app.use("/api/auth/", require("./api/api_auth"));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connection: ", err);
    return;
  }
  console.log("Connection success");
});

app.listen(8085, () => {
  console.log("Server is running");
});
