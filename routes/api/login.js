const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// module.exports = app => {
//   app.post("/api/account/signin", (req, res, next) => {
//     const { body } = req;
//     const { firstName, lastName, password } = body;

//     let { email } = body;
//   });
// };

router.get("/", (req, res) => {
  Item.find().sort({ date: -1 });
});
