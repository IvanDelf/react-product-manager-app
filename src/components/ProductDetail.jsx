// src/components/ProductDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ products }) {
  const { productId } = useParams();
  
  // FIX: Converts string ID from URL to a number for comparison
  const product = products.find(p => p.id === parseInt(productId, 10));
  const currencySymbol = '₱'; 

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
          
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;