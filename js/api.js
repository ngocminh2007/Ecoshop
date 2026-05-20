const API_URL =
"https://6a0cfaa1769682b8ee758292.mockapi.io/api/v1/products";

// Lấy danh sách sản phẩm
async function getProducts() {

    const response =
    await fetch(API_URL);

    return await response.json();
}