const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // Bearer <token>
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // store user info
    next(); // allow request
  } catch (err) {
    // Token invalid or expired
    return res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
};
