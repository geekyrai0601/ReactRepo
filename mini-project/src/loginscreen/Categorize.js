import React, { useEffect, useState } from 'react';
import CategoryButtons from './CategoryButton';
import ProductList from './ProductList';

const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3500/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Product Categories</h1>
      <CategoryButtons categories={categories} onCategoryClick={handleCategoryClick} />
      {selectedCategory && (
        <ProductList products={products} category={selectedCategory} />
      )}
    </div>
  );
};

export default CategoriesPage;
