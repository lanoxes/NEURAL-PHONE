
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
  onViewDetail: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onViewDetail
}) => {
  return (
    <div className="group relative bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <button 
             onClick={() => onViewDetail(product)}
             className="w-full py-2 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
           >
             VIEW DETAILS
           </button>
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
            isWishlisted ? 'bg-red-500/80 text-white' : 'bg-slate-900/50 text-white/70 hover:text-red-400'
          }`}
        >
          <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-purple-400 tracking-widest uppercase">{product.brand}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="text-[10px] text-slate-400 font-bold">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-slate-100 font-bold text-base mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-400 text-xs mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
