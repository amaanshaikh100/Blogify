const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "./config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, (req, res) => {
  console.log(`LISTENING ON PORT ${PORT}...`);
});
