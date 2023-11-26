const express = require("express");
const app = express();
const querystring = require('querystring');
// const db = require("./db");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post("/auth", async (req, res) => {
  const token = req.body.access_token;
  console.log(token);
  const respone = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: querystring.stringify({ access_token: token }),
  });
  console.log(respone.json());
  res.send(respone.json());
  // respone.json().then(async (json) => {
  //   const user = await db.getUser(json);
  //   if (user) {
  //     res.send(user);
  //   } else {
  //     const newUser = await db.createUser(json);
  //     res.send(newUser);
  //   }
  // });
});

// app.get("/auth", async (req, res) => {
//   const url = new URLSearchParams(req.url.split("?")[1])
//   const code = url.get("code");
//   const redirect_uri = url.get("liffRedirectUri");
//   const client_id = url.get("liffClientId");
//   const data = {
//     grant_type: "authorization_code",
//     code: code,
//     redirect_uri: redirect_uri,
//     client_id: client_id,
//     client_secret: process.env.CLIENT_SECRET,
//   };
//   const encodedData = querystring.stringify(data);
//   console.log(encodedData);
//   const respone = await fetch("https://api.line.me/v2/oauth/accessToken", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: encodedData,
//   });
//   const json = await respone.json();
//   console.log(json);
//   res.send(json);
// });

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app; 