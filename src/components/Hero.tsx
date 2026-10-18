import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, ArrowRight, MapPin, ShieldCheck, Sparkles, Package } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/rules';
import { CmsConfig } from '../data/cmsConfig';

interface HeroProps {
  onOpenCatalogue: () => void;
  onOpenQuote: () => void;
  onNavigateToProducts?: () => void;
  whatsAppNumber: string;
  heroConfig?: CmsConfig['hero'];
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCatalogue,
  onOpenQuote,
  onNavigateToProducts,
  whatsAppNumber,
  heroConfig,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax scroll listener
  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);

      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);

      const handleScroll = () => {
        // Only update scroll position if parallax is enabled
        setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  if (heroConfig && heroConfig.sectionVisible === false) {
    return null;
  }

  // Content defaults from brief
  const mainHeading = heroConfig?.mainHeading || "PROTECTING THE REGION'S WORKFORCE";
  const subHeading = heroConfig?.subHeading || 'Premium Industrial Safety Gear & PPE.';
  const description =
    heroConfig?.description ||
    'Explore industrial safety footwear, workwear, and personal protective equipment for demanding professional work environments across Dubai, the UAE, and the GCC.';

  const primaryBtnText = heroConfig?.primaryButtonText || 'Explore Products';
  const secondaryBtnText = heroConfig?.secondaryButtonText || 'Request Corporate Quote';
  const tertiaryBtnText = heroConfig?.tertiaryButtonText || 'View Exhibition Catalogue';
  const whatsappBtnText = heroConfig?.whatsappButtonText || 'WhatsApp Our Sales Team';
  const badgeText = heroConfig?.badgeText || 'WETEX 2026 Dubai Exhibition Showcase';

  // Construction site background image
  const desktopBg =
    heroConfig?.backgroundImage ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85';
  const mobileBg =
    heroConfig?.mobileBackgroundImage ||
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85';
  const currentBg = isMobile && mobileBg ? mobileBg : desktopBg;

  // Foreground product/worker showcase image
  const foregroundImage = heroConfig?.heroImage || '/uploads/products/footwear/ss-08-s1p.png';
  const foregroundAlt = heroConfig?.heroImageAlt || 'Rangers WAQ SS-08 S1P Composite Safety Shoe';

  // Parallax calculation
  const parallaxEnabled =
    heroConfig?.parallaxEnabled !== false &&
    !prefersReducedMotion &&
    (!isMobile || heroConfig?.mobileParallax === true);

  // Intensity factor
  let intensityFactor = 0.25;
  if (heroConfig?.parallaxIntensity === 'subtle') intensityFactor = 0.15;
  if (heroConfig?.parallaxIntensity === 'dynamic') intensityFactor = 0.38;

  const bgTranslateY = parallaxEnabled ? scrollY * intensityFactor : 0;
  const overlayOpacity = (heroConfig?.overlayOpacity ?? 75) / 100;
  const overlayColor = heroConfig?.overlayColor || '#181C19';

  const whatsappUrl = generateWhatsAppLink(
    whatsAppNumber,
    'Hello Rangers Safety Systems LLC, I would like to enquire about your industrial safety products and request a corporate quotation.'
  );

  const handlePrimaryClick = () => {
    if (heroConfig?.primaryButtonUrl === 'quote') {
      onOpenQuote();
    } else if (heroConfig?.primaryButtonUrl === 'catalogue') {
      onOpenCatalogue();
    } else if (onNavigateToProducts) {
      onNavigateToProducts();
    } else {
      window.location.hash = '#products';
    }
  };

  const handleSecondaryClick = () => {
    if (heroConfig?.secondaryButtonUrl === 'catalogue') {
      onOpenCatalogue();
    } else {
      onOpenQuote();
    }
  };

  return (
    <section className="relative bg-[#181C19] text-white overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center">
      {/* ------------------------------------------------------------- */}
      {/* CONSTRUCTION-SITE PARALLAX BACKGROUND LAYER                   */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[15%] -left-[5%] -right-[5%] -bottom-[15%] w-[110%] h-[130%] will-change-transform"
          style={{
            transform: `translate3d(0, ${bgTranslateY}px, 0)`,
            transition: prefersReducedMotion ? 'none' : 'transform 0.05s linear',
          }}
        >
          <img
            src={currentBg}
            alt="Authentic industrial construction site with cranes and workers wearing certified PPE"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            onError={(e) => {
              // Fallback to high-reliability unsplash construction image
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85';
            }}
          />
        </div>

        {/* Dynamic Dark Gradient & Color Overlay for Text Legibility */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181C19] via-[#181C19]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181C19] via-transparent to-[#181C19]/50" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HERO CONTENT CONTAINER                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & CTA Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Event / Certification Badge */}
            {heroConfig?.badgeVisible !== false && (
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#438B3E] animate-ping" />
                <span>{badgeText}</span>
              </div>
            )}

            {/* Company Name & Master Headlines */}
            <div className="space-y-2">
              <p className="text-[#F8971D] font-heading font-black tracking-[0.2em] text-xs sm:text-sm uppercase flex items-center gap-2">
                <span>RANGERS SAFETY SYSTEMS LLC</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300 font-mono text-[11px] font-normal">EST. 1996 DUBAI</span>
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-md">
                {mainHeading}
              </h1>
              <p className="text-xl sm:text-2xl font-heading font-bold text-stone-200">
                {subHeading}
              </p>
            </div>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed font-light drop-shadow-sm">
              {description}
            </p>

            {/* 3 Prominent Action Buttons matching Reference Layout */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 max-w-2xl">
              {/* Button 1: Explore Products (Primary) */}
              {heroConfig?.primaryButtonVisible !== false && (
                <button
                  onClick={handlePrimaryClick}
                  className="group bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold px-5 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/15 text-stone-950 group-hover:scale-110 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-900 font-mono font-bold">
                        B2B Catalogue
                      </div>
                      <div className="text-sm font-extrabold">{primaryBtnText}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stone-950 group-hover:translate-x-1 transition-transform ml-2" />
                </button>
              )}

              {/* Button 2: Request Corporate Quote (Secondary) */}
              {heroConfig?.secondaryButtonVisible !== false && (
                <button
                  onClick={handleSecondaryClick}
                  className="group bg-[#1E4378] hover:bg-[#16335d] border border-blue-400/40 text-white font-semibold px-5 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-blue-200 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-blue-200 font-mono">
                        Fast Wholesale RFQ
                      </div>
                      <div className="text-sm font-bold">{secondaryBtnText}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform ml-2" />
                </button>
              )}

              {/* Button 3: View Exhibition Catalogue (Tertiary) */}
              {heroConfig?.tertiaryButtonVisible !== false && (
                <button
                  onClick={onOpenCatalogue}
                  className="group bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-4 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white/10 text-[#F8971D]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-300 font-mono">
                        12-Page Booklet
                      </div>
                      <div className="text-xs font-bold">{tertiaryBtnText}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:translate-x-1 transition-transform ml-2" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Contact CTA */}
            {heroConfig?.whatsappButtonVisible !== false && (
              <div className="max-w-xl">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full bg-[#8B9876] hover:bg-[#7a8766] border border-stone-400/30 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-white/15 text-white group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider text-stone-200 font-mono">
                        Direct Sales Desk • WhatsApp
                      </div>
                      <div className="text-xs font-bold">{whatsappBtnText}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-200 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}

            {/* Address Banner */}
            <div className="pt-2 flex items-start gap-3 bg-stone-900/80 border border-stone-700/70 rounded-xl p-3.5 max-w-xl text-stone-300 text-xs backdrop-blur-xs shadow-md">
              <MapPin className="w-5 h-5 text-[#F8971D] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Jebel Ali Industrial First, Dubai, United Arab Emirates</p>
                <p className="text-stone-400 text-[11px]">
                  Unit SH01, Street 57 • Federal Tax Registration TRN: 100391707500003
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product / Worker Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#F8971D]/40 via-[#1E4378]/30 to-[#438B3E]/40 rounded-3xl opacity-30 blur-xl" />

              <div className="relative bg-[#202522] border border-stone-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Visual Image Container with object-contain */}
                <div className="aspect-4/3 sm:aspect-square relative overflow-hidden bg-gradient-to-b from-[#181C19] via-[#202522] to-[#141715] flex items-center justify-center p-6">
                  <img
                    src={foregroundImage}
                    alt={foregroundAlt}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/uploads/products/footwear/ss-08-s1p.png';
                    }}
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#202522] via-[#202522]/80 to-transparent" />

                  {/* Floating Verified Spec Pills */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-[#1E4378]/95 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-400/30 shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>EN ISO 20345:2022</span>
                      </span>
                      <span className="bg-[#438B3E]/95 backdrop-blur-sm text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-400/30 shadow-xs">
                        200J Composite Toe
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-stone-700/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#F8971D]" />
                        <span className="font-bold text-white text-[11px]">Rangers WAQ Flagship Series</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#F8971D] bg-[#F8971D]/15 px-2 py-0.5 rounded">
                        100% Non-Metallic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
