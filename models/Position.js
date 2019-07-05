const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Position Schema
const PositionSchema = new Schema({
  position_title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Position = mongoose.model("positions", PositionSchema);
