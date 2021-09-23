const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A book must have a name"],
        unique: true,
    },

    writer: {
        type: String,
        required: [true, "A Book Must have a writer"],
    },
    photo: { type: String, default: "default.jpg" },

    BookAvailability: {
        type: Number,
        required: [true, "Please add no. of available books"],
    },
    BookAddition: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
    },

    Category: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],

    Status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
    },
    BookCondition: {
        type: String,
        enum: ["normal", "good", "bad"],
        required: [true, "Please Provide Book Condition."],
    },
    addedAt: {
        type: String,
        default: Date.now,
    },
    BookDetails: {
        type: String,
    },
    isbnNumber: {
        type: String,
    },

    TotalPages: {
        type: Number,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// bookSchema.virtual('members', {
//   ref: 'Member',
//   foreignField: 'books',
//   localField: '_id',
// });

bookSchema.pre(/^find/, function(next) {
    this.populate({
        path: "Category",
        select: "-__v",
    });
    next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;