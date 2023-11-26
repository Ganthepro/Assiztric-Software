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
  accessToken: String,
});

const User = mongoose.model("User", userSchema);

const db = {
    addUser: async (user) => {
      const newUser = new User(user);
      return await newUser.save();
    },
    findUser: async (userId) => {
        User.findOne({ userId: userId }, (err, user) => {
            if (err) return console.error(err);
            return user;
        });
    }
}