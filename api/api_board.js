const express = require("express");
const router = express.Router();

router.get("/columns", (req, res) => {

  res.send("board columns data");
});

module.exports = router;
