const express = require("express");
const viewController = require("../controller/viewController");

const authController = require("../controller/authenticationController");

const router = express.Router();

// router.use(viewController.alerts);
router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get("/Signup", viewController.getSignup);
router.get("/Login", viewController.getLogin);
router.get(
    "/TopBooksAndReaders",
    authController.isLoggedIn,
    viewController.getBooksAndReads
);
router.get("/BookList", authController.isLoggedIn, viewController.getBooksList);
router.get(
    "/BookUpdate/:id",
    authController.isLoggedIn,
    viewController.updateBook
);
router.get(
    "/CategoryWiseBooksList",
    authController.isLoggedIn,
    viewController.getCategoryWiseBooksList
);
router.get(
    "/CategoryWiseBooks/:name",
    authController.isLoggedIn,
    viewController.getCategoryBooksList
);
router.get(
    "/CategoryList",
    authController.isLoggedIn,
    viewController.getCategoryList
);
router.get(
    "/GetRequests",
    authController.isLoggedIn,
    viewController.getRequests
);
//ss
//aass
router.get("/ResetPassword/:email", viewController.getResets);
router.get(
    "/MemberList",
    authController.isLoggedIn,
    viewController.getMemberList
);
router.get(
    "/MemberBooks/:id",
    authController.isLoggedIn,
    viewController.getMemberBooks
);
router.get(
    "/NewMember",
    authController.isLoggedIn,
    viewController.getNewMembers
);
router.get(
    "/nonReturnBookIssues",
    authController.isLoggedIn,
    viewController.getBookIssues
);
router.get(
    "/ReturnBookIssues",
    authController.isLoggedIn,
    viewController.getReturnBookIssues
);
router.get("/addBook", authController.isLoggedIn, viewController.addBook);
router.get(
    "/addCategory",
    authController.isLoggedIn,
    viewController.addCategory
);
router.get("/addMember", authController.isLoggedIn, viewController.addMember);
router.get("/issuebook", authController.isLoggedIn, viewController.issueabook);
router.get(
    "/appSettings",
    authController.isLoggedIn,
    viewController.appSettings
);
router.get("/profile", authController.isLoggedIn, viewController.adminProfile);
router.get(
    "/profiling/:id",
    authController.isLoggedIn,
    viewController.Profiles
);
router.get(
    "/profiling/read/:id",
    authController.isLoggedIn,
    viewController.MemberProfileRead
);
// member
router.get("/logout", authController.isLoggedIn, viewController.getlogout);

router.get(
    "/memberDashboard",
    authController.isLoggedIn,
    viewController.memberDashboard
);
router.get("/myBooks", authController.isLoggedIn, viewController.myBooks);
router.get(
    "/myNonReturnedBooks",
    authController.isLoggedIn,
    viewController.myNonReturnedBooks
);
router.get(
    "/memberviewbooks",
    authController.isLoggedIn,
    viewController.memberviewbooks
);
router.get(
    "/CategoryWiseBooksListMember",
    authController.isLoggedIn,
    viewController.getCategoryWiseBooksListMember
);
router.get(
    "/CategoryWiseBooksMember/:name",
    authController.isLoggedIn,
    viewController.getCategoryBooksListMember
);
router.get(
    "/profileMember",
    authController.isLoggedIn,
    viewController.MemberProfile
);

router.get(
    "/passwordMember",
    authController.isLoggedIn,
    viewController.MemberPassword
);
module.exports = router;