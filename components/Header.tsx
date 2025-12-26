import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'בית', href: '#' },
    { name: 'מצלמות פנים', href: '#indoor' },
    { name: 'חוץ וחניה', href: '#outdoor' },
    { name: 'תכונות', href: '#features' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-mi-orange p-2 rounded-lg text-white">
            <ShieldCheck size={24} />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}>
            MiSecure
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium hover:text-mi-orange transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/10 text-white'}`}
          >
            <ShoppingCart size={20} className={isMobileMenuOpen ? 'text-gray-900' : ''} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-mi-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            className="hidden md:block bg-mi-orange hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            קנה עכשיו
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} className={isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-600 font-medium py-2 border-b border-gray-50 last:border-0 hover:text-mi-orange"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
            className="bg-mi-orange text-white w-full py-3 rounded-lg font-bold"
          >
            לסל הקניות
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;