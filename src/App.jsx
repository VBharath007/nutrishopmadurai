import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SalesToast from './components/SalesToast';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const OurStory = lazy(() => import('./pages/OurStory'));
const Cosmetics = lazy(() => import('./pages/Cosmetics'));
const Combos = lazy(() => import('./pages/Combos'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Testimonials = lazy(() => import('./pages/Testimonials'));

// Loading fallback
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <div className="loader" style={{ 
      border: '4px solid #f3f3f3', 
      borderTop: '4px solid #3498db', 
      borderRadius: '50%', 
      width: '40px', 
      height: '40px', 
      animation: 'spin 1s linear infinite' 
    }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Header setIsCartOpen={setIsCartOpen} setIsWishlistOpen={setIsWishlistOpen} />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-products" element={<Products />} />
              <Route path="/explore" element={<Navigate to="/our-products" replace />} />
              <Route path="/ayurvedic-personal-care" element={<Cosmetics />} />
              <Route path="/combos" element={<Combos />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/invoice" element={<Invoice />} />
            </Routes>
          </Suspense>
          <Footer />
          
          {/* Global UI Components */}
          <CartDrawer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <WishlistDrawer isWishlistOpen={isWishlistOpen} setIsWishlistOpen={setIsWishlistOpen} />
          <SalesToast />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
