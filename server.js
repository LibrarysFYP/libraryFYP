const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connection Successful!!"));
// .catch((err) => console.error(err));

mongoose.set("useCreateIndex", true);

// console.log(process.env);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

// process.on('SIGTERM', () => {
//   console.log('✋ SIGTERM received. Shutting down gracefully!');
//   server.close(() => {
//     console.log('💥 Process Terminated!');
//   });
// });
