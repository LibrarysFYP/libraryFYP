const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/Member");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Member = require("../model/Member");
const Email = require("../utils/email");

// const { Query } = require('mongoose');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    console.log(user._id);
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

exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies) {
        if (req.cookies.jwt) {
            try {
                const decoded = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    process.env.JWT_SECRET
                );
                const freshUser = await User.findById(decoded.id);
                // console.log(freshUser);
                //s
                if (!freshUser) {
                    return next();
                }

                res.locals.user = freshUser;
                req.user = freshUser;
                req.jwt = req.cookies.jwt;
                console.log(req.user);

                return next();
            } catch (err) {
                return next();
            }
        }
    }
    console.log("hii");

    next();
};
exports.signupByAdmin = catchAsync(async(req, res, next) => {
    let checknumber = await client.lookups.v1
        .phoneNumbers(req.body.phonenumber)
        .fetch({ countryCode: "PK" });
    console.log(checknumber);
    // if (req.file)
    //     req.body.photo = `https://library-fyp.herokuapp.com/img/users/${req.file.filename}`;

    const newUser = await Member.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        profession: req.body.profession,
        photo: req.body.photo,
        new: 1,
    });
    console.log(newUser);
    let url = "aa";
    // const url = `${req.protocol}://${req.get("host")}/me`;
    //jhh
    await new Email(newUser, url).sendWelcomes();
    res.status(200).json({
        status: "success",
        message: "new member added",
    });
});

exports.signup = catchAsync(async(req, res, next) => {
    let checknumber = await client.lookups.v1
        .phoneNumbers(req.body.phonenumber)
        .fetch({ countryCode: "PK" });
    console.log(checknumber);
    if (req.file)
        req.body.photo = `https://library-fyp.herokuapp.com/img/users/${req.file.filename}`;

    const newUser = await Member.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        profession: req.body.profession,
        photo: req.body.photo,
    });
    console.log(newUser);
    let url = "aa";
    let message = "Registration successful. Check your email!";
    // const url = `${req.protocol}://${req.get("host")}/me`;
    await new Email(newUser, url).sendWelcome();
    createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password!", 401));
    }
    if (user.new === 1) {
        createSendToken(user, 200, req, res);
    } else {
        return next(new AppError("You are not allowed to logged in", 401));
    }
});
exports.checks = catchAsync(async(req, res, next) => {
    if (req.headers.jwt === "ok") {
        next();
    } else {
        return next(new AppError("You are not allowed to Reset", 401));
    }
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You dont have premission to perform this action", 403)
            );
        }
        next();
    };
};
exports.logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    console.log(req.cookies);
    if (!token) {
        return next(
            new AppError("You are not logged in! please login to get access", 401)
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    console.log(freshUser);
    if (!freshUser) {
        // console.log(!freshUser);
        const err = new AppError(
            "The user belonging to this token no longer exist!",
            401
        );
        err.name = "User Deleted";
        return next(err);
    }
    //   if (freshUser.changePasswordAfter(decoded.iat)) {
    //     const err = new AppError(
    //       'User Recently Changed Password. please login again!',
    //       401
    //     );
    //     err.name = 'Change Password';
    //     return next(err);
    //   }
    req.user = freshUser;
    res.locals.user = freshUser;

    next();
});