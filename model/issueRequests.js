const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const IssuerequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "A Category must have a name"],
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: [true, "Book Issue must belong to the Book"],
    },
    status: {
        type: Number,
        default: 0,
    },
    duration: {
        type: String,
        enum: ["day", "hour"],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Issuerequest = mongoose.model("Issuerequest", IssuerequestSchema);

module.exports = Issuerequest;