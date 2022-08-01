const mongoose = require("mongoose");

const brandScheme = new mongoose.Schema({
  brandName: {
    required: [true, "Siz brand nomini kiritishingiz kerak"],
    type: String,
  },
});

const Brand = mongoose.model("brands", brandScheme);

module.exports = Brand;
