const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Book = require("../model/Book");
const jwt = require("jsonwebtoken");
// const APIFeatures = require('../utils/apiFeatures');
const mongoose = require("mongoose");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.createOne = (Model, ModelName) =>
    catchAsync(async(req, res, next) => {
        let doc;
        // let {Member} = Model;
        // console.log(Model);
        if (ModelName === "Member") {} else {
            console.log(req.body);
            if (req.file) req.body.photo = req.file.filename;
            doc = await Model.create(req.body);
        }
        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.getAll = (Model, ModelName) =>
    catchAsync(async(req, res, next) => {
        let doc;
        let filter = {};
        console.log(req.params.CategoryId);
        if (req.params.CategoryId)
            filter = { Category: { $in: [req.params.CategoryId] } };

        if (ModelName === "Member") {
            doc = await Model.find(filter, { name: 1, phonenumber: 1, photo: 1 });

            let newArr = [];
            doc = JSON.parse(JSON.stringify(doc));
            console.log(doc);

            doc.map((member) => {
                member.books = member.books.length;
            });
        } else if (ModelName === "Book") {
            doc = await Model.find(filter);
            console.log(doc);
            newArr = [];
            doc = JSON.parse(JSON.stringify(doc));

            doc.map((book) => {
                book.Category.map((Category) => {
                    console.log(Category.name);
                    newArr.push(Category.name);
                });
                book.Category = newArr;
                newArr = [];
            });
        } else {
            doc = await Model.find();
        }

        res.status(200).json({
            status: "succcess",
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });
exports.getOne = (Model, ModelName) =>
    catchAsync(async(req, res, next) => {
        let query;
        let newArr;
        let doc;
        const ObjectId = mongoose.Types.ObjectId;

        if (ModelName === "Member") {
            const checkssss = await Model.findById(req.params.id);
            console.log("yessss", checkssss);
            if (checkssss.books.length < 1) {
                return next(new AppError(`${checkssss.name} has no books`, 404));
            }
            doc = await Model.findById(req.params.id).select("+password");
            // doc = await Model.aggregate([{
            //         $lookup: {
            //             from: "books",
            //             let: { books: "$books" },
            //             pipeline: [{
            //                 $match: {
            //                     $expr: { $in: ["$_id", "$$books"] },
            //                 },
            //             }, ],
            //             as: "books",
            //         },
            //     },
            //     {
            //         $unwind: "$books",
            //     },
            //     {
            //         $lookup: {
            //             from: "categories",
            //             let: { books: "$books.Category" },
            //             pipeline: [{
            //                     $match: {
            //                         $expr: { $in: ["$_id", "$$books"] },
            //                     },
            //                 },
            //                 {
            //                     $project: { name: 1 },
            //                 },
            //             ],
            //             as: "books.Category",
            //         },
            //     },
            //     {
            //         $match: { _id: ObjectId(req.params.id) },
            //     },

            //     {
            //         $group: {
            //             _id: "$_id",
            //             name: { $first: "$name" },
            //             joinedAt: { $first: "$joinedAt" },
            //             role: { $first: "$role" },
            //             active: { $first: "$active" },
            //             email: { $first: "$email" },
            //             password: { $first: "$password" },
            //             gender: { $first: "$gender" },
            //             phonenumber: { $first: "$phonenumber" },
            //             address: { $first: "$address" },
            //             books: { $push: "$books" },
            //         },
            //     },
            // ]);
            console.log(doc);
            newArr = [];
            doc = JSON.parse(JSON.stringify(doc));
            doc.books.map((book) => {
                console.log(book);
                book.Category.map((Category) => {
                    console.log(Category.name);
                    newArr.push(Category.name);
                });
                book.Category = newArr;
                newArr = [];
            });
        } else if (ModelName === "Book") {
            doc = await Model.findById(req.params.id);
            if (!doc) {
                return next(new AppError("No Book Found With That Id", 404));
            }
            console.log(doc);
            newArr = [];
            doc = JSON.parse(JSON.stringify(doc));

            doc.Category.map((Category) => {
                console.log(Category.name);
                newArr.push(Category.name);
            });
            doc.Category = newArr;

            newArr = [];
            console.log("sssssssssslllll");
        } else {
            query = Model.findById(req.params.id);
            doc = await query;
        }

        // if (popOptions) query = query.populate(popOptions);

        if (!doc) {
            return next(new AppError("No Document Found With That Id", 404));
        }

        res.status(200).json({
            status: "succcess",
            data: {
                data: doc,
            },
        });
    });
exports.deleteOne = (Model, ModelName) =>
    catchAsync(async(req, res, next) => {
        let doc;
        if (ModelName === "Category") {
            doc = await Model.findById(req.params.id);
            Book.remove({
                Category: {
                    $in: doc.id,
                },
            });
            doc.remove();
            const books = await Book.find();
            books.map((book) => {
                book.Category.length < 1 ? book.remove() : console.log(" not empty");
            });
            console.log(await Book.find());
        } else {
            doc = await Model.findByIdAndDelete(req.params.id);
        }

        // const childDel = await Child.deleteOne({_id: doc.child});

        if (!doc) {
            return next(new AppError(`No ${doc} Found With That Id`, 404));
        }
        res.status(202).json({
            status: "success",
            data: null,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async(req, res, next) => {
        // REMOVE ADDITIONAL COMMENT START

        // if (req.file)
        //     req.body.photo = `https://library-fyp.herokuapp.com/img/users/${req.file.filename}`;

        // REMOVE ADDITIONAL COMMENT END

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError("No Tour Found With That Id", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });