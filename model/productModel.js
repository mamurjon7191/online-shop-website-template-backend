const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Siz nameni kiritishhingiz kerak"],
    },
    oldPrice: {
      type: String,
    },
    summary: {
      type: String,
      required: [true, "Siz summary kiritishhingiz kerak"],
    },
    description: {
      type: String,
      required: [true, "Siz description kiritishhingiz kerak"],
    },
    information: {
      type: String,
      required: [true, "Siz information kiritishhingiz kerak"],
    },
    sizeId: {
      type: mongoose.Schema.ObjectId,
      ref: "sizes",
    },
    colorId: {
      type: mongoose.Schema.ObjectId,
      ref: "colors",
    },
    price: {
      type: Number,
      required: [true, "Siz priceni kiritishingiz kerak"],
    },
    saleId: {
      type: mongoose.Schema.ObjectId,
      ref: "sales",
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = mongoose.model("products", productScheme);

module.exports = Product;
