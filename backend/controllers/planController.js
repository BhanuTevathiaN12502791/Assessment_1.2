const Plan = require("../models/Plan");

// CREATE PLAN
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error creating plan" });
  }
};

// GET ALL PLANS
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans" });
  }
};

// UPDATE PLAN
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Error updating plan" });
  }
};

// DELETE PLAN
exports.deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan" });
  }
};