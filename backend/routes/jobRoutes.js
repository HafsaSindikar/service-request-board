const express = require("express");
const router = express.Router();
const JobRequest = require("../models/JobRequest");
const auth = require("../middleware/auth");


// GET /api/jobs (with optional filters)
router.get("/", async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs (with comprehensive basic input validation)
router.post("/", auth, async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;

    // Basic Input Validation
    if (!title || !description || !category || !location || !contactName || !contactEmail) {
      return res.status(400).json({ message: "All form fields are required" });
    }

    if (!contactEmail.includes("@")) {
      return res.status(400).json({ message: "Invalid email address format" });
    }

    const job = await JobRequest.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/jobs/:id (status update only)
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const allowed = ["Open", "In Progress", "Closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" } // Safe upgrade avoiding deprecated { new: true } logs
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;