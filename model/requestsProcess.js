const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const IssueProcessrequestSchema = new mongoose.Schema({
    issue: {
        type: String,
    },
    admin: {
        type: String,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const IssueProcessrequest = mongoose.model(
    "IssueProcessrequest",
    IssueProcessrequestSchema
);

module.exports = IssueProcessrequest;