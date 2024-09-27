import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <img src={require(`../images/${product.image}`)} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
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
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover', // This will ensure images have the same dimensions
  },
};

export default ProductCard;
