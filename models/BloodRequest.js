const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  requestedBy: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "fulfilled", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fulfilledAt: {
    type: Date,
  },
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
