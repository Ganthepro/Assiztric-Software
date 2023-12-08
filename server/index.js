const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const csv = require("csv-parser");
const fs = require("fs");

dotenv.config();
const dataFilePath = "./AirPurifier.csv";

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
  time: { type: String, default: getTime },
  detail: String,
  date: { type: String, default: getDate },
});
const applianceDataHistorySchema = new Schema({
  userId: String,
  Types: [String],
  active: [Number],
  activeStack: [[Number]],
  powerDistribution: {},
  powerDistributionStack: {},
  times: [String],
  timeOfUsege: [Number],
});

const results = [];
let x = 0;

const User = mongoose.model("User", userSchema, "users");
const Appliance = mongoose.model("Appliance", applianceSchema, "appliance");
const Notification = mongoose.model(
  "Notification",
  notificationSchema,
  "notification"
);
const ApplianceDataHistory = mongoose.model(
  "ApplianceDataHistory",
  applianceDataHistorySchema,
  "applianceDataHistory"
);

app.use(express.json());
app.use(cors());

function getTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function getDate() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

function getUsage() {
  fs.createReadStream(dataFilePath)
    .pipe(csv())
    .on("data", (data) => {
      const { W_R, Var_R } = data;
      const extractedData = {
        W_R,
        Var_R,
      };
      results.push(extractedData);
    })
    .on("error", (err) => {
      console.error(err);
    });
}

async function predictUsage() {
  const W_R = [];
  const Var_R = [];
  const appliance = [1, 1, 1, 1, 1];
  for (let i = x; i < x + 180; i++) {
    W_R.push(parseFloat(results[i].W_R));
    Var_R.push(parseFloat(results[i].Var_R));
  }
  await fetch("https://assiztric-nilm-634c4s4qnq-as.a.run.app/prediction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_appliance: appliance,
      pred_threshold: 0.5,
      W_R,
      Var_R,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      function sumArrays(...arrays) {
        const maxLength = Math.max(...arrays.map((arr) => arr.length)); // Find the length of the longest array
        const result = new Array(maxLength).fill(0); // Initialize an array to store the sum
        arrays.forEach((arr) => {
          for (let i = 0; i < maxLength; i++) result[i] += arr[i] || 0;
        });
        return result;
      }
      ApplianceDataHistory.findOne({ userId: "test" }).then((result) => {
        ApplianceDataHistory.findOneAndUpdate(
          { userId: "test" },
          {
            $push: {
              activeStack: data.active,
              powerDistributionStack: data.power_distribution,
              times: getTime(),
            },
            Types: ["Air Purifier", "Refrigerator", "Fan", "TV", "Iron"],
            timeOfUsege: sumArrays(result.timeOfUsege, data.active),
            active: data.active,
            powerDistribution: data.power_distribution, 
          },
          { new: true, upsert: true, returnOriginal: true }
        ).then((result) => {
          console.log("Appliance data history updated:", result);
        });
      });
    });
  x += 180;
}

async function sendNotification() {}

getUsage();
const interval = setInterval(() => {
  if (x >= results.length) clearInterval(interval);
  predictUsage();
}, 60000);

async function middleware(req, res, next) {
  // const token = req.headers["token"];
  // if (!token) return res.status(401).send("Access denied, token missing");
  // try {
  //   const response = await fetch(
  //     `https://api.line.me/oauth2/v2.1/verify?access_token=${token}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   if (!response.ok) return res.status(401).send("Invalid token");
  next();
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).send("Error verifying token");
  // }
}

app.get("/getLeaderboard/:userId", middleware, async (req, res) => {
  const userId = req.params.userId;
  const data = await ApplianceDataHistory.findOne({ userId: "test" });
  let timeOfUsege = data.timeOfUsege;
  let Types = data.Types;
  const usagePercent = () => {
    const sum = data.timeOfUsege.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return timeOfUsege.map((usage) => (usage / sum) * 100);
  };
  for (let i = 0; i < usagePercent.length; i++) {
    for (let j = i + 1; j < usagePercent.length; j++) {
      if (usagePercent[i] < usagePercent[j]) {
        let temp = usagePercent[i];
        usagePercent[i] = usagePercent[j];
        usagePercent[j] = temp;
        temp = Types[i];
        Types[i] = Types[j];
        Types[j] = temp;
        temp = timeOfUsege[i];
        timeOfUsege[i] = timeOfUsege[j];
        timeOfUsege[j] = temp;
      }
    }
  }
  console.log(usagePercent());
  res.status(200).json({
    usagePercent: usagePercent(),
    Types,
    timeOfUsege,
  });
});

app.get("/getPredictData/:userId", middleware, async (req, res) => {
  const userId = req.params.userId;
  const data = await ApplianceDataHistory.findOne({ userId: "test" });
  try {
    const active = data.active;
    const powerDistribution = data.powerDistribution;
    const activeStack = data.activeStack;
    const powerDistributionStackDay =
      data.powerDistributionStack.length > 1440
        ? data.powerDistributionStack.slice(-1440)
        : data.powerDistributionStack;
    const powerDistributionStackWeek =
      data.powerDistributionStack.length > 10080
        ? data.powerDistributionStack.slice(-10080)
        : data.powerDistributionStack;
    res.status(200).json({
      active,
      powerDistribution,
      activeStack,
      powerDistributionStackDay,
      powerDistributionStackWeek,
      times: data.times,
    });
  } catch (err) {
    res.status(500).send("Error getting predict data");
  }
});

app.post("/addNotification", middleware, (req, res) => {
  const data = req.body;
  const newNotification = new Notification({
    userId: data.userId,
    code: data.code,
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

app.get("/getNotification/:code", middleware, (req, res) => {
  // const userId = req.headers["userid"];
  const code = req.params.code;
  const userId = "test";
  console.log(userId);
  Notification.find({ userId: userId })
    .then(async (result) => {
      console.log("Notification found:", result);
      const filteredNotifications = await result.filter(
        (notification) => notification.code.toString() === code
      );
      const groupedNotifications = {};
      await filteredNotifications.forEach((notification) => {
        if (!groupedNotifications[notification.date]) {
          groupedNotifications[notification.date] = [notification];
        } else {
          groupedNotifications[notification.date].push(notification);
        }
      });
      const sortedKeys = Object.keys(groupedNotifications)
        .map((dateString) => new Date(dateString))
        .sort((a, b) => a - b)
        .reverse()
        .map((dateObj) => {
          const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
          const day = dateObj.getDate().toString().padStart(2, "0");
          const year = dateObj.getFullYear().toString();
          return `${month}/${day}/${year}`;
        });
      const sortedGroupedNotifications = {};
      sortedKeys.forEach((key) => {
        sortedGroupedNotifications[key] = groupedNotifications[key];
      });
      return res.status(200).json(sortedGroupedNotifications);
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
    if (!flag) return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error finding user");
  }
});

app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});

module.exports = app;
