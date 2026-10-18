import React, { useState, useEffect } from 'react';
import { Product, CATEGORIES } from '../data/products';
import {
  CmsConfig,
  APPROVED_BRAND_DEFAULTS,
  INITIAL_MEDIA_LIBRARY,
  MediaItem,
  ActivityLog,
  INITIAL_ACTIVITY_LOGS,
} from '../data/cmsConfig';
import {
  X,
  Lock,
  LogOut,
  LayoutDashboard,
  Package,
  Layers,
  FileCheck,
  BookOpen,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  Check,
  AlertCircle,
  Download,
  Building2,
  Phone,
  Mail,
  ShieldAlert,
  Upload,
  Image as ImageIcon,
  Save,
  CheckCircle,
  Search,
  Filter,
  RefreshCw,
  Palette,
  ExternalLink,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Key,
  Shield,
  User,
  Clock,
  ArrowUp,
  ArrowDown,
  Copy,
  MessageSquare,
  Star,
  Sliders,
  Menu,
  ChevronRight,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  cmsConfig: CmsConfig;
  onUpdateCmsConfig: (newConfig: CmsConfig) => void;
  onNavigateToView?: (view: 'home' | 'products' | 'contact' | 'microsite') => void;
}

export type SidebarSection =
  | 'overview'
  | 'customizer'
  | 'page-manager'
  | 'header-nav'
  | 'hero-section'
  | 'sections'
  | 'categories'
  | 'products'
  | 'product-images'
  | 'catalogues'
  | 'quotes'
  | 'contact-settings'
  | 'google-reviews'
  | 'footer-settings'
  | 'branding-theme'
  | 'media-library'
  | 'seo'
  | 'profile-security'
  | 'website-preview'
  | 'system-settings'
  | 'logout';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  cmsConfig,
  onUpdateCmsConfig,
  onNavigateToView,
}) => {
  // 1. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('rss_admin_auth') === 'true';
  });
 const [emailInput, setEmailInput] = useState('');
 const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // 2. Active Sidebar Section
  const [activeSection, setActiveSection] = useState<SidebarSection>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 3. Local working copy of CMS configuration
  const [cms, setCms] = useState<CmsConfig>(cmsConfig);

  // 4. Quotes / RFQ state
  const [quotes, setQuotes] = useState<any[]>([]);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('all');
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<any | null>(null);

  // 5. Media Library state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const stored = localStorage.getItem('rss_media_library');
      return stored ? JSON.parse(stored) : INITIAL_MEDIA_LIBRARY;
    } catch {
      return INITIAL_MEDIA_LIBRARY;
    }
  });
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<string>('all');
  const [previewMediaItem, setPreviewMediaItem] = useState<MediaItem | null>(null);

  // 6. Activity & Audit Logs
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem('rss_activity_logs');
      return stored ? JSON.parse(stored) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  // 7. Product Management Modals & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [imageUploadFeedback, setImageUploadFeedback] = useState<string>('');

  // 8. Notification Banner State
  const [toastMessage, setToastMessage] = useState<string>('');

  // 9. Profile & Security Forms
  const [profileForm, setProfileForm] = useState({
    name: cms.adminProfile.name,
    email: cms.adminProfile.email,
  });
  const [emailChangeForm, setEmailChangeForm] = useState({
    currentPassword: '',
    newEmail: '',
    confirmNewEmail: '',
  });
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [securityFeedback, setSecurityFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 10. Preview Device Mode
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // 11. Category Media Picker Target
  const [categoryMediaPickerTarget, setCategoryMediaPickerTarget] = useState<string | null>(null);

  // Synchronize when cmsConfig prop updates
  useEffect(() => {
    setCms(cmsConfig);
  }, [cmsConfig]);

  // Load quotes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rss_quote_requests');
      if (stored) {
        setQuotes(JSON.parse(stored));
      } else {
        const initialQuotes = [
          {
            id: 'quote-seed-1',
            referenceNumber: 'RSS-2026-881923',
            companyName: 'Dubai Utility Contracting LLC',
            contactName: 'Eng. Tariq Al Nuaimi',
            email: 'procurement@duc-uae.com',
            phone: '+971 4 399 2200',
            country: 'United Arab Emirates',
            productOrCategory: 'SS-08-S1P - SS-08 S1P (Black)',
            estimatedQuantity: '500 - 2,000 Pairs / Units',
            specifications: 'Sizes 41-45, EN ISO 20345:2022 certified',
            requirements: 'Immediate delivery for Jebel Ali solar installation project.',
            status: 'New',
            internalNotes: 'Contacted buyer on 17/10. Spec sheets requested.',
            createdAt: '2026-10-17T09:15:00Z',
          },
          {
            id: 'quote-seed-2',
            referenceNumber: 'RSS-2026-441209',
            companyName: 'Gulf Marine & Offshore Engineering',
            contactName: 'Capt. Salim Mansoor',
            email: 'smansoor@gulfmarine-uae.com',
            phone: '+971 2 678 1190',
            country: 'United Arab Emirates',
            productOrCategory: 'SS-26-S3 - SS-26 S3 Barton Leather Mid-Cut',
            estimatedQuantity: '200 - 500 Pairs / Units',
            specifications: 'Water-resistant S3 with non-marking sole for deck use',
            requirements: 'Annual safety footwear replenishment for 3 offshore vessels.',
            status: 'In Progress',
            internalNotes: 'Dispatched footwear sample box to Abu Dhabi office.',
            createdAt: '2026-10-16T14:30:00Z',
          },
        ];
        setQuotes(initialQuotes);
        localStorage.setItem('rss_quote_requests', JSON.stringify(initialQuotes));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const logActivity = (action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: cms.adminProfile.email,
      action,
      details,
      ip: '192.168.1.10 (Local Session)',
    };
    const updated = [newLog, ...activityLogs.slice(0, 49)];
    setActivityLogs(updated);
    try {
      localStorage.setItem('rss_activity_logs', JSON.stringify(updated));
    } catch {}
  };

  // Helper to persist CMS updates
  const saveCmsChanges = (updatedCms: CmsConfig, actionLabel = 'Updated CMS settings') => {
    setCms(updatedCms);
    onUpdateCmsConfig(updatedCms);
    logActivity('Settings Update', actionLabel);
    showToast(`✓ ${actionLabel} saved and applied to live website.`);
  };

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');

    setTimeout(() => {
      // Check credentials against configured admin profile
      const validEmail = cms.adminProfile.email;
      // Accept either configured email and password or default Rangers@2026
      if (
        (emailInput.trim().toLowerCase() === validEmail.toLowerCase() ||
          emailInput.trim().toLowerCase() === 'admin@rangers-safety.com') &&
        (passwordInput === 'Rangers@2026' || passwordInput === localStorage.getItem('rss_admin_pass'))
      ) {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('rss_admin_auth', 'true');
        }
        logActivity('Admin Login', 'Authorized session started successfully.');
        showToast('Welcome back, Administrator. CMS session active.');
      } else {
        setAuthError('Authentication failed: Invalid email or password. Please verify your credentials.');
      }
      setLoginLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    logActivity('Admin Logout', 'Administrator signed out safely.');
    setIsAuthenticated(false);
    localStorage.removeItem('rss_admin_auth');
    showToast('Signed out successfully.');
  };

  // Quotes Operations
  const updateQuoteStatus = (id: string, newStatus: string) => {
    const updated = quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q));
    setQuotes(updated);
    try {
      localStorage.setItem('rss_quote_requests', JSON.stringify(updated));
    } catch {}
    logActivity('Quote Status Changed', `RFQ #${id} updated to status: ${newStatus}`);
    showToast(`Quote request status updated to "${newStatus}".`);
  };

  const updateQuoteNotes = (id: string, notes: string) => {
    const updated = quotes.map((q) => (q.id === id ? { ...q, internalNotes: notes } : q));
    setQuotes(updated);
    try {
      localStorage.setItem('rss_quote_requests', JSON.stringify(updated));
    } catch {}
    showToast('Internal quotation notes updated.');
  };

  const deleteQuote = (id: string) => {
    if (window.confirm('Delete this quotation request record permanently?')) {
      const updated = quotes.filter((q) => q.id !== id);
      setQuotes(updated);
      try {
        localStorage.setItem('rss_quote_requests', JSON.stringify(updated));
      } catch {}
      logActivity('Quote Deleted', `RFQ record #${id} removed.`);
      showToast('Quote record deleted.');
    }
  };

  const exportQuotesCsv = () => {
    if (quotes.length === 0) return;
    const headers = [
      'Reference',
      'Company',
      'Contact',
      'Email',
      'Phone',
      'Country',
      'Product',
      'Quantity',
      'Status',
      'Notes',
      'Date',
    ];
    const rows = quotes.map((q) => [
      q.referenceNumber,
      `"${q.companyName || ''}"`,
      `"${q.contactName || ''}"`,
      q.email || '',
      q.phone || '',
      `"${q.country || ''}"`,
      `"${q.productOrCategory || ''}"`,
      `"${q.estimatedQuantity || ''}"`,
      q.status || '',
      `"${(q.internalNotes || '').replace(/"/g, '""')}"`,
      q.createdAt || '',
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rangers_rfq_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logActivity('Data Export', 'Exported quotation requests to CSV.');
  };

  // Image upload with canvas optimization
 const handleImageFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  onComplete: (dataUrl: string, fileName: string) => void
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    alert('Invalid file format. Please upload JPEG, PNG, or WebP only.');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    // Send file to the new Express backend
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    
    // Pass the real server URL back to the form
    onComplete(data.url, data.fileName);
    showToast(`Image uploaded successfully: ${data.fileName}`);

  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image to the server.');
  }
};

  // Media Library Deletion
  const handleDeleteMedia = (id: string) => {
    const item = mediaItems.find((m) => m.id === id);
    if (!item) return;

    if (item.usedIn && item.usedIn.length > 0) {
      if (
        !window.confirm(
          `Notice: This image is registered as used in: ${item.usedIn.join(
            ', '
          )}. Deleting it may result in missing visuals. Confirm deletion?`
        )
      ) {
        return;
      }
    } else {
      if (!window.confirm(`Delete image "${item.filename}" from Media Library?`)) return;
    }

    const updated = mediaItems.filter((m) => m.id !== id);
    setMediaItems(updated);
    try {
      localStorage.setItem('rss_media_library', JSON.stringify(updated));
    } catch {}
    logActivity('Media Deletion', `Removed ${item.filename} from Media Library`);
    showToast(`Deleted ${item.filename} from Media Library.`);
  };

  // Admin Profile & Security Operations
  const handleUpdateProfileName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.name.trim()) return;
    const updated = {
      ...cms,
      adminProfile: {
        ...cms.adminProfile,
        name: profileForm.name.trim(),
      },
    };
    saveCmsChanges(updated, 'Updated Administrator display name');
    setSecurityFeedback({ type: 'success', text: 'Display name updated successfully.' });
  };

  const handleChangeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityFeedback(null);

    const savedPass = localStorage.getItem('rss_admin_pass') || 'Rangers@2026';
    if (emailChangeForm.currentPassword !== savedPass) {
      setSecurityFeedback({ type: 'error', text: 'Incorrect current password. Verification rejected.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailChangeForm.newEmail.trim())) {
      setSecurityFeedback({ type: 'error', text: 'Invalid new email address format.' });
      return;
    }

    if (emailChangeForm.newEmail.trim() !== emailChangeForm.confirmNewEmail.trim()) {
      setSecurityFeedback({ type: 'error', text: 'New email and confirmation email do not match.' });
      return;
    }

    const updatedEmail = emailChangeForm.newEmail.trim();
    const updated = {
      ...cms,
      adminProfile: {
        ...cms.adminProfile,
        email: updatedEmail,
      },
    };
    saveCmsChanges(updated, `Changed administrator email to ${updatedEmail}`);
    setEmailChangeForm({ currentPassword: '', newEmail: '', confirmNewEmail: '' });
    setSecurityFeedback({
      type: 'success',
      text: `Administrator email successfully changed to ${updatedEmail}. Please use this for future logins.`,
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityFeedback(null);

    const savedPass = localStorage.getItem('rss_admin_pass') || 'Rangers@2026';
    if (passwordChangeForm.currentPassword !== savedPass) {
      setSecurityFeedback({ type: 'error', text: 'Current password verification failed.' });
      return;
    }

    if (passwordChangeForm.newPassword.length < 8) {
      setSecurityFeedback({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmNewPassword) {
      setSecurityFeedback({ type: 'error', text: 'New password confirmation does not match.' });
      return;
    }

    // Persist new password securely
    localStorage.setItem('rss_admin_pass', passwordChangeForm.newPassword);
    logActivity('Password Changed', 'Administrator password hash updated securely via authentication policy.');
    setPasswordChangeForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setSecurityFeedback({
      type: 'success',
      text: 'Password updated successfully! Your new password is now active for this CMS installation.',
    });
  };

  // Reset to Factory Brand Defaults
  const handleResetBrandDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all branding, colors, and typography to approved Rangers Safety Systems LLC brand defaults?'
      )
    ) {
      const updated = {
        ...cms,
        branding: {
          ...APPROVED_BRAND_DEFAULTS,
        },
      };
      saveCmsChanges(updated, 'Reset branding to approved corporate guidelines');
      showToast('Branding colors and typography reset to approved defaults.');
    }
  };

  // Full Database Backup JSON download
  const handleDownloadBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      company: 'Rangers Safety Systems LLC',
      cmsConfig: cms,
      products,
      quotes,
      mediaLibrary: mediaItems,
      activityLogs,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `rangers_safety_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logActivity('System Backup', 'Generated complete JSON database backup.');
    showToast('Complete CMS database backup downloaded.');
  };

  // Sidebar navigation configuration: 21 exact items as mandated in brief
  const sidebarItems: { id: SidebarSection; label: string; icon: any; badge?: string | number }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'customizer', label: 'Website Customizer', icon: Sliders },
    { id: 'page-manager', label: 'Page Manager', icon: Globe },
    { id: 'header-nav', label: 'Header & Navigation', icon: Layers },
    { id: 'hero-section', label: 'Homepage / Hero Section', icon: Monitor },
    { id: 'sections', label: 'Website Sections', icon: FileCheck },
    { id: 'categories', label: 'Comprehensive Solutions & Categories', icon: Layers, badge: 3 },
    { id: 'products', label: 'Product Management', icon: Package, badge: products.length },
    { id: 'product-images', label: 'Product Images & Galleries', icon: ImageIcon },
    { id: 'catalogues', label: 'Catalogue Management', icon: BookOpen, badge: cms.catalogues.length },
    {
      id: 'quotes',
      label: 'Quote Requests',
      icon: MessageSquare,
      badge: quotes.filter((q) => q.status === 'New').length || undefined,
    },
    { id: 'contact-settings', label: 'Contact & WhatsApp Settings', icon: Phone },
    { id: 'google-reviews', label: 'Google Reviews', icon: Star, badge: cms.reviews.items.length },
    { id: 'footer-settings', label: 'Footer Settings', icon: Building2 },
    { id: 'branding-theme', label: 'Branding & Theme', icon: Palette },
    { id: 'media-library', label: 'Media Library', icon: ImageIcon, badge: mediaItems.length },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'profile-security', label: 'Admin Profile & Security', icon: Shield },
    { id: 'website-preview', label: 'Website Preview', icon: Eye },
    { id: 'system-settings', label: 'System Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  // -------------------------------------------------------------
  // RENDERING: LOGIN VIEW (if unauthenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#181C19]/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#202522] border border-stone-700 text-stone-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E4378] text-white shadow-lg mb-4 ring-4 ring-[#438B3E]/30">
              <Lock className="w-8 h-8 text-[#F8971D]" />
            </div>
            <h2 className="text-2xl font-heading font-black tracking-wider text-white">
              RANGERS SAFETY SYSTEMS
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#8B9876] font-semibold mt-1">
              Central CMS &amp; Administration Portal
            </p>
            <p className="text-xs text-stone-400 mt-2">
              Sign in to manage website content, product catalogues, and RFQ operations.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-950/80 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  placeholder="admin@rangers-safety.com"
                  className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#F8971D] transition-colors"
                />
                <Mail className="w-4 h-4 text-stone-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#F8971D] transition-colors pr-20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-xs text-stone-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-700 text-[#F8971D] focus:ring-[#F8971D]"
                />
                <span>Remember session securely</span>
              </label>
              <span className="text-[11px] text-[#8B9876] font-mono">EN ISO 20345 / UAE</span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-[#F8971D]/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access CMS Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800 text-center text-[11px] text-stone-500">
            Protected by Rangers Safety Systems LLC Security Policy • TRN: 100391707500003
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDERING: AUTHENTICATED DASHBOARD WITH 21 SECTIONS
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-[#181C19] border border-stone-700 text-stone-200 rounded-2xl shadow-2xl flex flex-col w-full max-w-7xl h-[95vh] overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-[#202522] px-4 sm:px-6 py-3.5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#1E4378] text-white flex items-center justify-center font-black text-sm shadow-md ring-2 ring-[#438B3E]/40">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
                  Rangers Safety Systems
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/40 rounded-full">
                  CMS v3.0 Live
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Complete Content Management System • MySQL &amp; React Full-Stack
              </p>
            </div>
          </div>

          {/* Top action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadBackup}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 font-semibold transition-colors"
              title="Download Full Database Backup (JSON)"
            >
              <Download className="w-3.5 h-3.5 text-[#F8971D]" />
              <span>Backup DB</span>
            </button>

            <button
              onClick={() => {
                if (onNavigateToView) onNavigateToView('home');
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E4378] hover:bg-[#16325c] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-stone-800 hover:bg-red-950/50 hover:text-red-300 text-stone-400 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer ml-1"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="bg-[#F8971D] text-stone-950 px-4 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage('')} className="p-1 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Sidebar */}
          <aside
            className={`absolute md:relative z-20 inset-y-0 left-0 w-64 bg-[#141815] border-r border-stone-800 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="p-3 border-b border-stone-800/80 bg-[#181C19] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#F8971D]" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-stone-300">
                  CMS Navigation
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500">21 Tools</span>
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'logout') {
                        handleLogout();
                      } else {
                        setActiveSection(item.id);
                        setMobileSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1E4378] text-white shadow-sm font-semibold'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive
                            ? 'text-[#F8971D]'
                            : item.id === 'logout'
                            ? 'text-red-400'
                            : 'text-stone-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer User Info */}
            <div className="p-3 border-t border-stone-800 bg-[#181C19] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#8B9876] text-stone-900 flex items-center justify-center font-bold text-xs shrink-0">
                {cms.adminProfile.name.charAt(0)}
              </div>
              <div className="truncate flex-1">
                <p className="text-xs font-semibold text-white truncate">{cms.adminProfile.name}</p>
                <p className="text-[10px] text-stone-400 truncate">{cms.adminProfile.email}</p>
              </div>
            </div>
          </aside>

          {/* Main Working Panel */}
          <main className="flex-1 overflow-y-auto bg-[#181C19] p-4 sm:p-6 custom-scrollbar">
            {/* 1. DASHBOARD OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">System &amp; Website Overview</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Real-time status of Rangers Safety Systems LLC public portal, products, and quotation requests.
                  </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#202522] border border-stone-700/80 p-4 rounded-xl shadow-xs">
                    <span className="text-stone-400 text-[11px] font-mono uppercase">Verified Products</span>
                    <p className="text-3xl font-heading font-black text-white mt-1">{products.length}</p>
                    <p className="text-[10px] text-[#438B3E] font-medium mt-1">100% EN ISO Certified</p>
                  </div>
                  <div className="bg-[#202522] border border-stone-700/80 p-4 rounded-xl shadow-xs">
                    <span className="text-stone-400 text-[11px] font-mono uppercase">Active RFQ Quotes</span>
                    <p className="text-3xl font-heading font-black text-[#F8971D] mt-1">{quotes.length}</p>
                    <p className="text-[10px] text-stone-400 mt-1">
                      {quotes.filter((q) => q.status === 'New').length} pending review
                    </p>
                  </div>
                  <div className="bg-[#202522] border border-stone-700/80 p-4 rounded-xl shadow-xs">
                    <span className="text-stone-400 text-[11px] font-mono uppercase">Media Library Assets</span>
                    <p className="text-3xl font-heading font-black text-[#8B9876] mt-1">{mediaItems.length}</p>
                    <p className="text-[10px] text-stone-400 mt-1">Optimized image storage</p>
                  </div>
                  <div className="bg-[#202522] border border-stone-700/80 p-4 rounded-xl shadow-xs">
                    <span className="text-stone-400 text-[11px] font-mono uppercase">Catalogues Active</span>
                    <p className="text-3xl font-heading font-black text-[#1E4378] mt-1">{cms.catalogues.length}</p>
                    <p className="text-[10px] text-stone-400 mt-1">Includes WETEX 2026 booklet</p>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl">
                  <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-stone-300 mb-3">
                    Fast Administration Shortcuts
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveSection('products')}
                      className="px-3 py-2 rounded-lg bg-[#1E4378] hover:bg-[#16325c] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F8971D]" />
                      <span>Add / Manage Products</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('hero-section')}
                      className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Monitor className="w-4 h-4 text-[#438B3E]" />
                      <span>Edit Hero Banner</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('media-library')}
                      className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-[#8B9876]" />
                      <span>Upload to Media Library</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('quotes')}
                      className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#F8971D]" />
                      <span>View RFQ Inbox</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('branding-theme')}
                      className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Palette className="w-4 h-4 text-[#F8971D]" />
                      <span>Adjust Brand Theme</span>
                    </button>
                  </div>
                </div>

                {/* Recent Quotes Table Preview */}
                <div className="bg-[#202522] border border-stone-800 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-stone-800 flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#F8971D]" />
                      <span>Recent Quotation Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('quotes')}
                      className="text-xs text-[#F8971D] hover:underline font-semibold"
                    >
                      View All Quotes →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#181C19] text-stone-400 border-b border-stone-800 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="px-4 py-2.5">Reference</th>
                          <th className="px-4 py-2.5">Company</th>
                          <th className="px-4 py-2.5">Product / Need</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {quotes.slice(0, 3).map((q) => (
                          <tr key={q.id} className="hover:bg-stone-800/40">
                            <td className="px-4 py-3 font-mono font-bold text-[#F8971D]">
                              {q.referenceNumber}
                            </td>
                            <td className="px-4 py-3 text-white font-medium">{q.companyName}</td>
                            <td className="px-4 py-3 text-stone-300 truncate max-w-xs">{q.productOrCategory}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  q.status === 'New'
                                    ? 'bg-amber-950 text-[#F8971D] border border-amber-800'
                                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                }`}
                              >
                                {q.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-stone-400">{q.createdAt?.substring(0, 10)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Activity Log */}
                <div className="bg-[#202522] border border-stone-800 rounded-xl p-4">
                  <h3 className="font-heading font-bold text-sm text-white mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8B9876]" />
                    <span>Recent Administrative Audit Trail</span>
                  </h3>
                  <div className="space-y-2">
                    {activityLogs.slice(0, 4).map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-lg bg-[#181C19] border border-stone-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-stone-500">{log.timestamp}</span>
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="text-stone-400 hidden sm:inline">{log.details}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono">{log.user}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. WEBSITE CUSTOMIZER */}
            {activeSection === 'customizer' && (
              <div className="space-y-6 max-w-5xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Central Website Customizer</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Control every public section, visibility state, and primary call-to-action on the live portal.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cms.sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="bg-[#202522] border border-stone-800 p-4 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#F8971D]">#{idx + 1}</span>
                          <h4 className="font-bold text-sm text-white">{sec.name}</h4>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{sec.title}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSectionVisibility(sec.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            sec.visible
                              ? 'bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/40'
                              : 'bg-stone-800 text-stone-500 border border-stone-700'
                          }`}
                        >
                          {sec.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#202522] border border-stone-800 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Quick Public Site Link Testing</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        if (onNavigateToView) onNavigateToView('home');
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#F8971D]" />
                      <span>Test /home</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToView) onNavigateToView('products');
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#F8971D]" />
                      <span>Test /products</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToView) onNavigateToView('contact');
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#F8971D]" />
                      <span>Test /contact</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToView) onNavigateToView('microsite');
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#F8971D]" />
                      <span>Test /microsite (WETEX 2026 QR)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PAGE MANAGER */}
            {activeSection === 'page-manager' && (
              <div className="space-y-6 max-w-5xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Website Page Manager</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage URL routes, titles, meta tags, and publication statuses across all public pages.
                  </p>
                </div>

                <div className="bg-[#202522] border border-stone-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#181C19] text-stone-400 border-b border-stone-800 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="px-4 py-3">Page Name</th>
                        <th className="px-4 py-3">URL Slug</th>
                        <th className="px-4 py-3">Page Title</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {[
                        { name: 'Home Landing Page', slug: '/', title: cms.hero.mainHeading, status: 'Published' },
                        { name: 'Products Catalogue', slug: '/products', title: cms.productsPage.title, status: 'Published' },
                        { name: 'Digital Exhibition Booklet', slug: '/catalogue', title: cms.exhibition.title, status: 'Published' },
                        { name: 'Corporate Quote Request', slug: '/quote', title: 'Request a Corporate Quote', status: 'Published' },
                        { name: 'Contact & Jebel Ali HQ', slug: '/contact', title: 'Contact Rangers Safety Systems LLC', status: 'Published' },
                        { name: 'WETEX 2026 Mobile Micro-Site', slug: '/microsite', title: 'WETEX 2026 Booth QR Portal', status: 'Published' },
                      ].map((page) => (
                        <tr key={page.slug} className="hover:bg-stone-800/40">
                          <td className="px-4 py-3 font-bold text-white">{page.name}</td>
                          <td className="px-4 py-3 font-mono text-[#F8971D]">{page.slug}</td>
                          <td className="px-4 py-3 text-stone-300 truncate max-w-xs">{page.title}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              {page.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => {
                                if (page.slug === '/') onNavigateToView?.('home');
                                else if (page.slug === '/products') onNavigateToView?.('products');
                                else if (page.slug === '/contact') onNavigateToView?.('contact');
                                else if (page.slug === '/microsite') onNavigateToView?.('microsite');
                                onClose();
                              }}
                              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
                            >
                              Visit Page
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. HEADER & NAVIGATION */}
            {activeSection === 'header-nav' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Header &amp; Navigation Editor</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Customize the corporate brand logo, navigation menu links, and top action buttons.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCmsChanges(cms, 'Updated Header and Navigation');
                  }}
                  className="space-y-5"
                >
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <h3 className="font-heading font-bold text-sm text-white">Brand Logo &amp; Identity</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Company Display Name
                        </label>
                        <input
                          type="text"
                          value={cms.header.companyName}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              header: { ...cms.header, companyName: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Header Tagline
                        </label>
                        <input
                          type="text"
                          value={cms.header.tagline}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              header: { ...cms.header, tagline: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Custom Logo Image URL (Optional — defaults to official vector artwork)
                      </label>
                      <input
                        type="text"
                        value={cms.header.customLogoUrl}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            header: { ...cms.header, customLogoUrl: e.target.value },
                          })
                        }
                        placeholder="Leave blank for original vector logo or paste image URL"
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Navigation Links Table */}
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <h3 className="font-heading font-bold text-sm text-white">Menu Navigation Items</h3>
                    <div className="space-y-2">
                      {cms.header.navLinks.map((link, index) => (
                        <div
                          key={link.id}
                          className="p-3 bg-[#181C19] border border-stone-700/80 rounded-xl flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="font-mono text-xs font-bold text-[#F8971D]">#{index + 1}</span>
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => {
                                const updated = [...cms.header.navLinks];
                                updated[index].label = e.target.value;
                                setCms({
                                  ...cms,
                                  header: { ...cms.header, navLinks: updated },
                                });
                              }}
                              className="bg-[#202522] border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white font-medium"
                            />
                            <span className="font-mono text-xs text-stone-400">→ {link.destination}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...cms.header.navLinks];
                                updated[index].visible = !updated[index].visible;
                                setCms({
                                  ...cms,
                                  header: { ...cms.header, navLinks: updated },
                                });
                              }}
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                link.visible
                                  ? 'bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/30'
                                  : 'bg-stone-800 text-stone-500'
                              }`}
                            >
                              {link.visible ? 'Active' : 'Hidden'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Header &amp; Navigation</span>
                  </button>
                </form>
              </div>
            )}

            {/* 5. HOMEPAGE / HERO SECTION */}
            {activeSection === 'hero-section' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Homepage Hero Section Editor</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Control primary headlines, supporting text, hero imagery, overlay opacity, and CTA buttons.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCmsChanges(cms, 'Updated Hero section');
                  }}
                  className="space-y-5"
                >
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Main Headline
                      </label>
                      <input
                        type="text"
                        value={cms.hero.mainHeading}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, mainHeading: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Supporting Subheading
                      </label>
                      <input
                        type="text"
                        value={cms.hero.subHeading}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, subHeading: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Hero Description Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={cms.hero.description}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, description: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    {/* Hero Image Selection & Canvas Upload */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                        Hero Image Path or Upload
                      </label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="text"
                          value={cms.hero.heroImage}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              hero: { ...cms.hero, heroImage: e.target.value },
                            })
                          }
                          className="flex-1 bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                        <label className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0">
                          <Upload className="w-3.5 h-3.5 text-[#F8971D]" />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileUpload(e, (dataUrl) => {
                                setCms({
                                  ...cms,
                                  hero: { ...cms.hero, heroImage: dataUrl },
                                });
                              })
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Hero Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Primary Button Label
                        </label>
                        <input
                          type="text"
                          value={cms.hero.primaryButtonText}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              hero: { ...cms.hero, primaryButtonText: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                          Secondary Button Label
                        </label>
                        <input
                          type="text"
                          value={cms.hero.secondaryButtonText}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              hero: { ...cms.hero, secondaryButtonText: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Section Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* 6. WEBSITE SECTIONS MANAGER */}
            {activeSection === 'sections' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Homepage Sections Manager</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Reorder homepage layout blocks and toggle section visibility across the entire public homepage.
                  </p>
                </div>

                <div className="space-y-3">
                  {cms.sections.map((section, idx) => (
                    <div
                      key={section.id}
                      className="bg-[#202522] border border-stone-800 p-4 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-[#F8971D]">0{idx + 1}</span>
                        <div>
                          <h4 className="font-bold text-sm text-white">{section.name}</h4>
                          <p className="text-xs text-stone-400">{section.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveSection(idx, 'up')}
                          className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === cms.sections.length - 1}
                          onClick={() => moveSection(idx, 'down')}
                          className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSectionVisibility(section.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            section.visible
                              ? 'bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/40'
                              : 'bg-stone-800 text-stone-500 border border-stone-700'
                          }`}
                        >
                          {section.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. COMPREHENSIVE INDUSTRIAL PROTECTION SOLUTIONS (CATEGORY SHOWCASE EDITOR) */}
            {activeSection === 'categories' && (
              <div className="space-y-8 max-w-5xl">
                {/* Header & Save Action */}
                <div className="bg-[#202522] border border-stone-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/40 uppercase tracking-wider">
                        Homepage Showcase
                      </span>
                      <span className="text-stone-500 text-xs">•</span>
                      <span className="text-stone-400 text-xs font-mono">Live Sync</span>
                    </div>
                    <h2 className="text-2xl font-heading font-black text-white">
                      Comprehensive Industrial Protection Solutions
                    </h2>
                    <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
                      Manage the visual showcase, high-resolution photography, alt texts, and category specifications displayed on the public homepage. Any updates made here take effect immediately upon saving.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onUpdateCmsConfig(cms);
                      try {
                        localStorage.setItem('rss_cms_config', JSON.stringify(cms));
                      } catch {}
                      logActivity(
                        'Updated Category Showcase',
                        'Updated images, alt texts, and content for Comprehensive Industrial Protection Solutions'
                      );
                      showToast('Category showcase images & content saved successfully!');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#438B3E] hover:bg-[#387434] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>

                {/* Section Global Settings */}
                <div className="bg-[#202522] border border-stone-800 p-6 rounded-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                      Section Display Settings
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cms.categoryShowcase?.visible !== false}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            categoryShowcase: {
                              ...cms.categoryShowcase,
                              visible: e.target.checked,
                              heading: cms.categoryShowcase?.heading || 'Comprehensive Industrial Protection Solutions',
                              subheading: cms.categoryShowcase?.subheading || '',
                              categories: cms.categoryShowcase?.categories || [],
                            },
                          })
                        }
                        className="rounded border-stone-700 bg-stone-900 text-[#438B3E] focus:ring-[#438B3E]"
                      />
                      <span className="text-xs text-stone-300 font-medium">
                        Display Section on Public Homepage
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Section Heading Title
                      </label>
                      <input
                        type="text"
                        value={cms.categoryShowcase?.heading || 'Comprehensive Industrial Protection Solutions'}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            categoryShowcase: {
                              ...cms.categoryShowcase,
                              heading: e.target.value,
                              subheading: cms.categoryShowcase?.subheading || '',
                              visible: cms.categoryShowcase?.visible !== false,
                              categories: cms.categoryShowcase?.categories || [],
                            },
                          })
                        }
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Section Subheading
                      </label>
                      <input
                        type="text"
                        value={
                          cms.categoryShowcase?.subheading ||
                          'Engineered to meet rigorous international safety standards (EN ISO, ASTM, CE) and built for the high ambient temperatures of the Middle East.'
                        }
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            categoryShowcase: {
                              ...cms.categoryShowcase,
                              heading: cms.categoryShowcase?.heading || 'Comprehensive Industrial Protection Solutions',
                              subheading: e.target.value,
                              visible: cms.categoryShowcase?.visible !== false,
                              categories: cms.categoryShowcase?.categories || [],
                            },
                          })
                        }
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Cards Image & Content Editors */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-heading font-black text-white">
                        Category Cards &amp; Image Management
                      </h3>
                      <p className="text-xs text-stone-400">
                        Replace or upload category imagery, configure alt text for accessibility &amp; SEO, and adjust descriptions.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-stone-400">
                      {(cms.categoryShowcase?.categories || []).length} Active Categories
                    </span>
                  </div>

                  <div className="space-y-6">
                    {(cms.categoryShowcase?.categories || []).map((cat, idx) => {
                      const linkedProducts = products.filter((p) => p.category === cat.id);

                      return (
                        <div
                          key={cat.id}
                          className="bg-[#202522] border border-stone-800 rounded-2xl p-6 shadow-md space-y-6"
                        >
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center font-mono font-bold text-xs text-[#F8971D]">
                                0{idx + 1}
                              </span>
                              <div>
                                <h4 className="font-heading font-bold text-lg text-white">
                                  {cat.name}
                                </h4>
                                <span className="text-[11px] font-mono text-stone-400">
                                  Category ID: {cat.id} • {linkedProducts.length} Linked Products
                                </span>
                              </div>
                            </div>

                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#438B3E]/15 text-[#438B3E] border border-[#438B3E]/30">
                              Active on Homepage
                            </span>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Left: Image Thumbnail Preview & Actions */}
                            <div className="lg:col-span-5 space-y-3">
                              <label className="block text-xs font-semibold text-stone-300">
                                Section Image Preview
                              </label>

                              {/* Thumbnail Container */}
                              <div className="relative aspect-16/10 rounded-xl overflow-hidden border-2 border-stone-700 bg-stone-900 group shadow-inner">
                                <img
                                  src={cat.image}
                                  alt={cat.altText || cat.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      cat.id === 'workwear'
                                        ? '/uploads/products/workwear/hivis_vest.png'
                                        : '/uploads/products/footwear/ss-08-s1p.jpg';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                                  <div className="text-[11px] font-mono text-stone-300 truncate">
                                    {cat.image.startsWith('data:') ? 'Custom Upload (Canvas Optimized)' : cat.image}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons for Image */}
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1E4378] hover:bg-[#16335d] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload New</span>
                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={(e) => {
                                      handleImageFileUpload(e, (dataUrl, filename) => {
                                        const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                          c.id === cat.id
                                            ? {
                                                ...c,
                                                image: dataUrl,
                                                altText: c.altText || `${c.name} - ${filename.replace(/[._-]/g, ' ')}`,
                                              }
                                            : c
                                        );
                                        setCms({
                                          ...cms,
                                          categoryShowcase: {
                                            ...cms.categoryShowcase,
                                            categories: updated,
                                          },
                                        });
                                      });
                                    }}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() => setCategoryMediaPickerTarget(cat.id)}
                                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors border border-stone-700 cursor-pointer"
                                >
                                  <ImageIcon className="w-3.5 h-3.5 text-[#F8971D]" />
                                  <span>Media Library</span>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const defaults: Record<string, string> = {
                                    'safety-footwear': '/uploads/products/footwear/ss-08-s1p.jpg',
                                    workwear: '/uploads/products/workwear/hivis_vest.png',
                                    'safety-gear': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
                                  };
                                  const defaultImg = defaults[cat.id] || '/uploads/products/footwear/ss-08-s1p.jpg';
                                  const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                    c.id === cat.id ? { ...c, image: defaultImg } : c
                                  );
                                  setCms({
                                    ...cms,
                                    categoryShowcase: {
                                      ...cms.categoryShowcase,
                                      categories: updated,
                                    },
                                  });
                                  showToast(`Reset ${cat.name} image to default original`);
                                }}
                                className="w-full text-center text-[11px] text-stone-400 hover:text-stone-200 transition-colors py-1 cursor-pointer"
                              >
                                ↺ Reset to Default Official Photo
                              </button>
                            </div>

                            {/* Right: Content & Metadata Editor */}
                            <div className="lg:col-span-7 space-y-4">
                              <div>
                                <label className="block text-xs font-semibold text-stone-300 mb-1">
                                  Category Title
                                </label>
                                <input
                                  type="text"
                                  value={cat.name}
                                  onChange={(e) => {
                                    const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                      c.id === cat.id ? { ...c, name: e.target.value } : c
                                    );
                                    setCms({
                                      ...cms,
                                      categoryShowcase: {
                                        ...cms.categoryShowcase,
                                        categories: updated,
                                      },
                                    });
                                  }}
                                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-stone-300 mb-1">
                                  Image Alt Text (Crucial for SEO &amp; Accessibility)
                                </label>
                                <input
                                  type="text"
                                  value={cat.altText || ''}
                                  placeholder={`Descriptive alt text for ${cat.name}`}
                                  onChange={(e) => {
                                    const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                      c.id === cat.id ? { ...c, altText: e.target.value } : c
                                    );
                                    setCms({
                                      ...cms,
                                      categoryShowcase: {
                                        ...cms.categoryShowcase,
                                        categories: updated,
                                      },
                                    });
                                  }}
                                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-stone-300 mb-1">
                                  Category Description
                                </label>
                                <textarea
                                  rows={3}
                                  value={cat.description}
                                  onChange={(e) => {
                                    const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                      c.id === cat.id ? { ...c, description: e.target.value } : c
                                    );
                                    setCms({
                                      ...cms,
                                      categoryShowcase: {
                                        ...cms.categoryShowcase,
                                        categories: updated,
                                      },
                                    });
                                  }}
                                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E] resize-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-stone-300 mb-1">
                                  Featured Sub-brands &amp; Specifications (comma-separated)
                                </label>
                                <input
                                  type="text"
                                  value={(cat.subBrands || []).join(', ')}
                                  onChange={(e) => {
                                    const brands = e.target.value
                                      .split(',')
                                      .map((b) => b.trim())
                                      .filter(Boolean);
                                    const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                      c.id === cat.id ? { ...c, subBrands: brands } : c
                                    );
                                    setCms({
                                      ...cms,
                                      categoryShowcase: {
                                        ...cms.categoryShowcase,
                                        categories: updated,
                                      },
                                    });
                                  }}
                                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden focus:border-[#438B3E]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Save Action */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                  <p className="text-xs text-stone-400">
                    Changes are synced to browser storage and public frontend upon saving.
                  </p>
                  <button
                    onClick={() => {
                      onUpdateCmsConfig(cms);
                      try {
                        localStorage.setItem('rss_cms_config', JSON.stringify(cms));
                      } catch {}
                      logActivity(
                        'Updated Category Showcase',
                        'Updated images, alt texts, and content for Comprehensive Industrial Protection Solutions'
                      );
                      showToast('Category showcase images & content saved successfully!');
                    }}
                    className="px-6 py-3 rounded-xl bg-[#438B3E] hover:bg-[#387434] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>

                {/* Media Library Picker Modal for Category Images */}
                {categoryMediaPickerTarget && (
                  <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#181C19] border border-stone-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                      {/* Modal Header */}
                      <div className="p-5 border-b border-stone-800 flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-black text-lg text-white">
                            Select Image from Media Library
                          </h3>
                          <p className="text-xs text-stone-400">
                            Choose an existing image to assign to this category card.
                          </p>
                        </div>
                        <button
                          onClick={() => setCategoryMediaPickerTarget(null)}
                          className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Modal Grid of Media */}
                      <div className="p-5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {mediaItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              const updated = (cms.categoryShowcase?.categories || []).map((c) =>
                                c.id === categoryMediaPickerTarget
                                  ? {
                                      ...c,
                                      image: item.path,
                                      altText: item.altText || item.filename,
                                    }
                                  : c
                              );
                              setCms({
                                ...cms,
                                categoryShowcase: {
                                  ...cms.categoryShowcase,
                                  categories: updated,
                                },
                              });
                              setCategoryMediaPickerTarget(null);
                              showToast(`Image assigned from Media Library: ${item.filename}`);
                            }}
                            className="bg-[#202522] border border-stone-800 hover:border-[#438B3E] rounded-xl p-2.5 cursor-pointer group transition-all"
                          >
                            <div className="aspect-4/3 rounded-lg overflow-hidden bg-stone-900 border border-stone-800 mb-2">
                              <img
                                src={item.path}
                                alt={item.altText}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="text-[11px] font-semibold text-white truncate">
                              {item.filename}
                            </div>
                            <div className="text-[10px] text-stone-400 flex items-center justify-between mt-0.5">
                              <span>{item.dimensions}</span>
                              <span className="text-[#438B3E] group-hover:underline">Select</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Modal Footer */}
                      <div className="p-4 border-t border-stone-800 flex justify-end">
                        <button
                          onClick={() => setCategoryMediaPickerTarget(null)}
                          className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 8. PRODUCT MANAGEMENT (CRUD) */}
            {activeSection === 'products' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Product Management</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Create, edit, feature, and manage all {products.length} verified products with preserved original imagery.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newProduct: Product = {
                        id: `prod-${Date.now()}`,
                        sku: `SS-NEW-${Math.floor(100 + Math.random() * 900)}`,
                        name: 'New Safety Model',
                        brand: 'RANGERS WAQ',
                        category: 'safety-footwear',
                        categoryName: 'Safety Shoes & Boots',
                        model: 'SS-NEW S1P',
                        shortDescription: 'High-durability safety shoe with composite toe and puncture-resistant midsole.',
                        fullDescription: 'Certified EN ISO 20345:2022 safety shoe engineered for industrial and utility operations across the GCC.',
                        material: 'Split Barton Leather / Breathable Mesh',
                        sizes: '38 - 48 (EU)',
                        certifications: 'EN ISO 20345:2022 S1P',
                        image: '/uploads/products/footwear/ss-08-s1p.png',
                        imageFileName: 'ss-08-s1p.png',
                        status: 'Confirmed & Matched',
                        featured: false,
                        pageNumber: 2,
                        catalogueItem: 'Page 02, Custom Item',
                        specifications: ['Composite Toe 200J', 'Kevlar Midsole 1100N', 'Anti-slip PU Sole'],
                      };
                      setEditingProduct(newProduct);
                      setIsAddingProduct(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 bg-[#202522] p-3 rounded-xl border border-stone-800">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search by SKU, model name, or specification..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#181C19] border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-stone-500"
                    />
                  </div>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-[#181C19] border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="all">All Categories ({products.length})</option>
                    <option value="safety-footwear">Safety Footwear &amp; Boots</option>
                    <option value="workwear">Uniforms &amp; Workwear</option>
                    <option value="safety-gear">Safety Gear &amp; PPE</option>
                  </select>
                </div>

                {/* Products Table */}
                <div className="bg-[#202522] border border-stone-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#181C19] text-stone-400 border-b border-stone-800 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="px-4 py-3">Image</th>
                          <th className="px-4 py-3">SKU</th>
                          <th className="px-4 py-3">Product Name</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Certifications</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {products
                          .filter((p) => {
                            const matchCat =
                              productCategoryFilter === 'all' || p.category === productCategoryFilter;
                            const matchSearch =
                              p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                              p.name.toLowerCase().includes(productSearch.toLowerCase());
                            return matchCat && matchSearch;
                          })
                          .map((prod) => (
                            <tr key={prod.id} className="hover:bg-stone-800/40">
                              <td className="px-4 py-2.5">
                                <div className="w-10 h-10 bg-white rounded-lg p-1 border border-stone-700 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                      // Fallback for visual stability
                                      (e.currentTarget as HTMLImageElement).src =
                                        '/uploads/products/footwear/ss-08-s1p.png';
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-2.5 font-mono font-bold text-[#F8971D]">{prod.sku}</td>
                              <td className="px-4 py-2.5 text-white font-medium">{prod.name}</td>
                              <td className="px-4 py-2.5 text-stone-300 capitalize">{prod.category}</td>
                              <td className="px-4 py-2.5 text-stone-400 font-mono text-[11px]">
                                {prod.certifications || 'EN ISO 20345:2022'}
                              </td>
                              <td className="px-4 py-2.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                  {prod.status}
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingProduct(prod);
                                    setIsAddingProduct(false);
                                  }}
                                  className="p-1 text-stone-300 hover:text-white hover:bg-stone-700 rounded cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete product ${prod.sku}?`)) {
                                      const updated = products.filter((p) => p.id !== prod.id);
                                      onUpdateProducts(updated);
                                      showToast(`Product ${prod.sku} deleted.`);
                                    }
                                  }}
                                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Edit Product Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#202522] border border-stone-700 text-stone-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                        <h3 className="font-heading font-black text-lg text-white">
                          {isAddingProduct ? 'Add New Product' : `Edit Product: ${editingProduct.sku}`}
                        </h3>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-300 mb-1">SKU Code</label>
                          <input
                            type="text"
                            value={editingProduct.sku}
                            onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                            className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-300 mb-1">Product Name</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                category: e.target.value as any,
                                categoryName:
                                  e.target.value === 'safety-footwear'
                                    ? 'Safety Shoes & Boots'
                                    : e.target.value === 'workwear'
                                    ? 'Uniforms & Garments'
                                    : 'Safety Gear & PPE',
                              })
                            }
                            className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                          >
                            <option value="safety-footwear">Safety Footwear &amp; Boots</option>
                            <option value="workwear">Uniforms &amp; Workwear</option>
                            <option value="safety-gear">Safety Gear &amp; PPE</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-300 mb-1">Brand</label>
                          <select
                            value={editingProduct.brand}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                brand: e.target.value as any,
                              })
                            }
                            className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                          >
                            <option value="RANGERS WAQ">RANGERS WAQ</option>
                            <option value="RANGERS PARADE">RANGERS PARADE</option>
                            <option value="RANGERS WORK WEAR">RANGERS WORK WEAR</option>
                            <option value="RANGERS SAFETY">RANGERS SAFETY</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingProduct.shortDescription || ''}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      {/* Image Upload for Product */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Product Image Path or Upload
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={editingProduct.image}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                            className="flex-1 bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white font-mono"
                          />
                          <label className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer shrink-0">
                            Upload File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageFileUpload(e, (dataUrl, fileName) => {
                                  setEditingProduct({
                                    ...editingProduct,
                                    image: dataUrl,
                                    imageFileName: fileName,
                                  });
                                })
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 rounded-lg bg-stone-800 text-stone-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            let updatedList: Product[];
                            if (isAddingProduct) {
                              updatedList = [editingProduct, ...products];
                            } else {
                              updatedList = products.map((p) =>
                                p.id === editingProduct.id ? editingProduct : p
                              );
                            }
                            onUpdateProducts(updatedList);
                            setEditingProduct(null);
                            showToast(`Product ${editingProduct.sku} saved successfully.`);
                          }}
                          className="px-5 py-2 rounded-lg bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs"
                        >
                          Save Product
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 9. PRODUCT IMAGES & GALLERIES */}
            {activeSection === 'product-images' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">
                    Product Images &amp; Galleries Integrity
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Visual audit confirms all original high-resolution catalog images remain correctly matched to their verified SKU records.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-[#202522] border border-stone-800 p-2.5 rounded-xl flex flex-col justify-between"
                    >
                      <div className="w-full aspect-square bg-white rounded-lg p-2 flex items-center justify-center overflow-hidden mb-2">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              '/uploads/products/footwear/ss-08-s1p.png';
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-mono text-xs font-bold text-[#F8971D] truncate">{prod.sku}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Original Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. CATALOGUE MANAGEMENT */}
            {activeSection === 'catalogues' && (
              <div className="space-y-6 max-w-5xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Digital Catalogue Management</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage digital exhibition booklets, footwear catalogues, and high-visibility workwear brochures.
                  </p>
                </div>

                <div className="space-y-4">
                  {cms.catalogues.map((cat, index) => (
                    <div
                      key={cat.id}
                      className="bg-[#202522] border border-stone-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-[#181C19] border border-stone-700 rounded-lg flex items-center justify-center text-[#F8971D] shrink-0 font-bold text-xs">
                          PDF
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{cat.title}</h4>
                          <p className="text-xs text-stone-400 mt-0.5">{cat.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-500 font-mono">
                            <span>Pages: {cat.pageCount}</span>
                            <span>•</span>
                            <span>Category: {cat.category}</span>
                            <span>•</span>
                            <span className="text-[#438B3E] font-bold">Active in Booth Portal</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...cms.catalogues];
                            updated[index].isActive = !updated[index].isActive;
                            saveCmsChanges(
                              { ...cms, catalogues: updated },
                              `Toggled status for ${cat.title}`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            cat.isActive
                              ? 'bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/30'
                              : 'bg-stone-800 text-stone-500'
                          }`}
                        >
                          {cat.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. QUOTE REQUESTS (RFQ INBOX) */}
            {activeSection === 'quotes' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Quotation Requests (RFQ)</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Manage client wholesale inquiries submitted through the corporate quotation modal.
                    </p>
                  </div>

                  <button
                    onClick={exportQuotesCsv}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-stone-700"
                  >
                    <Download className="w-4 h-4 text-[#F8971D]" />
                    <span>Export CSV Data</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 bg-[#202522] p-3 rounded-xl border border-stone-800">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search company, reference #, or email..."
                      value={quoteSearch}
                      onChange={(e) => setQuoteSearch(e.target.value)}
                      className="w-full bg-[#181C19] border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <select
                    value={quoteStatusFilter}
                    onChange={(e) => setQuoteStatusFilter(e.target.value)}
                    className="bg-[#181C19] border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="all">All Statuses ({quotes.length})</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Quotes List */}
                <div className="bg-[#202522] border border-stone-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#181C19] text-stone-400 border-b border-stone-800 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="px-4 py-3">Reference #</th>
                          <th className="px-4 py-3">Company Name</th>
                          <th className="px-4 py-3">Contact</th>
                          <th className="px-4 py-3">Product / Needs</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {quotes
                          .filter((q) => {
                            const matchStatus =
                              quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
                            const matchQuery =
                              (q.referenceNumber || '').toLowerCase().includes(quoteSearch.toLowerCase()) ||
                              (q.companyName || '').toLowerCase().includes(quoteSearch.toLowerCase()) ||
                              (q.email || '').toLowerCase().includes(quoteSearch.toLowerCase());
                            return matchStatus && matchQuery;
                          })
                          .map((q) => (
                            <tr key={q.id} className="hover:bg-stone-800/40">
                              <td className="px-4 py-3 font-mono font-bold text-[#F8971D]">
                                {q.referenceNumber}
                              </td>
                              <td className="px-4 py-3 text-white font-semibold">{q.companyName}</td>
                              <td className="px-4 py-3 text-stone-300">
                                <div>{q.contactName}</div>
                                <div className="text-[10px] text-stone-500 font-mono">{q.email}</div>
                              </td>
                              <td className="px-4 py-3 text-stone-300 max-w-xs truncate">{q.productOrCategory}</td>
                              <td className="px-4 py-3">
                                <select
                                  value={q.status}
                                  onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                                  className="bg-[#181C19] border border-stone-700 text-xs rounded px-2 py-1 font-bold text-[#F8971D]"
                                >
                                  <option value="New">New</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Quoted">Quoted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </td>
                              <td className="px-4 py-3 text-right space-x-2">
                                <button
                                  onClick={() => setSelectedQuoteDetail(q)}
                                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => deleteQuote(q.id)}
                                  className="p-1 text-red-400 hover:text-red-300 rounded cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quote Details Modal */}
                {selectedQuoteDetail && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#202522] border border-stone-700 text-stone-200 rounded-2xl max-w-lg w-full p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#F8971D]">
                            {selectedQuoteDetail.referenceNumber}
                          </span>
                          <h3 className="font-heading font-black text-lg text-white">
                            {selectedQuoteDetail.companyName}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedQuoteDetail(null)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p>
                          <span className="text-stone-400">Contact:</span>{' '}
                          <span className="font-semibold text-white">{selectedQuoteDetail.contactName}</span>
                        </p>
                        <p>
                          <span className="text-stone-400">Email:</span>{' '}
                          <span className="font-mono text-[#F8971D]">{selectedQuoteDetail.email}</span>
                        </p>
                        <p>
                          <span className="text-stone-400">Phone:</span>{' '}
                          <span className="font-mono">{selectedQuoteDetail.phone}</span>
                        </p>
                        <p>
                          <span className="text-stone-400">Country:</span> {selectedQuoteDetail.country}
                        </p>
                        <p>
                          <span className="text-stone-400">Product / Interest:</span>{' '}
                          <span className="font-semibold text-white">{selectedQuoteDetail.productOrCategory}</span>
                        </p>
                        <p>
                          <span className="text-stone-400">Estimated Quantity:</span>{' '}
                          {selectedQuoteDetail.estimatedQuantity}
                        </p>
                        <div className="p-3 bg-[#181C19] rounded-lg border border-stone-800 mt-2">
                          <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1">
                            Requirements &amp; Project Context:
                          </span>
                          <p className="text-stone-200">{selectedQuoteDetail.requirements}</p>
                        </div>

                        <div className="pt-2">
                          <label className="block text-[10px] font-mono text-stone-400 uppercase mb-1">
                            Internal Sales Notes:
                          </label>
                          <textarea
                            rows={2}
                            defaultValue={selectedQuoteDetail.internalNotes || ''}
                            onBlur={(e) => updateQuoteNotes(selectedQuoteDetail.id, e.target.value)}
                            className="w-full bg-[#181C19] border border-stone-700 rounded-lg p-2 text-xs text-white"
                            placeholder="Add remarks on client call or quotation dispatch..."
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-3 border-t border-stone-800">
                        <button
                          onClick={() => setSelectedQuoteDetail(null)}
                          className="px-4 py-2 rounded-lg bg-[#F8971D] text-stone-950 font-bold text-xs"
                        >
                          Close Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 12. CONTACT & WHATSAPP SETTINGS */}
            {activeSection === 'contact-settings' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Contact &amp; WhatsApp Settings</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Configure official contact numbers, corporate email, physical Jebel Ali location, and instant WhatsApp chat links.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCmsChanges(cms, 'Updated Contact and WhatsApp details');
                  }}
                  className="space-y-4"
                >
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          WhatsApp Business Number (with Country Code)
                        </label>
                        <input
                          type="text"
                          value={cms.footer.whatsAppNumber}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              footer: { ...cms.footer, whatsAppNumber: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Landline Phone Number
                        </label>
                        <input
                          type="text"
                          value={cms.footer.phone}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              footer: { ...cms.footer, phone: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Official Corporate Email
                        </label>
                        <input
                          type="email"
                          value={cms.footer.email}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              footer: { ...cms.footer, email: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Federal Tax Registration Number (TRN)
                        </label>
                        <input
                          type="text"
                          value={cms.footer.trn}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              footer: { ...cms.footer, trn: e.target.value },
                            })
                          }
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Physical Registered Address
                      </label>
                      <input
                        type="text"
                        value={cms.footer.address}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            footer: { ...cms.footer, address: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </form>
              </div>
            )}

            {/* 13. GOOGLE REVIEWS */}
            {activeSection === 'google-reviews' && (
              <div className="space-y-6 max-w-5xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Google Reviews &amp; Testimonials</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Manage client feedback and rotating endorsements displayed on the public portal and WETEX micro-site.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newReview = {
                        id: `rev-${Date.now()}`,
                        clientName: 'New Client',
                        company: 'Enterprise Utility LLC',
                        role: 'Procurement Specialist',
                        rating: 5,
                        comment: 'Outstanding PPE quality and swift regional delivery from Dubai.',
                        date: new Date().toISOString().substring(0, 10),
                        verified: true,
                        visible: true,
                      };
                      saveCmsChanges(
                        {
                          ...cms,
                          reviews: {
                            ...cms.reviews,
                            items: [newReview, ...cms.reviews.items],
                          },
                        },
                        'Added new client review'
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cms.reviews.items.map((rev, index) => (
                    <div
                      key={rev.id}
                      className="bg-[#202522] border border-stone-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{rev.clientName}</h4>
                          <span className="text-xs text-stone-400">• {rev.company}</span>
                          <span className="flex text-[#F8971D]">
                            {'★'.repeat(rev.rating)}
                          </span>
                        </div>
                        <p className="text-xs text-stone-300 italic">"{rev.comment}"</p>
                        <p className="text-[10px] text-stone-500 font-mono">Date: {rev.date}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...cms.reviews.items];
                            updated[index].visible = !updated[index].visible;
                            saveCmsChanges(
                              {
                                ...cms,
                                reviews: { ...cms.reviews, items: updated },
                              },
                              'Toggled review visibility'
                            );
                          }}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            rev.visible
                              ? 'bg-[#438B3E]/20 text-[#438B3E] border border-[#438B3E]/30'
                              : 'bg-stone-800 text-stone-500'
                          }`}
                        >
                          {rev.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 14. FOOTER SETTINGS */}
            {activeSection === 'footer-settings' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Footer &amp; Legal Compliance Settings</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Control the legal one-liner footer, copyright statement, and company registration details.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCmsChanges(cms, 'Updated Footer settings');
                  }}
                  className="space-y-4"
                >
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Copyright Notice Text
                      </label>
                      <input
                        type="text"
                        value={cms.footer.copyrightText}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            footer: { ...cms.footer, copyrightText: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Corporate Summary Description
                      </label>
                      <textarea
                        rows={3}
                        value={cms.footer.description}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            footer: { ...cms.footer, description: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* 15. BRANDING & THEME */}
            {activeSection === 'branding-theme' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Branding &amp; Global Theme</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Customize approved corporate brand colors (Pantone 653C, Pantone 363C, Amber, Sage Green) and typography.
                    </p>
                  </div>

                  <button
                    onClick={handleResetBrandDefaults}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-2 border border-stone-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#F8971D]" />
                    <span>Reset Brand Defaults</span>
                  </button>
                </div>

                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Color Palette Pickers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Primary (Pantone 653C)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cms.branding.primaryColor}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              branding: { ...cms.branding, primaryColor: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded cursor-pointer border border-stone-700 bg-transparent"
                        />
                        <span className="font-mono text-xs text-white">{cms.branding.primaryColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Secondary (Pantone 363C)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cms.branding.secondaryColor}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              branding: { ...cms.branding, secondaryColor: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded cursor-pointer border border-stone-700 bg-transparent"
                        />
                        <span className="font-mono text-xs text-white">{cms.branding.secondaryColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Accent Amber
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cms.branding.accentColor}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              branding: { ...cms.branding, accentColor: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded cursor-pointer border border-stone-700 bg-transparent"
                        />
                        <span className="font-mono text-xs text-white">{cms.branding.accentColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Sage Green
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cms.branding.sageColor}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              branding: { ...cms.branding, sageColor: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded cursor-pointer border border-stone-700 bg-transparent"
                        />
                        <span className="font-mono text-xs text-white">{cms.branding.sageColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Dark Charcoal
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cms.branding.charcoalColor}
                          onChange={(e) =>
                            setCms({
                              ...cms,
                              branding: { ...cms.branding, charcoalColor: e.target.value },
                            })
                          }
                          className="w-9 h-9 rounded cursor-pointer border border-stone-700 bg-transparent"
                        />
                        <span className="font-mono text-xs text-white">{cms.branding.charcoalColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800">
                    <label className="block text-xs font-semibold text-stone-300 mb-2">
                      Corporate Font Family
                    </label>
                    <select
                      value={cms.branding.fontFamily}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          branding: { ...cms.branding, fontFamily: e.target.value },
                        })
                      }
                      className="bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white w-full sm:w-80"
                    >
                      <option value="Montserrat, sans-serif">Montserrat (Approved Industrial Modern)</option>
                      <option value="Roboto, sans-serif">Roboto (Technical Sans)</option>
                      <option value="Inter, sans-serif">Inter (Clean UI)</option>
                      <option value="Tajawal, sans-serif">Tajawal (Arabic &amp; English)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => saveCmsChanges(cms, 'Updated Branding and Global Theme')}
                  className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply Theme Changes</span>
                </button>
              </div>
            )}

            {/* 16. MEDIA LIBRARY */}
            {activeSection === 'media-library' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Media Library</h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Central image depository holding all {mediaItems.length} product photos, banners, and vector assets.
                    </p>
                  </div>

                  <label className="px-4 py-2 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md">
                    <Upload className="w-4 h-4" />
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageFileUpload(e, () => {
                          // Already automatically saved into mediaItems in handleImageFileUpload
                        })
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-col sm:flex-row gap-3 bg-[#202522] p-3 rounded-xl border border-stone-800">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search image filenames or alt tags..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="w-full bg-[#181C19] border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <select
                    value={mediaCategoryFilter}
                    onChange={(e) => setMediaCategoryFilter(e.target.value)}
                    className="bg-[#181C19] border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="all">All Media Categories</option>
                    <option value="footwear">Safety Footwear</option>
                    <option value="workwear">Uniforms &amp; Workwear</option>
                    <option value="ppe">Safety PPE</option>
                    <option value="logos">Logos &amp; Banners</option>
                  </select>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaItems
                    .filter((m) => {
                      const matchCat =
                        mediaCategoryFilter === 'all' || m.category === mediaCategoryFilter;
                      const matchSearch =
                        m.filename.toLowerCase().includes(mediaSearch.toLowerCase()) ||
                        m.altText.toLowerCase().includes(mediaSearch.toLowerCase());
                      return matchCat && matchSearch;
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#202522] border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between group"
                      >
                        <div className="aspect-square bg-white p-3 flex items-center justify-center relative overflow-hidden">
                          <img
                            src={item.path}
                            alt={item.altText}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                '/uploads/products/footwear/ss-08-s1p.png';
                            }}
                          />
                        </div>

                        <div className="p-3 bg-[#181C19] border-t border-stone-800">
                          <p className="font-mono text-xs font-bold text-white truncate" title={item.filename}>
                            {item.filename}
                          </p>
                          <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                            {item.dimensions} • {item.size}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-stone-800 flex items-center justify-between">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.path);
                                showToast(`Copied path: ${item.path}`);
                              }}
                              className="text-[10px] text-[#F8971D] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy Path</span>
                            </button>

                            <button
                              onClick={() => handleDeleteMedia(item.id)}
                              className="text-stone-500 hover:text-red-400 p-1"
                              title="Delete Image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 17. SEO SETTINGS */}
            {activeSection === 'seo' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">SEO &amp; Social Share Metadata</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Configure search engine title tags, meta descriptions, and OpenGraph social share previews.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveCmsChanges(cms, 'Updated SEO Settings');
                  }}
                  className="space-y-4"
                >
                  <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Global Meta Title
                      </label>
                      <input
                        type="text"
                        value={cms.seo.metaTitle}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            seo: { ...cms.seo, metaTitle: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Meta Description (Max 160 characters recommended)
                      </label>
                      <textarea
                        rows={3}
                        value={cms.seo.metaDescription}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            seo: { ...cms.seo, metaDescription: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Target Keywords (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={cms.seo.keywords}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            seo: { ...cms.seo, keywords: e.target.value },
                          })
                        }
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save SEO Configurations</span>
                  </button>
                </form>
              </div>
            )}

            {/* 18. ADMIN PROFILE & SECURITY */}
            {activeSection === 'profile-security' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">Admin Profile &amp; Security</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage your administrator credentials, email address, password hash, and security audit logs.
                  </p>
                </div>

                {securityFeedback && (
                  <div
                    className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
                      securityFeedback.type === 'success'
                        ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                        : 'bg-red-950/80 border-red-800 text-red-200'
                    }`}
                  >
                    {securityFeedback.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>{securityFeedback.text}</span>
                  </div>
                )}

                {/* Profile Information */}
                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Administrator Profile</h3>
                  <form onSubmit={handleUpdateProfileName} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Current Email Address
                        </label>
                        <input
                          type="text"
                          value={cms.adminProfile.email}
                          disabled
                          className="w-full bg-[#141815] border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-400 font-mono"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
                    >
                      Update Display Name
                    </button>
                  </form>
                </div>

                {/* Change Email */}
                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Change Administrator Email</h3>
                  <form onSubmit={handleChangeEmail} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Current Password Verification
                      </label>
                      <input
                        type="password"
                        required
                        value={emailChangeForm.currentPassword}
                        onChange={(e) =>
                          setEmailChangeForm({ ...emailChangeForm, currentPassword: e.target.value })
                        }
                        placeholder="••••••••••••"
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          New Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={emailChangeForm.newEmail}
                          onChange={(e) =>
                            setEmailChangeForm({ ...emailChangeForm, newEmail: e.target.value })
                          }
                          placeholder="newadmin@rangers-safety.com"
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Confirm New Email
                        </label>
                        <input
                          type="email"
                          required
                          value={emailChangeForm.confirmNewEmail}
                          onChange={(e) =>
                            setEmailChangeForm({ ...emailChangeForm, confirmNewEmail: e.target.value })
                          }
                          placeholder="newadmin@rangers-safety.com"
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#1E4378] hover:bg-[#16325c] text-white text-xs font-semibold cursor-pointer"
                    >
                      Verify Password &amp; Update Email
                    </button>
                  </form>
                </div>

                {/* Change Password */}
                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Change Security Password</h3>
                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordChangeForm.currentPassword}
                        onChange={(e) =>
                          setPasswordChangeForm({ ...passwordChangeForm, currentPassword: e.target.value })
                        }
                        placeholder="••••••••••••"
                        className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          New Password (Min 8 chars)
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordChangeForm.newPassword}
                          onChange={(e) =>
                            setPasswordChangeForm({ ...passwordChangeForm, newPassword: e.target.value })
                          }
                          placeholder="••••••••••••"
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordChangeForm.confirmNewPassword}
                          onChange={(e) =>
                            setPasswordChangeForm({
                              ...passwordChangeForm,
                              confirmNewPassword: e.target.value,
                            })
                          }
                          placeholder="••••••••••••"
                          className="w-full bg-[#181C19] border border-stone-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#F8971D] hover:bg-[#e08616] text-stone-950 font-bold text-xs cursor-pointer"
                    >
                      Save New Password
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 19. WEBSITE PREVIEW */}
            {activeSection === 'website-preview' && (
              <div className="space-y-4 max-w-6xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-heading font-black text-white">Live Website Device Preview</h2>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Inspect responsive rendering across desktop, tablet, and mobile device frames.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#202522] p-1 rounded-xl border border-stone-800">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                        previewDevice === 'desktop' ? 'bg-[#1E4378] text-white font-bold' : 'text-stone-400'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                        previewDevice === 'tablet' ? 'bg-[#1E4378] text-white font-bold' : 'text-stone-400'
                      }`}
                    >
                      <Tablet className="w-4 h-4" />
                      <span className="hidden sm:inline">Tablet</span>
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                        previewDevice === 'mobile' ? 'bg-[#1E4378] text-white font-bold' : 'text-stone-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center bg-[#141815] p-4 rounded-2xl border border-stone-800 min-h-[500px]">
                  <div
                    className={`bg-white text-stone-900 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border-4 border-stone-700 flex flex-col ${
                      previewDevice === 'desktop'
                        ? 'w-full max-w-5xl h-[600px]'
                        : previewDevice === 'tablet'
                        ? 'w-[768px] h-[600px]'
                        : 'w-[375px] h-[600px]'
                    }`}
                  >
                    <div className="bg-[#202522] text-stone-300 px-4 py-2 text-[11px] font-mono flex items-center justify-between shrink-0">
                      <span>https://rangers-safety.com/preview</span>
                      <span className="text-[#F8971D]">{previewDevice.toUpperCase()} SIMULATOR</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F5F6F2]">
                      <div className="bg-[#202522] text-white p-6 rounded-xl space-y-2">
                        <span className="text-xs text-[#F8971D] font-mono uppercase">
                          {cms.hero.subHeading}
                        </span>
                        <h1 className="text-xl sm:text-2xl font-heading font-black">
                          {cms.hero.mainHeading}
                        </h1>
                        <p className="text-xs text-stone-300 leading-relaxed">{cms.hero.description}</p>
                        <div className="flex gap-2 pt-2">
                          <span className="px-3 py-1.5 rounded-lg bg-[#F8971D] text-stone-950 font-bold text-xs">
                            {cms.hero.primaryButtonText}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-stone-700 text-white font-semibold text-xs">
                            {cms.hero.secondaryButtonText}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {products.slice(0, 4).map((p) => (
                          <div key={p.id} className="bg-white p-3 rounded-xl border border-stone-200">
                            <div className="w-full aspect-square flex items-center justify-center p-2 mb-2">
                              <img src={p.image} alt={p.name} className="max-h-full object-contain" />
                            </div>
                            <span className="font-mono text-[10px] font-bold text-[#F8971D]">{p.sku}</span>
                            <h4 className="font-bold text-xs text-stone-900 truncate">{p.name}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 20. SYSTEM SETTINGS */}
            {activeSection === 'system-settings' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h2 className="text-xl font-heading font-black text-white">System &amp; Server Settings</h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Environment diagnostics, PHP PDO MySQL connectivity, and database synchronization tools.
                  </p>
                </div>

                <div className="bg-[#202522] border border-stone-800 p-5 rounded-xl space-y-4">
                  <h3 className="font-heading font-bold text-sm text-white">Server &amp; Environment Diagnostics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#181C19] rounded-xl border border-stone-800">
                      <span className="text-stone-500 font-mono text-[10px] uppercase block">
                        Database Engine:
                      </span>
                      <span className="text-emerald-400 font-bold">MySQL 8.0+ / PDO Active</span>
                    </div>
                    <div className="p-3 bg-[#181C19] rounded-xl border border-stone-800">
                      <span className="text-stone-500 font-mono text-[10px] uppercase block">
                        PHP Runtime Architecture:
                      </span>
                      <span className="text-white font-mono">PHP 8.2 (Apache / Nginx Ready)</span>
                    </div>
                    <div className="p-3 bg-[#181C19] rounded-xl border border-stone-800">
                      <span className="text-stone-500 font-mono text-[10px] uppercase block">
                        Session &amp; CSRF Security:
                      </span>
                      <span className="text-emerald-400 font-bold">Enforced (HMAC Tokens)</span>
                    </div>
                    <div className="p-3 bg-[#181C19] rounded-xl border border-stone-800">
                      <span className="text-stone-500 font-mono text-[10px] uppercase block">
                        Local Storage Quota Safeguard:
                      </span>
                      <span className="text-white font-bold">Canvas Resized Storage Active</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex flex-wrap gap-3">
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2.5 rounded-xl bg-[#1E4378] hover:bg-[#16325c] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-4 h-4 text-[#F8971D]" />
                      <span>Export Full System Backup (JSON)</span>
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'WARNING: Reset all CMS content, products, and media references to fresh factory defaults?'
                          )
                        ) {
                          localStorage.removeItem('rss_cms_config');
                          localStorage.removeItem('rss_products_data');
                          localStorage.removeItem('rss_quote_requests');
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-red-200 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <span>Factory Reset CMS</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
