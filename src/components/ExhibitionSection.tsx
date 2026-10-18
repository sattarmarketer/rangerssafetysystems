import React from 'react';
import { BookOpen, Download, Smartphone, CheckCircle, Shield } from 'lucide-react';

import { CmsConfig } from '../data/cmsConfig';

interface ExhibitionSectionProps {
  onOpenCatalogue: () => void;
  onOpenQr: () => void;
  onScheduleMeeting?: () => void;
  exhibitionConfig?: CmsConfig['exhibition'];
}

export const ExhibitionSection: React.FC<ExhibitionSectionProps> = ({
  onOpenCatalogue,
  onOpenQr,
  onScheduleMeeting,
  exhibitionConfig,
}) => {
  if (exhibitionConfig && exhibitionConfig.visible === false) {
    return null;
  }

  const title = exhibitionConfig?.title || 'WETEX 2026 Exhibition Master Product Catalogue';
  const description =
    exhibitionConfig?.description ||
    'Explore our comprehensive 12-page digital showcase featuring verified EN ISO 20345 safety footwear (Rangers WAQ & Parade), flame-resistant utility coveralls, high-temperature workwear, and head-to-toe PPE engineered for government utility and industrial procurement.';
  const viewBtnText = exhibitionConfig?.viewButtonText || 'View 12-Page Digital Booklet';
  const qrBtnText = exhibitionConfig?.qrButtonText || 'Mobile Micro-Site (QR)';

  return (
    <section className="py-16 bg-[#202522] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full border border-stone-700/40 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border border-stone-800/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#F8971D]/20 border border-[#F8971D]/40 text-[#F8971D] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              <span>Official Exhibition Release</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              {description}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0" />
                <span>24 Certified Industrial Models</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0" />
                <span>Full Technical EN ISO &amp; ASTM Specs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0" />
                <span>High-Ambient Heat Protection</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0" />
                <span>Paperless Mobile-Optimized Format</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenCatalogue}
                className="bg-[#F8971D] hover:bg-[#e6840a] text-white font-semibold px-6 py-3.5 rounded-lg shadow-lg flex items-center gap-2 text-sm transition-all cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>{viewBtnText}</span>
              </button>

              <button
                onClick={() => {
                  const pdfUrl = exhibitionConfig?.cataloguePdfUrl || '/catalogues/rangers_safety_systems_2026.pdf';
                  const link = document.createElement('a');
                  link.href = pdfUrl;
                  link.download = 'rangers_safety_systems_master_catalogue_2026.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-5 py-3.5 rounded-lg border border-white/20 flex items-center gap-2 text-sm transition-all cursor-pointer"
                title="Download 12-Page WETEX 2026 Exhibition Master Catalogue PDF"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>PDF Download</span>
              </button>

              {onScheduleMeeting && (
                <button
                  onClick={onScheduleMeeting}
                  className="bg-[#1E4378] hover:bg-[#16335d] border border-blue-400/40 text-white font-semibold px-5 py-3.5 rounded-lg flex items-center gap-2 text-sm transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Schedule Exhibition Meeting</span>
                </button>
              )}

              <button
                onClick={onOpenQr}
                className="text-stone-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors underline underline-offset-4 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#F8971D]" />
                <span>Open on Phone via QR</span>
              </button>
            </div>
          </div>

          {/* Right Column: Catalogue Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm cursor-pointer group" onClick={onOpenCatalogue}>
              {/* Glow Accent */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#438B3E] via-[#F8971D] to-[#1E4378] rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />

              {/* Book Container */}
              <div className="relative bg-[#181C19] border border-stone-700 rounded-lg p-5 shadow-2xl space-y-4">
                {/* Header inside cover */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#F8971D] font-bold">
                    EXHIBITION 2026
                  </div>
                  <div className="text-[10px] font-mono text-stone-400">
                    PAGE 01 / 12
                  </div>
                </div>

                {/* Cover graphic */}
                <div className="aspect-3/4 bg-stone-900 rounded border border-stone-800 overflow-hidden relative flex flex-col justify-between p-5">
                  <div className="space-y-1">
                    <div className="text-emerald-400 text-[11px] font-bold tracking-widest font-mono">
                      WETEX 2026 DUBAI
                    </div>
                    <div className="text-white text-lg font-heading font-black leading-tight">
                      MASTER PRODUCT CATALOGUE
                    </div>
                    <div className="text-stone-400 text-xs">
                      PREMIUM INDUSTRIAL SAFETY GEAR &amp; PPE
                    </div>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="bg-stone-800/80 p-2 rounded text-center border border-stone-700">
                      <div className="text-[10px] font-bold text-stone-200">SAFETY FOOTWEAR</div>
                      <div className="text-[9px] text-[#F8971D]">19 Certified Models</div>
                    </div>
                    <div className="bg-stone-800/80 p-2 rounded text-center border border-stone-700">
                      <div className="text-[10px] font-bold text-stone-200">WORKWEAR &amp; FR</div>
                      <div className="text-[9px] text-[#438B3E]">160-300 GSM Suits</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                    <span>Rangers Safety Systems LLC</span>
                    <span className="text-[#F8971D] font-bold">CLICK TO FLIP &rarr;</span>
                  </div>
                </div>

                <div className="text-center text-xs text-stone-400 group-hover:text-amber-400 transition-colors font-medium">
                  Click to open high-resolution digital reader
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
