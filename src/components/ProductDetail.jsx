// src/components/ProductDetail.jsx
import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products, onAddToCart }) {
  const [notifCount, setNotifCount] = useState(0); 
  const { productId } = useParams();
  
  const product = products.find(p => p.id === parseInt(productId, 10));
  const currencySymbol = '₱'; 

  const handleCartClick = (product) => {
    onAddToCart(product);
    setNotifCount(prevCount => prevCount + 1); // Increase the notification count
    
    // Reset the notification count after 1.5 seconds
    setTimeout(() => {
        setNotifCount(0);
    }, 1500); 
  };


  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/">Go back to Product List</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#007bff' }}>
        ← Back to all products
      </Link>
      
      <h2>{product.name}</h2>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '4px' }} />
        
        <div className="details-content">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> {currencySymbol}{product.price.toFixed(2)}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Quantity in Stock:</strong> {product.quantity}</p>
          
          <hr />
          
          <h4>Description</h4>
          <p>{product.description}</p>
          
          <h4>Product Specification</h4>
          <p>{product.specification}</p>
          
          <div style={{ position: 'relative', display: 'inline-block' }}> 
            <button 
              onClick={() => handleCartClick(product)}
              style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}
            >
               Add to Cart
            </button>
            
            {/* NOTIFICATION BADGE */}
            {notifCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '5px', 
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;