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
  applianceData: [{
    Type: String,
    Model: String,
    Brand: String,
    Usage: Number,
    UsageBehavior: String,
  }],
  appliance: [0,0,0,0,0],
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
  meanPowerStack: {},
  times: [String],
  timeOfUsege: [Number],
  totalEmission: { type: Number, default: 0 },
  totalWatt: { type: Number, default: 0 },
});

const results = [];
let x = 0;
const applianceNames = ["Air Purifier", "Refrigerator", "Fan", "TV", "Iron"]
const datapoint = 180;

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
  for (let i = x; i < x + datapoint; i++) {
    W_R.push(parseFloat(results[i].W_R));
    Var_R.push(parseFloat(results[i].Var_R));
  }
  async function getAvailableAppliance() {
    let output = [];
    await Appliance.findOne({ userId: "test" }).then((result) => {
      if (result != null) output = result.appliance
    });
    return output;
  }
  await fetch("https://assiztric-nilm-634c4s4qnq-as.a.run.app/prediction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_appliance: await getAvailableAppliance(),
      pred_threshold: 0.5,
      W_R,
      Var_R,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      function getMean(power_distribution) {
        let mean = [];
        power_distribution.forEach((power, index) => {
          mean.push(power.reduce((acc, val) => acc + val, 0) / power.length);
        });
        return {mean};
      }
      function sumArrays(...arrays) {
        const maxLength = Math.max(...arrays.map((arr) => arr.length)); 
        const result = new Array(maxLength).fill(0); 
        arrays.forEach((arr) => {
          for (let i = 0; i < maxLength; i++) result[i] += arr[i] || 0;
        });
        return result;
      }
      function getSpecificArray(array, usageApplicance) {
        let arr = [];
        for (let i = 0; i < usageApplicance.length; i++) if (usageApplicance[i] == 1) arr.push(array[i]);
        return arr;
      }
      Appliance.findOne({ userId: "test" }).then((result) => {
        if (result != null) {
          const availableAppliance = result.appliance
          ApplianceDataHistory.findOne({ userId: "test" }).then((result) => {
            if (result == null) {
              ApplianceDataHistory.create({ userId: "test", timeOfUsege: [] });
              return;
            }
            ApplianceDataHistory.findOneAndUpdate(
              { userId: "test" },
              {
                $push: {
                  activeStack: getSpecificArray(data.active, availableAppliance),
                  powerDistributionStack: getSpecificArray(data.power_distribution, availableAppliance),
                  times: getTime(),
                  meanPowerStack: getMean(getSpecificArray(data.power_distribution, availableAppliance)).mean,
                },
                $inc: { 
                  totalEmission: (data.power_distribution.reduce((acc, val) => acc + val.reduce((acc, val) => acc + val, 0), 0) / 1000) * 0.5610, 
                  totalWatt: data.power_distribution.reduce((acc, val) => acc + val.reduce((acc, val) => acc + val, 0), 0) / 1000,
                },
                Types: getSpecificArray(["Air Purifier", "Refrigerator", "Fan", "TV", "Iron"],availableAppliance),
                timeOfUsege: getSpecificArray(sumArrays(result.timeOfUsege, data.active), availableAppliance),
                active: getSpecificArray(data.active, availableAppliance),
                powerDistribution: getSpecificArray(data.power_distribution, availableAppliance), 
              },
              { new: true, upsert: true, returnOriginal: true }
            ).then((result) => {
              console.log("Appliance data history updated");
            });
          });
        };
      });
    });
  x += datapoint;
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
  if (data != null) {
    let timeOfUsege = data.timeOfUsege;
    let Types = data.Types;
    let active = data.active;
    // console.log(data.active);
    const usagePercent = () => {
      const sum = data.timeOfUsege.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      return timeOfUsege.map((usage) => (usage / sum) * 100);
    };
    for (let i = 0; i < usagePercent().length; i++) {
      for (let j = i + 1; j < usagePercent().length; j++) {
        if (usagePercent()[i] < usagePercent()[j]) {
          let temp = usagePercent()[i];
          usagePercent()[i] = usagePercent()[j];
          usagePercent()[j] = temp;
          temp = Types[i];
          Types[i] = Types[j];
          Types[j] = temp;
          temp = timeOfUsege[i];
          timeOfUsege[i] = timeOfUsege[j];
          timeOfUsege[j] = temp;
          temp = active[i];
          active[i] = active[j];
          active[j] = temp;
        }
      }
    }
    // console.log({
    //   usagePercent: usagePercent(),
    //   Types,
    //   timeOfUsege,
    //   active,
    // });
    res.status(200).json({
      usagePercent: usagePercent(),
      Types,
      timeOfUsege,
      active,
    });
  } else {
    res.status(200).json({
      usagePercent: [0, 0, 0, 0, 0],
      Types: ["Air Purifier", "Refrigerator", "Fan", "TV", "Iron"],
      timeOfUsege: [0, 0, 0, 0, 0],
      active: [0, 0, 0, 0, 0],
    });
  }
});

app.get("/getPredictData/:userId", middleware, async (req, res) => {
  const userId = req.params.userId;
  const data = await ApplianceDataHistory.findOne({ userId: "test" });
  try {
    const active = data.active;
    const powerDistribution = data.powerDistribution;
    const activeStack = data.activeStack;
    const totalEmission = data.totalEmission;
    const totalWatt = data.totalWatt;
    const powerDistributionStackDay =
      data.meanPowerStack.length > 1440
        ? data.meanPowerStack.slice(-1440)
        : data.meanPowerStack;
    const powerDistributionStackWeek =
      data.meanPowerStack.length > 10080
        ? data.meanPowerStack.slice(-10080)
        : data.meanPowerStack;
    const types = data.Types;
    res.status(200).json({
      active,
      powerDistribution,
      activeStack,
      powerDistributionStackDay,
      powerDistributionStackWeek,
      times: data.times,
      types,
      totalEmission,
      totalWatt,
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
  const index = applianceNames.indexOf(data.Type);
  let appliances = [0, 0, 0, 0, 0];
  Appliance.findOne({ userId: "test" })
    .then((result) => {
      if (result == null) {
        index != -1 ? (appliances[index] = 1) : null;
        Appliance.create({ userId: "test", applianceData: [], appliance: appliances });
        return;
      } else {
        result.appliance.forEach((appliance, index) => {
          if (appliance == 1) appliances[index] = 1;
        });
        index != -1 ? (appliances[index] = 1) : null;
      } 
      Appliance.findOneAndUpdate(
        { userId: "test" },
        { 
          $push : { applianceData: data }, 
          appliance: appliances 
        },
        { new: true, upsert: true, returnOriginal: true }
      ).then((result) => {
        return res.status(200).json(result);
      });
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
