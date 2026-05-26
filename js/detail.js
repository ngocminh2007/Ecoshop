const product =
JSON.parse(
localStorage.getItem("detail")
);

const box =
document.getElementById(
"detail"
);

box.innerHTML = `
<div class="detail-card">

<img src="${product.image}">

<div>

<h1>
${product.name}
</h1>

<h2 class="price">

${product.price} VNĐ

</h2>

<p>

Đây là sản phẩm hữu cơ
cao cấp, tốt cho sức khỏe.

</p>

<br>

<button
onclick="buyNow()">

Mua ngay

</button>

</div>

</div>
`;

function buyNow(){

alert(
"Đặt hàng thành công!"
);
}