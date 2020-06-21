const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var exerciseSchema = new Schema({
  description: String,
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
});

var userSchema = new Schema({
  username: { type: String, required: true },
  logs: { type: [exerciseSchema], default: [] },
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports.User = User;
module.exports.Exercise = Exercise;
