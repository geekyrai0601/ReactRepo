import axios from 'axios';

export let dataServiceObj = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct     
};

let url = "http://localhost:3500/products/"; // Adjust the endpoint to your product API

function getAllProducts() {
    return axios.get(url);
}

function getProductById(id) {
    return axios.get(url + id);
}

function addProduct(productObj) {
    return axios.post(url, productObj);
}

function updateProduct(productObj) {
    return axios.put(url + productObj.id, productObj);
}

function deleteProduct(id) {
    return axios.delete(url + id);
}
