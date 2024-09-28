import React from 'react';

const ProductList = ({ products, category }) => {
  const productCardStyle = {
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '200px',
    textAlign: 'center',
  };

  const imgStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '5px',
  };

  const filteredProducts = products.filter(product => product.category === category);

  return (
    <div className="product-list">
      <h2>{category} Products</h2>
      {filteredProducts.map(product => (
        <div style={productCardStyle} key={product.id}>
          <img src={require(`../images/${product.image}`)} alt={product.name} style={imgStyle} />
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
