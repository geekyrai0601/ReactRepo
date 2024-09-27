import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mycart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    // Fetch cart items for the user
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3500/cart');
        const userCartItems = response.data.filter(item => item.userid === 2); // Assuming user ID for "Swapnil Roop Rai" is 2
        setCartItems(userCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productid) => {
    try {
      // Find the cart item that matches the productid
      const itemToRemove = cartItems.find(item => item.productid === productid);
      
      if (!itemToRemove) {
        console.error('Item not found in cart:', productid);
        return;
      }

      if (itemToRemove.quantity > 1) {
        // Decrease quantity and update total amount
        const updatedItem = {
          ...itemToRemove,
          quantity: itemToRemove.quantity - 1,
          totalamount: (itemToRemove.quantity - 1) * itemToRemove.price,
        };

        // Update the item in the backend
        await axios.put(`http://localhost:3500/cart/${itemToRemove.id}`, updatedItem);
        
        // Update local state to reflect the change
        setCartItems(cartItems.map(item => 
          item.productid === productid ? updatedItem : item
        ));
      } else {
        // If quantity is 1, remove the item completely
        await axios.delete(`http://localhost:3500/cart/${itemToRemove.id}`);
        setCartItems(cartItems.filter(item => item.productid !== productid));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      // Empty the cart in the backend
      await Promise.all(cartItems.map(item => 
        axios.delete(`http://localhost:3500/cart/${item.id}`)
      ));

      // Clear local cartItems state
      setCartItems([]);
      setCheckoutMessage('Thank you for your purchase!');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {checkoutMessage && <p>{checkoutMessage}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.productid} className="cart-item-card">
            <h3>{item.productname}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.productid)}>Remove from Cart</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
};

export default Cart;
