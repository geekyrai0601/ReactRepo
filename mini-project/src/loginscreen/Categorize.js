import React, { useEffect, useState } from 'react';
import CategoryButtons from './CategoryButton';
import ProductList from './ProductList';

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartResponse = await fetch('http://localhost:3500/cart');
      const cartData = await cartResponse.json();
      setCartItems(cartData);
    };
    
    fetchCartItems();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (product) => {
    const existingCartItem = cartItems.find(item => item.productid === product.id);

    if (existingCartItem) {
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

  return (
    <div>
      <h1>Product Categories</h1>
      <CategoryButtons categories={categories} onCategoryClick={handleCategoryClick} />
      {selectedCategory && (
        <ProductList 
          products={products.filter(product => product.category === selectedCategory)} 
          onAddToCart={handleAddToCart} 
        />
      )}
    </div>
  );
};

export default CategoriesPage;
