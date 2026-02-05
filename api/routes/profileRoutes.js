const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// Save profile when "Start My Day" is clicked
router.post("/start", async (req, res) => {
  try {
    const profile = new Profile({
      childName: req.body.childName,
      age: req.body.age,
      favColor: req.body.favColor,
      favCartoon: req.body.favCartoon,
      stars: req.body.stars || 0,
      tasks: req.body.tasks || [],
      lastStarted: new Date(),
    });

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific profile by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update profile including tasks
router.put("/:id", async (req, res) => {
  try {
    const updated = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        childName: req.body.childName,
        age: req.body.age,
        favColor: req.body.favColor,
        favCartoon: req.body.favCartoon,
        stars: req.body.stars,
        tasks: req.body.tasks
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all profiles (optional but useful)
router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

module.exports = router;
