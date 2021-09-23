const express = require("express");
const bookIssueController = require("../controller/bookissueController");
const authController = require("../controller/authenticationController");

const router = express.Router({ mergeParams: true });

// router.param('id', tourController.checkId);
// router.use('/:tourId/reviews', reviewRouter);
router
    .route("/RequestReject/:id/:bookid/:email")
    .post(bookIssueController.deleteit);
router
    .route("/Requestissue/:email/:bookid/:duration")
    .post(bookIssueController.requestit);
router
    .route("/Requestdone/:id/:email/:bookid")
    .post(bookIssueController.requestdone);
router.route("/Requestissue/requests").get(bookIssueController.getrequests);

router.route("/ReturnedBooks").get(bookIssueController.getRetuned);
router.route("/ReturnedBooks/:id").get(bookIssueController.getMemberRetuned);
router
    .route("/ReturneBook/:bookissueid/:bookid")
    .post(bookIssueController.ReturnBook);
router.route("/getNonReturnedBooks").get(bookIssueController.getNonReturned);
router
    .route("/getNonReturnedBooks/:id")
    .get(bookIssueController.getMemberNonReturned);
router
    .route("/")
    .post(
        bookIssueController.uploadUserPhoto,
        bookIssueController.resizeUserPhoto,
        bookIssueController.insertBookIssue
    );
router
    .route("/getIssueStatsMember/:id")
    .get(bookIssueController.getMemberIssueStatsMember);

router
    .route("/getIssueStats/:id")
    .get(bookIssueController.getMemberIssueStatsMember);

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