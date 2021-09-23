const multer = require("multer");
const sharp = require("sharp");
const Member = require("../model/Member");
const factory = require("../controller/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const multerStorage = multer.memoryStorage();
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const bcrypt = require("bcryptjs");

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
exports.resetpassword = catchAsync(async(req, res, next) => {
    // console.log();
    // const user = await User.findById();
    if (req.body.password) {
        console.log("hi");
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const user = await Member.findByIdAndUpdate(req.params.userid, req.body, {
        new: true,
        runValidators: true,
    }).select("+password");

    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.forgotpassword = catchAsync(async(req, res, next) => {
    const user = await Member.find({ email: req.params.email });
    if (user.length == 0) {
        return next(new AppError("Email is incorrect", 401));
    }

    console.log(user[0].email);
    const resetcode = Math.floor(100000 + Math.random() * 900000);
    await new Email(user[0], resetcode).sendPassword();
    res.status(200).json({
        status: "Email sent successfully",
        verificationcode: resetcode,
        userid: user[0]._id,
    });
});
exports.updateMemberByIdMember = catchAsync(async(req, res, next) => {
    let checknumber = await client.lookups.v1
        .phoneNumbers(req.body.phonenumber)
        .fetch({ countryCode: "PK" });
    console.log(checknumber);

    if (req.file) req.body.photo = req.file.filename;

    const doc = await Model.findByIdAndUpdate(req.user.id, req.body, {
        runValidators: true,
    }).select("+password");

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
exports.getMemberByIdMember = catchAsync(async(req, res, next) => {
    let query = Member.findById(req.params.id);
    let doc = await query;
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
exports.getMemberByIdMembers = catchAsync(async(req, res, next) => {
    let query = Member.findById(req.user.id);
    let doc = await query;
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

exports.uploadUserPhoto = upload.single("photo");
exports.changepasswordme = catchAsync(async(req, res, next) => {
    const user = await Member.findById(req.user.id).select("+password");
    console.log(req.user.id);
    if (!user) {
        return next(new AppError("No User Found With That Id", 404));
    }
    if (req.body.password) {
        console.log("hi");
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your Current Password Is Wrong", 401));
        }
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const userr = await Member.findByIdAndUpdate(req.user.id, req.body).select(
        "+password"
    );
    res.status(200).json({
        status: "success",
        data: userr,
    });
});
exports.getEmail = catchAsync(async(req, res, next) => {
    const email = await Member.find({ email: req.params.email });
    res.status(200).json({
        status: "success",
        data: email,
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

exports.insertMember = catchAsync(async(req, res, next) => {
    let doc;

    // let {Member} = Model;
    //jjjz
    // console.log(Model);
    console.log(req.body.password);
    console.log(req.file.filename);
    if (req.file)
        req.body.photo = `https://library-fyp.herokuapp.com/public/img/users/${req.file.filename}`;
    doc = await Member.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

exports.getAllMembers = factory.getAll(Member, "Member");
exports.getAllMembersAprroveds = catchAsync(async(req, res, next) => {
    let doc;
    let filter = {};
    console.log(req.params.CategoryId);
    filter = { new: 1 };
    doc = await Member.find(filter, { name: 1, phonenumber: 1, photo: 1 });

    let newArr = [];
    doc = JSON.parse(JSON.stringify(doc));
    console.log(doc);

    doc.map((member) => {
        member.books = member.books.length;
    });

    res.status(200).json({
        status: "succcess",
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.deleteMemberById = factory.deleteOne(Member);

exports.getMemberById = factory.getOne(Member, "Member");
exports.getMemberByIds = catchAsync(async(req, res, next) => {
    let query;
    let newArr;
    let doc;
    query = Member.findById(req.params.id);
    doc = await query;

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

exports.updateMemberById = factory.updateOne(Member);
exports.logout = async(req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};
exports.changepassword = catchAsync(async(req, res, next) => {
    const user = await Member.findById(req.params.id).select("+password");
    if (!user) {
        return next(new AppError("No User Found With That Id", 404));
    }
    if (req.body.password) {
        console.log("hi");
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your Current Password Is Wrong", 401));
        }
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const userr = await Member.findByIdAndUpdate(req.params.id, req.body).select(
        "+password"
    );
    res.status(200).json({
        status: "success",
        data: userr,
    });
});

exports.approve = catchAsync(async(req, res, next) => {
    req.body.new = 1;
    await Member.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
    }).select("+password");
    let url = "aa";
    // const url = `${req.protocol}://${req.get("host")}/me`;
    await new Email(member, url).sendWelcomes();
    res.status(200).json({
        status: "success",
        message: "user successfully approved ",
    });
});
exports.newMembers = catchAsync(async(req, res, next) => {
    const newMembers = await Member.find({ new: 0 });
    console.log(newMembers);
    res.status(200).json({
        status: "success",
        results: newMembers.length,
        data: newMembers,
    });
});

exports.top5Members = async(req, res, next) => {
    const doc = await Member.aggregate([{
            $project: {
                item: 1,
                CountReads: {
                    $cond: {
                        if: { $isArray: "$books" },
                        then: { $size: "$books" },
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

    res.status(200).json({
        status: "success",
        data: doc,
    });
};

// exports.getTourStats = async (req, res, next) => {
//  console.log("HI");
// };