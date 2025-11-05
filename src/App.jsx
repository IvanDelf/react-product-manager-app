// src/App.jsx
import React, { useState, useMemo } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail'; 
import { Routes, Route } from 'react-router-dom'; 
import './App.css'; 

const initialProducts = [
  {
    id: 1,
    image: 'data:image/webp;base64,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',
    name: 'Pro Laptop X20',
    category: 'Electronics',
    description: 'High performance laptop for professionals.',
    specification: 'i7, 16GB RAM, 512GB SSD',
    rating: 4.5,
    price: 1200.00,
    quantity: 3, 
  },
  {
    id: 2,
    image: 'https://th.bing.com/th/id/OIP.flxf4Xeram0wljm5uypjLQHaFD?w=241&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
    name: 'Smart Coffee Mug',
    category: 'Home Goods',
    description: 'Keeps your coffee at the perfect temperature.',
    specification: '12oz, Stainless Steel, App-Controlled',
    rating: 4.8,
    price: 45.99,
    quantity: 10,
  },
  {
    id: 3,
    image: 'https://th.bing.com/th/id/OIP.zK29W0KdjUoW_AeXPpU6bgHaHa?w=195&h=195&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
    name: 'Cotton T-Shirt',
    category: 'Apparel',
    description: 'Comfortable, 100% organic cotton t-shirt.',
    specification: 'Medium, Navy Blue',
    rating: 4.2,
    price: 19.50,
    quantity: 6,
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All'); 

  const handleQuantityChange = (productId, delta) => {
    setProducts(prevProducts => {
        return prevProducts.map(product => {
            if (product.id === productId) {
                const newQuantity = Math.max(0, product.quantity + delta);
                return { ...product, quantity: newQuantity };
            }
            return product; 
        });
    });
  };

  const handleAddProduct = (newProduct) => {
    setProducts(prevProducts => [
      ...prevProducts,
      newProduct 
    ]);
  };
  
  const overallTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  }, [products]);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category))];
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const ProductListPage = () => (
    <>
      <ProductForm onAddProduct={handleAddProduct} /> 
      
      <div className="filter-container" style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h3>Filter by Category:</h3>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            style={{ 
              marginRight: '10px', 
              backgroundColor: selectedCategory === category ? '#007bff' : '#f0f0f0',
              color: selectedCategory === category ? 'white' : 'black',
              border: '1px solid #ccc',
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <ProductList 
        products={filteredProducts} 
        onQuantityChange={handleQuantityChange} 
      />
    </>
  );

  return (
    <div className="App">
      <header>
        <h1>🛍️ Product Inventory Manager</h1>
        <h2>💰 Overall Inventory Value: ₱{overallTotal.toFixed(2)}</h2>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route 
            path="/product/:productId" 
            element={<ProductDetail products={products} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;