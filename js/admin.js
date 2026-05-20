async function displayAdminProducts() {

    const products = await getProducts();

    const list =
    document.getElementById("admin-product-list");

    let html = "";

    products.forEach(product => {

        html += `
            <tr>

                <td>${product.name}</td>

                <td>${product.price}</td>

                <td>
                    <img src="${product.image}">
                </td>

                <td>
                    <button onclick="removeProduct('${product.id}')">
                        Xóa
                    </button>
                </td>

            </tr>
        `;
    });

    list.innerHTML = html;
}

async function addNewProduct() {

    const name =
    document.getElementById("name").value;

    const price =
    document.getElementById("price").value;

    const image =
    document.getElementById("image").value;

    const product = {
        name,
        price,
        image
    };

    await addProduct(product);

    alert("Đã thêm sản phẩm!");

    displayAdminProducts();
}

async function removeProduct(id) {

    await deleteProduct(id);

    alert("Đã xóa!");

    displayAdminProducts();
}

displayAdminProducts();