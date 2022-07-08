const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fill Your Name!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Fill Your Email!"],
  },
  password: {
    type: String,
    required: [true, "Fill Your Password!"],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", UserSchema);
