/**
 * Rangers Safety Systems LLC — Comprehensive CMS Configuration & Data Store
 * Controls all public website text, images, logos, sections, themes, buttons, and navigation.
 */

export interface NavItem {
  id: string;
  label: string;
  destination: 'home' | 'products' | 'catalogue' | 'contact' | 'microsite' | string;
  visible: boolean;
  order: number;
}

export interface HomepageSection {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  visible: boolean;
  order: number;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  visible: boolean;
  order: number;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  visible: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  path: string;
  category: 'footwear' | 'workwear' | 'ppe' | 'logos' | 'banners';
  dimensions: string;
  size: string;
  altText: string;
  usedIn: string[];
}

export interface CatalogueItem {
  id: string;
  title: string;
  description: string;
  category: 'footwear' | 'workwear' | 'ppe' | 'exhibition';
  coverImage: string;
  pdfUrl: string;
  pageCount: number;
  isActive: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ip: string;
}

export interface CategoryShowcaseCard {
  id: string;
  name: string;
  description: string;
  image: string;
  altText: string;
  subBrands: string[];
  count: number;
}

export interface EmailNotificationsConfig {
  recipientEmail: string;
  enabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpEncryption: 'tls' | 'ssl' | 'none';
  smtpUsername: string;
  status: 'Requires SMTP Configuration' | 'Active' | 'Disabled';
}

export interface CmsConfig {
  // 1. Hero Section & Parallax Settings
  hero: {
    mainHeading: string;
    subHeading: string;
    description: string;
    heroImage: string; // Foreground / product showcase image
    heroImageAlt: string;
    backgroundImage: string; // Construction site background photograph
    mobileBackgroundImage: string;
    parallaxEnabled: boolean;
    parallaxIntensity: 'subtle' | 'balanced' | 'dynamic';
    mobileParallax: boolean;
    reducedMotionFallback: boolean;
    overlayColor: string;
    overlayOpacity: number;
    backgroundColor: string;
    textColor: string;
    textAlign: 'left' | 'center';
    primaryButtonText: string;
    primaryButtonUrl: string;
    primaryButtonVisible: boolean;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    secondaryButtonVisible: boolean;
    tertiaryButtonText: string;
    tertiaryButtonUrl: string;
    tertiaryButtonVisible: boolean;
    whatsappButtonText: string;
    whatsappButtonVisible: boolean;
    sectionVisible: boolean;
    badgeText: string;
    badgeVisible: boolean;
  };

  // 2. Homepage Sections Ordering & Visibility
  sections: HomepageSection[];

  // 3. Company Introduction
  intro: {
    heading: string;
    description: string;
    experienceYears: string;
    certifiedProducts: string;
    gccCoverage: string;
    supportingPoints: string[];
    buttonText: string;
    buttonDestination: string;
    visible: boolean;
  };



  // 4. Category Showcase
  categoryShowcase: {
    heading: string;
    subheading: string;
    visible: boolean;
    categories: CategoryShowcaseCard[];
  };

  // 5. Exhibition Section (WETEX 2026)
  exhibition: {
    title: string;
    subtitle: string;
    description: string;
    coverImage: string;
    cataloguePdfUrl: string;
    viewButtonText: string;
    downloadButtonText: string;
    qrButtonText: string;
    visible: boolean;
  };

  // 6. Business Advantages
  advantages: {
    title: string;
    subtitle: string;
    visible: boolean;
    items: AdvantageItem[];
  };

  // 7. Google Reviews (Genuine Google Business Profile only)
  reviews: {
    title: string;
    subtitle: string;
    googleReviewUrl: string;
    googlePlaceId: string;
    googleApiKey: string;
    showGoogleBadge: boolean;
    visible: boolean;
    averageRating: number;
    reviewCount: number;
    items: ReviewItem[];
  };

  // Email Notification Settings
  emailNotifications: EmailNotificationsConfig;

  // 8. Contact CTA Section
  contactCta: {
    heading: string;
    description: string;
    backgroundColor: string;
    primaryButtonText: string;
    primaryButtonDestination: string;
    whatsappButtonText: string;
    visible: boolean;
  };

  // 9. Header & Navigation
  header: {
    companyName: string;
    tagline: string;
    customLogoUrl: string;
    mobileLogoUrl: string;
    faviconUrl: string;
    sticky: boolean;
    navLinks: NavItem[];
    ctaText: string;
    ctaDestination: string;
    headerBg: string;
    headerText: string;
  };

