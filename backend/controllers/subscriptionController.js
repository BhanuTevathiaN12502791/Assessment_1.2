const Subscription = require("../models/Subscription");

// CREATE SUBSCRIPTION
exports.createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create({
      user: req.user.id,
      plan: req.body.plan,
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Error creating subscription" });
  }
};

// GET MY SUBSCRIPTIONS
exports.getMySubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id })
      .populate("plan");

    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
};

// UPDATE (optional)
exports.updateSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription" });
  }
};

// DELETE / CANCEL
exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscription removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscription" });
  }
};