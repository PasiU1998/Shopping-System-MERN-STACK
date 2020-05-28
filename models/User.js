const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false,
    default: ""
  },
  lastName: {
    type: String,
    required: false,
    default: ""
  },
  address: {
    type: String,
    required: false,
    default: ""
  },
  city: {
    type: String,
    required: false,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
