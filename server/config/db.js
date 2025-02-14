const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DB connected"));
  } catch (error) {
    console.log("error connecting mongodb", error);
    process.exit(1);
  }
};

module.exports = connectDB;
