// js/main.js
let allProducts = [];
let currentPage = 1;
const itemsPerPage = 4;   // Có thể đổi thành 5 hoặc 6

// Load sản phẩm
async function loadProducts() {
    try {
        allProducts = await getProducts();
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.innerHTML = `<p class="col-span-full text-center py-10 text-red-500">❌ Không thể tải dữ liệu. Vui lòng thử lại.</p>`;
        }
    }
}

// Render sản phẩm
function renderProducts(filteredProducts = null) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';

    const productsToShow = filteredProducts || allProducts;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = productsToShow.slice(start, end);

    if (pageProducts.length === 0) {
        productList.innerHTML = `<p class="col-span-full text-center py-10 text-gray-500">Không tìm thấy sản phẩm nào.</p>`;
        return;
    }

    pageProducts.forEach(product => {
        const cardHTML = `
            <div class="card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src="${product.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                     alt="${product.name}" class="w-full h-52 object-cover">
                <div class="p-5">
                    <h3 class="font-semibold text-lg mb-2 line-clamp-2">${product.name}</h3>
                    <p class="text-emerald-600 font-bold text-xl mb-4">
                        ${Number(product.price).toLocaleString('vi-VN')} ₫
                    </p>
                    <button onclick="addToCart(${product.id})" 
                            class="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl text-white font-medium transition">
                        🛒 Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        productList.innerHTML += cardHTML;
    });
}

// Phân trang
function renderPagination(filteredProducts = null) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const products = filteredProducts || allProducts;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = `
        <div class="flex items-center justify-center gap-3 my-12 flex-wrap">
            <button onclick="prevPage()" 
                    class="px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-emerald-50 text-gray-700 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                ← Trước
            </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button onclick="goToPage(${i})" 
                    class="w-11 h-11 flex items-center justify-center rounded-2xl font-semibold transition
                    ${i === currentPage ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-300 hover:bg-emerald-50 text-gray-700'}">
                ${i}
            </button>
        `;
    }

    html += `
            <button onclick="nextPage()" 
                    class="px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-emerald-50 text-gray-700 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">
                Sau →
            </button>
        </div>
    `;

    pagination.innerHTML = html;
}

// Điều hướng
function goToPage(page) {
    currentPage = page;
    renderProducts();
    renderPagination();
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        renderPagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        renderPagination();
    }
}

// Tìm kiếm
function searchProducts() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!keyword) {
        currentPage = 1;
        renderProducts();
        renderPagination();
        return;
    }

    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    renderProducts(filtered);
    renderPagination(filtered);

}
// ====================== GIỎ HÀNG ======================

function addToCart(productId) {
    const product = allProducts.find(p => p.id == productId);
    
    if (!product) {
        alert("❌ Không tìm thấy sản phẩm!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id == product.id);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Cập nhật số lượng giỏ hàng
    updateCartCount();
    
    // Thông báo
    const notification = document.createElement("div");
    notification.className = "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50";
    notification.innerHTML = `✅ Đã thêm <b>${product.name}</b> vào giỏ hàng!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2500);
}

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countEl.textContent = totalItems;
    }
}

// Khởi tạo số lượng giỏ hàng khi load trang
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
// Khởi chạy
document.addEventListener('DOMContentLoaded', loadProducts);