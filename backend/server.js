const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/autism_schedule")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profiles", profileRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
