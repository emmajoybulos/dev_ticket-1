const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    REGISTER new user
// @access  Public
router.post("/", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    user_type,
    user_brand
  } = req.body;

  //   Validation
  if (
    !firstname ||
    !password ||
    !email ||
    !password ||
    !user_type ||
    !user_brand
  ) {
    return res.status(lastname).json({ msg: "Enter all fields" });
  }

  //   Checking for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      user_brand,
      user_type
    });

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
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
  });
});

module.exports = router;
