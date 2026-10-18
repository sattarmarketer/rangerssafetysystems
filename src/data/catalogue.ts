export interface CataloguePage {
  pageNumber: number;
  title: string;
  category: string;
  subtitle: string;
  brand: string;
  products: string[];
  description: string;
}

export const CATALOGUE_PAGES: CataloguePage[] = [
  {
    pageNumber: 1,
    title: 'EXHIBITION 2026 MASTER PRODUCT CATALOGUE',
    category: 'Cover Page',
    subtitle: 'PREMIUM INDUSTRIAL SAFETY GEAR & PPE',
    brand: 'RANGERS SAFETY SYSTEMS LLC',
    products: ['Safety Footwear', 'Workwear & Garments', 'Personal Protective Equipment'],
    description: 'Official Exhibition 2026 Master Catalogue for WETEX & Government Utility Procurement, Dubai.',
  },
  {
    pageNumber: 2,
    title: 'SAFETY SHOES — RANGERS WAQ',
    category: 'Safety Footwear',
    subtitle: 'EN ISO 20345:2022 Certified Protection',
    brand: 'Rangers WAQ',
    products: ['SS-08 S1P (Black)', 'SS-12S S1P (Beige)'],
    description: 'Composite toe (200J) & Kevlar midsole (1100N) paired with lightweight RBPU & DDPU soles.',
  },
  {
    pageNumber: 3,
    title: 'SAFETY SHOES — ATHLETIC & WATER RESISTANT',
    category: 'Safety Footwear',
    subtitle: 'Breathable Upper & S3 Moisture Barrier',
    brand: 'Rangers WAQ',
    products: ['SS-18 S1P (Black/Green)', 'SS-21 S3 (Black)'],
    description: 'Engineered with sandwich lining ventilation, plastic toe (200J) and anti-static PU foam.',
  },
  {
    pageNumber: 4,
    title: 'BARTON LEATHER HEAVY DUTY SERIES',
    category: 'Safety Footwear',
    subtitle: 'EN ISO 20345:2022 S3 Construction Grade',
    brand: 'Rangers WAQ',
    products: ['SS-25 S3 (Black Low-Cut)', 'SS-26 S3 (Black Mid-Cut)'],
    description: 'Barton printed split leather with built-in high-visibility side reflectors and steel midplate.',
  },
  {
    pageNumber: 5,
    title: 'QUICK-RELEASE LACING & MICROFIBER',
    category: 'Safety Footwear',
    subtitle: 'Modern Industrial Ergonomics',
    brand: 'Rangers WAQ',
    products: ['SS-49 S3 (Microfiber)', 'SS-59 S1P (Quick Release)'],
    description: 'Rapid-dial rotary lacing system, counter reflector night protection, and Kevlar puncture shield.',
  },
  {
    pageNumber: 6,
    title: 'EXECUTIVE & 100% NON-METALLIC LEATHER',
    category: 'Safety Footwear',
    subtitle: 'Crazy Horse & Nubuck Leather',
    brand: 'Rangers WAQ',
    products: ['SS-136 S3 (Brown)', 'SS-138 S3 (Brown ESD)'],
    description: '100% metal-free executive safety footwear with 300°C contact heat resistant RBPU sole and ESD protection.',
  },
  {
    pageNumber: 7,
    title: 'PARADE PREMIUM SAFETY FOOTWEAR',
    category: 'Premium Footwear',
    subtitle: 'Dual International Standard Compliance',
    brand: 'Rangers Parade',
    products: ['GRINDA S1PS (ASTM F2413)', 'ABORA S1P (3D Mesh Hot Climate)'],
    description: 'Engineered for severe climatic conditions with VPS arch support and dual EN ISO + ASTM certifications.',
  },
  {
    pageNumber: 8,
    title: 'HEAT RESISTANCE & CHEMICAL PROTECTION',
    category: 'Specialized Footwear',
    subtitle: 'High Thermal & Chemical Resistance',
    brand: 'Rangers Parade',
    products: ['High-heat contact soles', 'Acid & Hydrocarbon resistant outsoles'],
    description: 'Nitrile rubber soles rated for 300°C contact heat and industrial chemical splash resistance.',
  },
  {
    pageNumber: 9,
    title: 'UTILITY & ELECTRICAL SAFETY (500V-1500V)',
    category: 'Specialized Footwear',
    subtitle: 'Non-conductive Dielectric Footwear',
    brand: 'Rangers Parade',
    products: ['ELECTA SB SR FO PS CI HIE', 'High-voltage insulation models'],
    description: 'ASTM F2413-18 EH PR electric insulation certified for power utilities, substations and maintenance engineers.',
  },
  {
    pageNumber: 10,
    title: 'HIGH VOLTAGE & RUNNING-SAFETY HYBRIDS',
    category: 'Premium Footwear',
    subtitle: 'ELECTA & ISTELLA High Performance',
    brand: 'Rangers Parade',
    products: ['ELECTA (Insulating Sole)', 'ISTELLA (EVA/Nitrile HRO 300°C)'],
    description: 'Electrical hazard non-metallic barrier up to 1500V DC and cold/heat insulated stone guard technology.',
  },
  {
    pageNumber: 11,
    title: 'HIGH-ANKLE RIGGER & TACTICAL BOOTS',
    category: 'Safety Footwear',
    subtitle: '7" & 8" Heavy Industry Rigger Boots',
    brand: 'Rangers WAQ',
    products: ['SS-161 S3 (7" Boot)', 'ST-07 S3 (8" Boot)'],
    description: 'Full-grain leather combat & rigger boots engineered for offshore, oil & gas, and excavation sites.',
  },
  {
    pageNumber: 12,
    title: 'INDUSTRIAL WORKWEAR & CERTIFIED GARMENTS',
    category: 'Workwear & Garments',
    subtitle: 'Coveralls, Uniforms & FR Certified Suits',
    brand: 'Rangers Workwear',
    products: [
      '60/40 Polycotton Coveralls & Sets',
      '100% Cotton 240 GSM Coveralls',
      'Fire-Retardant (FR) EN ISO 11611/11612 Suits',
    ],
    description: 'Sanforized and mercerized industrial fabrics engineered for UAE heat, with official company contact details and QR scan links.',
  },
];
