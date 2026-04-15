const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

// Routes
const userRoutes = require("./routes/userRoutes");
const donorRoutes = require("./routes/donorRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "models/public")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bloodDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/donors", donorRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/requests", requestRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Blood Management System Running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🩸 Blood Bank System running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}`);
});
