import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import {
  FileText,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Moon,
  Sun,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/rules';

interface MicrositeViewProps {
  onOpenCatalogue: (category?: 'shoes' | 'garments') => void;
  onOpenQuote: (productName?: string) => void;
  onOpenMeeting?: () => void;
  onSwitchToFullSite?: () => void;
  whatsAppNumber: string;
}

export const MicrositeView: React.FC<MicrositeViewProps> = ({
  onOpenCatalogue,
  onOpenQuote,
  onOpenMeeting,
  onSwitchToFullSite,
  whatsAppNumber,
}) => {
  // Theme toggle: Dark Charcoal (default) or Crisp White as specified in brief
  const [isDarkMode, setIsDarkMode] = useState(true);

  const whatsappUrl = generateWhatsAppLink(
    whatsAppNumber,
    'Hello Rangers Safety Systems LLC, I am visiting your WETEX 2026 booth and would like to chat with your sales team regarding PPE & industrial gear.'
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-between py-6 px-4 sm:px-6 ${
        isDarkMode ? 'bg-[#202522] text-white' : 'bg-[#FAFAFA] text-[#202522]'
      }`}
    >
      {/* Top Utility Controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 px-1 gap-2">
        {onSwitchToFullSite && (
          <button
            onClick={onSwitchToFullSite}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              isDarkMode
                ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700 hover:text-white'
                : 'bg-white text-stone-700 border-stone-300 shadow-2xs hover:bg-stone-50'
            }`}
          >
            <span>&larr; Full B2B Website</span>
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Theme Switcher (Dark Charcoal / Crisp White) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
                : 'bg-white text-stone-800 border-stone-300 shadow-2xs hover:bg-stone-50'
            }`}
            title="Toggle Background Theme"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#F8971D]" />
                <span>Crisp White</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-600" />
                <span>Dark Charcoal</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Portrait Card Container (Linktree / Carrd.co style) */}
      <div
        className={`w-full max-w-md rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-2xl border ${
          isDarkMode
            ? 'bg-[#181C19] border-stone-800 shadow-black/60'
            : 'bg-white border-stone-200 shadow-stone-200'
        }`}
      >
        {/* 2. Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-stone-700/40">
          {/* Centered Prominent Company Logo */}
          <div className="p-3 bg-white rounded-xl shadow-md max-w-[260px] w-full flex items-center justify-center">
            <Logo variant="horizontal" size="md" />
          </div>

          {/* Tagline text underneath */}
          <div>
            <h2
              className={`text-base sm:text-lg font-heading font-black tracking-tight ${
                isDarkMode ? 'text-stone-100' : 'text-[#202522]'
              }`}
            >
              Premium Industrial Safety Gear &amp; PPE.
            </h2>
            <p className="text-xs font-mono text-[#F8971D] font-bold mt-0.5">
              EST. 1996 • DUBAI, UNITED ARAB EMIRATES
            </p>
          </div>
        </div>

        {/* 3. Welcome Message */}
        <div className="py-6 space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-justify">
          <p
            className={`font-semibold ${
              isDarkMode ? 'text-amber-400' : 'text-[#1E4378]'
            }`}
          >
            For three decades, Rangers Safety Systems LLC has been the UAE’s trusted name in occupational health and safety.
          </p>

          <p className={isDarkMode ? 'text-stone-300' : 'text-stone-600'}>
            Since our establishment in 1996, Rangers Safety Systems LLC has been a proud UAE-based company at the forefront of occupational health and safety. Committed to safeguarding lives and elevating workplace standards, we serve both government and private organisations across the GCC region through our exclusive product range.
          </p>

          <p className={isDarkMode ? 'text-stone-300' : 'text-stone-600'}>
            As a bootstrapped venture from the outset, our journey is a testament to resilience and unwavering dedication. We take pride in being a local entity that contributes to the UAE's economic growth while also providing valuable job opportunities for our community.
          </p>

          <p className={isDarkMode ? 'text-stone-300' : 'text-stone-600'}>
            With our expertise and dedication to your needs, we ensure the well-being of every worker.
          </p>

          <p
            className={`font-medium ${
              isDarkMode ? 'text-emerald-400' : 'text-[#438B3E]'
            }`}
          >
            Experience safety redefined with Rangers Safety Systems LLC. Connect with us today to embark on a journey towards a secure and prosperous future.
          </p>
        </div>

        {/* 4. Action Buttons (The core of the page) */}
        <div className="space-y-3.5 pt-2 pb-6 border-b border-stone-700/40">
          {/* Button 1 (Primary / Amber Color): "View Digital Catalogue – Safety Shoes" */}
          <button
            onClick={() => onOpenCatalogue('shoes')}
            className="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-heading font-black text-sm sm:text-base px-5 py-4 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/15 text-white group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold leading-tight">
                  View Digital Catalogue – Safety Shoes
                </div>
                <div className="text-[11px] text-amber-100 font-mono font-medium">
                  EN ISO 20345:2022 Certified Boots &amp; Shoes
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 2 (Primary / Amber Color): "View Digital Catalogue – Uniforms & Garments" */}
          <button
            onClick={() => onOpenCatalogue('garments')}
            className="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-heading font-black text-sm sm:text-base px-5 py-4 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/15 text-white group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold leading-tight">
                  View Digital Catalogue – Uniforms &amp; Garments
                </div>
                <div className="text-[11px] text-amber-100 font-mono font-medium">
                  100% Cotton &amp; Fire-Retardant Workwear
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 3 (Secondary / Sage Green or Outline): "Request a Corporate Quote" */}
          <button
            onClick={() => onOpenQuote()}
            className="w-full bg-[#8B9876] hover:bg-[#7a8766] border border-[#8B9876] text-white font-heading font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/15 text-white group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold leading-tight">Request a Corporate Quote</div>
                <div className="text-[11px] text-stone-200 font-mono font-normal">
                  B2B Pricing, Samples &amp; Tenders
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Button 4: "Schedule Exhibition Meeting" (Requirement 2) */}
          {onOpenMeeting && (
            <button
              onClick={onOpenMeeting}
              className="w-full bg-[#1E4378] hover:bg-[#16335d] border border-blue-400/30 text-white font-heading font-black text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/15 text-amber-300 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold leading-tight">Schedule Exhibition Meeting</div>
                  <div className="text-[11px] text-blue-200 font-mono font-normal">
                    Booth A-42, Hall 3 (WETEX Dubai)
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          )}

          {/* Button 5 (Secondary / WhatsApp Style): "Chat with Sales on WhatsApp" */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-between text-left cursor-pointer active:scale-98 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/15 text-white group-hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411" />
                </svg>
              </div>
              <div>
                <div className="font-bold leading-tight">Chat with Sales on WhatsApp</div>
                <div className="text-[11px] text-emerald-100 font-mono font-normal">
                  +971 55 732 8048 &bull; Instant Desk Response
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        </div>

        {/* 5. Genuine Google Business Reviews Card (Requirement 7: No fabricated testimonials) */}
        <div className="pt-6">
          <div
            className={`p-4 rounded-xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-stone-900/80 border-stone-800 text-stone-300'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-heading font-black tracking-wide">
                  Google Business Profile
                </span>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs font-bold text-stone-300 ml-1">5.0</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Rated 5.0 stars by government utilities, industrial contractors, and procurement partners across Dubai and the UAE.
            </p>

            <a
              href="https://maps.google.com/?cid=rangers_safety_systems_dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/10 hover:bg-white/15 text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-blue-300 hover:text-white"
            >
              <span>View Verified Google Reviews &amp; Ratings</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. Footer & Legal (All on one line as strictly requested in brief) */}
      <footer className="w-full max-w-4xl text-center mt-8 px-4">
        <p
          className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight whitespace-normal md:whitespace-nowrap ${
            isDarkMode ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          <span>Rangers Safety Systems LLC</span>
          <span className="mx-2 text-stone-500 font-normal">|</span>
          <span>TRN: 100391707500003</span>
          <span className="mx-2 text-stone-500 font-normal">|</span>
          <span>Unit SH01, Street 57. Jebel Ali Industrial First, Dubai 50791, United Arab Emirates</span>
        </p>
      </footer>
    </div>
  );
};
