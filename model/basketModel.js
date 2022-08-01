const mongoose = require("mongoose");

const basketScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: users,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: products,
  },
  locations: {
    type: mongoose.Schema.ObjectId,
    ref: locations,
  },
});

const Basket = mongoose.model("baskets", basketScheme);

module.exports = Basket;
