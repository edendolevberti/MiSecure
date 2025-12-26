import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon, ArrowRight, LayoutGrid } from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [showForm, setShowForm] = useState(false);

  const initialFormState: Partial<Product> = {
    name: '',
    category: 'indoor',
    price: 0,
    description: '',
    features: [''],
    imageUrl: '',
    resolution: ''
  };

  const handleAddNew = () => {
    setCurrentProduct({ ...initialFormState, features: [''] });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('האם אתה בתוך שברצונך למחוק מוצר זה?')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty features
    const cleanedFeatures = currentProduct.features?.filter(f => f.trim() !== '') || [];
    
    const productData = {
      ...currentProduct,
      features: cleanedFeatures,
      price: Number(currentProduct.price)
    } as Product;

    if (isEditing) {
      updateProduct(productData);
    } else {
      // Cast is safe because we validate required fields in form or assume user fills them
      addProduct(productData as Omit<Product, 'id'>);
    }
    setShowForm(false);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(currentProduct.features || [])];
    newFeatures[index] = value;
    setCurrentProduct({ ...currentProduct, features: newFeatures });
  };

  const addFeatureField = () => {
    setCurrentProduct({
      ...currentProduct,
      features: [...(currentProduct.features || []), '']
    });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = [...(currentProduct.features || [])];
    newFeatures.splice(index, 1);
    setCurrentProduct({ ...currentProduct, features: newFeatures });
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
            <h2 className="text-2xl font-bold">{isEditing ? 'עריכת מוצר' : 'הוספת מוצר חדש'}</h2>
            <button onClick={() => setShowForm(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם המוצר</label>
                <input
                  type="text"
                  required
                  value={currentProduct.name || ''}
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">מחיר (₪)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={currentProduct.price || ''}
                    onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                  <select
                    value={currentProduct.category}
                    onChange={e => setCurrentProduct({...currentProduct, category: e.target.value as 'indoor' | 'outdoor'})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange outline-none"
                  >
                    <option value="indoor">פנים (Indoor)</option>
                    <option value="outdoor">חוץ (Outdoor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">רזולוציה</label>
                <input
                  type="text"
                  placeholder="לדוגמה: 2K, 1920x1080"
                  value={currentProduct.resolution || ''}
                  onChange={e => setCurrentProduct({...currentProduct, resolution: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
                <textarea
                  rows={4}
                  required
                  value={currentProduct.description || ''}
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange outline-none resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כתובת תמונה (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={currentProduct.imageUrl || ''}
                    onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-mi-orange outline-none"
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {currentProduct.imageUrl ? (
                      <img src={currentProduct.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">פיצ'רים ותכונות</label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {currentProduct.features?.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={e => updateFeature(idx, e.target.value)}
                        placeholder="תכונה חדשה..."
                        className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-mi-orange outline-none text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeatureField(idx)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="mt-3 text-sm text-mi-orange font-medium hover:underline flex items-center gap-1"
                >
                  <Plus size={16} />
                  הוסף שורה
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 border-t border-gray-100 pt-6 mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                ביטול
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-mi-orange text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all"
              >
                <Save size={18} />
                {isEditing ? 'שמור שינויים' : 'צור מוצר'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutGrid size={28} className="text-mi-orange" />
            <h1 className="text-2xl font-bold">ניהול מוצרים</h1>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full"
          >
            חזרה לאתר
            <ArrowRight size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">רשימת מצלמות</h2>
            <p className="text-gray-500 text-sm">סה"כ {products.length} מוצרים במאגר</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-mi-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus size={20} />
            הוסף מצלמה
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <tr>
                  <th className="p-4 font-medium">תמונה</th>
                  <th className="p-4 font-medium">שם המוצר</th>
                  <th className="p-4 font-medium">קטגוריה</th>
                  <th className="p-4 font-medium">מחיר</th>
                  <th className="p-4 font-medium">רזולוציה</th>
                  <th className="p-4 font-medium text-center">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        product.category === 'indoor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {product.category === 'indoor' ? 'פנים' : 'חוץ'}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">₪{product.price}</td>
                    <td className="p-4 text-sm text-gray-500">{product.resolution}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="ערוך"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="מחק"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <LayoutGrid size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">אין מוצרים במערכת</p>
              <button onClick={handleAddNew} className="text-mi-orange font-bold hover:underline mt-2">
                צור את המוצר הראשון
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;