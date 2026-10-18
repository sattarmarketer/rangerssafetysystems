import React, { useState, useMemo } from 'react';
import { Product, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, Filter, RotateCcw, ShieldCheck, ChevronDown } from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  onRequestQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'sku-asc'>('default');

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        !selectedCategory || selectedCategory === 'all' || p.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.certifications.toLowerCase().includes(q) ||
        p.specifications.some((s) => s.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'sku-asc') {
      result.sort((a, b) => a.sku.localeCompare(b.sku));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    onSelectCategory('all');
    setSortBy('default');
  };

  return (
    <div className="py-10 bg-[#F5F6F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase">
            <span>Rangers Safety</span>
            <span>/</span>
            <span className="text-[#1E4378]">Product Catalogue</span>
            <span>/</span>
            <span className="text-[#F8971D]">WETEX 2026</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-[#202522]">
                Industrial Safety Catalogue
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Browse our verified EN ISO 20345 safety footwear, flame-resistant workwear, and PPE.
              </p>
            </div>

            <div className="text-xs font-mono bg-white border border-stone-200 px-3 py-1.5 rounded-md shadow-2xs text-stone-700">
              Showing <strong className="text-[#1E4378]">{filteredProducts.length}</strong> of{' '}
              {products.length} Products
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by SKU, product name, Kevlar, composite toe, EN ISO standard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1E4378]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-4 flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="w-full px-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white font-medium"
              >
                <option value="default">Default Catalogue Order</option>
                <option value="name-asc">Sort by Product Name (A–Z)</option>
                <option value="sku-asc">Sort by SKU Number</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100 pb-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                !selectedCategory || selectedCategory === 'all'
                  ? 'bg-[#1E4378] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Products ({products.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E4378] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({products.filter((p) => p.category === cat.id).length})
              </button>
            ))}

            {(searchQuery || (selectedCategory && selectedCategory !== 'all')) && (
              <button
                onClick={handleReset}
                className="ml-auto text-xs text-stone-500 hover:text-[#F8971D] font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-stone-800">
                No matching safety equipment found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No products matched your search term "{searchQuery}". Try searching for "S1P", "S3",
                "Kevlar", "Coverall", or reset the filters.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-[#1E4378] text-white text-xs font-bold px-4 py-2.5 rounded-md hover:bg-[#16335d] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
