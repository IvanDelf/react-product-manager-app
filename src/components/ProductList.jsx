// src/components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onQuantityChange }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onQuantityChange={onQuantityChange} 
        />
      ))}
    </div>
  );
}
export default ProductList;