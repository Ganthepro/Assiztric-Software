const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

app.use(express.json());
app.use(cors());

async function middleware(req, res, next) {
  const token = req.headers["token"];
  if (!token) return res.status(401).send("Access denied, token missing");
  const respone = await fetch(
    `https://api.line.me/oauth2/v2.1/verify?access_token=${token}`,
    {
      method: "GET",
    }
  );
  if (!respone.ok) return res.status(401).send("Invalid token");
  next();
}

app.post("/auth", middleware, async (req, res) => {
  console.log(req.body);

  try {
    const userExists = await db.findUser(req.body.userId, true);
    console.log(userExists); // This will log the boolean value

    if (userExists) {
      return res.status(200).send("User already exists");
    }

    await db.addUser(req.body);

    // Check user after adding
    const addedUser = await db.findUser(req.body.userId, false);
    console.log(addedUser); // This will log the user data as JSON

    // Send response or perform other operations based on addedUser if needed

    // Send a success response
    return res.status(200).send("User added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error processing request");
  }
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
