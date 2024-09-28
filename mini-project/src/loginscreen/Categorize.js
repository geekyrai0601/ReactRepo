import React, { useEffect, useState } from 'react';
import CategoryButtons from './CategoryButton';
import ProductList from './ProductList';

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Furniture'); // Default to Furniture
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (product) => {
    const existingCartItem = cartItems.find(item => item.productid === product.id);

    if (existingCartItem) {
      // If the product already exists in the cart, update the quantity
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
        totalamount: (existingCartItem.quantity + 1) * existingCartItem.price,
      };

      try {
        const response = await fetch(`http://localhost:3500/cart/${existingCartItem.recordid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCartItem),
        });

        if (response.ok) {
          console.log('Product quantity updated in cart:', product.name);
          setCartItems(cartItems.map(item =>
            item.recordid === updatedCartItem.recordid ? updatedCartItem : item
          ));
        } else {
          throw new Error('Failed to update cart');
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      const recordIds = cartItems.map(item => item.recordid);
      const nextRecordId = recordIds.length > 0 ? Math.max(...recordIds) + 1 : 1;

      const cartItem = {
        cid: 2, // Example user ID
        userid: 2,
        recordid: nextRecordId,
        productid: product.id,
        productname: product.name,
        price: product.price,
        quantity: 1,
        totalamount: product.price,
      };

      try {
        const response = await fetch('http://localhost:3500/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });

        if (response.ok) {
          console.log('Product added to cart:', product.name);
          setCartItems([...cartItems, cartItem]);
        } else {
          throw new Error('Failed to add to cart');
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  // Filtered products for the selected category
  const filteredProducts = products.filter(product => product.category === selectedCategory);
  // Filtered products for the furniture category
  const furnitureProducts = products.filter(product => product.category === 'Furniture');

  return (
    <div>
      <h1>Product Categories</h1>
      <CategoryButtons categories={categories} onCategoryClick={handleCategoryClick} />
      {/* Render selected category products */}
      {selectedCategory === 'Furniture' && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      )}
      {/* Render products for Hardware and Electric categories only */}
      {selectedCategory !== 'Furniture' && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
};

export default CategoriesPage;
