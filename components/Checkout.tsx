
import React, { useState } from 'react';
import { CartItem, PaymentMethod } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onClose, onSuccess }) => {
  const [method, setMethod] = useState<PaymentMethod>('gopay');
  const [isProcessing, setIsProcessing] = useState(false);
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2500);
  };

  const paymentOptions = [
    { id: 'gopay', label: 'GoPay', icon: 'GP' },
    { id: 'dana', label: 'DANA', icon: 'DN' },
    { id: 'seabank', label: 'SeaBank', icon: 'SB' },
    { id: 'paypal', label: 'PayPal', icon: 'PP' },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left: Order Summary */}
        <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/10">
          <h2 className="text-xl font-orbitron font-bold text-white mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{item.name} <span className="text-[10px] ml-1">x{item.quantity}</span></span>
                <span className="text-slate-200 font-medium">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Tax (PPN 11%)</span>
              <span>Rp {(total * 0.11).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg pt-2">
              <span>Total Amount</span>
              <span className="text-indigo-400">Rp {(total * 1.11).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Method */}
        <div className="w-full md:w-1/2 p-8 bg-slate-950/50">
          <h2 className="text-xl font-orbitron font-bold text-white mb-6">Payment Method</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {paymentOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setMethod(opt.id as PaymentMethod)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  method === opt.id 
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                    : 'border-white/5 bg-slate-900 hover:border-white/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                  method === opt.id ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {opt.icon}
                </div>
                <span className={`text-xs font-bold ${method === opt.id ? 'text-white' : 'text-slate-400'}`}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          <button
            disabled={isProcessing}
            onClick={handlePay}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all relative overflow-hidden flex items-center justify-center ${
              isProcessing ? 'bg-slate-800' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>PROCESSING...</span>
              </div>
            ) : (
              <span>PAY NOW</span>
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full mt-4 text-slate-500 text-xs font-bold hover:text-slate-300 transition-colors"
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
