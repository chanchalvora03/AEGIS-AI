const express = require("express");
const router = express.Router();

const {
  processTask
} = require("../controllers/processController");

router.post("/process", processTask);

module.exports = router;