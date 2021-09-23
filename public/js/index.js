import {
    add_book,
    add_category,
    add_member,
    add_issue,
    add_appdata,
    update_book,
    add_member_admin,
    approve_member,
    update_member,
    change_password,
    change_password_member,
    form_login,
    update_members,
    update_catigory,
} from "./axiosrequests.js";
const addbookform = document.querySelector(".add_book");
const updatebookform = document.querySelector(".update_book");
const addCategoryForm = document.querySelector(".addCategoryForm");
const add_member_form = document.querySelector(".add_member_form");
const formIssue = document.querySelector(".formIssue");
const AppSettingsForm = document.querySelector(".AppSettingsForm");
const formssignup = document.querySelector(".forms-signup");
const ApproveMember = document.querySelector(".okssss");
const UpdateUser = document.querySelector(".updateUser");
const changePassword = document.querySelector(".changePassword");
const changePasswordMember = document.querySelector(".changePasswordMember");
const formlogin = document.querySelector(".form-login");
const updateUserMember = document.querySelector(".updateUserMember");
const addIssue = document.querySelector(".addIssueaaas");
const editCatigory = document.querySelector(".editCati");

if (editCatigory) {
    editCatigory.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        console.log(document.querySelector(".namaaa").value);
        data.append(`name`, document.querySelector(".namaaa").value);
        update_catigory(data);
    });
}
if (addIssue) {
    addIssue.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        console.log(
            document.querySelector(".oaksendsainga").getAttribute("data-hours")
        );
        data.append(
            `book[0]`,
            document.querySelector(".oaksendsainga").getAttribute("data-bookid")
        );
        data.append(
            "member",
            document.querySelector(".oaksendsainga").getAttribute("data-member")
        );
        data.append(
            "issuefor",
            document.querySelector(".oaksendsainga").getAttribute("data-duration")
        );
        if (document.querySelector(".data").value) {
            data.append(
                "returndate",
                document.querySelector(".oaksendsainga").getAttribute("data-returns")
            );
        }
        if (document.querySelector(".houra").value) {
            data.append(
                "hours",
                document.querySelector(".oaksendsainga").getAttribute("data-hours")
            );
        }

        add_issue(data);
        //s
        // data.append("address", document.querySelector(".addresses").value);
    });
}

if (updateUserMember) {
    updateUserMember.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        // console.log(document.querySelector(".names").value);
        // console.log(document.querySelector(".emails").value);
        // console.log(document.querySelector(".phones").value);
        // console.log(document.querySelector(".addresses").value);
        // console.log(document.querySelector(".roles").value);
        // console.log(document.querySelector(".userPhoto").files[0]);
        data.append("name", document.querySelector(".names").value);
        data.append("email", document.querySelector(".emails").value);
        data.append("phonenumber", document.querySelector(".phones").value);
        data.append("address", document.querySelector(".addresses").value);
        if (document.querySelector(".roles")) {
            data.append("role", document.querySelector(".roles").value);
        }
        // if (document.querySelector(".userPhoto").files[0]) {
        //     data.append("photo", document.querySelector(".userPhoto").files[0]);
        // }
        update_members(data);
    });
}
if (formlogin) {
    formlogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", document.querySelector(".email").value);
        data.append("password", document.querySelector(".password").value);
        form_login(data);
    });
}
if (changePassword) {
    changePassword.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (
            String(document.querySelector(".passwordConfirm").value) !==
            String(document.querySelector(".password").value)
        ) {
            alert("password and confirm password not same!");
        }
        data.append("password", document.querySelector(".password").value);
        data.append(
            "passwordCurrent",
            document.querySelector(".passwordCurrent").value
        );
        change_password(data);
    });
}

