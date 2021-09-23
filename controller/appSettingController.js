// const { Query } = require('mongoose');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");
const AppSetting = require("../model/appSetting");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadFieldsPhoto = upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
]);
exports.uploadFavicon = upload.single("favicon");

exports.resizePhoto = catchAsync(async(req, res, next) => {
    if (!req.files) return next();
    Object.keys(req.files).map(async function(key, index) {
        req.files[key][0].filename = `user-${Date.now()}.jpeg`;
        await sharp(req.files[key][0].buffer)
            .resize(500, 500)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/img/${req.files[key][0].filename}`);
    });

    next();
});

exports.getSettings = catchAsync(async(req, res, next) => {
    const appSetting = await AppSetting.find();
    res.status(200).json({
        status: "success",
        data: appSetting,
    });
});
exports.updateSettings = catchAsync(async(req, res, next) => {
    // if (req.files) {
    //     console.log(req.files);

    //     Object.keys(req.files).map(async function(key, index) {
    //         req.body[req.files[key][0].fieldname] = req.files[key][0].filename;
    //     });
    // }

    console.log(req.body);
    const appSetting = await AppSetting.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json({
        status: "success",
        data: {
            data: appSetting,
        },
    });
});