  // 10. Footer & Company Settings
  footer: {
    companyName: string;
    tagline: string;
    trn: string;
    address: string;
    phone: string;
    email: string;
    whatsAppNumber: string;
    copyrightText: string;
    description: string;
    googleMapsUrl: string;
    privacyUrl: string;
    termsUrl: string;
    showContactCta: boolean;
  };

  // 11. Products Page Layout & Display
  productsPage: {
    title: string;
    subtitle: string;
    bannerImage: string;
    columns: 2 | 3 | 4;
    productsPerPage: number;
    showSearchBar: boolean;
    showCategoryFilter: boolean;
    showSorting: boolean;
    emptyMessage: string;
  };

  // 12. Branding & Theme Colors
  branding: {
    primaryColor: string;    // Pantone 653C Blue
    secondaryColor: string;  // Pantone 363C Green
    accentColor: string;     // Amber Orange
    sageColor: string;       // Sage Green
    charcoalColor: string;   // Dark Charcoal
    bgColor: string;         // Light crisp grey
    textColor: string;       // Dark text
    fontFamily: string;
    borderRadius: 'sharp' | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-full';
    buttonStyle: 'flat' | 'rounded' | 'pill' | 'industrial';
  };

  // 13. Catalogues
  catalogues: CatalogueItem[];

  // 14. SEO Settings
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    twitterCard: string;
    googleVerification: string;
  };

  // 15. Admin Profile
  adminProfile: {
    email: string;
    name: string;
    role: string;
    lastLogin: string;
    passwordHash: string; // SHA-256 / hashed representation
  };

  // 16. System Info
  system: {
    dbStatus: string;
    phpVersion: string;
    maintenanceMode: boolean;
    lastBackup: string;
  };
}

export const APPROVED_BRAND_DEFAULTS = {
  primaryColor: '#1E4378',   // Pantone 653C Blue
  secondaryColor: '#438B3E', // Pantone 363C Green
  accentColor: '#F8971D',    // Amber Orange
  sageColor: '#8B9876',      // Sage Green
  charcoalColor: '#202522',  // Charcoal
  bgColor: '#F5F6F2',        // Off-white / light slate
  textColor: '#303630',
  fontFamily: 'Montserrat, sans-serif',
  borderRadius: 'rounded-lg' as const,
  buttonStyle: 'rounded' as const,
};

