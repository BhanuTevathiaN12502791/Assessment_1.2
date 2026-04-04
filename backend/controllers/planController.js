const Plan = require("../models/Plan");

// CREATE PLAN
exports.createPlan = async (req, res) => {
  try {
    const { name, price, duration, features } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const plan = await Plan.create({
      name,
      price,
      duration,
      features,
    });

    return res.status(201).json(plan);
  } catch (error) {
    console.error("CREATE PLAN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL PLANS
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    return res.status(200).json(plans);
  } catch (error) {
    console.error("GET PLANS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE PLAN
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.status(200).json(updatedPlan);
  } catch (error) {
    console.error("UPDATE PLAN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE PLAN
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);

    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.status(200).json({ message: "Plan deleted" });
  } catch (error) {
    console.error("DELETE PLAN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};