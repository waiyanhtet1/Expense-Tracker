const express = require("express");
const {
  GetMe,
  RegisterUser,
  LoginUser,
} = require("../controller/user_controller");
const protect = require("../middleware/auth_middleware");
const router = express.Router();

router.get("/", protect, GetMe);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

module.exports = router;
