const processRoutes = require("./routes/process");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", processRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AEGIS Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AEGIS backend running on port ${PORT}`);
});