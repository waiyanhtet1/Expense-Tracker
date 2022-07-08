const express = require("express");
const {
  GetTranscation,
  CreateTranscation,
  DeleteTranscaion,
} = require("../controller/transcation_controller");
const protect = require("../middleware/auth_middleware");
const router = express.Router();

router.route("/").get(protect, GetTranscation).post(protect, CreateTranscation);
router.delete("/:id", protect, DeleteTranscaion);

module.exports = router;
