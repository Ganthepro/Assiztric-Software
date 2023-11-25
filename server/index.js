const express = require("express");
const app = express();
const querystring = require('querystring');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth", async (req, res) => {
  const code = new URLSearchParams(req.url.split("?")[1]).get("code");
  const redirect_uri = new URLSearchParams(req.url.split("?")[1]).get("liffRedirectUri");
  const client_id = new URLSearchParams(req.url.split("?")[1]).get("liffClientId");
  // console.log(code);
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    client_secret: process.env.CLIENT_SECRET,
  };
  const encodedData = querystring.stringify(data);
  console.log(encodedData);
  const respone = await fetch("https://api.line.me/v2/oauth/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodedData,
  });
  const json = await respone.json();
  console.log(json);
  res.send(json);
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app; 