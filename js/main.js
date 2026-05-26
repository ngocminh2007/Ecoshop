let allProducts = [];

async function displayProducts(){

allProducts =
await getProducts();

renderProducts(allProducts);

loadCartCount();
}

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

<h3>${p.name}</h3>

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

// DETAIL
function viewDetail(product){

localStorage.setItem(
"detail",
JSON.stringify(product)
);

window.location =
"product-detail.html";
}

// ADD CART
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
"Đã thêm vào giỏ hàng!"
);
}

// COUNT
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

displayProducts();