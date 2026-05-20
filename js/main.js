async function displayProducts() {

    const products = await getProducts();

    console.log(products);

    const productList =
    document.getElementById("product-list");

    let html = "";

    products.forEach(product => {

        html += `
            <div class="card">

                <img src="${product.image}" alt="">

                <h3>${product.name}</h3>

                <p class="price">
                    ${product.price} VNĐ
                </p>

            </div>
        `;
    });

    productList.innerHTML = html;
}

displayProducts();