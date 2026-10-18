import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  ShieldCheck,
  FileText,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/rules';

interface ContactViewProps {
  onOpenQuote: () => void;
  onOpenMeeting?: () => void;
  settings: {
    companyName: string;
    address: string;
    trn: string;
    phone: string;
    email: string;
    whatsAppNumber: string;
  };
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenQuote, onOpenMeeting, settings }) => {
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsAppNumber,
    'Hello Rangers Safety Systems LLC, I would like to enquire about your industrial safety products and warehouse supply.'
  );

  return (
    <div className="py-12 bg-[#F5F6F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#1E4378]">
            Rangers Safety Systems LLC • Dubai, UAE
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-[#202522]">
            Contact &amp; Logistics Hub
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Reach our Dubai headquarters and Jebel Ali warehouse for corporate tenders, government
            utility procurement, and custom PPE manufacturing.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Head Office & Warehouse */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="p-3 bg-blue-50 text-[#1E4378] rounded-lg inline-block">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-[#202522]">
                Dubai Headquarters &amp; Warehouse
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {settings.address}
              </p>
              <p className="text-[11px] text-stone-500 font-mono pt-1">
                Jebel Ali Freezone Logistics Access
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-xs font-mono text-[#1E4378] font-bold">
              TRN: {settings.trn}
            </div>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="p-3 bg-emerald-50 text-[#438B3E] rounded-lg inline-block">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-[#202522]">
                Sales &amp; Procurement Desk
              </h3>
              <div className="text-sm font-mono font-bold text-stone-800">
                <a href={`tel:${settings.phone}`} className="hover:text-[#1E4378]">
                  {settings.phone}
                </a>
              </div>
              <p className="text-xs text-stone-500">
                Direct phone inquiries for industrial tenders and sample deliveries.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#438B3E] hover:underline flex items-center gap-1.5"
              >
                <span>Chat via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Email & Quotes */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="p-3 bg-amber-50 text-[#F8971D] rounded-lg inline-block">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-[#202522]">
                Official Corporate Email
              </h3>
              <div className="text-sm font-mono font-bold text-stone-800">
                <a href={`mailto:${settings.email}`} className="hover:text-[#F8971D]">
                  {settings.email}
                </a>
              </div>
              <p className="text-xs text-stone-500">
                Send tender packages, BOQs, and compliance specification inquiries.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={onOpenQuote}
                className="text-xs font-bold text-[#F8971D] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request B2B Quote Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Exhibition Notice Card */}
        <div className="bg-[#202522] text-white rounded-xl p-8 border border-stone-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-block bg-[#F8971D] text-black font-mono font-bold text-xs px-2.5 py-0.5 rounded">
              WETEX 2026 DUBAI EXHIBITOR
            </div>
            <h3 className="text-2xl font-heading font-black">
              Meet Us at the Government Utility Exhibition
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Visiting the exhibition? Experience our certified EN ISO 20345 footwear and high-heat
              protective workwear firsthand, meet our engineering specialists, and collect physical
              material samples.
            </p>
          </div>

          <button
            onClick={onOpenMeeting || onOpenQuote}
            className="bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-xs px-6 py-3.5 rounded-md transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Schedule Exhibition Meeting
          </button>
        </div>
      </div>
    </div>
  );
};
