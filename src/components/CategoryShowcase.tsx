import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRight, ShieldCheck, Shirt, HardHat } from 'lucide-react';
import { CmsConfig, CategoryShowcaseCard } from '../data/cmsConfig';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenCatalogue: () => void;
  categoryConfig?: CmsConfig['categoryShowcase'];
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onOpenCatalogue,
  categoryConfig,
}) => {
  if (categoryConfig && categoryConfig.visible === false) {
    return null;
  }

  const heading = categoryConfig?.heading || 'Comprehensive Industrial Protection Solutions';
  const subheading =
    categoryConfig?.subheading ||
    'Engineered to meet rigorous international safety standards (EN ISO, ASTM, CE) and built for the high ambient temperatures of the Middle East.';

  // Merge dynamic CMS categories with default category list
  const categoryCards: (CategoryShowcaseCard | (typeof CATEGORIES)[0])[] =
    categoryConfig?.categories && categoryConfig.categories.length > 0
      ? categoryConfig.categories
      : CATEGORIES;

  const getIcon = (id: string) => {
    switch (id) {
      case 'safety-footwear':
        return <ShieldCheck className="w-6 h-6 text-[#1E4378]" />;
      case 'workwear':
        return <Shirt className="w-6 h-6 text-[#438B3E]" />;
      case 'safety-gear':
        return <HardHat className="w-6 h-6 text-[#F8971D]" />;
      default:
        return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F5F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#438B3E] mb-2 font-mono">
            <span>Product Divisions</span>
            <span>•</span>
            <span>WETEX 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#202522] tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            {subheading}
          </p>
        </div>

        {/* 3 Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryCards.map((cat, index) => {
            const imageSrc = cat.image || '/uploads/products/footwear/ss-08-s1p.jpg';
            const altText = (cat as any).altText || cat.name;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Category Image with Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to verified image if path fails
                      (e.target as HTMLImageElement).src =
                        cat.id === 'workwear'
                          ? '/img/uploads/products/workwear/hivis_vest.png'
                          : '/uploads/products/footwear/ss-08-s1p.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg shadow-sm">
                    {getIcon(cat.id)}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-mono bg-black/60 px-2 py-0.5 rounded">
                      0{index + 1}
                    </span>
                    <span className="font-semibold bg-[#1E4378] px-2 py-0.5 rounded">
                      {cat.count} Items Listed
                    </span>
                  </div>
                </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-[#202522] group-hover:text-[#1E4378] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Sub-brands */}
                <div className="pt-2 border-t border-stone-100">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.subBrands.map((brand) => (
                      <span
                        key={brand}
                        className="text-[11px] font-semibold bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-sm"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectCategory(cat.id)}
                      className="flex-1 bg-[#1E4378] hover:bg-[#16335d] text-white font-semibold text-xs py-2.5 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenCatalogue}
                      className="text-xs font-semibold text-stone-600 hover:text-[#1E4378] py-2.5 px-3 border border-stone-200 rounded-md transition-colors hover:bg-stone-50 cursor-pointer"
                      title="View in digital catalogue"
                    >
                      Catalogue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
