// src/components/ProductCard.jsx
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

function ProductCard({ product, onQuantityChange, onAddToCart }) {
  const [notifCount, setNotifCount] = useState(0); 
  const subtotal = product.price * product.quantity; 
  const isLowStock = product.quantity < 5;

  const handleCartClick = (product) => {
    onAddToCart(product);
    setNotifCount(prevCount => prevCount + 1); // Increase the notification count
    
    // Reset the notification count after 1.5 seconds
    setTimeout(() => {
        setNotifCount(0);
    }, 1500); 
  };

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
        
        <div style={{ position: 'relative', display: 'inline-block' }}> 
          <button
            onClick={() => handleCartClick(product)}
            style={{ position: 'relative' }}
          >
            Add to Cart
          </button>
          
          {/* NOTIFICATION BADGE */}
          {notifCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              +{notifCount}
            </span>
          )}
        </div>
        
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