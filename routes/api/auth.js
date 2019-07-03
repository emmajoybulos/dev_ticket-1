const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    AUTHENTICATE user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //   Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  //   Checking for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validating the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              user_brand: user.user_brand,
              user_type: user.user_type
            }
          });
        }
      );
    });
  });
});

module.exports = router;
