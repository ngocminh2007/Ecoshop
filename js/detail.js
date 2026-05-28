// js/detail.js
document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem("detail"));

    if (!product) {
        document.getElementById('detail').innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-2xl text-red-500">Không tìm thấy sản phẩm!</h2>
                <a href="products.html" class="mt-6 inline-block bg-emerald-600 text-white px-8 py-3 rounded-2xl">Quay lại cửa hàng</a>
            </div>
        `;
        return;
    }

    const detailHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
            <!-- Hình ảnh -->
            <div class="flex justify-center">
                <img src="${product.image || 'https://via.placeholder.com/600x600?text=No+Image'}" 
                     alt="${product.name}"
                     class="w-full max-w-lg rounded-3xl shadow-2xl object-cover">
            </div>

            <!-- Thông tin sản phẩm -->
            <div class="flex flex-col">
                <h1 class="text-4xl font-bold text-gray-800 mb-4">${product.name}</h1>
                
                <p class="text-emerald-600 text-3xl font-bold mb-6">
                    ${Number(product.price).toLocaleString('vi-VN')} ₫
                </p>

                <div class="prose text-gray-600 mb-8">
                    <p>Sản phẩm hữu cơ chất lượng cao, được trồng và thu hoạch theo tiêu chuẩn organic. An toàn cho sức khỏe và thân thiện với môi trường.</p>
                    <p class="mt-4">Xuất xứ: Việt Nam • Bảo quản ở nơi khô ráo, thoáng mát.</p>
                </div>

                <!-- Số lượng -->
                <div class="flex items-center gap-4 mb-8">
                    <span class="text-gray-700 font-medium">Số lượng:</span>
                    <div class="flex items-center border border-gray-300 rounded-2xl">
                        <button onclick="changeQuantity(-1)" 
                                class="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-l-2xl">-</button>
                        <input type="number" id="quantity" value="1" 
                               class="w-16 text-center border-x border-gray-300 focus:outline-none text-lg">
                        <button onclick="changeQuantity(1)" 
                                class="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-r-2xl">+</button>
                    </div>
                </div>

                <!-- Nút hành động -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <button onclick="addToCartFromDetail(${product.id})"
                            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl text-lg font-semibold transition flex items-center justify-center gap-2">
                        🛒 Thêm vào giỏ hàng
                    </button>
                    
                    <button onclick="buyNow()"
                            class="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-5 rounded-2xl text-lg font-semibold transition">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detail').innerHTML = detailHTML;
});

// Thay đổi số lượng
function changeQuantity(amount) {
    const qtyInput = document.getElementById('quantity');
    let qty = parseInt(qtyInput.value);
    qty = Math.max(1, qty + amount);
    qtyInput.value = qty;
}

// Thêm vào giỏ từ trang chi tiết
function addToCartFromDetail(id) {
    const qty = parseInt(document.getElementById('quantity').value);
    alert(`✅ Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
    // Bạn có thể mở rộng hàm này sau khi có giỏ hàng thực tế
}

// Mua ngay
function buyNow() {
    const qty = parseInt(document.getElementById('quantity').value);
    alert(`🎉 Đặt hàng thành công!\nSố lượng: ${qty} sản phẩm`);
    // Có thể chuyển hướng sang trang checkout sau này
}