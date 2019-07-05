const express = require("express");
const router = express.Router();

// Position Model
const Position = require("../../models/Position");

// @route  GET api/positions
// @desc   Get All Positions
// @access PUBLIC

router.get("/", (req, res) => {
  Position.find()
    .sort({ date: -1 })
    .then(positions => res.json(positions));
});

// @route   POST api/positions
// @desc    Create a Position
// @access  PUBLIC

router.post("/", (req, res) => {
  const newPosition = new Position({
    position_title: req.body.position_title
  });
  newPosition.save().then(positions => res.json(positions));
});

// @route   DELETE api/positions/:id
// @desc    Delete a Position
// @access  PUBLIC

router.delete("/:id", (req, res) => {
  Position.findById(req.params.id)
    .then(positions =>
      positions.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
