import React, { useEffect, useState, useRef } from 'react';
import ikeaImage from '../images/ikea.jpg'; // Import the banner image

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3500/products') // Adjust the URL as needed
      .then(response => response.json())
      .then(data => {
        // Get the last 5 products
        const lastFiveProducts = data.slice(-5);
        setProducts(lastFiveProducts);
      });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [products]);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % products.length);
  };

  const goToPrev = () => {
    setCurrentIndex((currentIndex - 1 + products.length) % products.length);
  };

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

  const imgStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '5px',
    objectFit: 'cover',
  };

  const bannerStyle = {
    width: '100%',
    height: '600px',
    marginBottom: '20px', // Space between banner and content
  };

  const slideshowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const buttonStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  };

  return (
    <div style={containerStyle}>
      <img src={ikeaImage} alt="IKEA Banner" style={bannerStyle} /> {/* Banner image */}
      <h1 style={headerStyle}>Welcome to IKEA Store</h1>
      <h2 style={subHeaderStyle}>Featured Products</h2>
      <div style={slideshowStyle}>
        <button onClick={goToPrev} style={{ ...buttonStyle, left: '10px' }}>Prev</button>
        
        {products.length > 0 && (
          <div>
            <img src={require(`../images/${products[currentIndex].image}`)} alt={products[currentIndex].name} style={imgStyle} />
            <h4>{products[currentIndex].name}</h4>
          </div>
        )}

        <button onClick={goToNext} style={{ ...buttonStyle, right: '10px' }}>Next</button>
      </div>
    </div>
  );
};

export default Home;
