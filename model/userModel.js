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
    unique: [true, "Siz oldin foydalanilgan email kiritdingiz"],
    type: String,
    required: [true, "Siz emailni kirtishingiz kerak"],
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
    default: "default.jpg",
  },
  password: {
    select: false,
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
    select: false,
    required: [true, "Siz passwordConfirmni kiritishingiz kerak"],
    validate: {
      validator: function (val) {
        return this.password == val;
      },
    },
    message: "Iltimos togri password kiriting",
  },
  role: {
    type: "String",
    required: [true, "Siz roleni kiritishingiz kerak"],
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  passwordChangedDate: {
    type: Date,
    default: null,
  },
  resetTokenHash: String,
  resetTokenVaqti: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashPassword = await bcrypt.hash(this.password, 10);

  console.log(hashPassword);

  this.password = hashPassword;

  this.passwordConfirm = undefined;

  next();
});

userScheme.methods.hashTokenMethod = function () {
  const token = crypto.randomBytes(32).toString("hex"); // random raqamni yaratib beradi -->hex dgani ham harf ham son qatnashadi

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  this.resetTokenHash = hashToken;

  this.resetTokenVaqti = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model("users6", userScheme);

module.exports = User;
