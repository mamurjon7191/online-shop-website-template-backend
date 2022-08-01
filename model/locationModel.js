const mongoose = require("mongoose");

const locationScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("locations", locationScheme);

module.exports = Location;
