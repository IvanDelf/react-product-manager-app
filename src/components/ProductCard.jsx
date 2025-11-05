// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onQuantityChange }) {
  const subtotal = product.price * product.quantity; 
  const isLowStock = product.quantity < 5;

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      <img src={product.image} alt={product.name} className="product-image" />
      
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#333' }}>
        <h3>{product.name}</h3>
      </Link>
      
      <p>Category: {product.category}</p>
      <p>Price: ₱{product.price.toFixed(2)}</p>
      
      <p className="product-quantity">
        Quantity: {product.quantity} 
        {isLowStock && <span className="low-stock-label"> (LOW STOCK)</span>}
      </p>
      
      <p>Subtotal: ₱{subtotal.toFixed(2)}</p>

      <div className="product-actions">
        <button 
          onClick={() => onQuantityChange(product.id, -1)}
          disabled={product.quantity <= 0}
        >
          -
        </button>
        
        <button>🛒 Add to Cart</button>
        
        <button 
          onClick={() => onQuantityChange(product.id, 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default ProductCard;