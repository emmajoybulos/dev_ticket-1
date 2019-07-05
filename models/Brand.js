const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Brand Schema
const BrandSchema = new Schema({
  brand_name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Brand = mongoose.model("brand", BrandSchema);
