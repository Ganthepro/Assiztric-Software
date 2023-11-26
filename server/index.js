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

  try {
    const response = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${token}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) return res.status(401).send("Invalid token");

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error verifying token");
  }
}

app.post("/auth", middleware, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });

    if (!user) {
      return res.status(200).send("User not found");
    }

    return res.status(200).json(user); // Send the user data as JSON
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error finding user");
  }
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
