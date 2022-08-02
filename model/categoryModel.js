const mongoose = require("mongoose");

const categoryScheme = new mongoose.Schema(
  {
    categoryName: {
      required: [true, "Siz categoriyani nomini kiritishingiz shart"],
      type: String,
    },
    categoryPhoto: {
      type: String,
      required: [true, "Siz categoryPhotoni kiritishingiz kerak"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

categoryScheme.virtual("products", {
  ref: "products",
  localField: "_id",
  foreignField: "categoryId",
});

const Category = mongoose.model("categories", categoryScheme);

module.exports = Category;
