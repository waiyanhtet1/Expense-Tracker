const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      token = req.headers.authorization.split(" ")[1];
      //   verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   get user from token access
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Unathorized!",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No Token",
    });
  }
};

module.exports = protect;
