const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);