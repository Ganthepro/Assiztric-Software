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

const db = {
  addUser: async (user) => {
    const newUser = new User(user);
    return await newUser.save();
  },
  findUser: async (userId, getBool) => {
    console.log(process.env.MONGO_URI);
    User.findOne({ userId: userId }, (err, user) => {
      if (err) {
        if (getBool) return false;
        return console.error(err);
      }
      if (getBool) return true;
      return user;
    });
  },
};

module.exports = db;
