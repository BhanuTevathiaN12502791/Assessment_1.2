const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSubscription,
  getMySubscriptions,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionController");

// Protected routes
router.post("/", protect, createSubscription);
router.get("/", protect, getMySubscriptions);
router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

module.exports = router;