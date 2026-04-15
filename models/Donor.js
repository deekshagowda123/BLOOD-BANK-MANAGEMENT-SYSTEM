const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  bloodGroup: {
    type: String,
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  weight: {
    type: Number,
    min: 45,
  },
  lastDonationDate: {
    type: Date,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donor", donorSchema);