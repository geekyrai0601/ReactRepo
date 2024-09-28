import React, { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3500/products') // Adjust the URL as needed
      .then(response => response.json())
      .then(data => {
        // Get the last 5 products
        const lastFiveProducts = data.slice(-5);
        setProducts(lastFiveProducts);
      });
  }, []);

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  };

  const headerStyle = {
    margin: '20px 0',
    fontSize: '2.5em',
    color: '#333',
  };

  const subHeaderStyle = {
    margin: '10px 0',
    fontSize: '1.5em',
    color: '#555',
  };

  const cardStyle = {
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  };

  const imgStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '5px',
    objectFit: 'cover',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to IKEA Store</h1>
      <h2 style={subHeaderStyle}>Featured Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map(product => (
          <div
            style={cardStyle}
            key={product.id}
            onMouseOver={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          >
            <img src={require(`../images/${product.image}`)} alt={product.name} style={imgStyle} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
