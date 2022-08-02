const mongoose = require("mongoose");

const colorScheme = new mongoose.Schema({
  color: {
    type: String,
    required: [true, "Siz colorni kiritishingiz kerak"],
    enum: ["Black", "White", "Red", "Blue", "Green"],
  },
});

const Color = mongoose.model("colors", colorScheme);

module.exports = Color;
