const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A Category must have a name"],
        unique: true,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;