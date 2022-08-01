const mongoose = require("mongoose");

const saleScheme = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
  },
  photo: {
    type: String,
    required: [true, "Siz rasmni kirirtishingiz kerak"],
  },
  discount: {
    type: Number,
    required: [true, "Siz discountni kiritishingiz kerak"],
  },
});

const Sale = mongoose.model("sales", saleScheme);