export const INITIAL_CMS_CONFIG: CmsConfig = {
  hero: {
    mainHeading: "PROTECTING THE REGION'S WORKFORCE",
    subHeading: 'Premium Industrial Safety Gear & PPE.',
    description:
      'Explore industrial safety footwear, workwear, and personal protective equipment for demanding professional work environments across Dubai, the UAE, and the GCC.',
    heroImage: '/uploads/products/footwear/ss-08-s1p.png',
    heroImageAlt: 'Rangers WAQ SS-08 S1P Composite Toe Safety Shoe',
    backgroundImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85',
    mobileBackgroundImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    parallaxEnabled: true,
    parallaxIntensity: 'balanced',
    mobileParallax: false,
    reducedMotionFallback: true,
    overlayColor: '#181C19',
    overlayOpacity: 75,
    backgroundColor: '#202522',
    textColor: '#FFFFFF',
    textAlign: 'left',
    primaryButtonText: 'Explore Products',
    primaryButtonUrl: 'products',
    primaryButtonVisible: true,
    secondaryButtonText: 'Request Corporate Quote',
    secondaryButtonUrl: 'quote',
    secondaryButtonVisible: true,
    tertiaryButtonText: 'View Exhibition Catalogue',
    tertiaryButtonUrl: 'catalogue',
    tertiaryButtonVisible: true,
    whatsappButtonText: 'WhatsApp Sales Desk',
    whatsappButtonVisible: true,
    sectionVisible: true,
    badgeText: 'WETEX 2026 Dubai Exhibition Showcase',
    badgeVisible: true,
  },

  sections: [
    { id: 'hero', name: 'Hero Banner Section', title: "PROTECTING THE REGION'S WORKFORCE", subtitle: 'Rangers Safety Systems LLC', visible: true, order: 1 },
    { id: 'intro', name: 'Company Introduction', title: 'Trusted Partner in Regional Workplace Protection', subtitle: 'Since 1996 in Dubai, UAE', visible: true, order: 2 },
    { id: 'categories', name: 'Product Categories Showcase', title: 'Comprehensive Industrial Protection Solutions', subtitle: 'Footwear, Workwear & PPE', visible: true, order: 3 },
    { id: 'exhibition', name: 'WETEX 2026 Exhibition Showcase', title: 'Official WETEX 2026 Exhibition Showcase', subtitle: 'Dubai International Exhibition Centre', visible: true, order: 4 },
    { id: 'advantages', name: 'Business Advantages', title: 'Why GCC Industry Leaders Rely On Rangers', subtitle: 'Three decades of excellence', visible: true, order: 5 },
    { id: 'reviews', name: 'Google Reviews & Testimonials', title: 'Client Endorsements & Google Reviews', subtitle: 'Verified contractor feedback', visible: true, order: 6 },
    { id: 'contactCta', name: 'Contact Call-to-Action', title: 'Protect Your Workforce with Certified Gear', subtitle: 'Custom bulk procurement', visible: true, order: 7 },
  ],

  intro: {
    heading: 'Trusted Partner in Regional Workplace Protection',
    description:
      'For three decades, Rangers Safety Systems LLC has been the UAE’s trusted name in occupational health and safety. Established in 1996 as a proud UAE-based enterprise, we safeguard workforce lives and elevate workplace standards for government and private organisations across the GCC region through our exclusive certified product lines.',
    experienceYears: '30+',
    certifiedProducts: '100%',
    gccCoverage: '6 Countries',
    supportingPoints: [
      '100% Bootstrapped UAE Heritage dedicated to regional economic growth',
      'Stringent EN ISO 20345:2022 & EN ISO 20471 compliance',
      'Rapid GCC-wide logistics from Jebel Ali Industrial First, Dubai',
      'Custom corporate workwear embroidery, sizing, and batch manufacturing',
    ],
    buttonText: 'Read Corporate Profile',
    buttonDestination: 'contact',
    visible: true,
  },

  categoryShowcase: {
    heading: 'Comprehensive Industrial Protection Solutions',
    subheading: 'Engineered to meet rigorous international safety standards (EN ISO, ASTM, CE) and built for the high ambient temperatures of the Middle East.',
    visible: true,
    categories: [
      {
        id: 'safety-footwear',
        name: 'Safety Footwear & Boots',
        description: 'Certified EN ISO 20345 safety shoes, composite/steel toe boots, and heat-resistant footwear engineered for industrial, utility, and construction safety.',
        image: '/uploads/products/footwear/ss-08-s1p.jpg',
        altText: 'Certified EN ISO 20345 Safety Footwear & Boots',
        subBrands: ['RANGERS WAQ', 'RANGERS PARADE', 'COMPOSITE TOE'],
        count: 19,
      },
      {
        id: 'workwear',
        name: 'Safety Garments & Workwear',
        description: 'High-visibility garments, polycotton coveralls, 100% cotton suits, and certified EN ISO 11611/11612 fire-retardant (FR) industrial workwear.',
        image: '/uploads/products/workwear/hivis_vest.png',
        altText: 'Certified High-Visibility Uniforms & 100% Cotton Industrial Workwear',
        subBrands: ['RANGERS WORKWEAR', 'TREATENDO FR', '100% COTTON'],
        count: 5,
      },
      {
        id: 'safety-gear',
        name: 'Safety Gear & PPE',
        description: 'Head-to-toe personal protective equipment including industrial safety helmets, eye and face protection, hearing protection, and specialized utility safety solutions.',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        altText: 'Industrial Safety Helmets and Personal Protective Equipment',
        subBrands: ['RANGERS PPE', 'EN 397', 'ANSI Z87.1'],
        count: 8,
      },
    ],
  },

  exhibition: {
    title: 'Official WETEX 2026 Exhibition Showcase',
    subtitle: 'Dubai International Convention and Exhibition Centre',
    description:
      'Explore our complete 12-page digital exhibition booklet showcasing high-grade composite-toe safety shoes, S3 water-resistant leather boots, EN ISO 20471 certified high-visibility garments, and industrial PPE for government utility and EPC contractors.',
    coverImage: '/uploads/products/workwear/hivis_vest.png',
    cataloguePdfUrl: '/catalogues/rangers_safety_systems_2026.pdf',
    viewButtonText: 'View 12-Page Digital Booklet',
    downloadButtonText: 'Download PDF Catalogue',
    qrButtonText: 'Mobile QR Micro-Site',
    visible: true,
  },

  advantages: {
    title: 'Why GCC Industry Leaders Rely On Rangers',
    subtitle: 'Three decades of unwavering dedication to workforce safety, quality assurance, and swift regional logistics.',
    visible: true,
    items: [
      {
        id: 'adv-1',
        title: 'EN ISO 20345:2022 Certified',
        description: 'Rigorous European and international laboratory compliance across all composite toe caps, Kevlar midsoles, and slip-resistant outsoles.',
        icon: 'ShieldCheck',
        visible: true,
        order: 1,
      },
      {
        id: 'adv-2',
        title: 'Bootstrapped UAE Heritage',
        description: 'Established in 1996 in Dubai, our journey is a testament to resilience, supporting local economic development and community job creation.',
        icon: 'Award',
        visible: true,
        order: 2,
      },
      {
        id: 'adv-3',
        title: 'Custom Corporate Branding',
        description: 'Precision embroidery, screen printing, and reflective tape placement tailored to your corporate utility and contractor identity.',
        icon: 'Sparkles',
        visible: true,
        order: 3,
      },
      {
        id: 'adv-4',
        title: 'Central Jebel Ali Logistics',
        description: 'Direct warehousing in Jebel Ali Industrial First, Dubai, guaranteeing agile regional fulfillment across UAE, Oman, Qatar, Saudi Arabia, Bahrain, and Kuwait.',
        icon: 'Truck',
        visible: true,
        order: 4,
      },
    ],
  },

  reviews: {
    title: 'Client Endorsements & Google Reviews',
    subtitle: 'Verified Google Business Profile rating and client reviews from utility engineers, HSE officers, and procurement managers in Dubai and the GCC.',
    googleReviewUrl: 'https://maps.google.com/?cid=rangers_safety_systems_dubai',
    googlePlaceId: '',
    googleApiKey: '',
    showGoogleBadge: true,
    visible: true,
    averageRating: 5.0,
    reviewCount: 48,
    items: [], // Zero unverified/fabricated reviews displayed on public site
  },

  emailNotifications: {
    recipientEmail: 'info@rangers-safety.com',
    enabled: true,
    smtpHost: '',
    smtpPort: 587,
    smtpEncryption: 'tls',
    smtpUsername: '',
    status: 'Requires SMTP Configuration',
  },

  contactCta: {
    heading: 'Protect Your Workforce with Certified Gear',
    description: 'Speak with our technical PPE specialists in Dubai for wholesale inquiries, custom workwear embroidery, or bulk tender quotations.',
    backgroundColor: '#181C19',
    primaryButtonText: 'Request a Corporate Quote',
    primaryButtonDestination: 'quote',
    whatsappButtonText: 'Chat with Sales on WhatsApp',
    visible: true,
  },

  header: {
    companyName: 'Rangers Safety Systems LLC',
    tagline: 'PREMIUM INDUSTRIAL SAFETY GEAR & PPE',
    customLogoUrl: '',
    mobileLogoUrl: '',
    faviconUrl: '',
    sticky: true,
    navLinks: [
      { id: 'nav-home', label: 'Home', destination: 'home', visible: true, order: 1 },
      { id: 'nav-products', label: 'Products', destination: 'products', visible: true, order: 2 },
      { id: 'nav-catalogue', label: 'Digital Catalogue', destination: 'catalogue', visible: true, order: 3 },
      { id: 'nav-contact', label: 'Contact Us', destination: 'contact', visible: true, order: 4 },
      { id: 'nav-microsite', label: 'Booth QR Micro-Site', destination: 'microsite', visible: true, order: 5 },
    ],
    ctaText: 'Request Quote',
    ctaDestination: 'quote',
    headerBg: '#FFFFFF',
    headerText: '#1E4378',
  },

  footer: {
    companyName: 'Rangers Safety Systems LLC',
    tagline: 'Premium Industrial Safety Gear & PPE',
    trn: '100391707500003',
    address: 'Unit SH01, Street 57, Jebel Ali Industrial First, Dubai 50791, United Arab Emirates',
    phone: '+971 4 244 5408',
    email: 'info@rangers-safety.com',
    whatsAppNumber: '+971 55 732 8048',
    copyrightText: '© 1996–2026 Rangers Safety Systems LLC. All rights reserved. Registered in Dubai, UAE.',
    description: 'Pioneering occupational safety solutions across the United Arab Emirates and GCC since 1996. Certified safety footwear, industrial workwear, and personal protective equipment.',
    googleMapsUrl: 'https://maps.google.com/?q=Jebel+Ali+Industrial+First+Dubai+UAE',
    privacyUrl: '#privacy',
    termsUrl: '#terms',
    showContactCta: true,
  },

  productsPage: {
    title: 'Industrial Safety Gear & PPE Catalogue',
    subtitle: 'Explore our full range of certified safety footwear, protective workwear, and PPE engineered for GCC industrial environments.',
    bannerImage: '/uploads/products/footwear/ss-08-s1p.png',
    columns: 3,
    productsPerPage: 12,
    showSearchBar: true,
    showCategoryFilter: true,
    showSorting: true,
    emptyMessage: 'No safety products found matching your search criteria. Contact our sales team for custom procurement.',
  },

  branding: {
    ...APPROVED_BRAND_DEFAULTS,
  },

  catalogues: [
    {
      id: 'cat-wetex-2026',
      title: 'WETEX 2026 Official Digital Exhibition Booklet',
      description: '12-page comprehensive master showcase prepared for water, energy, technology, and environmental utility delegates in Dubai.',
      category: 'exhibition',
      coverImage: '/uploads/products/workwear/hivis_vest.png',
      pdfUrl: '/catalogues/rangers_wetex_2026.pdf',
      pageCount: 12,
      isActive: true,
    },
    {
      id: 'cat-footwear-2026',
      title: 'Digital Catalogue – Safety Shoes & Boots',
      description: '15-page certified footwear catalogue covering composite-toe athletic series, Barton leather construction boots, and executive styles.',
      category: 'footwear',
      coverImage: '/uploads/products/footwear/ss-08-s1p.png',
      pdfUrl: '/catalogues/rangers_safety_shoes_2026.pdf',
      pageCount: 15,
      isActive: true,
    },
    {
      id: 'cat-garments-2026',
      title: 'Digital Catalogue – Uniforms & Garments',
      description: '12-page occupational workwear catalogue featuring 100% cotton coveralls, EN ISO 20471 high-visibility vests, and tactical cargo trousers.',
      category: 'workwear',
      coverImage: '/uploads/products/workwear/hivis_vest.png',
      pdfUrl: '/catalogues/rangers_uniforms_2026.pdf',
      pageCount: 12,
      isActive: true,
    },
  ],

  seo: {
    metaTitle: 'Rangers Safety Systems LLC — Industrial Safety Gear & PPE | Dubai, UAE',
    metaDescription: 'Official website and WETEX 2026 digital exhibition showcase for Rangers Safety Systems LLC. Premium industrial safety gear, certified safety footwear, protective workwear, and corporate PPE solutions in Dubai, UAE.',
    keywords: 'safety shoes dubai, industrial boots uae, safety uniforms, high visibility jackets, PPE suppliers gcc, Rangers safety systems, WETEX 2026',
    ogImage: '/uploads/products/footwear/ss-08-s1p.png',
    twitterCard: 'summary_large_image',
    googleVerification: 'google-site-verification-rss-2026',
  },

  adminProfile: {
    email: 'admin@rangers-safety.com',
    name: 'Chief Safety Systems Officer',
    role: 'Super Administrator',
    lastLogin: '2026-10-17 12:40 UTC',
    // Hash corresponding to default password Rangers@2026
    passwordHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },

  system: {
    dbStatus: 'Operational (PDO MySQL Connected)',
    phpVersion: '8.2.14-standard',
    maintenanceMode: false,
    lastBackup: '2026-10-17 11:30:00 UTC',
  },
};

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'media-ss08',
    filename: 'ss-08-s1p.png',
    path: '/uploads/products/footwear/ss-08-s1p.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '142 KB',
    altText: 'SS-08 S1P Black Safety Shoe',
    usedIn: ['Product SS-08 S1P', 'Hero Banner', 'Catalogue Page 2'],
  },
  {
    id: 'media-ss12s',
    filename: 'ss-12s-s1p.png',
    path: '/uploads/products/footwear/ss-12s-s1p.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '158 KB',
    altText: 'SS-12S S1P Beige Suede Safety Shoe',
    usedIn: ['Product SS-12S S1P', 'Catalogue Page 2'],
  },
  {
    id: 'media-ss18',
    filename: 'ss-18-s1p.png',
    path: '/uploads/products/footwear/ss-18-s1p.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '135 KB',
    altText: 'SS-18 S1P Black/Green Athletic Shoe',
    usedIn: ['Product SS-18 S1P', 'Catalogue Page 3'],
  },
  {
    id: 'media-ss21',
    filename: 'ss-21-s3.png',
    path: '/uploads/products/footwear/ss-21-s3.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '148 KB',
    altText: 'SS-21 S3 Water Resistant Black Shoe',
    usedIn: ['Product SS-21 S3', 'Catalogue Page 3'],
  },
  {
    id: 'media-ss25',
    filename: 'ss-25-s3.png',
    path: '/uploads/products/footwear/ss-25-s3.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '162 KB',
    altText: 'SS-25 S3 Barton Leather Low Cut Boot',
    usedIn: ['Product SS-25 S3', 'Catalogue Page 4'],
  },
  {
    id: 'media-ss26',
    filename: 'ss-26-s3.png',
    path: '/uploads/products/footwear/ss-26-s3.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '174 KB',
    altText: 'SS-26 S3 Barton Leather Mid Cut Boot',
    usedIn: ['Product SS-26 S3', 'Catalogue Page 4'],
  },
  {
    id: 'media-ss49',
    filename: 'ss-49-s3.png',
    path: '/uploads/products/footwear/ss-49-s3.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '139 KB',
    altText: 'SS-49 S3 Microfiber Water Repellent Boot',
    usedIn: ['Product SS-49 S3', 'Catalogue Page 5'],
  },
  {
    id: 'media-ss59',
    filename: 'ss-59-s1p.png',
    path: '/uploads/products/footwear/ss-59-s1p.png',
    category: 'footwear',
    dimensions: '800 × 600 px',
    size: '144 KB',
    altText: 'SS-59 S1P Rotary Quick Dial Shoe',
    usedIn: ['Product SS-59 S1P', 'Catalogue Page 5'],
  },
  {
    id: 'media-vest',
    filename: 'hivis_vest.png',
    path: '/uploads/products/workwear/hivis_vest.png',
    category: 'workwear',
    dimensions: '800 × 800 px',
    size: '95 KB',
    altText: 'EN ISO 20471 High Visibility Vest',
    usedIn: ['Exhibition Showcase', 'Product HV-VEST-01', 'Catalogue Page 12'],
  },
  {
    id: 'media-coverall',
    filename: 'coverall.png',
    path: '/uploads/products/workwear/coverall.png',
    category: 'workwear',
    dimensions: '800 × 800 px',
    size: '112 KB',
    altText: '100% Cotton Heavy Duty Boiler Suit Coverall',
    usedIn: ['Product COV-COT-100', 'Catalogue Page 12'],
  },
  {
    id: 'media-construction-site',
    filename: 'construction-cranes-site.jpg',
    path: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85',
    category: 'banners',
    dimensions: '2000 × 1125 px',
    size: '340 KB',
    altText: 'GCC Industrial Construction Site with Tower Cranes and Superstructure',
    usedIn: ['Homepage Hero Background (Desktop Parallax)'],
  },
  {
    id: 'media-worker-site',
    filename: 'industrial-site-worker.jpg',
    path: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    category: 'banners',
    dimensions: '1200 × 800 px',
    size: '185 KB',
    altText: 'Industrial Site Engineer in Certified Helmet and Reflective PPE',
    usedIn: ['Homepage Hero Mobile Background'],
  },
  {
    id: 'media-steel-structure',
    filename: 'construction-structural-steel.jpg',
    path: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=2000&q=85',
    category: 'banners',
    dimensions: '2000 × 1333 px',
    size: '290 KB',
    altText: 'Structural Steel Heavy Industrial Facility Construction',
    usedIn: ['Alternative Hero Background', 'About Us'],
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-17 12:35:10',
    user: 'admin@rangers-safety.com',
    action: 'CMS Initialization',
    details: 'Master CMS database loaded with 24 verified products and brand assets.',
    ip: '192.168.1.10',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-17 12:28:44',
    user: 'admin@rangers-safety.com',
    action: 'Catalogue Sync',
    details: 'Synchronized WETEX 2026 12-page exhibition booklet and quick-link triggers.',
    ip: '192.168.1.10',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-17 11:42:15',
    user: 'admin@rangers-safety.com',
    action: 'Theme Verification',
    details: 'Verified Pantone 653C Blue and Pantone 363C Green corporate color palettes.',
    ip: '192.168.1.10',
  },
];
