const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

// CREATE SUBSCRIPTION
exports.createSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: user missing" });
    }

    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan id is required" });
    }

    const existingPlan = await Plan.findById(plan);
    if (!existingPlan) {
      return res.status(404).json({ message: "Selected plan not found" });
    }

    const subscription = await Subscription.create({
      user: req.user._id,
      plan,
      status: "active",
    });

    const populated = await Subscription.findById(subscription._id).populate("plan");

    return res.status(201).json(populated);
  } catch (error) {
    console.error("CREATE SUBSCRIPTION ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET MY SUBSCRIPTIONS
exports.getMySubscriptions = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: user missing" });
    }

    const subs = await Subscription.find({ user: req.user._id }).populate("plan");
    return res.status(200).json(subs);
  } catch (error) {
    console.error("GET SUBSCRIPTIONS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE SUBSCRIPTION
exports.updateSubscription = async (req, res) => {
  try {
    const updated = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate("plan");

    if (!updated) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("UPDATE SUBSCRIPTION ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE SUBSCRIPTION
exports.deleteSubscription = async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return res.status(200).json({ message: "Subscription removed" });
  } catch (error) {
    console.error("DELETE SUBSCRIPTION ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};