async function displayAdminProducts(){

const products =
await getProducts();

const list =
document.getElementById(
"admin-product-list"
);

let html = "";

products.forEach(p=>{

html += `
<tr>

<td>

<img src="${p.image}">

</td>

<td>
${p.name}
</td>

<td>
${p.price}
</td>

<td>

<button
onclick="removeProduct(
'${p.id}'
)">

Xóa

</button>

</td>

</tr>
`;
});

list.innerHTML = html;
}

async function addNewProduct(){

const name =
document.getElementById(
"name"
).value;

const price =
document.getElementById(
"price"
).value;

const image =
document.getElementById(
"image"
).value;

await addProduct({

name,
price,
image
});

alert("Đã thêm!");

displayAdminProducts();
}

async function removeProduct(id){

await deleteProduct(id);

alert("Đã xóa!");

displayAdminProducts();
}

displayAdminProducts();