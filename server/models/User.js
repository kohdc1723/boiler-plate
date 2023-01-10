// mongoose
const mongoose = require("mongoose");
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// jsonwebtoken
const jwt = require("jsonwebtoken");
const secretKey = "secretToken";

// User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// encrypt password using bcrypt
userSchema.pre("save", function(next) {
    let user = this;
    // only when password is being modified
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// compare password method
userSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch);
    })
}
// generate token method
userSchema.methods.generateToken = function(callback) {
    let token = jwt.sign(this._id.toHexString(), secretKey);
    this.token = token;
    this.save(function(err, result) {
        if (err) return callback(err);

        callback(null, result);
    });
}
// find user by token
userSchema.statics.findByToken = function(token, callback) {
    let user = this;
    // decode token
    jwt.verify(token, secretKey, function(err, decoded) {
        // find user by userId
        // compare token from client and token from db
        user.findOne({
            "_id": decoded,
            "token": token
        }, function(err, user) {
            if (err) return callback(err);

            callback(null, user);
        });
    });
};

// User model
const User = mongoose.model("User", userSchema);
// export module
module.exports = User;