
import React from 'react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onViewCart: () => void;
  onViewWishlist: () => void;
  onSearch: (query: string) => void;
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  wishlistCount, 
  onViewCart, 
  onViewWishlist, 
  onSearch,
  activeBrand,
  setActiveBrand
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveBrand('All')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/20">
            <span className="font-orbitron font-bold text-white text-xl">N</span>
          </div>
          <span className="font-orbitron text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            NeuralPhone
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl w-full relative group">
          <input
            type="text"
            placeholder="Search for ROG, iPhone, iPad..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-slate-200"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={onViewWishlist}
            className="relative p-2 text-slate-400 hover:text-purple-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            onClick={onViewCart}
            className="relative p-2 text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
