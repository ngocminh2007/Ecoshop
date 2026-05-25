let allProducts = [];

let cart = [];

// HIỂN THỊ
async function displayProducts(){

    allProducts =
    await getProducts();

    renderProducts(allProducts);
}

// RENDER
function renderProducts(products){

    const box =
    document.getElementById("product-list");

    let html = "";

    products.forEach(p=>{

        html += `
            <div class="card">

                <img src="${p.image}">

                <div class="card-content">

                    <h3>${p.name}</h3>

                    <p class="price">
                        ${p.price} VNĐ
                    </p>

                    <div class="card-buttons">

                        <button
                        onclick="buyNow('${p.name}')">
                            Mua
                        </button>

                        <button
                        onclick="addToCart('${p.name}')">
                            🛒
                        </button>

                        <button
                        onclick="likeProduct('${p.name}')">
                            ❤️
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    box.innerHTML = html;
}

// MUA
function buyNow(name){

    alert(
        "Bạn đã mua: " + name
    );
}

// CART
function addToCart(name){

    cart.push(name);

    document.getElementById(
        "cart-count"
    ).innerText = cart.length;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        "Đã thêm vào giỏ hàng"
    );
}

// LIKE
function likeProduct(name){

    alert(
        "❤️ Bạn thích: " + name
    );
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

// LOAD CART
function loadCart(){

    const savedCart =
    localStorage.getItem("cart");

    if(savedCart){

        cart =
        JSON.parse(savedCart);

        document.getElementById(
            "cart-count"
        ).innerText = cart.length;
    }
}

displayProducts();

loadCart();