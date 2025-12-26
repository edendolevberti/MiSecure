import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsAdminMode(true);
  };

  return (
    <ProductProvider>
      <CartProvider>
        {isAdminMode ? (
          <AdminDashboard onClose={() => setIsAdminMode(false)} />
        ) : (
          <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Hero />
              <Features />
              <ProductList />
            </main>
            <Footer onAdminClick={() => setShowLoginModal(true)} />
            <CartModal />
            
            {showLoginModal && (
              <AdminLogin 
                onSuccess={handleLoginSuccess} 
                onClose={() => setShowLoginModal(false)} 
              />
            )}
          </div>
        )}
      </CartProvider>
    </ProductProvider>
  );
};

export default App;