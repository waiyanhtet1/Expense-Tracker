const Transcation = require("../model/transcation_model");

//@mehtod    GET - get all transcations
//@route    /api/v2/transcations/
// @access  Private
exports.GetTranscation = async (req, res) => {
  try {
    const value = await Transcation.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      total: value.length,
      data: value,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//@mehtod    POST - Create transcation
//@route    /api/v2/transcations/
// @access  Private
exports.CreateTranscation = async (req, res) => {
  try {
    const value = await Transcation.create({
      user: req.user.id,
      text: req.body.text,
      amount: req.body.amount,
    });
    return res.status(201).json({
      success: true,
      data: value,
    });
  } catch (error) {
    const msg = Object.values(error.errors).map((val) => val.properties);
    return res.status(400).json({
      success: false,
      error: msg,
    });
  }
};

//@mehtod    DELETE - delete transcation
//@route    /api/v2/transcations/:id
// @access  Private
exports.DeleteTranscaion = async (req, res) => {
  try {
    const value = await Transcation.findById(req.params.id);
    if (!value) {
      return res.status(400).json({
        success: false,
        message: "No trasncation found with this id!",
      });
    }
    await value.remove();
    return res.status(200).json({
      success: true,
      message: "Transcation Was Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
