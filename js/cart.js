let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const box =
document.getElementById(
"cart-items"
);

let total = 0;

let html = "";

cart.forEach(item=>{

total += Number(item.price);

html += `
<div class="card">

<img src="${item.image}">

<div class="card-content">

<h3>${item.name}</h3>

<p class="price">

${item.price} VNĐ

</p>

<button
onclick="buyNow()">

Mua ngay

</button>

</div>

</div>
`;
});

box.innerHTML = html;

document.getElementById(
"total-price"
).innerText =

"Tổng tiền: " +
total +
" VNĐ";

function buyNow(){

alert(
"Đặt hàng thành công!"
);
}