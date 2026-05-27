// CHECK LOGIN
if(
    localStorage.getItem(
        "loggedIn"
    ) !== "true"
){

    window.location =
    "login.html";
}

let allProducts = [];

// LOAD PRODUCTS
async function displayProducts(){

    allProducts =
    await getProducts();

    renderProducts(allProducts);

    loadCartCount();
}

// RENDER PRODUCTS
function renderProducts(products){

    const box =
    document.getElementById(
        "product-list"
    );

    let html = "";

    products.forEach(p=>{

        html += `
            <div class="card">

                <img
                src="${p.image}"

                onclick='viewDetail(
                    ${JSON.stringify(p)}
                )'>

                <div class="card-content">

                    <h3>
                        ${p.name}
                    </h3>

                    <p class="price">

                        ${p.price} VNĐ

                    </p>

                    <div class="card-buttons">

                        <button
                        onclick='addToCart(
                            ${JSON.stringify(p)}
                        )'>

                            🛒

                        </button>

                        <button
                        onclick='viewDetail(
                            ${JSON.stringify(p)}
                        )'>

                            Chi tiết

                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    box.innerHTML = html;
}

// VIEW DETAIL
function viewDetail(product){

    localStorage.setItem(
        "detail",
        JSON.stringify(product)
    );

    window.location =
    "product-detail.html";
}

// ADD TO CART
function addToCart(product){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCartCount();

    alert(
        "🛒 Đã thêm vào giỏ hàng!"
    );
}

// LOAD CART COUNT
function loadCartCount(){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    document.getElementById(
        "cart-count"
    ).innerText =
    cart.length;
}

// SEARCH
function searchProducts(){

    const keyword =
    document.getElementById(
        "searchInput"
    ).value.toLowerCase();

    const filtered =
    allProducts.filter(p=>

        p.name.toLowerCase()
        .includes(keyword)
    );

    renderProducts(filtered);
}

// LOGOUT
function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    window.location =
    "login.html";
}

displayProducts();