const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcrypt");

const userScheme = new mongoose.Schema({
  name: {
    trim: true,
    minlength: [3, "Siz eng kamida 3 ta symbol ishlata olasiz"],
    maxlength: [30, "Siz eng kopida 12 ta symbol ishlata olasiz"],
    type: String,
    required: [true, "Siz nameni kiritishingiz kerak"],
  },
  email: {
    type: String,
    required: [true, "Siz emailni kirtishingiz kerak"],
    unique: [
      true,
      "Bu emaildan oldin foydalanilgan Iltimos boshqa email kiriting",
    ],
    lowercase: true,
    validator: {
      validate: function (val) {
        return validator.isEmail(val);
      },
      message: "Iltimos emailni kiriting",
    },
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Siz passwordni kiritishingiz kerak"],
    validator: {
      validate: {
        validator: function (val) {
          return validator.isStrongPassword(val);
        },
      },
      message: "Iltimos togri password kiriting!",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "Siz passwordConfirmni kiritishingiz kerak"],
    validate: {
      validator: function (val) {
        return this.password == val;
      },
    },
    message: "Iltimos togri password kiriting",
  },
});

const User = mongoose.model("users", userScheme);

module.exports = User;
