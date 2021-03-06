const jwt = require("jsonwebtoken");
const config = require("config");
/**
 * A light middleware to validate jsonwebtoken.
 */
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWTSECRET || config.get("jwtSecret")
    );
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
