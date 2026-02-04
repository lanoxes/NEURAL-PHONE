
import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Review } from './types';
import { PRODUCTS } from './constants';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBrand, setActiveBrand] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Elegant artificial delay for preloader
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = activeBrand === 'All' || p.brand === activeBrand;
      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, activeBrand]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...p, quantity: 1 }];
    });
    // Visual feedback? maybe a toast.
  };

  const toggleWishlist = (p: Product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === p.id)) {
        return prev.filter(item => item.id !== p.id);
      }
      return [...prev, p];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const brands = ['All', 'Asus', 'Apple', 'Samsung', 'Tecno', 'Infinix'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white">
      {isLoading && <Preloader />}

      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onViewCart={() => setIsCartOpen(true)}
        onViewWishlist={() => setIsWishlistOpen(true)}
        onSearch={setSearchQuery}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-purple-950/50"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.4),transparent_70%)]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-sm font-bold tracking-[0.3em] text-purple-400 mb-4 animate-pulse uppercase">Future of Mobile is Here</h2>
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6 drop-shadow-2xl">
            Upgrade Your <br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Neural Network.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            Eksplorasi koleksi terbaru dari Asus ROG, iPhone, Samsung S series, dan iPad tercanggih hanya di NeuralPhone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-lg">
              SHOP NOW
            </button>
            <button className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              EXPLORE AI
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Brand Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                activeBrand === brand 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                  : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/20'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={wishlist.some(w => w.id === product.id)}
              onViewDetail={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 opacity-40">
            <p className="text-2xl font-orbitron">No products found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="font-orbitron font-bold text-white text-lg">N</span>
              </div>
              <span className="font-orbitron text-xl font-bold text-white">NeuralPhone</span>
            </div>
            <p className="text-slate-500 max-w-sm">
              Membawa teknologi masa depan ke genggaman Anda. Kami adalah retailer smartphone premium nomor satu dengan integrasi AI tercanggih.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Smartphones</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Tablets</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Neural Experience</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">AI Support</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Neural Warranty</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Store Locator</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2024 NeuralPhone Corp. All rights reserved.</p>
          <div className="flex gap-6 text-slate-600 text-xs">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Components */}
      <ChatBot />
      
      {isCartOpen && (
        <Cart 
          items={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateCartQty}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isCheckoutOpen && (
        <Checkout 
          items={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            alert("Payment Successful! Order Confirmed.");
            setCart([]);
            setIsCheckoutOpen(false);
          }}
        />
      )}

      {/* Wishlist View (Simplified) */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[70] flex justify-center items-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsWishlistOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-orbitron font-bold">Your Wishlist</h2>
               <button onClick={() => setIsWishlistOpen(false)} className="text-slate-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
             </div>
             {wishlist.length === 0 ? (
               <div className="text-center py-12 opacity-50">Nothing in wishlist yet.</div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {wishlist.map(p => (
                   <div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col gap-4">
                     <img src={p.image} className="w-full aspect-square object-cover rounded-lg" />
                     <h4 className="font-bold text-sm">{p.name}</h4>
                     <button 
                       onClick={() => addToCart(p)}
                       className="w-full py-2 bg-indigo-600 rounded-lg text-xs font-bold"
                     >ADD TO CART</button>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}

      {/* Product Detail Modal (Ratings and Comments) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-800">
              <img src={selectedProduct.image} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="self-end mb-4 text-slate-500 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <span className="text-purple-400 font-bold tracking-widest text-xs mb-2 uppercase">{selectedProduct.brand}</span>
              <h2 className="text-3xl font-orbitron font-bold mb-4">{selectedProduct.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-bold">{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-500 text-sm">|</span>
                <span className="text-slate-500 text-sm">{selectedProduct.reviews.length} Reviews</span>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-8">
                {selectedProduct.description}
              </p>

              <div className="text-3xl font-bold text-white mb-8">
                Rp {selectedProduct.price.toLocaleString('id-ID')}
              </div>

              <div className="mt-auto">
                <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Customer Reviews</h3>
                <div className="space-y-6">
                  {selectedProduct.reviews.map(review => (
                    <div key={review.id} className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">{review.user}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-slate-700'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed italic">"{review.comment}"</p>
                      <span className="text-[10px] text-slate-600 mt-2 block">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-slate-900 pt-8 pb-4">
                 <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/40 transition-all"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
