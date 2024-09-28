import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div
      style={styles.card}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img src={require(`../images/${product.image}`)} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    width: '200px',
    textAlign: 'center',
    transition: 'transform 0.2s ease', // Smooth transition
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Optional shadow for better aesthetics
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover', // Ensure images have the same dimensions
  },
};

export default ProductCard;
