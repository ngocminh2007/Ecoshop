const API_URL =
"https://6a0cfaa1769682b8ee758292.mockapi.io/api/v1/products";

async function getProducts(){

    const response =
    await fetch(API_URL);

    return await response.json();
}

async function addProduct(product){

    await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify(product)
    });
}

async function deleteProduct(id){

    await fetch(`${API_URL}/${id}`,{

        method:"DELETE"
    });
}