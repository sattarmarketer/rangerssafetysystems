import React, { useState, useEffect } from 'react';
import {
  X,
  FileCheck,
  AlertCircle,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Tag,
  Hash,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  validateQuoteForm,
  generateReferenceNumber,
  generateWhatsAppLink,
  QuoteFormData,
} from '../utils/rules';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/products';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  whatsAppNumber: string;
  onQuoteSubmitted?: (quote: any) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProduct = '',
  whatsAppNumber,
  onQuoteSubmitted,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '+971 ',
    country: 'United Arab Emirates',
    productOrCategory: initialProduct || 'Safety Footwear & Boots',
    estimatedQuantity: '100 - 500 Pairs / Units',
    specifications: '',
    requirements: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        productOrCategory: initialProduct,
      }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateQuoteForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable persistence
    setTimeout(() => {
      const refNumber = generateReferenceNumber();
      const newQuoteRecord = {
        id: `quote-${Date.now()}`,
        referenceNumber: refNumber,
        ...formData,
        status: 'New',
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage for persistence
      try {
        const stored = localStorage.getItem('rss_quote_requests');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newQuoteRecord);
        localStorage.setItem('rss_quote_requests', JSON.stringify(list));
      } catch (err) {
        console.error('Storage error:', err);
      }

      if (onQuoteSubmitted) {
        onQuoteSubmitted(newQuoteRecord);
      }

      setSubmittedReference(refNumber);
      setIsSubmitting(false);
    }, 400);
  };

  const handleReset = () => {
    setSubmittedReference(null);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '+971 ',
      country: 'United Arab Emirates',
      productOrCategory: 'Safety Footwear & Boots',
      estimatedQuantity: '100 - 500 Pairs / Units',
      specifications: '',
      requirements: '',
      honeypot: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white text-[#202522] rounded-xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1E4378] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-md">
              <FileCheck className="w-5 h-5 text-[#F8971D]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg leading-tight">
                Request Corporate B2B Quotation
              </h3>
              <p className="text-xs text-blue-200">
                Official quotation for procurement, utility, &amp; industrial tenders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Close quotation form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedReference ? (
            /* Success State */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-[#438B3E] rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#438B3E] font-mono">
                  Quotation Request Received
                </span>
                <h4 className="text-2xl font-heading font-black text-[#202522]">
                  Thank You, {formData.contactName}!
                </h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Your formal request for{' '}
                  <strong className="text-stone-800">{formData.companyName}</strong> has been
                  logged in the Rangers Safety Systems database.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 max-w-md mx-auto space-y-1">
                <div className="text-xs text-stone-500 uppercase font-mono">
                  Official Quote Reference
                </div>
                <div className="text-xl font-heading font-black text-[#1E4378] tracking-widest font-mono">
                  {submittedReference}
                </div>
                <div className="text-[11px] text-stone-500">
                  A sales representative will contact {formData.email} within 2–4 business hours.
                </div>
              </div>

              {/* Fast WhatsApp Follow-Up */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppLink(
                    whatsAppNumber,
                    `Hello Rangers Team, I just submitted RFQ ${submittedReference} for ${formData.companyName} regarding ${formData.productOrCategory}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#438B3E] hover:bg-[#387534] text-white font-bold text-xs px-5 py-3 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Follow Up via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs px-5 py-3 rounded-md transition-colors cursor-pointer"
                >
                  Close &amp; Back to Products
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  value={formData.honeypot}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Company & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Company Name *</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Dubai Utility Contracting LLC"
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                      errors.companyName ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Contact Person *</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Full name & title"
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                      errors.contactName ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.contactName && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.contactName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Business Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="procurement@company.ae"
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                      errors.email ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Country & Product Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Country / Location *</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white"
                  >
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Oman">Oman</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Other International">Other International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Product / Division *</span>
                  </label>
                  <select
                    name="productOrCategory"
                    value={formData.productOrCategory}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white font-medium"
                  >
                    <optgroup label="Main Categories">
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Individual Catalogue Products">
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={`${p.sku} - ${p.name}`}>
                          {p.sku} ({p.name})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Quantity & Specific sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#1E4378]" />
                    <span>Estimated Quantity</span>
                  </label>
                  <select
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white"
                  >
                    <option value="50 - 100 Pairs / Units">50 - 100 Pairs / Units</option>
                    <option value="100 - 500 Pairs / Units">100 - 500 Pairs / Units</option>
                    <option value="500 - 2,000 Pairs / Units">500 - 2,000 Pairs / Units</option>
                    <option value="2,000+ Corporate Supply Tender">
                      2,000+ Corporate Supply Tender
                    </option>
                    <option value="Sampling / Trial Evaluation">
                      Sampling / Trial Evaluation
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Sizes / Colors / Standards Required
                  </label>
                  <input
                    type="text"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleChange}
                    placeholder="e.g. EU 40-45, Petrol Blue, S3 water-resistant"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378]"
                  />
                </div>
              </div>

              {/* Detailed Requirements */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1E4378]" />
                  <span>Project Scope &amp; Tender Requirements *</span>
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Please describe your delivery timeline, required test certifications (EN ISO 20345, ASTM), site conditions, or customized company branding requests."
                  className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                    errors.requirements ? 'border-red-500 bg-red-50/30' : 'border-stone-300'
                  }`}
                />
                {errors.requirements && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.requirements}
                  </p>
                )}
              </div>

              {/* Bot check or general error */}
              {errors.bot && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.bot}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F8971D] hover:bg-[#e0840e] disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-md shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
