const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// PROFILE ROUTE
let profile = {};

app.get("/profile", (req, res) => {
  res.json(profile);
});

app.post("/profile", (req, res) => {
  profile = req.body;
  res.json({ message: "Profile saved", profile });
});

// TASK ROUTE
let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  tasks = req.body;
  res.json({ message: "Tasks saved", tasks });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ status: "Backend is running" });
});
