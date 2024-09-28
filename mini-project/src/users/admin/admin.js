import { useState, useEffect } from 'react';
import { dataServiceObj } from './Dataservice'; // Adjust this import based on your actual service file
import './ajax.css';  // Import the CSS file

function Ajax() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState(""); // New state for description
    const [image, setImage] = useState(""); // New state for image
    const [productArray, setProductArray] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch products on component mount
    useEffect(() => {
        getProductsClick();
    }, []);

    function getProductsClick() {
        setLoading(true); // Set loading to true
        dataServiceObj.getAllProducts().then((resData) => {
            console.log(resData.data); // Log the product data
            setProductArray(resData.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            setLoading(false); // Set loading to false
        });
    }

    function addProductClick() {
        if (!name || !price || !category || !description || !image) {
            alert("Please fill in all fields.");
            return;
        }

        let productObj = { id, name, price, category, description, image }; // Include new fields

        dataServiceObj.addProduct(productObj).then(() => {
            alert("New Product Added to server");
            getProductsClick();
            clearFields();
        }).catch(error => {
            console.error("Error adding product:", error);
        });
    }

    function deleteProductClick(prodId) {
        if (window.confirm("Do you want to Delete?")) {
            dataServiceObj.deleteProduct(prodId).then(() => {
                alert("Selected Product deleted from server");
                getProductsClick();
            }).catch(error => {
                console.error("Error deleting product:", error);
            });
        }
    }

    function selectProductClick(prodId) {
        dataServiceObj.getProductById(prodId).then((resData) => {
            let productObj = resData.data;
            setId(productObj.id);
            setName(productObj.name);
            setPrice(productObj.price);
            setCategory(productObj.category);
            setDescription(productObj.description); // Set the description
            setImage(productObj.image); // Set the image
        }).catch(error => {
            console.error("Error selecting product:", error);
        });
    }

    function updateProductClick() {
        if (!name || !price || !category || !description || !image) {
            alert("Please fill in all fields.");
            return;
        }

        let productObj = { id, name, price, category, description, image }; // Include new fields

        dataServiceObj.updateProduct(productObj).then(() => {
            alert("Product details are updated on server");
            getProductsClick();
            clearFields();
        }).catch(error => {
            console.error("Error updating product:", error);
        });
    }

    function clearFields() {
        setId("");
        setName("");
        setPrice("");
        setCategory("");
        setDescription(""); // Clear the description
        setImage(""); // Clear the image
    }

    const result = productArray.map((item, index) => (
        <tr key={index}>
            <td className="td">{item.id}</td>
            <td className="td">{item.name}</td>
            <td className="td">{item.price}</td>
            <td className="td">{item.category}</td>
            <td className="td">{item.description}</td> {/* Display description */}
            <td className="td">
                <img 
                    src={require(`../../images/${item.image}`)} // Updated path for images
                    alt={item.name} 
                    style={{ width: '50px', height: '50px' }} 
                /> 
            </td>
            <td className="td" align='center'>
                <div className="button-group">
                    <button className="link" onClick={() => selectProductClick(item.id)}>Select</button>
                    <button className="link" onClick={() => deleteProductClick(item.id)}>Delete</button>
                </div>
            </td>
        </tr>
    ));

    return (
        <div className="container">
            <h1>Product Management</h1>
            <div className="form-group">
                <input className="input" placeholder="ID" type="text"
                    value={id} onChange={(e) => setId(e.target.value)} />
                <input className="input" placeholder="Name" type="text"
                    value={name} onChange={(e) => setName(e.target.value)} />
                <input className="input" placeholder="Price" type="text"
                    value={price} onChange={(e) => setPrice(e.target.value)} />
                <input className="input" placeholder="Category" type="text"
                    value={category} onChange={(e) => setCategory(e.target.value)} />
                <input className="input" placeholder="Description" type="text" // New input for description
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                <input className="input" placeholder="Image URL" type="text" // New input for image
                    value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <hr />
            <div className="button-group">
                <button className="button" onClick={addProductClick}>Add Product</button>
                <button className="button" onClick={updateProductClick}>Update Product</button>
            </div>
            <hr />
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th className="th">Product ID</th>
                            <th className="th">Product Name</th>
                            <th className="th">Product Price</th>
                            <th className="th">Product Category</th>
                            <th className="th">Product Description</th> {/* New header for description */}
                            <th className="th">Product Image</th> {/* New header for image */}
                            <th className="th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.length > 0 ? result : <tr><td colSpan="7">No products found.</td></tr>}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Ajax;
