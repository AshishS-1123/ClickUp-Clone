const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI), {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

module.exports = connectDB;
