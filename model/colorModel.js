const mongoose = require("mongoose");

const colorScheme = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Siz colorni kiritishingiz kerak"],
    enum: ["Black", "White", "Red", "Blue", "Green"],
  },
});

const Color = mongoose.model("sizes", colorScheme);

module.exports = Color;
