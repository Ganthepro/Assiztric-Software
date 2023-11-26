const express = require("express");
const app = express();
const cors = require("cors");
// const db = require("./db");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  displayName: String,
  pictureUrl: String,
});

const User = mongoose.model("User", userSchema, "users");

app.use(express.json());
app.use(cors());

async function middleware(req, res, next) {
  const token = req.headers["token"];
  if (!token) return res.status(401).send("Access denied, token missing");
  const respone = await fetch(`https://api.line.me/oauth2/v2.1/verify?access_token=${token}`, {
    method: "GET"
  });
  if (!respone.ok) return res.status(401).send("Invalid token");
  next();
}

async function findUser(userId) {
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) return console.error("User not found");
    return user; // Send the user data as JSON
  } catch (err) {
    console.error(err);
    return false;
  }
}

app.post("/auth", middleware, async (req, res) => {
  console.log(req.body);
  console.log(findUser(req.body.userId));
  if (findUser(req.body.userId)) return res.status(200).send("User already exists");
  db.addUser(req.body);
  console.log(findUser(req.body.userId, false));
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
