const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");
const Category = require("../model/Category");
const Book = require("../model/Book");
// exports.alerts = (req, res, next) => {
//     const { alert } = req.query;
//     if (alert === "booking")
//         res.locals.alert =
//         "your booking was successful! please check your email for confirmation. If your booking doesn't show up here immediatly, please come back later";
//     next();
// };

exports.addCategory = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    res.status(200).render("addCategory", {
        title: "ali",
        AppSettings,
        currentuser: req.user,
    });
});
exports.getlogout = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let logout = await axios.post(
        `https://library-fyp.herokuapp.com/api/v1/members/logout`
    );
    res.status(200).render("login", {
        title: "All Tours",
        AppSettings,
        currentuser: req.user,
    });
});
exports.addMember = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    res.status(200).render("addMember", {
        title: "All Tours",
        AppSettings,
        currentuser: req.user,
    });
});
exports.issueabook = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Books = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/books/"
    );
    console.log(Books.data.data.data);
    Books = Books.data.data.data;

    res.status(200).render("issueabook", {
        title: "All Tours",
        AppSettings,
        Books,
        currentuser: req.user,
    });
});
exports.getResets = catchAsync(async(req, res, next) => {
    const response2 = await axios.post(
        `https://library-fyp.herokuapp.com/api/v1/members/forgotpassword/${req.params.email}`
    );
    console.log(response2.data.verificationcode);
    res.status(200).render("resetPassword", {
        title: "All Tours",
        code: response2.data.verificationcode,
        emailof: req.params.email,
    });
});
exports.appSettings = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    res.status(200).render("appSettings", {
        title: "All Tours",
        AppSettings,
        currentuser: req.user,
    });
});
exports.adminProfile = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Profile = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getIssueStats/${req.user.id}`
    );
    Profile = Profile.data;
    console.log(Profile);
    res.status(200).render("memberprofile", {
        title: "All Tours",
        Profile,
        jwt: req.jwt,
        AppSettings,
        currentuser: req.user,
    });
});

exports.Profiles = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Profile = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getIssueStatsMember/${req.params.id}`
    );
    Profile = Profile.data;
    console.log(Profile);
    res.status(200).render("memberprofile", {
        title: "All Tours",
        Profile,
        jwt: req.jwt,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getSignup = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;

    //   const members = await Mm.find();
    res.status(200).render("signup", {
        title: "All Tours",
        AppSettings,
        // tours,
    });
});
exports.getLogin = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    res.status(200).render("login", {
        title: "All Tours",
        AppSettings,
        // tours,
    });
});
exports.myBooks = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Member = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/ReturnedBooks/${req.user.id}`
    );
    Member = Member.data.data.data;
    console.log(Member);
    res.status(200).render("membermybooks", {
        title: "RemoveActions",
        Member,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getRequests = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Requests = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/bookissue/Requestissue/requests"
    );
    Requests = Requests.data.data;

    console.log(Requests);
    console.log(AppSettings);
    res.status(200).render("requests", {
        Requests,
        AppSettings,
        currentuser: req.user,
    });
});
exports.memberviewbooks = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Books = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/books/"
    );
    Books = Books.data.data.data;
    // console.log(Books);
    res.status(200).render("bookListMember", {
        title: "memberview",
        Books,
        memberemail: req.user.email,
        memberaa: req.user.requests,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getCategoryWiseBooksListMember = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let categorieswiselist = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/"
    );
    categorieswiselist = categorieswiselist.data.data.data;
    console.log(categorieswiselist);
    res.status(200).render("categorywisebooksMember", {
        title: "All Tours",
        categorieswiselist,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getCategoryBooksListMember = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    const category = await Category.findOne({ name: req.params.name });
    let categorieswisebooks = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/category/${category._id}/book`
    );
    categorieswisebooks = categorieswisebooks.data.data.data;
    categorieswisebooks = categorieswisebooks.map((item) => {
        item.Category = [`${req.params.name}`];
        return item;
    });
    console.log(categorieswisebooks);
    res.status(200).render("BooksByCategoryMember", {
        title: "memberview",
        categorieswisebooks,
        memberaa: req.user.requests,
        memberemail: req.user.email,
        AppSettings,
        currentuser: req.user,
    });
});
exports.MemberProfileRead = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Profile = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getIssueStatsMember/${req.params.id}`
    );
    Profile = Profile.data;
    console.log(Profile);
    res.status(200).render("memberprofile", {
        title: "memberprof",
        read: "read",
        Profile,
        jwt: req.jwt,
        AppSettings,
        currentuser: req.user,
    });
});
exports.MemberProfile = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Profile = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getIssueStatsMember/${req.user.id}`
    );
    Profile = Profile.data;
    console.log(Profile);
    res.status(200).render("memberprofileMembers", {
        title: "memberprof",
        Profile,
        jwt: req.jwt,
        AppSettings,
        currentuser: req.user,
    });
});
exports.MemberPassword = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    res.status(200).render("memberpassword", {
        title: "memberprof",
        ids: req.user.id,
        AppSettings,
        currentuser: req.user,
    });
});
exports.myNonReturnedBooks = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Member = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getNonReturnedBooks/${req.user.id}`
    );
    Member = Member.data.data.data;
    console.log(Member);
    res.status(200).render("membermybooks", {
        title: "noretu",
        Member,
        AppSettings,
        currentuser: req.user,
    });
});
exports.memberDashboard = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    console.log(req.user);
    let Member = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/members/get/${req.user.id}`
    );
    console.log("hi");

    Member = Member.data.data.data;
    console.log(Member);

    res.status(200).render("memberDashboard", {
        title: "All Tours",
        Member,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getOverview = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let nonreturned = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/bookissue/getNonReturnedBooks"
    );
    nonreturned = nonreturned.data.length;
    let returned = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/bookissue/ReturnedBooks"
    );
    returned = returned.data.length;

    let books = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/books/"
    );
    books = books.data.results;

    let members = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/members/getApprovedAlls"
    );
    members = members.data.results;

    let categories = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/"
    );
    categories = categories.data.results;
    let finaling = returned + nonreturned;
    if (req.user) {
        console.log(String(req.user.role) === "member");
        //aa
        if (String(req.user.role) === "admin") {
            res.status(200).render("overview", {
                title: "All Tours",
                AppSettings,
                currentuser: req.user,
                nonreturned,
                returned,
                books,
                finaling,
                members,
                categories,
                // tours,
            });
        } else {
            let Member = await axios.get(
                `https://library-fyp.herokuapp.com/api/v1/members/get/${req.user.id}`
            );
            console.log("hi");

            Member = Member.data.data.data;
            console.log(Member);

            res.status(200).render("memberDashboard", {
                title: "All Tours",
                AppSettings,
                currentuser: req.user,
                Member,
            });
        }
    } else {
        res.status(200).render("login", {
            title: "All Tours",
            AppSettings,
            currentuser: req.user,
            // tours,
        });
    }
});
exports.addBook = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Categories = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/"
    );
    Categories = Categories.data.data.data;

    res.status(200).render("addBook", {
        title: "All Tours",
        Categories,
        currentuser: req.user,
        AppSettings,
    });
});

