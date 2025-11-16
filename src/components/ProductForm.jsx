// src/components/ProductForm.jsx
import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !category || price <= 0 || quantity < 0) {
      alert("Please fill out all required fields (Name, Category, Price, Quantity).");
      return;
    }

    const newProduct = {
      id: Date.now(), // Use timestamp for unique ID
      image: image || 'https://via.placeholder.com/300x200?text=No+Image', // Default placeholder
      name,
      category,
      description,
      specification,
      rating: parseFloat(rating),
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    onAddProduct(newProduct);

    // Reset form
    setName('');
    setCategory('');
    setDescription('');
    setSpecification('');
    setRating(0);
    setPrice(0);
    setQuantity(0);
    setImage('');
  };

  return (
    <div className="product-form-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '30px' }}>
      <h3> Add New Product</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        
        {/* Row 1 */}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        
        {/* Row 2 */}
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ gridColumn: 'span 2' }} />
        
        {/* Row 3 */}
        <input type="text" placeholder="Specification" value={specification} onChange={(e) => setSpecification(e.target.value)} />
        <input type="text" placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
        
        {/* Row 4 */}
        <input type="number" placeholder="Rating (0-5)" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="5" step="0.1" />
        <input type="number" placeholder="Price (₱)" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" required />
        
        {/* Row 5 */}
        <input type="number" placeholder="Quantity in Stock" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="0" required />

        {/* Submit */}
        <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Create Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;