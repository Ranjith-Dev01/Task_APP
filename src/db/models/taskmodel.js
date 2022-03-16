const mongoose = require("mongoose");
const validator = require("validator");

const Dummy = mongoose.model("Dummy", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completedField: {
    type: Boolean,
    default: false,
  },
});

module.exports = Dummy;
