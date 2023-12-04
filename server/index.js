const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
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
const applianceSchema = new Schema({
  userId: String,
  Type: String,
  Model: String,
  Brand: String,
  Usage: Number,
  UsageBehavior: String,
});
const notificationSchema = new Schema({
  userId: String,
  code: Number, // 0: Tip, 1: Alert, 2: Ft
  time: String,
  detail: String,
});

const User = mongoose.model("User", userSchema, "users");
const Appliance = mongoose.model("Appliance", applianceSchema, "appliance");
const Notification = mongoose.model("Notification", notificationSchema, "notification");

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
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error verifying token");
  }
}
// ทำเรื่องส่งข้อมูลแบบเรียลไทม์
app.post("/addNotification", middleware, (req, res) => {
  const data = req.body;
  const newNotification = new Notification({
    userId: data.userId,
    code: data.code,
    time: data.time,
    detail: data.detail,
  });
  newNotification
    .save()
    .then((result) => {
      console.log("New notification saved:", result);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving notification:", err);
      return res.json(err);
    });
});

app.get("/getNotification", middleware, (req, res) => {
  const userId = req.query.userId;
  Notification.find({ userId: userId })
    .then((result) => {
      console.log("Notification found:", result);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error finding notification:", err);
      return res.json(err);
    });
});

app.post("/addApplianceData", middleware, (req, res) => {
  const data = req.body;
  const newAppliance = new Appliance({
    userId: data.userId,
    Type: data.Type,
    Model: data.Model,
    Brand: data.Brand,
    Usage: data.Usage,
    UsageBehavior: data.UsageBehavior,
  });
  newAppliance
    .save()
    .then((result) => {
      console.log("New appliance saved:", result);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error saving appliance:", err);
      return res.json(err);
    });
});

app.post("/auth", middleware, async (req, res) => {
  try {
    const data = req.body;
    let flag = false;
    const user = await User.findOne({ userId: req.body.userId });
    if (!user) {
      const newUser = new User({
        userId: data.userId,
        displayName: data.displayName,
        pictureUrl: data.pictureUrl,
      });
      console.log(newUser);
      await newUser
        .save()
        .then((result) => {
          console.log("New user saved:", result);
          flag = true;
          return res.status(200).json(result);
        })
        .catch((err) => {
          console.error("Error saving user:", err);
          return res.json(err);
        });
    }
    if (!flag)
      return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error finding user");
  }
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