if (changePasswordMember) {
    changePasswordMember.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (
            String(document.querySelector(".passwordConfirm").value) !==
            String(document.querySelector(".password").value)
        ) {
            alert("password and confirm password not same!");
        }
        data.append("password", document.querySelector(".password").value);
        data.append(
            "passwordCurrent",
            document.querySelector(".passwordCurrent").value
        );
        change_password_member(data, $(".getids").attr("data-id"));
    });
}
if (UpdateUser) {
    UpdateUser.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        // console.log(document.querySelector(".names").value);
        // console.log(document.querySelector(".emails").value);
        // console.log(document.querySelector(".phones").value);
        // console.log(document.querySelector(".addresses").value);
        // console.log(document.querySelector(".roles").value);
        console.log(document.querySelector(".userPhoto").files[0]);
        data.append("name", document.querySelector(".names").value);
        data.append("email", document.querySelector(".emails").value);
        data.append("phonenumber", document.querySelector(".phones").value);
        data.append("address", document.querySelector(".addresses").value);
        if (document.querySelector(".roles")) {
            data.append("role", document.querySelector(".roles").value);
        }
        if (document.querySelector(".userPhoto").files[0]) {
            data.append("photo", document.querySelector(".userPhoto").files[0]);
        }
        update_member(data);
    });
}
if (ApproveMember) {
    let id = $(this).attr("data-id");
    approve_member(id);
}
if (formssignup) {
    formssignup.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", document.querySelector(".name").value);
        data.append("email", document.querySelector(".email").value);
        data.append("password", document.querySelector(".password").value);
        data.append("profession", document.querySelector(".profession").value);
        data.append("phonenumber", document.querySelector(".contact").value);
        data.append("address", document.querySelector(".address").value);
        let gender = $('input[name="gender"]:checked').val();
        data.append("gender", String(gender));
        console.log(gender);
        console.log(data);
        add_member(data);
    });
}
if (AppSettingsForm) {
    AppSettingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", document.querySelector(".libname").value);
        data.append("contactno", document.querySelector(".libphone").value);
        // if (document.querySelector(".libfavicon").files[0]) {
        //     data.append("favicon", document.querySelector(".libfavicon").files[0]);
        // }
        // if (document.querySelector(".liblogo").files[0]) {
        //     data.append("logo", document.querySelector(".liblogo").files[0]);
        // }
        add_appdata(data);
    });
}
if (formIssue) {
    formIssue.addEventListener("submit", (e) => {
        e.preventDefault();
        let email = $("#member_id").val();
        console.log(email);
        const getTodoItems = async() => {
            let response;
            try {
                response = await axios.get(
                    `https://library-fyp.herokuapp.com/api/v1/members/ByEmail/${email}`
                );
                console.log(response.data.data[0]);
                if (response.data.data[0]) {
                    let data = new FormData();
                    let selected = $("#multiple").val();

                    if (selected) {
                        selected.map((item, i) => {
                            data.append(`book[${i}]`, selected[i]);
                        });
                    }
                    if (document.querySelector(".data").value) {
                        var dataEnd = document.querySelector(".data").value;
                        console.log(new Date(dataEnd).getTime());
                        data.append("returndate", new Date(dataEnd).getTime());
                    }
                    if (document.querySelector(".memberidz").value) {
                        data.append("member", document.querySelector(".memberidz").value);
                    }
                    if (document.querySelector(".daytes").value) {
                        data.append("issuefor", document.querySelector(".daytes").value);
                    }
                    if (document.querySelector(".hourstos").value) {
                        data.append("hours", document.querySelector(".hourstos").value);
                    }
                    console.log(data.get(`member`));
                    add_issue(data);
                } else {
                    $(".shows").css("display", "none");
                    $(".nots").css("display", "flex");
                }
            } catch (errors) {
                console.log("Invalid Email");
            }
        };

        getTodoItems();
    });
}
if (addCategoryForm) {
    addCategoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", document.querySelector(".AddCategoryName").value);
        console.log(data.get("name"));
        add_category(data);
    });
}
if (add_member_form) {
    add_member_form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", document.querySelector(".addmembername").value);
        data.append("email", document.querySelector(".addmemberemail").value);
        data.append("gender", document.querySelector(".addmembergender").value);
        data.append(
            "phonenumber",
            document.querySelector(".addmembernumber").value
        );
        data.append(
            "profession",
            document.querySelector(".addmemberprofession").value
        );
        data.append("address", document.querySelector(".addmemberaddress").value);

        data.append("role", document.querySelector(".addmemberrole").value);
        data.append("password", document.querySelector(".addmemberpassword").value);
        // data.append("photo", document.querySelector(".addmemberphoto").files[0]);
        add_member_admin(data);
    });
}
if (updatebookform) {
    updatebookform.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        let selected = $("#multiple").val();
        // console.log(selected);

        // data.append("Category", selected);
        if (selected) {
            selected.map((item, i) => {
                data.append(`Category[${i}]`, selected[i]);
            });
        }
        // console.log(document.getElementById("photo").files[0]);
        console.log(document.getElementById("name").value);
        if (document.getElementById("name").value) {
            data.append("name", document.getElementById("name").value);
        }
        data.append("isbnNumber", document.getElementById("isbnNumber").value);
        data.append(
            "BookAvailability",
            document.getElementById("BookAvailability").value
        );
        data.append("writer", document.getElementById("writer").value);
        data.append("BookAddition", document.getElementById("BookAddition").value);
        data.append("Status", document.getElementById("Status").value);
        data.append(
            "BookCondition",
            document.getElementById("BookCondition").value
        );
        data.append("BookDetails", document.getElementById("BookDetails").value);
        // REMOVE ADDITIONAL COMMENTS START
        // data.append("photo", document.getElementById("photo").files[0]);
        // REMOVE ADDITIONAL COMMENTS END

        console.log(data);
        update_book(data, $("#BookAddition").attr("data-id"));
    });
}
if (addbookform) {
    addbookform.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        let selected = $("#multiple").val();
        // console.log(selected);

        // data.append("Category", selected);
        if (selected) {
            selected.map((item, i) => {
                data.append(`Category[${i}]`, selected[i]);
            });
        }
        // console.log(document.getElementById("photo").files[0]);
        if (document.getElementById("name").value) {
            data.append("name", document.getElementById("name").value);
        }
        if (document.getElementById("bookpages").value) {
            data.append("TotalPages", document.getElementById("bookpages").value);
        }

        if (document.getElementById("isbnNumber").value) {
            data.append("isbnNumber", document.getElementById("isbnNumber").value);
        }
        if (document.getElementById("BookAvailability").value) {
            data.append(
                "BookAvailability",
                document.getElementById("BookAvailability").value
            );
        }
        if (document.getElementById("writer").value) {
            data.append("writer", document.getElementById("writer").value);
        }
        if (document.getElementById("BookAddition").value) {
            data.append(
                "BookAddition",
                document.getElementById("BookAddition").value
            );
        }
        if (document.getElementById("Status").value) {
            data.append("Status", document.getElementById("Status").value);
        }
        if (document.getElementById("BookCondition").value) {
            data.append(
                "BookCondition",
                document.getElementById("BookCondition").value
            );
        }
        if (document.getElementById("BookDetails").value) {
            data.append("BookDetails", document.getElementById("BookDetails").value);
        }
        // if (document.getElementById("photo").files[0]) {
        //     data.append("photo", document.getElementById("photo").files[0]);
        // }

        add_book(data);
    });
}