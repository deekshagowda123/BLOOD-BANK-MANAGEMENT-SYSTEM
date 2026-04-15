const express = require("express");
const router = express.Router();
const BloodInventory = require("../models/BloodInventory");

// Add blood inventory
router.post("/add", async (req, res) => {
  try {
    const { bloodGroup, units, location, expiryDate, minThreshold } = req.body;

    let inventory = await BloodInventory.findOne({ bloodGroup, location });

    if (inventory) {
      inventory.units += units;
      inventory.lastUpdated = Date.now();
    } else {
      inventory = new BloodInventory({
        bloodGroup,
        units,
        location,
        expiryDate,
        minThreshold,
      });
    }

    // Update status
    if (inventory.units === 0) inventory.status = "critical";
    else if (inventory.units < inventory.minThreshold) inventory.status = "low";
    else inventory.status = "available";

    await inventory.save();
    res
      .status(201)
      .json({ message: "Blood inventory updated successfully", inventory });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update inventory", error: err.message });
  }
});

// Get all blood inventory
router.get("/", async (req, res) => {
  try {
    const inventory = await BloodInventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by blood group
router.get("/group/:bloodGroup", async (req, res) => {
  try {
    const inventory = await BloodInventory.findOne({
      bloodGroup: req.params.bloodGroup,
    });
    if (!inventory)
      return res.status(404).json({ message: "Blood group not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get critical blood levels
router.get("/status/critical", async (req, res) => {
  try {
    const critical = await BloodInventory.find({ status: "critical" });
    res.json(critical);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update inventory
router.put("/:id", async (req, res) => {
  try {
    const inventory = await BloodInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Inventory updated successfully", inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Decrease inventory (for blood request fulfillment)
router.put("/:id/decrease", async (req, res) => {
  try {
    const { units } = req.body;
    const inventory = await BloodInventory.findById(req.params.id);

    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });
    if (inventory.units < units)
      return res.status(400).json({ message: "Insufficient units" });

    inventory.units -= units;
    inventory.lastUpdated = Date.now();

    // Update status
    if (inventory.units === 0) inventory.status = "critical";
    else if (inventory.units < inventory.minThreshold) inventory.status = "low";
    else inventory.status = "available";

    await inventory.save();
    res.json({ message: "Inventory decreased successfully", inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
