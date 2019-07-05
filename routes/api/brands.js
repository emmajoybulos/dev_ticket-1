const express = require("express");
const router = express.Router();

// Brand Model
const Brand = require("../../models/Brand");

// @route  GET api/brands
// @desc   Get All Brands
// @access PUBLIC

router.get("/", (req, res) => {
  Brand.find()
    .sort({ date: -1 })
    .then(brands => res.json(brands));
});

// @route   POST api/brands
// @desc    Create a Brand
// @access  PUBLIC

router.post("/", (req, res) => {
  const newBrand = new Brand({
    brand_name: req.body.brand_name
  });
  newBrand.save().then(brands => res.json(brands));
});

// @route   DELETE api/brands/:id
// @desc    Delete a Brand
// @access  PUBLIC

router.delete("/:id", (req, res) => {
  Brand.findById(req.params.id)
    .then(brands => brands.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
