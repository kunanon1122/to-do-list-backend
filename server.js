const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Define a health check endpoint
app.use("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/column/", require("./api/api_column"));
app.use("/api/card/", require("./api/api_card"));
app.use("/api/auth/", require("./api/api_auth"));

const port = process.env.PORT || 8085;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
