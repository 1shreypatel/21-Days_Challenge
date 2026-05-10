const buttons = document.querySelectorAll(".top-btns button");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const dashboard = document.getElementById("dashboard");

function showForm(type) {
    buttons.forEach(btn => btn.classList.remove("active"));

    if (type === "login") {
        buttons[0].classList.add("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    } else {
        buttons[1].classList.add("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    }
}

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirm = document.getElementById("confirm").value.trim();

    clearErrors();

    let valid = true;

    if (name === "") {
        document.getElementById("nameErr").innerText = "Enter your name";
        valid = false;
    }

    if (!email.includes("@")) {
        document.getElementById("emailErr").innerText = "Valid email required";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passErr").innerText = "Minimum 6 characters";
        valid = false;
    }

    if (password !== confirm) {
        document.getElementById("confirmErr").innerText = "Passwords not match";
        valid = false;
    }

    if (valid) {
        let user = {
            name,
            email,
            password
        };

        localStorage.setItem("userData", JSON.stringify(user));
        document.getElementById("signupMsg").innerText = "Signup Successful!";
        signupForm.reset();

        setTimeout(() => {
            showForm("login");
        }, 1000);
    }
});

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let user = JSON.parse(localStorage.getItem("userData"));

    clearErrors();

    if (user && user.email === email && user.password === password) {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        document.querySelector(".top-btns").style.display = "none";
        dashboard.style.display = "block";
        document.getElementById("userText").innerText = "Hello, " + user.name;
    } else {
        document.getElementById("loginMsg").innerText = "Invalid Email or Password";
    }
});

function logout() {
    location.reload();
}

function clearErrors() {
    document.querySelectorAll("small").forEach(el => el.innerText = "");
    document.querySelectorAll(".msg").forEach(el => el.innerText = "");
}