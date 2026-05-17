const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@globaltna.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "globaltnapass";

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ token, email });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
