import React, { useState } from 'react';
import { Product } from '../data/products';
import {
  X,
  ShieldCheck,
  FileText,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/rules';
import { ProductThumb } from './ProductThumb';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
  whatsAppNumber: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  whatsAppNumber,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imgError, setImgError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!product) return null;

  // Build the complete list of images: primary image first, then any gallery images
  const allImages: string[] = [
    product.image,
    ...(product.galleryImages || []).filter((img) => img && img !== product.image),
  ];

  const currentImg = allImages[selectedImageIndex] || product.image;

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const whatsappUrl = generateWhatsAppLink(
    whatsAppNumber,
    `Hello Rangers Team, I would like to request a quotation and technical datasheet for ${product.sku} - ${product.name}.`,
    product.name
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="bg-white text-[#202522] rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="bg-[#202522] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs bg-[#F8971D] text-stone-950 font-black px-2.5 py-0.5 rounded shadow-xs">
                {product.brand}
              </span>
              <span className="text-xs text-stone-300 font-mono font-bold">SKU: {product.sku}</span>
              <span className="text-[11px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700 hidden sm:inline-flex items-center gap-1 font-mono">
                <Bookmark className="w-3 h-3 text-[#F8971D]" />
                {product.catalogueItem}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close product details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Multi-Image Gallery */}
              <div className="md:col-span-6 space-y-4">
                {/* Main Image Showcase */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#F5F6F2] border border-stone-200 flex items-center justify-center p-4 group">
                  {!imgError && currentImg ? (
                    <img
                      src={currentImg}
                      alt={`${product.name} - View ${selectedImageIndex + 1}`}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <ProductThumb type={product.category} name={product.name} />
                  )}

                  {/* Image Counter Badge */}
                  {allImages.length > 1 && (
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-stone-700/60 font-semibold shadow-xs">
                      View {selectedImageIndex + 1} of {allImages.length}
                    </div>
                  )}

                  {/* Fullscreen Lightbox Zoom Trigger */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-3 right-3 p-1.5 bg-stone-900/70 hover:bg-stone-900 text-white rounded-lg opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                    title="Open Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Previous / Next Arrow Controls */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer shadow-md"
                        aria-label="Previous image view"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer shadow-md"
                        aria-label="Next image view"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                      Multiple Angles &amp; Views ({allImages.length})
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedImageIndex(idx);
                            setImgError(false);
                          }}
                          className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 cursor-pointer transition-all overflow-hidden relative ${
                            selectedImageIndex === idx
                              ? 'border-[#1E4378] ring-2 ring-[#1E4378]/30 shadow-xs'
                              : 'border-stone-200 hover:border-stone-400 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} angle ${idx + 1}`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                '/uploads/products/footwear/ss-08-s1p.png';
                            }}
                          />
                          {idx === 0 && (
                            <span className="absolute bottom-0 inset-x-0 bg-[#1E4378] text-white text-[8px] font-mono font-bold text-center leading-tight">
                              Main
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image & Catalogue Verification Box */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl text-[11px] text-stone-600 font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Catalogue Source:</span>
                    <strong className="text-stone-800">{product.catalogueItem}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Image Asset:</span>
                    <span className="text-[#1E4378] font-bold">{product.imageFileName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Verification Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{product.status}</span>
                    </span>
                  </div>
                </div>

                {/* Verified standard badge */}
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950">
                  <ShieldCheck className="w-5 h-5 text-[#438B3E] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-emerald-900">EN ISO Safety Standard Compliance</div>
                    <div className="text-emerald-800 font-mono text-[11px] mt-0.5">
                      {product.certifications}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Product Meta & Specifications */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E4378] bg-blue-50 px-2 py-0.5 rounded">
                    {product.categoryName}
                  </span>
                  <h3 className="text-2xl font-heading font-black text-[#202522] mt-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">Model Code: {product.model}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono">
                    Product Overview
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed font-light">
                    {product.fullDescription || product.shortDescription}
                  </p>
                </div>

                {/* Quick Spec Pills */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs">
                  <div>
                    <span className="text-stone-400 font-mono text-[10px] uppercase block">Material:</span>
                    <span className="font-semibold text-stone-800">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-mono text-[10px] uppercase block">Available Sizes:</span>
                    <span className="font-semibold text-stone-800 font-mono">{product.sizes}</span>
                  </div>
                </div>

                {/* Technical Bullet Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-[#F8971D]" />
                      <span>Technical Specifications</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {product.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#438B3E] font-bold mt-0.5">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestQuote(product);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Corporate Quote</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#8B9876] hover:bg-[#788564] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-0 duration-200"
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-stone-900/80 cursor-pointer"
              title="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={currentImg}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="mt-4 flex items-center gap-4 text-white text-xs font-mono">
              <span className="font-bold text-[#F8971D]">{product.sku}</span>
              <span>•</span>
              <span>{product.name}</span>
              {allImages.length > 1 && (
                <>
                  <span>•</span>
                  <span>
                    View {selectedImageIndex + 1} of {allImages.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
