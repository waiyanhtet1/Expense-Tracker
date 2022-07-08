const mongoose = require("mongoose");

const transcationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Fill Text Field!"],
  },
  amount: {
    type: Number,
    required: [true, "Fill Amount Field!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transcation", transcationSchema);
