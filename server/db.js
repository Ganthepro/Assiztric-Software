// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb+srv://ganThedev:ganza112@cluster0.7dyyqzi.mongodb.net/AssiztricData?retryWrites=true&w=majority")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   userId: String,
//   displayName: String,
//   pictureUrl: String,
// });

// const User = mongoose.model("User", userSchema, "users");

// const db = {
//   addUser: async (user) => {
//     const newUser = new User(user);
//     return await newUser.save();
//   },
//   findUser: async (userId, getBool) => {
//     User.findOne({ userId: userId })
//       .then((user) => {
//         if (!user) return false;
//         if (getBool) return true;
//         return user; // Send the user data as JSON
//       })
//       .catch((err) => {
//         console.error(err);
//         return false;
//       });
//   },
// };

// module.exports = db;
