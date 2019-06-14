const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },

  lastName: {
    type: String,
    default: ""
  },

  userName: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    default: ""
  },

  userType: {
    type: String,
    default: ""
  },

  userBrand: {
    type: String,
    default: ""
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compa(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
