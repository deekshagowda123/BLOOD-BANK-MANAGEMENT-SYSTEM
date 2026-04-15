const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role, organization, username } = req.body;

    // Check if user exists by email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if username exists
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      role,
      organization,
      username: username || email.split("@")[0], // Use first part of email as backup username
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Try to find user by email OR username
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }]
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simple password check (in production use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
