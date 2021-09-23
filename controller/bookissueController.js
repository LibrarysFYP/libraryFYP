// const { Query } = require('mongoose');
const multer = require("multer");
const sharp = require("sharp");
const BookIssue = require("../model/bookIssue");
const Process = require("../model/requestsProcess");
const Member = require("../model/Member");
const Request = require("../model/issueRequests");
const Book = require("../model/Book");
const factory = require("../controller/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

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
exports.processUpdate = catchAsync(async(req, res, next) => {
    const process = await Process.findById(req.params.id);
    pr;
});
exports.process = catchAsync(async(req, res, next) => {
    const process = await Process.create(req.body);
    res.status(200).json({
        status: "success",
        data: process,
    });
});
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
exports.getrequests = catchAsync(async(req, res, next) => {
    const requests = await Request.aggregate([{
            $match: { status: { $eq: 0 } },
        },
        {
            $lookup: {
                from: "books",
                let: { book: "$book" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $eq: ["$_id", "$$book"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
                as: "book",
            },
        },
    ]);
    res.status(200).json({
        status: "success",
        data: requests,
    });
});
exports.requestit = catchAsync(async(req, res, next) => {
    const memberAccountwWithEmail = await Member.find({
        email: req.params.email,
    }).select("+password");
    console.log(memberAccountwWithEmail);
    if (!memberAccountwWithEmail) {
        return next(new AppError(`No Member Found With That Id`, 404));
    }
    const checkbookAvailAble = await Book.findById(req.params.bookid);
    if (checkbookAvailAble.BookAvailability === 0) {
        return next(new AppError(`Sorry Book is not available`, 404));
    }
    const newObj = {
        requests: memberAccountwWithEmail[0].requests,
    };
    newObj.requests.push(req.params.bookid);
    await Member.findByIdAndUpdate(memberAccountwWithEmail[0].id, newObj, {
        runValidators: true,
    }).select("+password");

    await Request.create({
        email: req.params.email,
        book: req.params.bookid,
        duration: req.params.duration,
    });
    res.status(200).json({
        status: "success",
        message: "Request Successful",
    });
});

exports.requestdone = catchAsync(async(req, res, next) => {
    const memberAccountwWithEmail = await Member.find({
        email: req.params.email,
    }).select("+password");
    console.log(memberAccountwWithEmail);
    if (!memberAccountwWithEmail) {
        return next(new AppError(`No Member Found With That Id`, 404));
    }
    const statusChange = await Request.findById(req.params.id);
    statusChange.status = 1;
    await statusChange.save();
    const checkbookAvailAble = await Book.findById(req.params.bookid);
    if (checkbookAvailAble.BookAvailability === 0) {
        return next(new AppError(`Sorry Book is not available`, 404));
    }
    const newObj = {
        requests: memberAccountwWithEmail[0].requests,
    };
    newObj.requests = newObj.requests.filter((item) => {
        if (String(item) === String(req.params.bookid)) {
            return false;
        }
        return true;
    });
    await Member.findByIdAndUpdate(memberAccountwWithEmail[0].id, newObj, {
        runValidators: true,
    }).select("+password");

    res.status(200).json({
        status: "success",
        message: "Request Successful",
    });
});

exports.deleteit = catchAsync(async(req, res, next) => {
    const memberAccountwWithEmail = await Member.find({
        email: req.params.email,
    }).select("+password");
    console.log(memberAccountwWithEmail);
    if (!memberAccountwWithEmail) {
        return next(new AppError(`No Member Found With That Id`, 404));
    }
    const statusChange = await Request.findById(req.params.id);
    statusChange.status = 1;
    await statusChange.save();
    const checkbookAvailAble = await Book.findById(req.params.bookid);
    if (checkbookAvailAble.BookAvailability === 0) {
        return next(new AppError(`Sorry Book is not available`, 404));
    }
    const newObj = {
        requests: memberAccountwWithEmail[0].requests,
    };
    newObj.requests = newObj.requests.filter((item) => {
        if (String(item) === String(req.params.bookid)) {
            return false;
        }
        return true;
    });
    await Member.findByIdAndUpdate(memberAccountwWithEmail[0].id, newObj, {
        runValidators: true,
    }).select("+password");

    res.status(200).json({
        status: "success",
        message: "Request Successful",
    });
});
exports.insertBookIssue = catchAsync(async(req, res, next) => {
    const { member, book } = req.body;
    const memberAccountwWithEmail = await Member.find({ email: member }).select(
        "+password"
    );

    // console.log(memberAccountwWithId);
    if (!memberAccountwWithEmail) {
        return next(new AppError(`No Member Found With That Id`, 404));
    }
    // console.log(memberAccountwWithEmail);
    let newObj = {
        books: [],
    };
    req.body.member = memberAccountwWithEmail[0]._id;
    book.map((item) => {
        newObj.books.push(item);
    });
    // memberAccountwWithId = JSON.parse(JSON.stringify(memberAccountwWithId));

    const BookAccount = await Book.findById(book);
    let memberAccountwWithId = await Member.findById(req.body.member);
    if (!BookAccount) {
        return next(new AppError(`No Book Found With That Id`, 404));
    }
    if (BookAccount.BookAvailability <= 0) {
        return next(new AppError(`Book is not available`, 404));
    }
    BookAccount.BookAvailability--;
    await BookAccount.save();
    // delete memberAccountwWithEmail[0].password;
    await Member.findByIdAndUpdate(memberAccountwWithEmail[0].id, newObj, {
        runValidators: true,
    }).select("+password");
    // await memberAccountwWithEmail[0].save();
    // console.log(memberAccountwWithId);

    const doc = await BookIssue.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getMemberNonReturned = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    const doc = await BookIssue.aggregate([{
            $match: { member: ObjectId(req.params.id) },
        },
        {
            $lookup: {
                from: "books",
                let: { book: "$book" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $in: ["$_id", "$$book"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
                as: "book",
            },
        },
        {
            $lookup: {
                from: "members",
                as: "member",
                let: { member: "$member" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $eq: ["$$member", "$_id"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
            },
        },

        {
            $unwind: "$book",
        },
        {
            $unwind: "$member",
        },
        {
            $match: { status: { $eq: 1 } },
        },
    ]);
    console.log(doc);
    res.status(201).json({
        status: "success",
        length: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.getMemberRetuned = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    const doc = await BookIssue.aggregate([{
            $match: { member: ObjectId(req.params.id) },
        },
        {
            $lookup: {
                from: "books",
                let: { book: "$book" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $in: ["$_id", "$$book"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
                as: "book",
            },
        },
        {
            $lookup: {
                from: "members",
                as: "member",
                let: { member: "$member" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $eq: ["$$member", "$_id"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
            },
        },

        {
            $unwind: "$book",
        },
        {
            $unwind: "$member",
        },
        {
            $match: { status: { $eq: 0 } },
        },
    ]);
    console.log(doc);
    res.status(201).json({
        status: "success",
        length: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.getRetuned = catchAsync(async(req, res, next) => {
    const doc = await BookIssue.aggregate([{
            $lookup: {
                from: "books",
                let: { book: "$book" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $in: ["$_id", "$$book"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
                as: "book",
            },
        },
        {
            $lookup: {
                from: "members",
                as: "member",
                let: { member: "$member" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $eq: ["$$member", "$_id"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
            },
        },

        {
            $unwind: "$book",
        },
        {
            $unwind: "$member",
        },
        {
            $match: { status: { $eq: 0 } },
        },
    ]);
    console.log(doc);
    res.status(201).json({
        status: "success",
        length: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.getMemberIssueStatsMember = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    const memberFind = await Member.findById(req.params.id);

    // const doc = await BookIssue.aggregate([{
    //     $match: { member: ObjectId(req.params.id) },
    // }, ]);

    const doc = await BookIssue.aggregate([{
        $match: { member: ObjectId(req.params.id) },
    }, ]);
    console.log(memberFind);

    // const doc2 = await BookIssue.aggregate([{
    //     $match: { member: ObjectId(req.params.id) },
    //     $match: { status: { $eq: 0 } },
    // }, ]);

    const doc2 = await BookIssue.aggregate([{
            $match: { status: { $eq: 0 } },
        },
        {
            $match: { member: ObjectId(req.params.id) },
        },
    ]);
    res.status(200).json({
        status: "success",
        totalissues: doc.length,
        noofreturns: doc2.length,
        user: memberFind,
    });
});
exports.ReturnBook = catchAsync(async(req, res, next) => {
    const BookToReturn = await BookIssue.findById(req.params.bookissueid);
    if (!BookToReturn) {
        return next(new AppError(`No Book Found With That Id`, 404));
    }
    if (BookToReturn.book.length > 1) {
        BookToReturn.status = 1;
    } else {
        BookToReturn.status = 0;
    }
    const member = await Member.findById(BookToReturn.member).select("+password");
    let newbooks = member.books.filter((item) => {
        if (item === req.params.bookid) {
            return false;
        }
        return true;
    });
    member.books = newbooks;
    await member.save();
    await BookToReturn.save();
    console.log(BookToReturn);
    const Books = await Book.findById(req.params.bookid);
    console.log(Books);
    ++Books.BookAvailability;
    await Books.save();

    res.status(200).json({
        status: `${Books.name} Book Returned Successfully`,
    });
});
exports.getMemberIssueStats = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    const memberFind = await Member.findById(req.params.id);

    // const doc = await BookIssue.aggregate([{
    //     $match: { member: ObjectId(req.params.id) },
    // }, ]);

    const doc = await BookIssue.aggregate([{
        $match: {},
    }, ]);
    console.log(memberFind);

    // const doc2 = await BookIssue.aggregate([{
    //     $match: { member: ObjectId(req.params.id) },
    //     $match: { status: { $eq: 0 } },
    // }, ]);

    const doc2 = await BookIssue.aggregate([{
        $match: { status: { $eq: 0 } },
    }, ]);
    res.status(200).json({
        status: "success",
        totalissues: doc.length,
        noofreturns: doc2.length,
        user: memberFind,
    });
});
exports.getNonReturned = catchAsync(async(req, res, next) => {
    const doc = await BookIssue.aggregate([{
            $lookup: {
                from: "books",
                let: { book: "$book" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $in: ["$_id", "$$book"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
                as: "book",
            },
        },
        {
            $lookup: {
                from: "members",
                as: "member",
                let: { member: "$member" }, // consider as local key
                pipeline: [{
                        $match: {
                            $expr: { $eq: ["$$member", "$_id"] }, // $_id consider as foreign key
                        },
                    },
                    { $project: { name: 1 } },
                ],
            },
        },

        {
            $unwind: "$book",
        },
        {
            $unwind: "$member",
        },
        {
            $match: { status: { $eq: 1 } },
        },
    ]);
    console.log(doc);
    res.status(201).json({
        status: "success",
        length: doc.length,
        data: {
            data: doc,
        },
    });
});

// exports.getTourStats = async (req, res, next) => {
//  console.log("HI");
// };// };