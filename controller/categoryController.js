// const { Query } = require('mongoose');
const multer = require("multer");
const sharp = require("sharp");
const Category = require("../model/Category");
const factory = require("../controller/handlerFactory");
const mongoose = require("mongoose");

// const Tour = require('../models/tourModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const factory = require('../controllers/handlerFactory');
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

exports.insertCategory = catchAsync(async(req, res, next) => {
    console.log(req.body);
    if (req.file) req.body.photo = req.file.filename;
    let doc = await Category.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getAllCategory = factory.getAll(Category);

exports.deleteCategoryById = factory.deleteOne(Category, "Category");

exports.getCategoryById = factory.getOne(Category);

exports.updateCategoryById = factory.updateOne(Category);

exports.getCategoryWithNumOfBooks = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    const doc = await Category.aggregate([{
        $lookup: {
            from: "books",
            as: "bookCount",
            let: { bookCount: "$Category" }, // consider as foreign key
            pipeline: [
                { $unwind: "$Category" },
                { $project: { name: 1, Category: 1 } },
            ],
        },
    }, ]);
    let count = 0;
    let finals = doc.map((item) => {
        item.num = ++count;
        let itemid = item._id;
        let arrayss = [];
        item.bookCount.map((item) => {
            console.log(itemid);
            if (String(item.Category) === String(itemid)) {
                arrayss.push(item);
            } else {}
        });

        item.bookCount = arrayss.length;
        return item;
    });

    res.status(200).json({
        status: "success",
        data: finals,
    });
});

// exports.getTourStats = async (req, res, next) => {
//  console.log("HI");
// };// };