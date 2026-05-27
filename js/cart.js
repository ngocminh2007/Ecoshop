let cart = JSON.parse(localStorage.getItem("cart")) || [];

const box = document.getElementById("cart-items");

function renderCart() {

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        let qty = item.quantity || 1;

        total += item.price * qty;

        html += `
        <div class="card">

            <img src="${item.image}">

            <div class="card-content">

                <h3>${item.name}</h3>

                <p>${Number(item.price).toLocaleString()} VNĐ</p>

                <p>Số lượng: ${qty}</p>

                <button onclick="removeItem(${index})">❌ Xóa</button>

            </div>

        </div>
        `;
    });

    box.innerHTML = html;

    document.getElementById("total-price").innerText =
        "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}

// XÓA
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// CHECKOUT
function checkout() {

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("🛒 Giỏ hàng trống!");
        return;
    }

    if (!fullname || !phone || !address) {
        alert("⚠️ Nhập đầy đủ thông tin!");
        return;
    }

    let order = {
        fullname,
        phone,
        address,
        items: cart,
        date: new Date().toISOString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("🎉 Đặt hàng thành công!");

    localStorage.removeItem("cart");

    window.location = "index.html";
}

renderCart();