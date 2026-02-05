const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// MongoDB connection logic for serverless
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Routes
// Note: Vercel routes everything under /api to this function if configured correctly
// We use /api/profiles here as the base
app.use("/api/profiles", profileRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Autism Schedule API is running" });
});

// For local testing if needed
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
