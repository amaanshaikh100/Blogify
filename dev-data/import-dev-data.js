const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Blog = require("./../../backend/models/blogModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

async function main() {
  try {
    const connection = await mongoose.connect(DB);
    console.log("DB Connection Successful");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

main();

const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/dummy-data.json`, "utf-8")
);

const importData = async () => {
  try {
    await Blog.create(blogs);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Blog.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
