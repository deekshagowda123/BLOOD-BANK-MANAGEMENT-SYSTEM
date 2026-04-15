const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// Add donor
router.post("/add", async (req, res) => {
  try {
    const { name, email, age, bloodGroup, location, contact, gender, weight } =
      req.body;

    // Validate age
    if (age < 18 || age > 65) {
      return res
        .status(400)
        .json({ message: "Donor age must be between 18 and 65" });
    }

    // Check if donor exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: "Donor already registered" });
    }

    const donor = new Donor({
      name,
      email,
      age,
      bloodGroup,
      location,
      contact,
      gender,
      weight,
    });

    await donor.save();
    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (err) {
    res.status(500).json({ message: "Failed to add donor", error: err.message });
  }
});

// Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search by blood group
router.get("/search/:group", async (req, res) => {
  try {
    const donors = await Donor.find({
      bloodGroup: req.params.group,
      isActive: true,
    });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search by location
router.get("/location/:location", async (req, res) => {
  try {
    const donors = await Donor.find({
      location: new RegExp(req.params.location, "i"),
      isActive: true,
    });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get donor by ID
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update donor
router.put("/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Donor updated successfully", donor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete donor
router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
