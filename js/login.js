// TÀI KHOẢN MẪU
const USERNAME = "admin";

const PASSWORD = "123456";

// LOGIN
function login(){

    const username =
    document.getElementById(
        "username"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    if(
        username === USERNAME &&
        password === PASSWORD
    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location =
        "index.html";
    }

    else{

        document.getElementById(
            "error"
        ).innerText =

        "Sai tài khoản hoặc mật khẩu!";
    }
}