const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A member must have a name"],
        // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    photo: {
        type: String,
        default: "https://library-fyp.herokuapp.com/img/users/unnamed.jpeg",
    },

    email: {
        type: String,
        required: [true, "Please provide your Email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, " Please Provide a valid email"],
    },
    profession: {
        type: String,
    },
    gender: {
        type: String,
        required: [true, "Please provide your Gender"],
        enum: ["male", "female", "other"],
    },
    joinedAt: {
        type: String,
        default: Date.now,
    },

    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
    },

    address: {
        type: String,
    },
    books: [{
        type: mongoose.Schema.ObjectId,
        ref: "Book",
    }, ],
    password: {
        type: String,
        required: [true, "Please provide your Password"],
        minlength: 8,
        select: false,
    },
    profession: {
        type: String,
    },
    new: {
        type: Number,
        default: 0,
    },
    requests: [{
        type: mongoose.Schema.ObjectId,
        ref: "Book",
    }, ],

    phonenumber: {
        type: String,
        required: [true, "Please provide your phone Number"],
        validate: {
            validator: function(el) {
                return /^\d+$/.test(el);
            },
            message: "Invalid Number",
        },
    },

    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});
memberSchema.set("toObject", { virtuals: true });
memberSchema.set("toJSON", { virtuals: true });
memberSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

memberSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
    next();
});

memberSchema.pre(/^find/, function(next) {
    this.populate({
        path: "books",
        populate: {
            path: "Category",
            model: "Category",
        },
    });
    next();
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;