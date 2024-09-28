import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available in this category.</div>;
  }

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => onAddToCart(product)} 
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

export default ProductList;
