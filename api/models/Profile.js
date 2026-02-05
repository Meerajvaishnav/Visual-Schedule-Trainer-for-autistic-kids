const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  childName: String,
  age: String,
  favColor: String,
  favCartoon: String,
  stars: { type: Number, default: 0 },
  lastStarted: Date,
  tasks: [
    {
      name: String,
      time: String,
      done: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("Profile", ProfileSchema);
