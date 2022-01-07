import mongoose from "mongoose";

const connectDB = async (url: string) => {
  await mongoose.connect(url), {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export default connectDB;
