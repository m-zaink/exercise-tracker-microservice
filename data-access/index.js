const mongoose = require("mongoose");

const config = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected successfully");
  } catch (e) {
    console.log(`Error in connecting mongoDB: ${e}`);
  }

  let db = mongoose.connection;

  db.on("error", () => console.error.bind(console, "MongoDB connection error"));
};

module.exports = config;
module.exports.config = config;
