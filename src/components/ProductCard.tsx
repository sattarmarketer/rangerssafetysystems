import React, { useState } from 'react';
import { Product } from '../data/products';
import { ShieldCheck, Eye, FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { ProductThumb } from './ProductThumb';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestQuote,
}) => {
  const [imgError, setImgError] = useState(false);

  const getBrandBadge = (brand: string) => {
    switch (brand) {
      case 'RANGERS WAQ':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'RANGERS PARADE':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'RANGERS WORKWEAR':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Image Container: Clean light neutral background with object-contain as requested */}
        <div className="relative aspect-4/3 bg-[#F5F6F2] overflow-hidden border-b border-stone-100 flex items-center justify-center p-3">
          {!imgError && product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ProductThumb
              type={product.category}
              name={product.name}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Brand Tag Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getBrandBadge(
                product.brand
              )}`}
            >
              {product.brand}
            </span>
          </div>

          {/* Catalogue Page Badge Top Right */}
          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <Bookmark className="w-2.5 h-2.5 text-[#F8971D]" />
            <span>P.{String(product.pageNumber).padStart(2, '0')}</span>
          </div>

          {/* SKU Bottom Right */}
          <div className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-stone-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
            {product.sku}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title & Standard */}
          <div>
            <h3 className="font-heading font-bold text-base text-[#202522] group-hover:text-[#1E4378] transition-colors leading-snug">
              {product.name}
            </h3>
            {product.certifications && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#438B3E] mt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{product.certifications}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specifications list */}
          <div className="space-y-1 pt-1 border-t border-stone-100">
            {product.specifications.slice(0, 2).map((spec, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                <CheckCircle2 className="w-3 h-3 text-[#F8971D] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>

          {/* Sizes / Material Info */}
          <div className="text-[11px] text-stone-500 font-mono bg-stone-50 p-2 rounded flex items-center justify-between">
            <span>Sizes: {product.sizes}</span>
            {product.colours && (
              <span className="text-[#1E4378] font-bold">{product.colours.length} Colors</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onViewDetails(product)}
          className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2 px-3 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onRequestQuote(product)}
          className="w-full bg-[#1E4378] hover:bg-[#16335d] text-white text-xs font-bold py-2 px-3 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Quote</span>
        </button>
      </div>
    </div>
  );
};
