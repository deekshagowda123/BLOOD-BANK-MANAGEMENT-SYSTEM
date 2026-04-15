const express = require("express");
const router = express.Router();
const Donor = require("../Donor");

// Add donor
router.post("/add", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: "Donor Added", donor });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all donors
router.get("/", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

// Search by blood group
router.get("/search/:group", async (req, res) => {
  const donors = await Donor.find({ bloodGroup: req.params.group });
  res.json(donors);
});

// Delete donor
router.delete("/:id", async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;