// js/login.js

const accounts = [
    { username: "admin", password: "123456" },
    { username: "minh", password: "111111" },
    { username: "user", password: "123123" }
];

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";

    if (!username || !password) {
        errorEl.textContent = "Vui lòng nhập tên đăng nhập và mật khẩu!";
        return;
    }

    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (user) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        
        window.location.href = "index.html";   // Chuyển về trang chủ
    } else {
        errorEl.textContent = "❌ Sai tên đăng nhập hoặc mật khẩu!";
    }
}

// Cho phép nhấn Enter để đăng nhập
document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                login();
            }
        });
    }
});