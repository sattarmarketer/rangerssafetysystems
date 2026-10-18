import React, { useState, useEffect, useMemo } from 'react';
import { CATALOGUE_PAGES, CataloguePage } from '../data/catalogue';
import { Product } from '../data/products';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  FileText,
  Printer,
  Sparkles,
  Maximize2,
  Minimize2,
  Search,
  Filter,
  ShieldCheck,
  Eye,
  Calendar,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { ProductThumb } from './ProductThumb';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
  onOpenProductDetail?: (product: Product) => void;
  onOpenMeeting?: () => void;
  initialPage?: number;
  initialCategory?: 'shoes' | 'garments' | 'all';
  products?: Product[];
  pdfDownloadUrl?: string;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  onOpenProductDetail,
  onOpenMeeting,
  initialPage = 1,
  initialCategory = 'all',
  products = [],
  pdfDownloadUrl = '/catalogues/rangers_safety_systems_2026.pdf',
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'page' | 'grid'>('page');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Sync initialPage and initialCategory when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialCategory === 'shoes') {
        setCurrentPageIndex(1); // Page 02
        setCategoryFilter('safety-footwear');
      } else if (initialCategory === 'garments') {
        setCurrentPageIndex(11); // Page 12
        setCategoryFilter('workwear');
      } else {
        const targetIdx = Math.max(0, Math.min(CATALOGUE_PAGES.length - 1, initialPage - 1));
        setCurrentPageIndex(targetIdx);
        setCategoryFilter('all');
      }
      setSearchQuery('');
    }
  }, [isOpen, initialPage, initialCategory]);

  const currentPage = CATALOGUE_PAGES[currentPageIndex] || CATALOGUE_PAGES[0];
  const totalPages = CATALOGUE_PAGES.length;

  // Find products matching the current catalogue page
  const pageProducts = useMemo(() => {
    const pageNum = currentPage.pageNumber;
    return products.filter((p) => p.pageNumber === pageNum);
  }, [currentPage, products]);

  // All filtered catalogue products for search/grid mode
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory =
        categoryFilter === 'all' ||
        (categoryFilter === 'safety-footwear' && p.category === 'safety-footwear') ||
        (categoryFilter === 'workwear' && p.category === 'workwear') ||
        (categoryFilter === 'safety-gear' && p.category === 'safety-gear');

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.certifications.toLowerCase().includes(q) ||
        (p.specifications && p.specifications.some((s) => s.toLowerCase().includes(q)))
      );
    });
  }, [products, categoryFilter, searchQuery]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Direct Catalogue PDF direct download (Requirement 12: Do not redirect to catalogue page!)
  const handleDirectPdfDownload = () => {
    setIsDownloadingPdf(true);

    try {
      // Create a downloadable PDF link
      const link = document.createElement('a');
      link.href = pdfDownloadUrl;
      link.download = 'rangers_safety_systems_master_catalogue_2026.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('PDF direct download initiated:', err);
    }

    setTimeout(() => {
      setIsDownloadingPdf(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div
        className={`bg-[#181C19] border border-stone-700 text-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 w-full ${
          isFullscreen ? 'h-full max-w-none' : 'max-w-6xl max-h-[94vh]'
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-800 bg-[#202522] gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#F8971D] text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
              WETEX 2026
            </span>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                Rangers Safety Master Digital Catalogue
              </h3>
              <p className="text-[11px] text-stone-400">
                12-Page Official Exhibition Document • Jebel Ali, Dubai, UAE
              </p>
            </div>
          </div>

          {/* Mode Switcher & Tools */}
          <div className="flex items-center gap-2">
            <div className="flex bg-stone-800 p-0.5 rounded-lg border border-stone-700 text-xs">
              <button
                onClick={() => setActiveTab('page')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'page'
                    ? 'bg-[#1E4378] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Page Booklet</span>
              </button>
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'grid'
                    ? 'bg-[#1E4378] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Product Search ({products.length})</span>
              </button>
            </div>

            {/* Direct PDF Download Button */}
            <button
              onClick={handleDirectPdfDownload}
              disabled={isDownloadingPdf}
              className="bg-[#438B3E] hover:bg-[#367532] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
              title="Download Full Master Catalogue PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isDownloadingPdf ? 'Downloading PDF...' : 'Download PDF'}
              </span>
            </button>

            {onOpenMeeting && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMeeting();
                }}
                className="bg-[#F8971D] hover:bg-[#e0840e] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Schedule Meeting</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-2 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer hidden sm:block"
              title="Print Catalogue"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close digital catalogue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Share notification toast */}
        {copiedLink && (
          <div className="bg-[#438B3E] text-white text-xs py-1.5 px-4 text-center font-medium">
            Exhibition catalogue URL copied to clipboard!
          </div>
        )}

        {/* Main Catalogue Canvas */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col items-center justify-start bg-stone-950/60">
          {activeTab === 'page' ? (
            /* Booklet Page View with Real Products */
            <div className="w-full max-w-4xl bg-white text-[#202522] rounded-lg shadow-2xl border border-stone-300 overflow-hidden flex flex-col min-h-[550px]">
              {/* Page Header Ribbon */}
              <div className="bg-[#1E4378] text-white px-6 py-4 flex items-center justify-between border-b-4 border-[#F8971D]">
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold">
                    {currentPage.category}
                  </div>
                  <div className="text-lg sm:text-xl font-heading font-black tracking-wide">
                    {currentPage.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold bg-white/20 px-2.5 py-1 rounded">
                    PAGE {String(currentPage.pageNumber).padStart(2, '0')} / {totalPages}
                  </div>
                  <div className="text-[10px] text-stone-300 mt-1 font-mono font-bold">
                    {currentPage.brand}
                  </div>
                </div>
              </div>

              {/* Page Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#F5F6F2] to-white">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-block bg-emerald-100 text-[#438B3E] text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                      {currentPage.subtitle}
                    </div>
                    {pageProducts.length > 0 && (
                      <span className="text-xs font-mono text-stone-500 font-semibold">
                        {pageProducts.length} Verified Product{pageProducts.length > 1 ? 's' : ''} on this Page
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                    {currentPage.description}
                  </p>

                  {/* REAL PRODUCTS DISPLAY FOR THIS CATALOGUE PAGE */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mb-3 flex items-center gap-2">
                      <span>Products Featured on Page {currentPage.pageNumber}</span>
                      <span className="w-12 h-px bg-stone-300"></span>
                    </div>

                    {pageProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pageProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-white border border-stone-200 hover:border-[#1E4378] rounded-lg p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                          >
                            <div className="flex gap-4 items-start">
                              {/* Product Thumbnail */}
                              <div
                                className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-stone-100 rounded-md p-1 border border-stone-200 overflow-hidden cursor-pointer group-hover:scale-102 transition-transform"
                                onClick={() => onOpenProductDetail && onOpenProductDetail(prod)}
                                title="Click to inspect all angles and certification details"
                              >
                                <ProductThumb
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-mono font-bold bg-[#1E4378]/10 text-[#1E4378] px-2 py-0.5 rounded">
                                    {prod.sku}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-500">
                                    {prod.brand}
                                  </span>
                                </div>

                                <h4
                                  className="text-sm font-heading font-black text-[#202522] group-hover:text-[#1E4378] transition-colors line-clamp-1 cursor-pointer"
                                  onClick={() => onOpenProductDetail && onOpenProductDetail(prod)}
                                >
                                  {prod.name}
                                </h4>

                                <p className="text-[11px] text-stone-600 line-clamp-2 leading-tight">
                                  {prod.shortDescription}
                                </p>

                                {prod.certifications && (
                                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[#438B3E] pt-0.5">
                                    <ShieldCheck className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{prod.certifications}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Product Actions */}
                            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                              {onOpenProductDetail && (
                                <button
                                  onClick={() => onOpenProductDetail(prod)}
                                  className="text-[11px] font-bold text-stone-600 hover:text-[#1E4378] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View Specs &amp; Gallery</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  onClose();
                                  onOpenQuote(`${prod.sku} - ${prod.name}`);
                                }}
                                className="bg-[#F8971D] hover:bg-[#e0840e] text-white text-[11px] font-bold px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                              >
                                <span>Quote</span>
                                <span>&rarr;</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* If page has no direct product mapping, list the catalogue overview items */
                      <div className="bg-stone-50 border border-stone-200 rounded-lg p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentPage.products.map((itemStr, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-stone-200 p-3 rounded shadow-2xs flex items-center justify-between"
                            >
                              <span className="text-xs font-bold text-[#202522]">{itemStr}</span>
                              <button
                                onClick={() => {
                                  onClose();
                                  onOpenQuote(itemStr);
                                }}
                                className="text-[11px] font-semibold text-[#F8971D] hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <span>Quote</span>
                                <span>&rarr;</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Page Footer inside Catalogue */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1E4378]">Rangers Safety Systems LLC</span>
                    <span>&bull;</span>
                    <span>Jebel Ali Industrial First, Dubai, UAE</span>
                  </div>
                  <div className="text-[11px] font-mono">
                    Tel: +971 4 244 5408 | TRN: 100391707500003
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive Catalogue Search & Filter Grid Mode */
            <div className="w-full max-w-5xl bg-white text-[#202522] rounded-lg shadow-2xl border border-stone-300 p-4 sm:p-6 space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalogue by name, SKU, certification (e.g. S3, Kevlar, Coverall)..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1E4378]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      categoryFilter === 'all'
                        ? 'bg-[#1E4378] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    All ({products.length})
                  </button>
                  <button
                    onClick={() => setCategoryFilter('safety-footwear')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      categoryFilter === 'safety-footwear'
                        ? 'bg-[#1E4378] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Safety Footwear (19)
                  </button>
                  <button
                    onClick={() => setCategoryFilter('workwear')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      categoryFilter === 'workwear'
                        ? 'bg-[#1E4378] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Workwear &amp; FR (5)
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-[#FAFAFA] border border-stone-200 hover:border-[#1E4378] rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div
                          className="aspect-square bg-white rounded-lg p-2 border border-stone-200 overflow-hidden mb-2.5 cursor-pointer group flex items-center justify-center"
                          onClick={() => onOpenProductDetail && onOpenProductDetail(prod)}
                        >
                          <ProductThumb
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                          />
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono mb-1">
                          <span className="font-bold text-[#1E4378]">{prod.sku}</span>
                          <span>Page {String(prod.pageNumber).padStart(2, '0')}</span>
                        </div>

                        <h4
                          className="font-heading font-black text-xs text-[#202522] hover:text-[#1E4378] transition-colors line-clamp-1 cursor-pointer"
                          onClick={() => onOpenProductDetail && onOpenProductDetail(prod)}
                        >
                          {prod.name}
                        </h4>

                        <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-tight">
                          {prod.shortDescription}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                        {onOpenProductDetail && (
                          <button
                            onClick={() => onOpenProductDetail(prod)}
                            className="text-[11px] font-semibold text-[#1E4378] hover:underline cursor-pointer"
                          >
                            Details
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onClose();
                            onOpenQuote(`${prod.sku} - ${prod.name}`);
                          }}
                          className="bg-[#F8971D] hover:bg-[#e0840e] text-white text-[11px] font-bold px-3 py-1.5 rounded transition-colors cursor-pointer"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-stone-400 font-mono text-sm">No products found matching your search.</div>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try searching for another standard or keyword, or reset your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                    }}
                    className="bg-[#1E4378] text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-[#16335d] transition-colors cursor-pointer"
                  >
                    Reset Catalogue Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Pagination & Navigation Bar (for Page Flip mode) */}
        {activeTab === 'page' && (
          <div className="px-4 sm:px-6 py-3 border-t border-stone-800 bg-[#202522] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Thumbnails / Page dots */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-xs sm:max-w-md py-1">
              {CATALOGUE_PAGES.map((p, idx) => (
                <button
                  key={p.pageNumber}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-6 h-6 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    currentPageIndex === idx
                      ? 'bg-[#F8971D] text-black scale-110 shadow-sm'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
                  }`}
                  title={`Go to page ${p.pageNumber}: ${p.title}`}
                >
                  {p.pageNumber}
                </button>
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentPageIndex === 0}
                className="p-2 rounded-md bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-stone-300">
                {currentPageIndex + 1} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPageIndex === totalPages - 1}
                className="p-2 rounded-md bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenQuote('2026 Master Catalogue Items');
                }}
                className="bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-xs px-3.5 py-2 rounded-md ml-2 cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Quote Full Catalogue</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
