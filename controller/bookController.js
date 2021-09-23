// const { Query } = require('mongoose');
const multer = require("multer");
const sharp = require("sharp");
const Book = require("../model/Book");
const factory = require("../controller/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const req = require("request");
const fs = require("fs");
const multiparty = require("multiparty");
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/img/users");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async(req, res, next) => {
    console.log(req.file);
    if (!req.file) return next();
    console.log("hi");

    req.file.filename = `user-${Math.random()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
});

// const Tour = require('../models/tourModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const factory = require('../controllers/handlerFactory');

exports.insertBook = catchAsync(async(req, res, next) => {
    console.log(req.body);

    //   if (req.file)
    //     req.body.photo = `https://library-fyp.herokuapp.com/img/users/${req.file.filename}`;
    doc = await Book.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getAllBooks = factory.getAll(Book, "Book");

exports.deleteBookById = factory.deleteOne(Book);

exports.getBookById = factory.getOne(Book, "Book");

exports.updateBookById = factory.updateOne(Book);

exports.top5books = async(req, res, next) => {
    const doc = await Book.aggregate([{
            $lookup: {
                from: "members",
                localField: "_id",
                foreignField: "books",
                as: "member_docs",
            },
        },
        {
            $project: {
                item: 1,
                CountReads: {
                    $cond: {
                        if: { $isArray: "$member_docs" },
                        then: { $size: "$member_docs" },
                        else: "NA",
                    },
                },
                name: "$name",
                photo: "$photo",
                // Add photo Later
            },
        },
        { $sort: { CountReads: -1 } },
        { $limit: 5 },
    ]);

    // const doc = await Book.find().populate({ path: 'members' });
    // let newDoc= [];
    // let newDoc2= {};

    // doc.map((doc)=>{
    //     newDoc2.name= doc.name;
    //     newDoc2.readcount = doc.members.length;
    //     newDoc.push();
    // });
    // console.log(newDoc2);

    //     const books = await Book.aggregate([
    //     {
    //       $match: { BookAvailability: { $lte: 20 } },
    //     }
    //   ]);

    res.status(200).json({
        status: "success",
        data: doc,
    });
};