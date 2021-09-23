const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const memberRouter = require("./Routes/memberRoutes");
const bookRouter = require("./Routes/bookRoutes");
const bookissueRouter = require("./Routes/bookissueRoutes");
const categoryRouter = require("./Routes/categoryRoutes");
const viewRouter = require("./Routes/viewRoutes");
const appSettingsRouter = require("./Routes/appsettingsRoutes");
const globalErrorHandler = require("./controller/errorController");

const app = express();
app.enable("trust proxy");
app.use(
    helmet({
        contentSecurityPolicy: false, // use this line for the disable content security policy in the
        //mapBox map front end
    })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); //cors is cross origin request and is used to allow requests as an API
app.options("*", cors());

// app.options('/api/v1/tours/:id', cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(
    express.json({
        limit: "10kb",
    })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize()); // This module searches for any keys in objects that begin with a
// $ sign or contain a .,from req.body, req.query or req.params. It can then either:
// completely remove these keys and associated data from the object, or
// replace the prohibited characters with another allowed character.

app.use(xss()); // This will sanitize any data in req.body, req.query, and req.params , so after
//this middleware can be used to sanitize the scripts of hacker like <script></script>
//in "&lt;script>&lt;/script>" so his every harmful action for the app will be unsuccessful

app.use(
    // this HPP middleware can be used to secure req.query and req.body data from hacker so he cannot
    // pollutes our data
    hpp({
        whitelist: [
            "duration",
            "ratingsAverage",
            "ratingsQuantity",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

app.use((req, res, next) => {
    console.log("Hello from the middleware ✋");
    next();
});
// hi
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/bookissue", bookissueRouter);
app.use("/api/v1/AppSettings", appSettingsRouter);
app.use("/", viewRouter);

app.use(compression());
app.all("*", (req, res, next) => {
    // res.status(404).json({
    //   static: 'fail',
    //   message: `Cant find ${req.originalUrl} on this server`,
    // });
    // const err = new Error(`Cant find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;