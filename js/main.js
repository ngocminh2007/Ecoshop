// js/main.js
let allProducts = [];
let currentPage = 1;
const itemsPerPage = 8;

// Load sản phẩm
async function loadProducts() {
    try {
        allProducts = await getProducts();
        console.log("✅ Tải thành công", allProducts.length, "sản phẩm");
        
        renderProducts();
        renderPagination();
        updateCartCount();
    } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.innerHTML = `<p class="col-span-full text-center py-10 text-red-500">❌ Không thể tải sản phẩm. Vui lòng refresh lại.</p>`;
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
        productList.innerHTML = `<p class="col-span-full text-center py-10 text-gray-500">Không có sản phẩm nào.</p>`;
        return;
    }

    pageProducts.forEach(product => {
        const cardHTML = `
            <div class="card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src="${product.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                     alt="${product.name}" class="w-full h-52 object-cover">
                <div class="p-5">
                    <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
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

// Phân trang (giữ nguyên)
function renderPagination(filteredProducts = null) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const products = filteredProducts || allProducts;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = `<div class="flex items-center justify-center gap-3 my-12 flex-wrap">`;
    html += `<button onclick="prevPage()" class="px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-emerald-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">← Trước</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button onclick="goToPage(${i})" class="w-11 h-11 rounded-2xl font-semibold transition ${i === currentPage ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 hover:bg-emerald-50'}">${i}</button>`;
    }

    html += `<button onclick="nextPage()" class="px-6 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-emerald-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}">Sau →</button></div>`;

    pagination.innerHTML = html;
}

function goToPage(page) { currentPage = page; renderProducts(); renderPagination(); }
function prevPage() { if (currentPage > 1) { currentPage--; renderProducts(); renderPagination(); } }
function nextPage() { 
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    if (currentPage < totalPages) { currentPage++; renderProducts(); renderPagination(); } 
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
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
    currentPage = 1;
    renderProducts(filtered);
    renderPagination(filtered);
}

// ====================== GIỎ HÀNG ======================
// ====================== THÊM VÀO GIỎ HÀNG ======================
function addToCart(productId) {
    const product = allProducts.find(p => String(p.id) === String(productId));
    
    if (!product) {
        alert("❌ Không tìm thấy sản phẩm!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => String(item.id) === String(product.id));

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // THÔNG BÁO ĐÚNG TÊN SẢN PHẨM
    const notif = document.createElement("div");
    notif.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        background: #10b981; 
        color: white; 
        padding: 16px 24px; 
        border-radius: 16px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999; 
        font-weight: 500;
    `;
    notif.innerHTML = `✅ Đã thêm <b>${product.name}</b> vào giỏ hàng!`;
    document.body.appendChild(notif);

    setTimeout(() => notif.remove(), 2200);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});