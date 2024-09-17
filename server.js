const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// read .env file
dotenv.config({ path: "./config.env" });

// connecting mongo db to mongoose
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

async function main() {
  const connection = await mongoose.connect(DB);
  console.log("DB Connection Successful");
}

main();

// listening on port
const PORT = process.env.PORT || 6000;
app.listen(PORT, (req, res) => {
  console.log(`LISTENING ON PORT ${PORT}...`);
});
