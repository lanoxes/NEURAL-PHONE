
import React from 'react';
import { CartItem } from '../types.ts';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQty, onClose, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-950 h-full shadow-2xl flex flex-col border-l border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-orbitron font-bold text-white">Your Cart</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 rounded-xl bg-slate-900 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-100 font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-purple-400 text-xs font-semibold mb-2">Rp {item.price.toLocaleString('id-ID')}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-900 rounded-lg border border-white/10">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
                      >-</button>
                      <span className="text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] text-red-500 font-bold hover:underline"
                    >REMOVE</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-slate-900/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-white">Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
