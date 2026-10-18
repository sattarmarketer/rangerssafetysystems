import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  validateMeetingForm,
  generateReferenceNumber,
  generateWhatsAppLink,
  MeetingFormData,
} from '../utils/rules';

interface MeetingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsAppNumber: string;
  onMeetingSubmitted?: (meeting: any) => void;
}

export const MeetingScheduleModal: React.FC<MeetingScheduleModalProps> = ({
  isOpen,
  onClose,
  whatsAppNumber,
  onMeetingSubmitted,
}) => {
  const [formData, setFormData] = useState<MeetingFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '+971 ',
    preferredDate: '2026-10-20',
    preferredTime: '11:00 AM - 12:00 PM',
    boothLocation: 'Booth A-42, Hall 3 (WETEX Dubai)',
    topicOfInterest: 'Safety Footwear & Boots (Rangers WAQ & Parade)',
    notes: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

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
    const validation = validateMeetingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refNumber = `MTG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const newMeetingRecord = {
        id: `mtg-${Date.now()}`,
        referenceNumber: refNumber,
        ...formData,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      try {
        const stored = localStorage.getItem('rss_meeting_requests');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newMeetingRecord);
        localStorage.setItem('rss_meeting_requests', JSON.stringify(list));
      } catch (err) {
        console.error('Failed to save meeting booking:', err);
      }

      if (onMeetingSubmitted) {
        onMeetingSubmitted(newMeetingRecord);
      }

      setSubmittedReference(refNumber);
      setIsSubmitting(false);
    }, 350);
  };

  const handleReset = () => {
    setSubmittedReference(null);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '+971 ',
      preferredDate: '2026-10-20',
      preferredTime: '11:00 AM - 12:00 PM',
      boothLocation: 'Booth A-42, Hall 3 (WETEX Dubai)',
      topicOfInterest: 'Safety Footwear & Boots (Rangers WAQ & Parade)',
      notes: '',
      honeypot: '',
    });
    setErrors({});
    onClose();
  };

  const whatsappConfirmationUrl = generateWhatsAppLink(
    whatsAppNumber,
    `Hello Rangers Safety Systems LLC, I have scheduled an exhibition meeting (Ref: ${submittedReference || 'New'}). Please confirm our time slot at Booth A-42.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white text-[#202522] rounded-xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#1E4378] text-white px-6 py-4 flex items-center justify-between border-b-4 border-[#F8971D]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-amber-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                WETEX 2026 DUBAI • EXHIBITION DELEGATES
              </div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-white">
                Schedule Exhibition Meeting
              </h2>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close meeting scheduling"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedReference ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#438B3E] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-block bg-[#F8971D]/15 text-[#b86d0b] text-xs font-mono font-bold px-3 py-1 rounded-full">
                  BOOKING CONFIRMED &bull; REF: {submittedReference}
                </span>
                <h3 className="text-2xl font-heading font-black text-[#1E4378]">
                  Your Exhibition Meeting is Scheduled!
                </h3>
                <p className="text-stone-600 text-sm max-w-lg mx-auto">
                  Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Our senior technical and procurement team from Jebel Ali has reserved your consultation slot at WETEX 2026.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 text-left max-w-lg mx-auto space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Exhibition Booth:</span>
                  <span className="font-bold text-[#1E4378]">Booth A-42, Hall 3 (WETEX Dubai)</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Date &amp; Time:</span>
                  <span className="font-bold text-stone-900">{formData.preferredDate} ({formData.preferredTime})</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Organisation:</span>
                  <span className="font-bold text-stone-900">{formData.companyName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Discussion Focus:</span>
                  <span className="font-bold text-[#438B3E]">{formData.topicOfInterest}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappConfirmationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-5 py-3 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs px-5 py-3 rounded-md transition-colors cursor-pointer"
                >
                  Done &bull; Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Context Banner */}
              <div className="bg-blue-50 border border-blue-200 text-[#1E4378] p-3.5 rounded-lg text-xs flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F8971D] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Meet Rangers Safety Systems LLC at WETEX 2026:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Visit us at <strong>Booth A-42, Hall 3, Dubai World Trade Centre</strong>. Inspect physical certified footwear &amp; FR fabric swatches, discuss volume pricing, and review custom embroidery options.
                  </p>
                </div>
              </div>

              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Eng. Tariq Al Mansoori"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-stone-300'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Company / Organisation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Dubai Utility Contracting LLC"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                        errors.companyName ? 'border-red-500 bg-red-50' : 'border-stone-300'
                      }`}
                    />
                  </div>
                  {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Official Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="procurement@company.ae"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-stone-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone / Mobile */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone / Mobile (with country code) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-300'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Exhibition Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <select
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white cursor-pointer"
                    >
                      <option value="2026-10-20">Day 1: Tuesday, 20 Oct 2026</option>
                      <option value="2026-10-21">Day 2: Wednesday, 21 Oct 2026</option>
                      <option value="2026-10-22">Day 3: Thursday, 22 Oct 2026</option>
                      <option value="Pre-Exhibition (Jebel Ali HQ)">Pre-Exhibition Meeting (Jebel Ali HQ)</option>
                    </select>
                  </div>
                  {errors.preferredDate && <p className="text-[11px] text-red-500 mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white cursor-pointer"
                    >
                      <option value="10:00 AM - 11:00 AM">10:00 AM – 11:00 AM (Morning Slot)</option>
                      <option value="11:30 AM - 12:30 PM">11:30 AM – 12:30 PM (Midday Slot)</option>
                      <option value="02:00 PM - 03:00 PM">02:00 PM – 03:00 PM (Afternoon Slot)</option>
                      <option value="03:30 PM - 04:30 PM">03:30 PM – 04:30 PM (Late Afternoon)</option>
                      <option value="05:00 PM - 06:00 PM">05:00 PM – 06:00 PM (Evening Slot)</option>
                    </select>
                  </div>
                  {errors.preferredTime && <p className="text-[11px] text-red-500 mt-1">{errors.preferredTime}</p>}
                </div>
              </div>

              {/* Discussion Focus */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Primary Discussion Topic / Product Focus
                </label>
                <select
                  name="topicOfInterest"
                  value={formData.topicOfInterest}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378] bg-white cursor-pointer"
                >
                  <option value="Safety Footwear & Boots (Rangers WAQ & Parade)">
                    Safety Footwear &amp; Boots (EN ISO 20345 / ASTM F2413 Composite &amp; Steel Toe)
                  </option>
                  <option value="Industrial Workwear & Fire-Retardant Suits">
                    Industrial Workwear &amp; Fire-Retardant (FR) Suits (160 - 300 GSM)
                  </option>
                  <option value="High-Voltage Electrical Insulation Footwear (ELECTA 500V-1500V)">
                    High-Voltage Electrical Insulation Footwear (ELECTA Dielectric Series)
                  </option>
                  <option value="Corporate Tender / Long-term Supplier Agreement">
                    Corporate Fleet Tender / Annual Frame Agreement
                  </option>
                  <option value="OEM / Private Label Manufacturing">
                    OEM Custom Branding &amp; Private Label Safety Solutions
                  </option>
                  <option value="Regional Distribution / GCC Reseller Inquiries">
                    Regional Distribution / GCC Reseller Inquiries
                  </option>
                </select>
              </div>

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Specific Requirements or Questions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your project, estimated quantities, technical standards required, or sample requests..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E4378]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F8971D] hover:bg-[#e0840e] disabled:opacity-50 text-white font-heading font-black text-xs sm:text-sm py-3.5 px-6 rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Confirming Booking...</span>
                  ) : (
                    <>
                      <span>Confirm &amp; Reserve Exhibition Meeting Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  No fee required. Meeting requests are confirmed instantly by our exhibition coordinator.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
