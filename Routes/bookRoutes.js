const express = require("express");
const bookController = require("../controller/bookController");
const authController = require("../controller/authenticationController");

const router = express.Router({ mergeParams: true });

// router.param('id', tourController.checkId);
// router.use('/:tourId/reviews', reviewRouter);
//dsjs
router.route("/top5books").get(bookController.top5books);

router
    .route("/")
    .get(bookController.getAllBooks)
    .post(
        bookController.uploadUserPhoto,
        bookController.resizeUserPhoto,
        bookController.insertBook
    );

router
    .route("/:id")
    .get(bookController.getBookById)
    .patch(
        bookController.uploadUserPhoto,
        bookController.resizeUserPhoto,
        bookController.updateBookById
    )
    .delete(bookController.deleteBookById);

module.exports = router;

/*


This is code we used before

const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();






router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.insertTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = router;

*/