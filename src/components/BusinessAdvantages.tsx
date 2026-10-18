import React from 'react';
import { ShieldCheck, Flame, Shirt, Warehouse, ArrowUpRight } from 'lucide-react';

import { CmsConfig } from '../data/cmsConfig';

interface BusinessAdvantagesProps {
  onOpenQuote: () => void;
  advantagesConfig?: CmsConfig['advantages'];
}

export const BusinessAdvantages: React.FC<BusinessAdvantagesProps> = ({
  onOpenQuote,
  advantagesConfig,
}) => {
  if (advantagesConfig && advantagesConfig.visible === false) {
    return null;
  }

  const sectionTitle =
    advantagesConfig?.title || 'Why Procurement Teams Choose Rangers Safety';
  const advantages = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#1E4378]" />,
      badge: 'Certified Protection',
      title: 'CERTIFIED HEAD-TO-TOE PPE',
      description:
        'All equipment complies with EN ISO 20345:2022, ASTM F2413-18, and international CE industrial safety standards for high-consequence environments.',
      accent: 'border-l-4 border-[#1E4378]',
    },
    {
      icon: <Flame className="w-7 h-7 text-[#F8971D]" />,
      badge: 'GCC Climate Engineered',
      title: 'HEAT STRESS & SPECIALIZED GEAR',
      description:
        'Advanced heat-dissipation footwear, 3D breathable air-mesh linings, and dielectric electrical insulation ratings (500V AC - 1500V DC) for harsh Gulf operations.',
      accent: 'border-l-4 border-[#F8971D]',
    },
    {
      icon: <Shirt className="w-7 h-7 text-[#438B3E]" />,
      badge: 'Corporate Workwear',
      title: 'CUSTOM INDUSTRIAL WORKWEAR',
      description:
        'Sanforized & mercerized 160–300 GSM polycotton suits, 100% heavy cotton, and certified EN ISO 11611 / 11612 fire-retardant (FR) utility coveralls.',
      accent: 'border-l-4 border-[#438B3E]',
    },
    {
      icon: <Warehouse className="w-7 h-7 text-stone-700" />,
      badge: 'Dubai Logistics',
      title: 'READY LOCAL INVENTORY',
      description:
        'Strategically stocked warehouse in Jebel Ali Industrial First & Jebel Ali Freezone, Dubai, ensuring prompt fulfillment for utility and corporate tenders.',
      accent: 'border-l-4 border-stone-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E4378] font-mono mb-2">
              B2B &amp; Government Utility Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#202522] tracking-tight">
              {sectionTitle}
            </h2>
          </div>
          <button
            onClick={onOpenQuote}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#F8971D] hover:text-[#d07b0e] transition-colors cursor-pointer group"
          >
            <span>Request Procurement Partnership</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className={`bg-[#F5F6F2] p-6 rounded-lg ${item.accent} shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white rounded-lg shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold font-mono tracking-wider bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-heading font-bold text-[#202522] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
