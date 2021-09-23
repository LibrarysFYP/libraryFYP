const express = require("express");
const categoryController = require("../controller/categoryController");
const BookRouter = require("../Routes/bookRoutes");
const router = express.Router();
const authController = require("../controller/authenticationController");

router.use("/:CategoryId/book", BookRouter);

// router.param('id', tourController.checkId);
// router.use('/:tourId/reviews', reviewRouter);
router.route("/categoylist").get(categoryController.getCategoryWithNumOfBooks);
router
    .route("/")
    .get(categoryController.getAllCategory)
    .post(
        categoryController.uploadUserPhoto,
        categoryController.resizeUserPhoto,
        categoryController.insertCategory
    );

router
    .route("/:id")
    .get(categoryController.getCategoryById)
    .delete(categoryController.deleteCategoryById)
    .patch(
        categoryController.uploadUserPhoto,
        categoryController.resizeUserPhoto,
        categoryController.updateCategoryById
    );

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