exports.updateBook = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Categories = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/"
    );
    Categories = Categories.data.data.data;

    let Book = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/books/${req.params.id}`
    );
    Book = Book.data.data.data;

    res.status(200).render("updateBook", {
        title: "All Tours",
        Categories,
        Book,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getBooksList = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let Books = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/books/"
    );
    Books = Books.data.data.data;
    console.log(Books);
    res.status(200).render("bookList", {
        title: "All Tours",
        Books,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getCategoryList = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let getCategoryList = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/categoylist"
    );
    getCategoryList = getCategoryList.data.data;
    console.log(getCategoryList);
    
    res.status(200).render("categoryList", {
        title: "All Tours",
        getCategoryList,
        AppSettings,
        currentuser: req.user,
    });

});
exports.getMemberList = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let memberlist = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/members/getApprovedAlls"
    );
    let results = memberlist.data.results;
    memberlist = memberlist.data.data.data;
    res.status(200).render("membersList", {
        title: "All Tours",
        results,
        memberlist,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getMemberBooks = async(req, res, nex) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    try {
        let Books = await axios.get(
            `https://library-fyp.herokuapp.com/api/v1/members/${req.params.id}`
        );
        console.log(Books.data.data.data.books);
        if (Books.data.data.data) {
            Books = Books.data.data.data.books;
            res.status(200).render("bookList", {
                memberbook: true,
                AppSettings,
                currentuser: req.user,
                Books,
            });
        }
    } catch (err) {
        console.log(err.response.data);
    }
};
exports.getReturnBookIssues = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let issuedlist = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/ReturnedBooks`
    );
    issuedlist = issuedlist.data.data.data;
    console.log(issuedlist);
    res.status(200).render("bookissue", {
        title: "RemoveActions",
        issuedlist,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getBookIssues = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let issuedlist = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/bookissue/getNonReturnedBooks`
    );
    issuedlist = issuedlist.data.data.data;
    console.log(issuedlist);
    res.status(200).render("bookissue", {
        title: "All Tours",
        issuedlist,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getNewMembers = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let memberlist = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/members/NewMembers`
    );
    let results = memberlist.data.results;
    memberlist = memberlist.data.data;
    res.status(200).render("membersList", {
        title: "All Tours",
        memberlist,
        results,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getCategoryWiseBooksList = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let categorieswiselist = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/category/"
    );
    categorieswiselist = categorieswiselist.data.data.data;
    console.log(categorieswiselist);
    res.status(200).render("categorywisebooks", {
        title: "All Tours",
        categorieswiselist,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getCategoryBooksList = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    const category = await Category.findOne({ name: req.params.name });
    let categorieswisebooks = await axios.get(
        `https://library-fyp.herokuapp.com/api/v1/category/${category._id}/book`
    );
    categorieswisebooks = categorieswisebooks.data.data.data;
    categorieswisebooks = categorieswisebooks.map((item) => {
        item.Category = [`${req.params.name}`];
        return item;
    });
    console.log(categorieswisebooks);
    res.status(200).render("BooksByCategory", {
        title: "All Tours",
        categorieswisebooks,
        AppSettings,
        currentuser: req.user,
    });
});
exports.getBooksAndReads = catchAsync(async(req, res, next) => {
    let AppSettings = await axios.patch(
        "https://library-fyp.herokuapp.com/api/v1/AppSettings/61372208b021041bb3db2d1b"
    );
    AppSettings = AppSettings.data.data.data;
    let topBooks = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/books/top5books"
    );
    topBooks = topBooks.data.data;
    let topReaders = await axios.get(
        "https://library-fyp.herokuapp.com/api/v1/members/top5Members"
    );
    topReaders = topReaders.data.data;
    console.log(topReaders);

    res.status(200).render("topbooksandread", {
        title: "All Tours",
        topBooks,
        AppSettings,
        topReaders,
        currentuser: req.user,
    });
});