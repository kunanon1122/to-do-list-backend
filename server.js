const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());

app.use("/api/board/", require("./api/api_board"));
app.use("/api/auth/", require("./api/api_auth"));

const port = 8085;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
