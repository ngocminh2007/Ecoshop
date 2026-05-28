// js/cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render giỏ hàng
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-20 bg-white rounded-3xl shadow">
                <p class="text-6xl mb-4">🛒</p>
                <h3 class="text-xl font-medium text-gray-500">Giỏ hàng của bạn đang trống</h3>
                <a href="products.html" class="mt-6 inline-block bg-emerald-600 text-white px-8 py-3 rounded-2xl hover:bg-emerald-700">
                    Mua sắm ngay
                </a>
            </div>
        `;
        updateTotal();
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        total += itemTotal;

        html += `
            <div class="flex gap-6 bg-white p-6 rounded-3xl shadow-md">
                <img src="${item.image || 'https://via.placeholder.com/120'}" 
                     class="w-28 h-28 object-cover rounded-2xl">
                
                <div class="flex-1">
                    <h3 class="font-semibold text-lg">${item.name}</h3>
                    <p class="text-emerald-600 font-bold text-xl mt-1">
                        ${Number(item.price).toLocaleString('vi-VN')} ₫
                    </p>
                    
                    <div class="flex items-center gap-4 mt-4">
                        <div class="flex items-center border border-gray-300 rounded-2xl">
                            <button onclick="changeQuantity(${index}, -1)" 
                                    class="w-9 h-9 flex items-center justify-center text-xl hover:bg-gray-100">-</button>
                            <span class="px-5 font-medium">${qty}</span>
                            <button onclick="changeQuantity(${index}, 1)" 
                                    class="w-9 h-9 flex items-center justify-center text-xl hover:bg-gray-100">+</button>
                        </div>
                        
                        <button onclick="removeItem(${index})" 
                                class="text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                            ❌ Xóa
                        </button>
                    </div>
                </div>
                
                <div class="text-right font-bold text-lg">
                    ${itemTotal.toLocaleString('vi-VN')} ₫
                </div>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    updateTotal();
}

// Cập nhật tổng tiền
function updateTotal() {
    const totalEl = document.getElementById("total-price");
    if (!totalEl) return;

    let total = cart.reduce((sum, item) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);

    totalEl.textContent = total.toLocaleString('vi-VN') + " ₫";
}

// Thay đổi số lượng
function changeQuantity(index, amount) {
    if (!cart[index]) return;
    
    cart[index].quantity = (cart[index].quantity || 1) + amount;
    
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Xóa sản phẩm
function removeItem(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Đặt hàng
function checkout() {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();

    if (cart.length === 0) {
        alert("🛒 Giỏ hàng của bạn đang trống!");
        return;
    }

    if (!name || !phone) {
        alert("⚠️ Vui lòng nhập đầy đủ Họ tên và Số điện thoại!");
        return;
    }

    const order = {
        id: Date.now(),
        fullname: name,
        phone: phone,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
        date: new Date().toLocaleString('vi-VN')
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`🎉 Đặt hàng thành công!\n\nCảm ơn ${name} đã mua hàng tại EcoShop!`);

    // Xóa giỏ hàng
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', renderCart);