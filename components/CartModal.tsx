import React from 'react';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartModal: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const phoneNumber = "972547202011";
    let message = "*שלום, אשמח לבצע הזמנה דרך האתר MiSecure:*\n\n";
    
    items.forEach(item => {
      message += `▫️ ${item.name} (x${item.quantity}) - ₪${item.price * item.quantity}\n`;
    });
    
    message += `\n*סה"כ לתשלום: ₪${totalPrice}*`;
    message += "\n\nאשמח לפרטים לגבי תשלום ומשלוח.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-in Cart */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">סל הקניות שלי</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={32} className="text-gray-400" />
              </div>
              <p className="text-lg font-medium">העגלה שלך ריקה</p>
              <p className="text-sm">הוסף מוצרים כדי לבצע הזמנה</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-mi-orange font-bold text-sm">₪{item.price}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded shadow-sm transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded shadow-sm transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">סה"כ לתשלום:</span>
              <span className="text-2xl font-bold text-gray-900">₪{totalPrice}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/20"
            >
              <MessageCircle size={24} />
              המשך להזמנה בווטסאפ
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              לחיצה תעביר אותך לשיחה עם נציג לאישור סופי
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;