import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const deliveryFee = items.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[199] bg-brand-espresso/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-drawer z-[200] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-gray-100">
          <h2 className="font-display text-2xl font-semibold text-brand-espresso">
            Your Cart ({items.length})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-brand-cream rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={24} className="text-brand-espresso" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-200 mb-4" />
              <p className="font-body text-base text-brand-espresso/50 mb-6">
                Your cart is empty
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/menu');
                }}
                className="px-8 py-3 bg-brand-clay text-brand-cream font-body text-sm font-semibold hover:bg-brand-gold hover:text-brand-espresso transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body text-base font-medium text-brand-espresso truncate">
                      {item.name}
                    </h4>
                    <p className="font-body text-sm font-semibold text-brand-clay mt-1">
                      &#8358;{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-brand-cream hover:border-brand-clay transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-body text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-brand-cream hover:border-brand-clay transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1.5 text-functional-error hover:opacity-70 transition-opacity"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-brand-cream">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-body text-base">
                <span className="font-medium text-brand-espresso">Subtotal</span>
                <span className="font-semibold text-brand-espresso">
                  &#8358;{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-body text-sm text-brand-espresso/60">
                <span>Delivery Fee</span>
                <span>&#8358;{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body text-lg pt-2 border-t border-gray-200">
                <span className="font-semibold text-brand-espresso">Total</span>
                <span className="font-semibold text-brand-clay">
                  &#8358;{total.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/checkout');
              }}
              className="w-full h-14 bg-brand-espresso text-brand-cream font-body text-base font-semibold hover:bg-brand-clay transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
