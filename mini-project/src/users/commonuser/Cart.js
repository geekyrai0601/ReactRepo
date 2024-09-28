import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mycart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cart');
        const userCartItems = response.data.filter(item => item.userid === 2);
        setCartItems(userCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productid) => {
    try {
      const itemToRemove = cartItems.find(item => item.productid === productid);
      
      if (!itemToRemove) {
        console.error('Item not found in cart:', productid);
        return;
      }

      await axios.delete(`http://localhost:3500/cart/${itemToRemove.recordid}`);
      setCartItems(cartItems.filter(item => item.productid !== productid));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const addItem = async (productid) => {
    try {
      const itemToUpdate = cartItems.find(item => item.productid === productid);
      
      const updatedItem = {
        ...itemToUpdate,
        quantity: itemToUpdate.quantity + 1,
        totalamount: (itemToUpdate.quantity + 1) * itemToUpdate.price,
      };

      await axios.put(`http://localhost:3500/cart/${itemToUpdate.recordid}`, updatedItem);
      setCartItems(cartItems.map(item => item.productid === productid ? updatedItem : item));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const reduceItem = async (productid) => {
    const itemToUpdate = cartItems.find(item => item.productid === productid);
    if (itemToUpdate && itemToUpdate.quantity > 1) {
      const updatedItem = {
        ...itemToUpdate,
        quantity: itemToUpdate.quantity - 1,
        totalamount: (itemToUpdate.quantity - 1) * itemToUpdate.price,
      };

      await axios.put(`http://localhost:3500/cart/${itemToUpdate.recordid}`, updatedItem);
      setCartItems(cartItems.map(item => item.productid === productid ? updatedItem : item));
    } else if (itemToUpdate) {
      // If quantity is 1, prompt to remove
      removeFromCart(productid);
    }
  };

  const handleCheckout = async () => {
    try {
      await Promise.all(cartItems.map(item => 
        axios.delete(`http://localhost:3500/cart/${item.recordid}`)
      ));

      setCartItems([]);
      setCheckoutMessage('Thank you for your purchase!');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.totalamount, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {checkoutMessage && <p>{checkoutMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.productid} className="cart-item-card">
              <h3>{item.productname}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => addItem(item.productid)} style={{ margin: '5px' }}>Add more item</button>
              <button onClick={() => reduceItem(item.productid)} style={{ margin: '5px' }}>Reduce item</button>
              <button onClick={() => removeFromCart(item.productid)} style={{ margin: '5px' }}>Remove from Cart</button>
            </div>
          ))}
          <h3>Total Price: ₹{totalPrice}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
