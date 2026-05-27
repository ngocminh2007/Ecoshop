let cart = JSON.parse(localStorage.getItem("cart")) || [];

const box = document.getElementById("cart-items");

let total = 0;

// =====================
// HIỂN THỊ GIỎ HÀNG
// =====================
function renderCart() {
    let html = "";
    total = 0;

    cart.forEach((item, index) => {

        let qty = item.quantity || 1;

        total += Number(item.price) * qty;

        html += `
        <div class="card">
            <img src="${item.image}" alt="product">

            <div class="card-content">
                <h3>${item.name}</h3>

                <p class="price">
                    ${Number(item.price).toLocaleString()} VNĐ
                </p>

                <p>Số lượng: ${qty}</p>

                <button onclick="removeItem(${index})">
                    ❌ Xóa
                </button>
            </div>
        </div>
        `;
    });

    box.innerHTML = html;

    document.getElementById("total-price").innerText =
        "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}

// =====================
// XÓA SẢN PHẨM
// =====================
function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

// =====================
// CHECKOUT
// =====================
function checkout() {

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (cart.length === 0) {
        alert("🛒 Giỏ hàng đang trống!");
        return;
    }

    if (fullname === "" || phone === "" || address === "") {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (!/^[0-9]{9,11}$/.test(phone)) {
        alert("⚠️ Số điện thoại không hợp lệ!");
        return;
    }

    // tạo đơn hàng
    const order = {
        fullname,
        phone,
        address,
        items: cart,
        total,
        date: new Date().toISOString()
    };

    // lưu localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(
        "🎉 Đặt hàng thành công!\n\n" +
        "Khách hàng: " + fullname +
        "\nSĐT: " + phone +
        "\nĐịa chỉ: " + address +
        "\n\nTổng tiền: " + total.toLocaleString() + " VNĐ"
    );

    // clear cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // reset UI
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";

    renderCart();
}

// chạy lần đầu
renderCart();