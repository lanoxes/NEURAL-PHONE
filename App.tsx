
import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Review } from './types.ts';
import { PRODUCTS } from './constants.tsx';
import Preloader from './components/Preloader.tsx';
import Navbar from './components/Navbar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Cart from './components/Cart.tsx';
import Checkout from './components/Checkout.tsx';
import ChatBot from './components/ChatBot.tsx';

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
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsDescExpanded(false);
  }, [selectedProduct]);

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

  const handleShare = (platform: string) => {
    if (!selectedProduct) return;
    const text = `Check out the ${selectedProduct.name} at NeuralPhone!`;
    const url = window.location.href;
    
    let shareUrl = '';
    switch(platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`; break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
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
      </main>

      {/* Enhanced Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-5xl h-full max-h-[95vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Image & Social Section */}
            <div className="w-full md:w-5/12 h-64 md:h-auto bg-slate-950 flex items-center justify-center p-6 relative">
              <img src={selectedProduct.image} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(168,85,247,0.4)]" />
              
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                 <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
                 <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.792 5 15.536 5H18V0h-4.261C9.448 0 9 3.204 9 5.833V8z"/></svg></button>
                 <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.554 4.197 1.608 6.022L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.636 0 12.05-5.414 12.05-12.05a11.782 11.782 0 00-3.536-8.524"/></svg></button>
              </div>
            </div>

            {/* Scrollable Content Section */}
            <div className="w-full md:w-7/12 p-8 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-purple-400 font-bold tracking-[0.2em] text-[10px] uppercase block mb-1">{selectedProduct.brand}</span>
                  <h2 className="text-4xl font-orbitron font-bold text-white leading-tight">{selectedProduct.name}</h2>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="p-3 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-bold text-lg">{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <div className="text-slate-500 text-sm font-medium tracking-wide border-l border-white/10 pl-6">
                  {selectedProduct.reviews.length} Verified Customer Reviews
                </div>
              </div>
              
              {/* Expandable Description */}
              <div className="mb-12 relative">
                <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest border-l-4 border-purple-600 pl-4">Overview</h3>
                <div className={`text-slate-400 leading-relaxed text-base transition-all duration-300 relative ${isDescExpanded ? '' : 'line-clamp-4'}`}>
                  {selectedProduct.description}
                  {!isDescExpanded && <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent"></div>}
                </div>
                <button 
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="mt-4 text-purple-400 text-xs font-bold hover:text-purple-300 flex items-center gap-2 group"
                >
                  {isDescExpanded ? 'SHOW LESS' : 'READ FULL DESCRIPTION'}
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDescExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>

              {/* Dedicated Technical Specifications Section */}
              {selectedProduct.specs && (
                <div className="mb-12">
                  <h3 className="text-white font-bold text-sm mb-6 uppercase tracking-widest border-l-4 border-indigo-600 pl-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                    {Object.entries(selectedProduct.specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-900/50 p-5 hover:bg-slate-800 transition-colors">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider">{key}</span>
                        <span className="text-slate-100 text-sm font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Pricing & Purchase */}
              <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-md pt-6 pb-2 mt-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
                   <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">Best Price Available</span>
                      <div className="text-4xl font-bold text-white">
                        Rp {selectedProduct.price.toLocaleString('id-ID')}
                      </div>
                   </div>
                   <button 
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.05] active:scale-[0.95] text-white font-bold rounded-2xl shadow-2xl shadow-purple-900/40 transition-all flex items-center justify-center gap-4 text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                    ADD TO CART
                  </button>
                </div>
              </div>
              
              <div className="h-10"></div>
            </div>
          </div>
        </div>
      )}

      {/* Other components */}
      <ChatBot />
      {isCartOpen && <Cart items={cart} onRemove={removeFromCart} onUpdateQty={updateCartQty} onClose={() => setIsCartOpen(false)} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />}
      {isCheckoutOpen && <Checkout items={cart} onClose={() => setIsCheckoutOpen(false)} onSuccess={() => { alert("Order Confirmed!"); setCart([]); setIsCheckoutOpen(false); }} />}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[70] flex justify-center items-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsWishlistOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-orbitron font-bold text-white">Your Wishlist</h2><button onClick={() => setIsWishlistOpen(false)} className="text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{wishlist.map(p => (<div key={p.id} className="bg-slate-950 p-4 rounded-xl border border-white/5 flex flex-col gap-4"><img src={p.image} className="w-full aspect-square object-cover rounded-lg" /><h4 className="font-bold text-sm text-white">{p.name}</h4><button onClick={() => addToCart(p)} className="w-full py-2 bg-indigo-600 rounded-lg text-xs font-bold text-white">ADD TO CART</button></div>))}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
