const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
  time: String,
});

module.exports = mongoose.model("Task", TaskSchema);
