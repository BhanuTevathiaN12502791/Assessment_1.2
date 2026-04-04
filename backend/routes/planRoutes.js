const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

// Public
router.get("/", getPlans);

// Admin only
router.post("/", protect, adminOnly, createPlan);
router.put("/:id", protect, adminOnly, updatePlan);
router.delete("/:id", protect, adminOnly, deletePlan);

module.exports = router;