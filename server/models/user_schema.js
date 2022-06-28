const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const userModel = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    profileImage: {
      type: String,
      required: false,
      max: 255
    },
 
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    }
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userModel.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });
userModel.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userModel.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(this._id.toHexString(), "secret");
  user.token = token;
  user.save(function (err, userInfo) {
    if (err) return cb(err);
    cb(null, userInfo);
  });
};
userModel.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, "secret", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};


userModel.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model("userModel", userModel);
