import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch('http://localhost:3500/products');
        const productData = await productResponse.json();
        setProducts(productData);

        const cartResponse = await fetch('http://localhost:3500/cart');
        const cartData = await cartResponse.json();
        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  if (!Array.isArray(products) || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => handleAddToCart(product)} 
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default Products;
