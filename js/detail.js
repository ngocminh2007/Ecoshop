// js/detail.js
document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem("detail"));

    if (!product) {
        document.getElementById('detail').innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-2xl text-red-500">Không tìm thấy sản phẩm!</h2>
                <a href="products.html" class="mt-6 inline-block bg-emerald-600 text-white px-8 py-3 rounded-2xl">Quay lại</a>
            </div>`;
        return;
    }

    const html = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Ảnh sản phẩm -->
            <div>
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full rounded-3xl shadow-2xl">
            </div>

            <!-- Thông tin chi tiết -->
            <div>
                <h1 class="text-4xl font-bold text-gray-800 mb-2">${product.name}</h1>
                <p class="text-emerald-600 text-3xl font-bold mb-6">
                    ${Number(product.price).toLocaleString('vi-VN')} ₫
                </p>

                <!-- Mô tả ngắn -->
                <p class="text-gray-600 text-lg mb-8">${product.description || "Sản phẩm hữu cơ chất lượng cao, an toàn cho sức khỏe."}</p>

                <!-- Thông tin chi tiết -->
                <div class="grid grid-cols-2 gap-6 mb-10">
                    <div>
                        <p class="text-gray-500 text-sm">Xuất xứ</p>
                        <p class="font-medium">${product.origin || "Việt Nam"}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm">Hạn sử dụng</p>
                        <p class="font-medium">${product.expiry || "30 ngày"}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm">Đơn vị</p>
                        <p class="font-medium">1kg / Túi</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm">Chứng nhận</p>
                        <p class="font-medium text-emerald-600">Hữu cơ Việt Nam</p>
                    </div>
                </div>

                <!-- Lợi ích -->
                <div class="mb-10">
                    <h3 class="font-semibold text-lg mb-4">Lợi ích sức khỏe</h3>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Giàu vitamin và khoáng chất tự nhiên</li>
                        <li>Không chất bảo quản, không thuốc trừ sâu</li>
                        <li>Hỗ trợ hệ tiêu hóa và tăng cường sức đề kháng</li>
                    </ul>
                </div>

                <!-- Số lượng + Nút -->
                <div class="flex items-center gap-6">
                    <div class="flex items-center border border-gray-300 rounded-2xl">
                        <button onclick="changeQuantity(-1)" class="w-12 h-12 text-2xl hover:bg-gray-100">-</button>
                        <input id="quantity" type="number" value="1" class="w-16 text-center text-xl focus:outline-none">
                        <button onclick="changeQuantity(1)" class="w-12 h-12 text-2xl hover:bg-gray-100">+</button>
                    </div>

                    <button onclick="addToCartFromDetail()" 
                            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-semibold text-lg">
                        🛒 Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detail').innerHTML = html;
});

function changeQuantity(amount) {
    const qty = document.getElementById('quantity');
    let value = parseInt(qty.value);
    value = Math.max(1, value + amount);
    qty.value = value;
}

function addToCartFromDetail() {
    const product = JSON.parse(localStorage.getItem("detail"));
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
}