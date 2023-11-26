const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

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

app.post("/auth", middleware, async (req, res) => {
  console.log(req.body);
  console.log(db.findUser(req.body.userId, true));
  if (db.findUser(req.body.userId, true)) return res.status(200).send("User already exists");
  db.addUser(req.body);
  console.log(db.findUser(req.body.userId, false));
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
