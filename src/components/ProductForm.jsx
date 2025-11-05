// src/components/ProductForm.jsx
import React, { useState } from 'react';

const initialFormData = {
  image: '',
  name: '',
  category: '',
  description: '',
  specification: '',
  rating: '',
  price: '',
  quantity: '',
};

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'category', 'price', 'quantity'];
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      setError(`🛑 Error: Please fill in the required field: ${missingField}`);
      return; 
    }

    const newProduct = {
      id: Date.now(),
      ...formData,
      rating: parseFloat(formData.rating) || 0,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
    };

    onAddProduct(newProduct); 

    setFormData(initialFormData);
    setError(''); 
  };

  return (
    <div className="form-container">
      <h3>➕ Add New Product</h3>
      <form onSubmit={handleSubmit}>
        
        <label>Product Name (Required)</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Category (Required)</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
        
        <label>Price (₱) (Required)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} min="0.01" step="0.01" />
        
        <label>Quantity (Required)</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" />
        
        <label>Feature Image URL</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
        
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        
        <label>Specification</label>
        <input type="text" name="specification" value={formData.specification} onChange={handleChange} />

        <label>Rating (1-5)</label>
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" step="0.1" />

        {error && <p style={{ color: 'red', padding: '10px', border: '1px solid red' }}>{error}</p>}
        
        <button type="submit">🚀 Add Product</button>
      </form>
      <hr />
    </div>
  );
}

export default ProductForm;