const mongoose = require("mongoose");

const donationHistorySchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    required: true,
  },
  units: {
    type: Number,
    default: 1,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    enum: ["healthy", "rejected"],
    default: "healthy",
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("DonationHistory", donationHistorySchema);
