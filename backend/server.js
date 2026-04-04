require("dotenv").config(); // 🔥 MUST be first line

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const planRoutes = require("./routes/planRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Start server
if (require.main === module) {
  connectDB();

  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

module.exports = app;