import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-800 uppercase">
          {product.category === 'indoor' ? 'פנים' : 'חוץ'}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
          <span className="text-xl font-bold text-mi-orange whitespace-nowrap mr-2">₪{product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="space-y-2 mb-6 flex-grow">
          {product.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={14} className="text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-gray-900 hover:bg-mi-orange text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95 transform"
        >
          <ShoppingCart size={18} />
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};

export default ProductCard;