import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { products } = useProducts();
  
  const indoorProducts = products.filter(p => p.category === 'indoor');
  const outdoorProducts = products.filter(p => p.category === 'outdoor');

  return (
    <div id="products" className="bg-white">
      {/* Indoor Section */}
      <section id="indoor" className="py-20 border-b border-gray-100 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">אבטחת פנים</h2>
              <p className="text-gray-500">שימו עין על מה שהכי חשוב בתוך הבית.</p>
            </div>
            <a href="#" className="text-mi-orange font-semibold hover:underline">לכל מצלמות הפנים &larr;</a>
          </div>
          
          {indoorProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {indoorProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10 bg-gray-50 rounded-xl">לא נמצאו מוצרים בקטגוריה זו.</p>
          )}
        </div>
      </section>

      {/* Outdoor Section */}
      <section id="outdoor" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">חניה וחוץ</h2>
              <p className="text-gray-500">הגנה קשוחה לחניה, לשביל הגישה ולחצר האחורית.</p>
            </div>
            <a href="#" className="text-mi-orange font-semibold hover:underline">לכל מצלמות החוץ &larr;</a>
          </div>
          
          {outdoorProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outdoorProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10 bg-white rounded-xl border border-gray-100">לא נמצאו מוצרים בקטגוריה זו.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductList;