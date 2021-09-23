export const form_login = async(data) => {
    try {
        const res = await axios({
            method: "POST",
            url: "https://library-fyp.herokuapp.com/api/v1/members/login",
            data,
        });
        if (res.data.status === "success") {
            console.log();
            if (res.data.data.user.role === "admin") {
                window.setTimeout(() => {
                    location.assign("/");
                }, 1500);
            } else {
                window.setTimeout(() => {
                    location.assign("/memberDashboard");
                }, 1500);
            }

            //aa
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const update_members = async(data) => {
    try {
        // REMOVE ADDITIONAL PART START
        if (document.querySelector(".userPhoto").files[0]) {
            const data10 = new FormData();
            data10.append("file", document.querySelector(".userPhoto").files[0]);
            const res10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                data10
            );
            data.append("photo", res10.data.img);
        }
        // REMOVE ADDITIONAL PART END

        let id = document.querySelector(".emails").getAttribute("data-id");
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/members/${id}`,
            data,
        });
        //ajja
        if (res.data.status === "success") {
            alert("Member Updated!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
    }
};
export const update_catigory = async(data) => {
    let id = document.querySelector(".yesingsah").getAttribute("data-id");
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/category/${id}`,
            data,
        });
        if (res.data.status === "success") {
            alert("Category Updated!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const change_password_member = async(data, id) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/members/changepassword/${id}`,
            data,
        });
        if (res.data.status === "success") {
            console.log(res.data);
            alert("Password Changed!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const change_password = async(data) => {
    try {
        let id = document.querySelector(".emails").getAttribute("data-id");

        const res = await axios({
            method: "PATCH",
            url: `/api/v1/members/changepassword/${id}`,
            data,
        });
        if (res.data.status === "success") {
            alert("Password Changed!");
            console.log(res.data);
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const update_member = async(data) => {
    try {
        const res = await axios({
            method: "PATCH",
            url: "/api/v1/members/6116274965aa5c07e80e8d75",
            data,
        });
        if (res.data.status === "success") {
            alert("Member Updated!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const add_appdata = async(data) => {
    try {
        // REMOVE ADDITIONAL PART START
        if (document.querySelector(".libfavicon").files[0]) {
            const datafavicon = new FormData();
            datafavicon.append(
                "file",
                document.querySelector(".libfavicon").files[0]
            );
            const faviucon10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                datafavicon
            );
            console.log(faviucon10.data.img);
            data.append("favicon", faviucon10.data.img);
        }
        if (document.querySelector(".liblogo").files[0]) {
            const datalogo = new FormData();
            datalogo.append("file", document.querySelector(".liblogo").files[0]);
            const logo10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                datalogo
            );
            console.log(logo10.data.img);
            data.append("logo", logo10.data.img);
        }
        // REMOVE ADDITIONAL PART END
        const res = await axios({
            method: "PATCH",
            url: "/api/v1/AppSettings/61372208b021041bb3db2d1b",
            data,
        });
        if (res.data.status === "success") {
            alert("Settings Updated!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const add_issue = async(data) => {
    console.log(data.get(`member`));
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/bookissue/",
            data,
        });
        const getTodoItems = async() => {
            let response;
            try {
                response = await axios.post(
                    `https://library-fyp.herokuapp.com/api/v1/bookissue/Requestdone/${$(
            ".oaksendsainga"
          ).attr("data-id")}/${$(".oaksendsainga").attr("data-member")}/${$(
            ".oaksendsainga"
          ).attr("data-bookid")}`
                );
            } catch (errors) {
                console.log(errors);
            }
        };

        getTodoItems();
        if (res.data.status === "success") {
            alert("Book Issued!");
            window.setTimeout(() => {
                location.reload();
            }, 500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
    }
};
export const approve_member = async(data) => {
    console.log(data);
    // console.log(data.get("Category"));
    // data.set("Category", JSON.parse(data.get("Category")));
    try {
        const res = await axios({
            method: "POST",
            url: `/api/v1/members/approvemember/${data}`,
        });

        console.log(res);
        if (res.data.status === "success") {
            alert("Member Approved!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};
export const add_member_admin = async(data) => {
    console.log(data);
    // console.log(data.get("Category"));
    // data.set("Category", JSON.parse(data.get("Category")));
    try {
        // REMOVE ADDITIONAL PART START
        if (document.querySelector(".addmemberphoto").files[0]) {
            const data10 = new FormData();
            data10.append("file", document.querySelector(".addmemberphoto").files[0]);
            const res10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                data10
            );
            console.log(res10.data.img);
            data.append("photo", res10.data.img);
        }
        // REMOVE ADDITIONAL PART END
        const res = await axios({
            method: "POST",
            url: "/api/v1/members/signupbyadmin",
            data,
        });

        console.log(res);
        if (res.data.status === "success") {
            alert("Member Added!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
    }
};
export const add_member = async(data) => {
    console.log(data);
    // console.log(data.get("Category"));
    // data.set("Category", JSON.parse(data.get("Category")));
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/members/signup",
            data,
        });

        console.log(res);
        if (res.data.status === "success") {
            alert("Signup Successfully");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const add_book = async(data) => {
    // console.log(data.get("Category"));
    // data.set("Category", JSON.parse(data.get("Category")));
    try {
        // REMOVE ADDITIONAL PART START
        if (document.getElementById("photo").files[0]) {
            const data10 = new FormData();
            data10.append("file", document.getElementById("photo").files[0]);
            const res10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                data10
            );
            console.log(res10.data.img);
            data.append("photo", res10.data.img);
        }
        // REMOVE ADDITIONAL PART END
        const res = await axios({
            method: "POST",
            url: "/api/v1/books",
            data,
        });
        if (res.data.status === "success") {
            alert("Book Added!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const update_book = async(data, id) => {
    // console.log(data.get("Category"));
    // data.set("Category", JSON.parse(data.get("Category")));
    try {
        // REMOVE ADDITIONAL PART START
        if (document.getElementById("photo").files[0]) {
            const data10 = new FormData();
            data10.append("file", document.getElementById("photo").files[0]);
            const res10 = await axios.post(
                `https://getpicsapp.herokuapp.com/file/upload`,
                data10
            );
            console.log(res10.data.img);
            data.append("photo", res10.data.img);
        }
        // REMOVE ADDITIONAL PART END
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/books/${id}`,
            data,
        });
        if (res.data.status === "success") {
            alert("Book Updated!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export const add_category = async(data) => {
    try {
        console.log(data.get("name"));

        const res = await axios({
            method: "POST",
            url: "/api/v1/category",
            data,
        });

        if (res.data.status === "success") {
            alert("Category Added!");
            // window.setTimeout(() => {
            //     location.assign("/");
            // }, 1500);
        }
    } catch (err) {
        console.log(err.response.data.message);
    }
    // console.log(res);
};