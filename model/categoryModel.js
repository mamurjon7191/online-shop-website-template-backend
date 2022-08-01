const mongoose = require("mongoose");

const categoryScheme = new mongoose.Schema({
  categoryName: {
    required: [true, "Siz categoriyani nomini kiritishingiz shart"],
    type: String,
  },
});

categoryScheme.virtual("products", {
  ref: "products",
  localField: "_id",
  foreignField: "categoryId",
});

const Category = mongoose.model("categories", categoryScheme);

module.exports = Category;
