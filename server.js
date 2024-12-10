const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded());

app.use("/api/board/", require("./api/api_board"));
app.use("/api/auth/", require("./api/api_auth"));

app.listen(8085, () => {
  console.log("Server is running");
});
