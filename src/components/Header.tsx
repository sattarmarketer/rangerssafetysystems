import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, FileText, Phone, Tv, ShieldCheck, QrCode } from 'lucide-react';

import { CmsConfig } from '../data/cmsConfig';

interface HeaderProps {
  currentView: 'home' | 'products' | 'contact' | 'microsite';
  onNavigate: (view: 'home' | 'products' | 'contact' | 'microsite') => void;
  onOpenQuote: () => void;
  onOpenCatalogue: () => void;
  onOpenTv: () => void;
  onOpenQr: () => void;
  onOpenAdmin: () => void;
  headerConfig?: CmsConfig['header'];
  footerConfig?: CmsConfig['footer'];
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenQuote,
  onOpenCatalogue,
  onOpenTv,
  onOpenQr,
  onOpenAdmin,
  headerConfig,
  footerConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const companyPhone = footerConfig?.phone || '+971 4 244 5408';
  const companyAddress = footerConfig?.address || 'Jebel Ali Industrial First, Dubai, UAE';
  const companyTrn = footerConfig?.trn || '100391707500003';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#202522] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className="inline-block w-2 h-2 rounded-full bg-[#438B3E] animate-pulse"></span>
              WETEX 2026 Dubai Exhibition Showcase
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-300">{companyAddress}</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-300">TRN: {companyTrn}</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <a
              href={`tel:${companyPhone.replace(/\s+/g, '')}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3 text-[#F8971D]" />
              {companyPhone}
            </a>
            <button
              onClick={onOpenQr}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Show QR Code for Mobile"
            >
              <QrCode className="w-3 h-3 text-[#438B3E]" />
              Scan QR
            </button>
            <button
              onClick={onOpenTv}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Exhibition TV Backdrop (16:9)"
            >
              <Tv className="w-3 h-3 text-[#F8971D]" />
              TV Mode
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo link */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] rounded-md p-1"
            aria-label="Rangers Safety Systems LLC Home"
          >
            <Logo variant="horizontal" size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-semibold transition-colors cursor-pointer py-1 border-b-2 ${
                currentView === 'home'
                  ? 'text-[#1E4378] border-[#1E4378]'
                  : 'text-[#303630] border-transparent hover:text-[#1E4378]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('products')}
              className={`text-sm font-semibold transition-colors cursor-pointer py-1 border-b-2 ${
                currentView === 'products'
                  ? 'text-[#1E4378] border-[#1E4378]'
                  : 'text-[#303630] border-transparent hover:text-[#1E4378]'
              }`}
            >
              Products Catalogue
            </button>

            <button
              onClick={onOpenCatalogue}
              className="text-sm font-semibold text-[#303630] hover:text-[#1E4378] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
            >
              <FileText className="w-4 h-4 text-[#438B3E]" />
              Digital Catalogue
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-semibold transition-colors cursor-pointer py-1 border-b-2 ${
                currentView === 'contact'
                  ? 'text-[#1E4378] border-[#1E4378]'
                  : 'text-[#303630] border-transparent hover:text-[#1E4378]'
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => onNavigate('microsite')}
              className={`text-xs font-bold transition-all cursor-pointer px-3 py-1.5 rounded-full flex items-center gap-1.5 border ${
                currentView === 'microsite'
                  ? 'bg-[#1E4378] text-white border-[#1E4378] shadow-xs'
                  : 'bg-emerald-50 text-[#438B3E] border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8971D] animate-ping" />
              <span>Booth QR Micro-Site</span>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="bg-[#F8971D] hover:bg-[#e6840a] text-white font-semibold text-sm px-5 py-2.5 rounded-md shadow-xs transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4" />
              Request a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="bg-[#F8971D] text-white text-xs font-semibold px-3 py-2 rounded-md shadow-xs"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#303630] hover:bg-stone-100 focus:outline-hidden focus:ring-2 focus:ring-[#1E4378]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md font-medium text-base ${
                currentView === 'home'
                  ? 'bg-stone-100 text-[#1E4378] font-bold'
                  : 'text-[#303630] hover:bg-stone-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate('products');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md font-medium text-base ${
                currentView === 'products'
                  ? 'bg-stone-100 text-[#1E4378] font-bold'
                  : 'text-[#303630] hover:bg-stone-50'
              }`}
            >
              Our Products (24 Items)
            </button>

            <button
              onClick={() => {
                onOpenCatalogue();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-md font-medium text-base text-[#303630] hover:bg-stone-50 flex items-center justify-between"
            >
              <span>2026 Exhibition Catalogue</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                12 Pages
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md font-medium text-base ${
                currentView === 'contact'
                  ? 'bg-stone-100 text-[#1E4378] font-bold'
                  : 'text-[#303630] hover:bg-stone-50'
              }`}
            >
              Contact & Location
            </button>

            <button
              onClick={() => {
                onNavigate('microsite');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-md font-bold text-base flex items-center justify-between ${
                currentView === 'microsite'
                  ? 'bg-[#1E4378] text-white'
                  : 'bg-amber-50 text-[#F8971D] hover:bg-amber-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#438B3E] animate-pulse" />
                <span>Booth QR Micro-Site</span>
              </span>
              <span className="text-xs bg-[#F8971D] text-white px-2 py-0.5 rounded-full font-mono">
                WETEX 2026
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#F8971D] hover:bg-[#e6840a] text-white font-semibold py-3 rounded-md text-sm text-center"
            >
              Request Quote
            </button>
            <button
              onClick={() => {
                onOpenQr();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#1E4378] hover:bg-[#16335d] text-white font-semibold py-3 rounded-md text-sm text-center flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              Scan QR
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={() => {
                onOpenTv();
                setMobileMenuOpen(false);
              }}
              className="text-[#1E4378] font-medium flex items-center gap-1"
            >
              <Tv className="w-3.5 h-3.5" />
              Exhibition TV Mode
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-stone-500 font-medium flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
