/**
 * Business logic and validation utilities for Rangers Safety Systems LLC
 */

export interface QuoteFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  productOrCategory: string;
  estimatedQuantity?: string;
  specifications?: string;
  requirements: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateQuoteForm(data: QuoteFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot check for bots
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.bot = 'Automated submission detected.';
    return { isValid: false, errors };
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Company name is required (minimum 2 characters).';
  }

  if (!data.contactName || data.contactName.trim().length < 2) {
    errors.contactName = 'Contact person name is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'A valid corporate email address is required.';
  }

  // International phone check (minimum 7 digits)
  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || digitsOnly.length < 7) {
    errors.phone = 'Valid phone number with country code is required (min 7 digits).';
  }

  if (!data.country || data.country.trim().length < 2) {
    errors.country = 'Country is required.';
  }

  if (!data.requirements || data.requirements.trim().length < 10) {
    errors.requirements = 'Please provide details about your project or PPE requirements (min 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface MeetingFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  boothLocation?: string;
  topicOfInterest: string;
  notes?: string;
  honeypot?: string;
}

export function validateMeetingForm(data: MeetingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.bot = 'Automated submission detected.';
    return { isValid: false, errors };
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (min 2 characters).';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Company / Organisation name is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'A valid email address is required.';
  }

  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || digitsOnly.length < 7) {
    errors.phone = 'A valid phone number with country code is required.';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred meeting date.';
  }

  if (!data.preferredTime) {
    errors.preferredTime = 'Please select a preferred time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateWhatsAppLink(
  phoneNumber: string,
  message: string,
  productName?: string
): string {
  // Strip non-numeric characters except +
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  let fullMessage = message.trim();
  if (productName) {
    fullMessage += ` I am interested in ${productName}.`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
}

export function generateReferenceNumber(): string {
  const prefix = 'RSS';
  const year = new Date().getFullYear();
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}-${randomPart}`;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  shortDescription: string;
  certifications?: string;
  material?: string;
  sizes?: string;
  specifications: string[];
  image: string;
  featured?: boolean;
}

export function filterProducts(
  products: ProductItem[],
  query: string,
  categoryFilter: string
): ProductItem[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    const matchesCategory =
      !categoryFilter || categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();
    
    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      (p.certifications && p.certifications.toLowerCase().includes(q)) ||
      p.specifications.some((s) => s.toLowerCase().includes(q))
    );
  });
}
