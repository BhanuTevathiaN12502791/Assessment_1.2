const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // ✅ USE ENV SECRET (FINAL FIX)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      return next();
    } catch (error) {
      console.error("TOKEN ERROR:", error.message);
      return res.status(401).json({ message: "Token failed" });
    }
  }

  return res.status(401).json({ message: "No token" });
};

module.exports = protect;