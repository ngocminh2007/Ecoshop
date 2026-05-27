let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// CHECK LOGIN
if (localStorage.getItem("loggedIn") !== "true") {
    window.location = "login.html";
}

// LOAD PRODUCTS
async function displayProducts() {
    allProducts = await getProducts();
    renderProducts(allProducts);
    loadCartCount();
}

// RENDER
function renderProducts(products) {

    const box = document.getElementById("product-list");

    let html = "";

    products.forEach(p => {

        html += `
        <div class="card">

            <img src="${p.image}" onclick="viewDetail('${p.id}')">

            <div class="card-content">

                <h3>${p.name}</h3>

                <p class="price">
                    ${Number(p.price).toLocaleString()} VNĐ
                </p>

                <div class="card-buttons">

                    <button onclick="addToCart('${p.id}')">🛒</button>

                    <button onclick="viewDetail('${p.id}')">Chi tiết</button>

                </div>

            </div>
        </div>
        `;
    });

    box.innerHTML = html;
}

// VIEW DETAIL
function viewDetail(id) {
    let product = allProducts.find(p => p.id == id);

    localStorage.setItem("detail", JSON.stringify(product));

    window.location = "product-detail.html";
}

// ADD TO CART
function addToCart(id) {

    let product = allProducts.find(p => p.id == id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id == id);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCartCount();

    alert("🛒 Đã thêm vào giỏ!");
}

// COUNT CART
function loadCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item => {
        count += item.quantity || 1;
    });

    document.getElementById("cart-count").innerText = count;
}

// SEARCH
function searchProducts() {

    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(keyword)
    );

    renderProducts(filtered);
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location = "login.html";
}

displayProducts();