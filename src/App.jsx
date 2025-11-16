import React, { useState, useMemo } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail'; 
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom'; 
import './App.css'; 

const initialProducts = [
  {
    id: 1,
    image: 'https://cdn.mos.cms.futurecdn.net/PmzN5wDaqW5x4rpZjBPf5G.jpg',
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
    price: 300.99,
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
    price: 200.50,
    quantity: 6,
  },
];

const CartDisplay = ({ cartItems, onClearCart }) => {
  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '50px', marginTop: '20px', textAlign: 'center' }}>
        <h1> Your Cart is Empty</h1>
        <p>Start adding items from the product list!</p>
      </div>
    );
  }

  return (
    <div className="cart-display" style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <h3>Shopping Cart ({cartItems.length} unique item{cartItems.length !== 1 ? 's' : ''})</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '8px 0' }}>Product</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px dotted #eee' }}>
              <td style={{ padding: '8px 0' }}>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.cartQuantity}</td>
              <td style={{ textAlign: 'right' }}>₱{(item.price * item.cartQuantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
        <button 
          onClick={onClearCart}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </button>

        <h4 style={{ margin: 0 }}>
          Total Cart Value: ₱{cartTotal.toFixed(2)}
        </h4>
      </div>
    </div>
  );
};


function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [isCartViewActive, setIsCartViewActive] = useState(false); 

  const handleViewChange = (view) => {
    setIsCartViewActive(view === 'cart');
  };

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
  
  const handleAddToCart = (productToAdd) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === productToAdd.id);
      
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...productToAdd, cartQuantity: 1 }];
      }
    });
  };
  
  const handleClearCart = () => {
      if (window.confirm("Are you sure you want to clear your entire cart?")) {
          setCartItems([]);
          setIsCartViewActive(false);
      }
  };


  const overallTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  }, [products]);

  const cartItemCount = useMemo(() => {
      return cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
  }, [cartItems]);

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
        onAddToCart={handleAddToCart}
      />
    </>
  );

  return (
    <div className="App">
      <Header 
        cartItemCount={cartItemCount}
        overallInventoryValue={overallTotal}
        onViewChange={handleViewChange} 
      />
      
      <main>
        <div style={{ padding: '20px' }}>
          {isCartViewActive ? (
            <CartDisplay cartItems={cartItems} onClearCart={handleClearCart} />
          ) : (
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route 
                path="/product/:productId" 
                element={<ProductDetail 
                  products={products} 
                  onAddToCart={handleAddToCart}
                />} 
              />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;