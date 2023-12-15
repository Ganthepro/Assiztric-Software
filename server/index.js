const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const csv = require("csv-parser");
const fs = require("fs");

dotenv.config();
const dataFilePath = "./100101000.csv";


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
    index: Number,
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
  applianceId: [String],
});

const results = [];
let x = 0;
const datapoint = 30;
let applianceNames = [
  'WashingMC',
  'RiceCooker',
  'ElecFan',
  'Fridge',
  'AirCon',
  'Iron',
  'TV',
  'AirPurifier'
]

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
  try {
    await fetch("https://ee53-161-246-144-205.ngrok-free.app/prediction", {
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
        // console.log(data.active);
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
          try{
            for (let i = 0; i < usageApplicance.length; i++) if (usageApplicance[i] == 1) arr.push(array[i]);
          } catch (err) {
            console.error(err);
          }
          // console.log(array,arr)
          return arr;
        }
        Appliance.findOne({ userId: "test" }).then((result) => {
          if (result != null) {
            const availableAppliance = result.appliance
            const availableApplianceData = result.applianceData.map((appliance) => appliance).sort((a, b) => a.index - b.index);
            // applianceNames = result.class_applicance;
            ApplianceDataHistory.findOne({ userId: "test" }).then((result) => {
              if (result == null) {
                ApplianceDataHistory.create({ userId: "test", timeOfUsege: [0,0,0,0,0,0,0,0], applianceId: [] });
                return;
              }
              // console.log(sumArrays(result.timeOfUsege, data.active), availableAppliance);
              console.log(data.active);
              console.log(getSpecificArray(data.power_distribution, availableAppliance));
              // console.log(sumArrays(result.timeOfUsege, getSpecificArray(data.active, availableAppliance)));
              // console.log(sumArrays(result.timeOfUsege, getSpecificArray(data.active, availableAppliance)));
              // console.log(getSpecificArray(sumArrays(result.timeOfUsege, getSpecificArray(data.active, availableAppliance)), availableAppliance));
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
                  Types: getSpecificArray(applianceNames, availableAppliance),
                  timeOfUsege: sumArrays(result.timeOfUsege, getSpecificArray(data.active, availableAppliance)),
                  active: getSpecificArray(data.active, availableAppliance),
                  powerDistribution: getSpecificArray(data.power_distribution, availableAppliance), 
                  applianceId: getSpecificArray(availableApplianceData.map((appliance) => appliance._id), availableAppliance),
                },
                { new: true, upsert: true, returnOriginal: true }
              ).then((result) => {
                console.log("Appliance data history updated");
              });
            });
          };
        });
      });
    } catch (err) {
      console.error(err);
    }
  x += datapoint;
}

async function sendNotification() {}

getUsage();
const interval = setInterval(() => {
  if (x >= results.length) clearInterval(interval);
  predictUsage();
}, 10000);

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

app.get("/getApplianceInfo/:userId/:id", middleware, (req, res) => {
  const userId = req.params.userId;
  const id = req.params.id;
  let avarage = 0;
  let timeOfUsege = 0;
  let updatedTime = 0;
  let brand = "";
  let model = "";
  let name = "";
  let meanPowerStack = [];
  Appliance.findOne({ userId: userId }).then((result) => {
    if (result == null) {
      return res.status(200).json({ applianceData: [] });
    } else {
      const applianceData = result.applianceData.filter((appliance) => appliance._id == id);
      brand = applianceData[0].Brand;
      model = applianceData[0].Model;
      name = applianceData[0].Type;
    }
  });
  ApplianceDataHistory.findOne({ userId: userId }).then((result) => {
    if (result == null) {
      return res.status(200).json({ timeOfUsege, avarage, updatedTime, brand, model, name, meanPowerStack });
    } else {
      const applianceDataIndex = result.applianceId.indexOf(id);
      timeOfUsege = result.timeOfUsege[applianceDataIndex];
      updatedTime = result.times[result.times.length - 1];
      avarage = result.meanPowerStack.filter((power) => power[applianceDataIndex] != 0).reduce((acc, val) => acc + val[applianceDataIndex], 0) / result.meanPowerStack.filter((power) => power[applianceDataIndex] != 0).length;
      meanPowerStack = result.meanPowerStack.map((power) => power[applianceDataIndex]);
      return res.status(200).json({ timeOfUsege, avarage, updatedTime, brand, model, name, meanPowerStack });
    }
  });
});

app.get("/getLeaderboard/:userId", middleware, async (req, res) => {
  const userId = req.params.userId;
  const data = await ApplianceDataHistory.findOne({ userId: "test" });
  if (data != null) {
    let timeOfUsege = data.timeOfUsege;
    let Types = data.Types;
    let active = data.active;
    let applianceId = data.applianceId; 
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
          temp = applianceId[i];
          applianceId[i] = applianceId[j];
          applianceId[j] = temp;
        }
      }
    }
    res.status(200).json({
      usagePercent: usagePercent(),
      Types,
      timeOfUsege,
      active,
      applianceId,
    });
  } else {
    res.status(200).json({
      usagePercent: [0, 0, 0, 0, 0],
      Types: ["Air Purifier", "Refrigerator", "Fan", "TV", "Iron"],
      timeOfUsege: [0, 0, 0, 0, 0],
      active: [0, 0, 0, 0, 0],
      applianceId: [0, 0, 0, 0, 0],
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
    code: data.code, // 0: Tip, 1: Alert, 2: Ft
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

app.post("/addApplianceData", middleware, async (req, res) => {
  let data = req.body;
  const index = await applianceNames.indexOf(data.Type);
  let appliances = [0, 0, 0, 0, 0,0,0,0];
  data['index'] = await index;
  // console.log(data);
  Appliance.findOne({ userId: "test" })
    .then((result) => {
      if (result == null) {
        index != -1 ? (appliances[index] = 1) : null;
        return Appliance.create({ userId: "test", applianceData: [], appliance: appliances });
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
