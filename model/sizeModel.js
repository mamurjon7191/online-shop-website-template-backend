const mongoose = require("mongoose");

const sizeScheme = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Siz sizeni kiritishingiz kerak"],
    enum: ["xs", "s", "m", "l", "xl"],
  },
});

const Size = mongoose.model("sizes", sizeScheme);

module.exports = Size;
