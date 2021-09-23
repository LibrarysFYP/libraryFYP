const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const bookIssue = new mongoose.Schema({
    book: [{
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: [true, "Book Issue must belong to the Book"],
    }, ],
    member: {
        type: mongoose.Schema.ObjectId,
        ref: "Member",
        required: [true, "Book Issue must belong to the Member"],
    },

    issuefor: {
        type: String,
        enum: ["days", "hours"],
        required: [true, "Please tell issue for days or hours"],
    },
    issuedate: {
        type: String,
        default: Date.now,
    },
    returndate: {
        type: String,
        // default: Date.now,
    },
    remainingdays: {
        type: Number,
    },
    hours: {
        type: Number,
    },
    startingtime: {
        type: "String",
    },
    endingtime: {
        type: "String",
    },
    status: {
        type: Number,
        default: 1,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// bookIssue.virtual('members', {
//   ref: 'Member',
//   foreignField: 'books',
//   localField: '_id',
// });

bookIssue.pre("save", function(next) {
    console.log("hi");
    let issueDate = new Date(Number(this.issuedate));
    let returnDate = new Date(Number(this.returndate));
    let diffDays = "";
    if (this.issuefor == "days") {
        let abc = Date.now();
        diffDays = Math.ceil(Math.abs(returnDate - abc) / (1000 * 60 * 60 * 24));
        this.remainingdays = diffDays;
    } else if (this.issuefor == "hours") {
        console.log(this.hours);
        this.returndate = issueDate.setHours(issueDate.getHours() + this.hours);
    }
    next();
});

bookIssue.pre(/^find/, function(next) {
    this.populate({
        path: "Book",
        select: "-__v",
    }).populate({
        path: "Member",
        select: "-__v",
    });
    next();
});

const BookIssue = mongoose.model("Bookissue", bookIssue);

module.exports = BookIssue;