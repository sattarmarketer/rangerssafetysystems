import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ExhibitionSection } from './components/ExhibitionSection';
import { BusinessAdvantages } from './components/BusinessAdvantages';
import { ProductsView } from './components/ProductsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { CatalogueModal } from './components/CatalogueModal';
import { TvBackdropModal } from './components/TvBackdropModal';
import { QrCodeModal } from './components/QrCodeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MicrositeView } from './components/MicrositeView';
import { MeetingScheduleModal } from './components/MeetingScheduleModal';
import { INITIAL_PRODUCTS, Product } from './data/products';
import { CmsConfig, INITIAL_CMS_CONFIG } from './data/cmsConfig';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'contact' | 'microsite'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('view') === 'microsite' || window.location.hash === '#microsite') {
          return 'microsite';
        }
      }
    } catch {}
    return 'home';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState<string>('');
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [catalogueInitialPage, setCatalogueInitialPage] = useState<number>(1);
  const [isTvOpen, setIsTvOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Products state (can be edited/managed by Admin)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('rss_products_data');
      return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Master CMS Configuration (controls entire site)
  const [cmsConfig, setCmsConfig] = useState<CmsConfig>(() => {
    try {
      const stored = localStorage.getItem('rss_cms_config');
      return stored ? JSON.parse(stored) : INITIAL_CMS_CONFIG;
    } catch {
      return INITIAL_CMS_CONFIG;
    }
  });

  // Website Settings (legacy adapter mapped from cmsConfig)
  const settings = {
    companyName: cmsConfig.footer.companyName,
    address: cmsConfig.footer.address,
    trn: cmsConfig.footer.trn,
    phone: cmsConfig.footer.phone,
    email: cmsConfig.footer.email,
    whatsAppNumber: cmsConfig.footer.whatsAppNumber,
    reviewsEnabled: cmsConfig.reviews.visible,
  };

  // Sync CSS theme variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', cmsConfig.branding.primaryColor);
      root.style.setProperty('--color-secondary', cmsConfig.branding.secondaryColor);
      root.style.setProperty('--color-accent', cmsConfig.branding.accentColor);
      root.style.setProperty('--color-sage', cmsConfig.branding.sageColor);
    }
  }, [cmsConfig.branding]);

  // Listen to URL search params and hash changes
  useEffect(() => {
    const checkViewFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('view') === 'microsite' || window.location.hash === '#microsite') {
          setCurrentView('microsite');
        } else if (params.get('view') === 'products' || window.location.hash === '#products') {
          setCurrentView('products');
        } else if (params.get('view') === 'contact' || window.location.hash === '#contact') {
          setCurrentView('contact');
        } else if (params.get('view') === 'home' || window.location.hash === '#home') {
          setCurrentView('home');
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkViewFromUrl();
    window.addEventListener('popstate', checkViewFromUrl);
    window.addEventListener('hashchange', checkViewFromUrl);
    return () => {
      window.removeEventListener('popstate', checkViewFromUrl);
      window.removeEventListener('hashchange', checkViewFromUrl);
    };
  }, []);

  // Save products when modified in admin
 const handleUpdateProducts = (updated: Product[]) => {
  setProducts(updated);
  try {
    // Save the array containing the real server URLs
    localStorage.setItem('rss_products_data', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save products:', err);
  }
};

  // Save master CMS configuration
  const handleUpdateCmsConfig = (updated: CmsConfig) => {
    setCmsConfig(updated);
    try {
      localStorage.setItem('rss_cms_config', JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage quota reached when saving CMS config:', err);
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteWithProduct = (productOrName?: Product | string) => {
    if (typeof productOrName === 'string') {
      setQuoteInitialProduct(productOrName);
    } else if (productOrName) {
      setQuoteInitialProduct(`${productOrName.sku} - ${productOrName.name}`);
    } else {
      setQuoteInitialProduct('');
    }
    setIsQuoteOpen(true);
  };

  const handleOpenCatalogueCategory = (category?: 'shoes' | 'garments') => {
    if (category === 'shoes') {
      setCatalogueInitialPage(2);
    } else if (category === 'garments') {
      setCatalogueInitialPage(12);
    } else {
      setCatalogueInitialPage(1);
    }
    setIsCatalogueOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F2] text-[#303630]">
      {/* If in micro-site view, render the exact Linktree-style mobile portrait view with switch button */}
      {currentView === 'microsite' ? (
        <MicrositeView
          onOpenCatalogue={handleOpenCatalogueCategory}
          onOpenQuote={(prod) => handleOpenQuoteWithProduct(prod)}
          onSwitchToFullSite={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whatsAppNumber={cmsConfig.footer.whatsAppNumber}
        />
      ) : (
        <>
          {/* Header */}
          <Header
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuote={() => handleOpenQuoteWithProduct()}
            onOpenCatalogue={() => handleOpenCatalogueCategory()}
            onOpenTv={() => setIsTvOpen(true)}
            onOpenQr={() => setIsQrOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            headerConfig={cmsConfig.header}
            footerConfig={cmsConfig.footer}
          />

          {/* Main Content Views */}
          <main className="flex-1">
            {currentView === 'home' && (
              <>
                <Hero
                  onOpenCatalogue={() => handleOpenCatalogueCategory()}
                  onOpenQuote={() => handleOpenQuoteWithProduct()}
                  whatsAppNumber={cmsConfig.footer.whatsAppNumber}
                  heroConfig={cmsConfig.hero}
                />

                <CategoryShowcase
                  onSelectCategory={handleSelectCategory}
                  onOpenCatalogue={() => handleOpenCatalogueCategory()}
                  categoryConfig={cmsConfig.categoryShowcase}
                />

                <ExhibitionSection
                  onOpenCatalogue={() => handleOpenCatalogueCategory()}
                  onOpenQr={() => setIsQrOpen(true)}
                  onScheduleMeeting={() => setIsScheduleMeetingOpen(true)}
                  exhibitionConfig={cmsConfig.exhibition}
                />

                <BusinessAdvantages
                  onOpenQuote={() => handleOpenQuoteWithProduct()}
                  advantagesConfig={cmsConfig.advantages}
                />
              </>
            )}

            {currentView === 'products' && (
              <ProductsView
                products={products}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onViewDetails={(prod) => setDetailProduct(prod)}
                onRequestQuote={(prod) => handleOpenQuoteWithProduct(prod)}
              />
            )}

            {currentView === 'contact' && (
              <ContactView
                onOpenQuote={() => handleOpenQuoteWithProduct()}
                onOpenMeeting={() => setIsScheduleMeetingOpen(true)}
                settings={settings}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCategory={handleSelectCategory}
            onOpenCatalogue={() => handleOpenCatalogueCategory()}
            onOpenQuote={() => handleOpenQuoteWithProduct()}
            onOpenTv={() => setIsTvOpen(true)}
            onOpenQr={() => setIsQrOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            settings={settings}
          />
        </>
      )}

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProduct={quoteInitialProduct}
        whatsAppNumber={settings.whatsAppNumber}
      />

      <CatalogueModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
        onOpenQuote={(item) => handleOpenQuoteWithProduct(item)}
        initialPage={catalogueInitialPage}
      />

      <TvBackdropModal
        isOpen={isTvOpen}
        onClose={() => setIsTvOpen(false)}
        targetUrl={window.location.href}
      />

      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        initialUrl={window.location.href}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onRequestQuote={(prod) => handleOpenQuoteWithProduct(prod)}
        whatsAppNumber={settings.whatsAppNumber}
      />

      <MeetingScheduleModal
        isOpen={isScheduleMeetingOpen}
        onClose={() => setIsScheduleMeetingOpen(false)}
        whatsAppNumber={settings.whatsAppNumber}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        cmsConfig={cmsConfig}
        onUpdateCmsConfig={handleUpdateCmsConfig}
        onNavigateToView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
