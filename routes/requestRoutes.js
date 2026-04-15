const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");

// Request blood
router.post("/request", async (req, res) => {
  try {
    const { requestedBy, bloodGroup, units, hospital, patientName, purpose } =
      req.body;

    const request = new BloodRequest({
      requestedBy,
      bloodGroup,
      units,
      hospital,
      patientName,
      purpose,
    });

    await request.save();
    res
      .status(201)
      .json({ message: "Blood request submitted successfully", request });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to submit request", error: err.message });
  }
});

// Get all blood requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate("requestedBy");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pending requests
router.get("/status/pending", async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "pending" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve blood request
router.put("/:id/approve", async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: "fulfilled", fulfilledAt: Date.now() },
      { new: true }
    );
    res.json({ message: "Request approved successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject blood request
router.put("/:id/reject", async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json({ message: "Request rejected", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get request by ID
router.get("/:id", async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
