// js/cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-20 bg-white rounded-3xl shadow">
                <p class="text-7xl mb-6">🛒</p>
                <h3 class="text-2xl font-medium text-gray-500 mb-4">Giỏ hàng trống</h3>
                <a href="products.html" class="inline-block bg-emerald-600 text-white px-10 py-4 rounded-2xl hover:bg-emerald-700">
                    Mua sắm ngay
                </a>
            </div>`;
        updateTotal();
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const itemTotal = Number(item.price) * qty;
        total += itemTotal;

        html += `
            <div class="flex gap-6 bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition">
                <img src="${item.image}" class="w-28 h-28 object-cover rounded-2xl" alt="${item.name}">
                
                <div class="flex-1">
                    <h3 class="font-semibold text-xl">${item.name}</h3>
                    <p class="text-emerald-600 font-bold text-2xl mt-1">${Number(item.price).toLocaleString('vi-VN')} ₫</p>
                    
                    <div class="flex items-center gap-6 mt-5">
                        <div class="flex items-center border border-gray-300 rounded-2xl">
                            <button onclick="changeQuantity(${index}, -1)" class="w-11 h-11 text-2xl hover:bg-gray-100 rounded-l-2xl">-</button>
                            <span class="px-8 text-lg font-medium">${qty}</span>
                            <button onclick="changeQuantity(${index}, 1)" class="w-11 h-11 text-2xl hover:bg-gray-100 rounded-r-2xl">+</button>
                        </div>
                        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-600 flex items-center gap-2">
                            🗑️ Xóa
                        </button>
                    </div>
                </div>

                <div class="text-right font-bold text-2xl self-center">
                    ${itemTotal.toLocaleString('vi-VN')} ₫
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    updateTotal();
}

function updateTotal() {
    let total = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
    const totalEl = document.getElementById("total-price");
    if (totalEl) totalEl.textContent = total.toLocaleString('vi-VN') + " ₫";
}

function changeQuantity(index, amount) {
    cart[index].quantity = Math.max(1, (cart[index].quantity || 1) + amount);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Xóa sản phẩm (không hiện confirm)
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) return alert("Giỏ hàng trống!");

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ!");
        return;
    }

    alert(`🎉 Đặt hàng thành công!\n\nCảm ơn ${name}!\nĐịa chỉ: ${address}`);
    
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Khởi chạy
document.addEventListener('DOMContentLoaded', renderCart);