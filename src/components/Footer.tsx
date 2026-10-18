import React from 'react';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/rules';
import { CATEGORIES } from '../data/products';

interface FooterProps {
  onNavigate: (view: 'home' | 'products' | 'contact' | 'microsite') => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenCatalogue: () => void;
  onOpenQuote: () => void;
  onOpenTv: () => void;
  onOpenQr: () => void;
  onOpenAdmin: () => void;
  settings: {
    companyName: string;
    address: string;
    trn: string;
    phone: string;
    email: string;
    whatsAppNumber: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenCatalogue,
  onOpenQuote,
  onOpenTv,
  onOpenQr,
  onOpenAdmin,
  settings,
}) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsAppNumber,
    'Hello Rangers Safety Systems LLC, I would like to enquire about your industrial safety products.'
  );

  return (
    <footer className="bg-[#181C19] text-stone-300 border-t border-stone-800">
      {/* Pre-footer Call to Action */}
      <div className="bg-[#1E4378] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-300 font-mono text-xs font-bold uppercase tracking-widest">
              Industrial Procurement Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black">
              Need Certified PPE for Your Workforce?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl">
              From EN ISO 20345 safety footwear to high-heat 160–300 GSM workwear, our Dubai team is
              ready to support your utility and corporate procurement tenders.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenQuote}
              className="bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Request Corporate Quote</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#438B3E] hover:bg-[#387534] text-white font-bold text-sm px-5 py-3 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>WhatsApp Sales Team</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg inline-block">
              <Logo variant="horizontal" size="md" />
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Rangers Safety Systems LLC is a premier industrial safety solutions provider in Dubai,
              UAE, delivering certified head-to-toe PPE, protective footwear, and industrial
              workwear for government utilities, energy, and infrastructure.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-800">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F8971D] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#438B3E] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-mono">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white font-mono">
                  {settings.email}
                </a>
              </div>
              <div className="text-[11px] font-mono text-stone-400">
                TRN: <strong className="text-stone-300">{settings.trn}</strong>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCatalogue}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WETEX 2026 Master Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-white transition-colors cursor-pointer text-[#F8971D]"
                >
                  Request B2B Quotation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-200">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-stone-400">
                Sub-Brands: Rangers WAQ, Rangers Parade, Rangers Workwear
              </li>
            </ul>
          </div>

          {/* Exhibition Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-200">
              Exhibition Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenQr}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Scan Mobile QR Code</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTv}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>TV Backdrop Mode (16:9)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-1 rounded border border-emerald-800 block text-center">
                WETEX 2026 DUBAI EXHIBITOR
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            &copy; {currentYear} Rangers Safety Systems LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Dubai, UAE</span>
            <span>•</span>
            <span>TRN: {settings.trn}</span>
            <span>•</span>
            <span className="text-stone-400">EN ISO 20345 / ASTM Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
