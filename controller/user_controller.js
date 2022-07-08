const User = require("../model/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @method  GET - get loign user
// @route   api/v2/user/
// @access  Private
exports.GetMe = async (req, res) => {
  try {
    const value = await User.findOne(req.user);
    return res.status(200).json({
      success: true,
      data: {
        _id: value._id,
        name: value.name,
        email: value.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @method  POST - Register User
// @route   api/v2/user/register
// @access  Public
exports.RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user exit
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User alreday exit with this email!",
      });
    }
    // hash password
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      var hashedPass = await bcryptjs.hash(password, salt);
    }
    // crate user
    const user = await User.create({
      name,
      email,
      password: hashedPass,
    })
      .then(function (user) {
        return res.status(201).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token: generateToken(user._id),
        });
      })
      .catch(function (err) {
        const msg = Object.values(err.errors).map((val) => val.properties);
        return res.status(400).json({
          success: false,
          error: msg,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @method  POST - Login User
// @route   api/v2/user/login
// @access  Public
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).json({
        success: false,
        error: "Email and Password required!",
      });
    } else if (!email) {
      res.status(400).json({
        success: false,
        error: "Email required!",
      });
    } else if (!password) {
      res.status(400).json({
        success: false,
        error: "Password required!",
      });
    } else {
      const user = await User.findOne({ email });
      if (user && (await bcryptjs.compare(password, user.password))) {
        res.status(200).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({
          success: false,
          error: "No User Found!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// toekn generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
