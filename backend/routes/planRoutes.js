const express = require("express");
const router = express.Router();

const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

// routes
router.post("/", createPlan);
router.get("/", getPlans);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

module.exports = router;
