const express = require("express");
const router = express.Router();
const { checkJobStatus } = require("../services/notification.scheduler");

router.get("/job-status", async (req, res) => {
  try {
    const jobStatus = await checkJobStatus();
    res.json(jobStatus);
  } catch (error) {
    console.error("Error fetching job status:", error);
    res.status(500).json({ error: "Failed to fetch job status" });
  }
});

module.exports = router;
