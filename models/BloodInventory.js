const mongoose = require("mongoose");

const bloodInventorySchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    required: true,
  },
  units: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  minThreshold: {
    type: Number,
    default: 5,
  },
  status: {
    type: String,
    enum: ["available", "low", "critical"],
    default: "available",
  },
});

module.exports = mongoose.model("BloodInventory", bloodInventorySchema);
