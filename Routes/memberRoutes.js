const express = require("express");
const memberController = require("../controller/memberController");
const authController = require("../controller/authenticationController");

const router = express.Router();

// router.param('id', tourController.checkId);
// router.use('/:tourId/reviews', reviewRouter);
router.route("/forgotpassword/:email").post(memberController.forgotpassword);
router.route("/top5Members").get(memberController.top5Members);
router
    .route("/")
    .get(memberController.getAllMembers)
    .post(memberController.insertMember);
router.route("/getApprovedAlls").get(memberController.getAllMembersAprroveds);

router
    .route("/login")
    .post(
        memberController.uploadUserPhoto,
        memberController.resizeUserPhoto,
        authController.login
    );
router.route("/approvemember/:id").get(memberController.approve);
router
    .route("/signup")
    .post(
        memberController.uploadUserPhoto,
        memberController.resizeUserPhoto,
        authController.signup
    );
router
    .route("/signupbyadmin")
    .post(
        memberController.uploadUserPhoto,
        memberController.resizeUserPhoto,
        authController.signupByAdmin
    );
router
    .route("/resetpassword/:userid")
    .post(
        memberController.uploadUserPhoto,
        memberController.resizeUserPhoto,
        memberController.resetpassword
    );
router.route("/NewMembers").get(memberController.newMembers);

router.route("/ByEmail/:email").get(memberController.getEmail);
router
    .route("/:id")
    .get(memberController.getMemberById)
    .delete(memberController.deleteMemberById)
    .patch(
        memberController.uploadUserPhoto,
        memberController.resizeUserPhoto,
        memberController.updateMemberById
    );
router
    .route("/changepassword/:id")
    .patch(memberController.uploadUserPhoto, memberController.changepassword);
router.route("/logout").post(memberController.logout);
router.route("/get/:id").get(memberController.getMemberByIds);

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