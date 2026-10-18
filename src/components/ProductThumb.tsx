import React, { useState } from 'react';

export interface ProductThumbProps {
  type?: string;
  name?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export const ProductThumb: React.FC<ProductThumbProps> = ({
  type = 'safety-footwear',
  name = 'Industrial Footwear',
  src,
  alt = '',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt || name}
        loading="lazy"
        onError={() => setImgError(true)}
        className={`w-full h-full object-contain ${className}`}
      />
    );
  }

  const isBoot = name.includes('Boot') || name.includes('7"') || name.includes('8"') || name.includes('SS-26');
  const isWorkwear = type === 'workwear' || name.includes('Coverall') || name.includes('Uniform');
  const isBrown = name.includes('Brown') || name.includes('Beige');
  const isFluro = name.includes('Green') || name.includes('Fluorescent');

  if (isWorkwear) {
    const isCoverall = name.includes('Coverall');
    const isOrange = name.includes('Fire') || name.includes('FR');
    const mainColor = isOrange ? '#F8971D' : '#1E4378';
    const accentColor = '#8B9876';

    return (
      <svg
        viewBox="0 0 200 160"
        className={`w-full h-full ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="200" height="160" fill="#202522" />
        {/* Subtle grid pattern */}
        <path d="M0 40H200 M0 80H200 M0 120H200 M50 0V160 M100 0V160 M150 0V160" stroke="#2D332F" strokeWidth="1" />
        
        {/* Coverall / Uniform silhouette */}
        <g transform="translate(45, 15)">
          {/* Collar & Neck */}
          <path d="M40 15L55 28L70 15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Main body */}
          <path
            d="M35 15L20 40L10 38L25 15H35L75 15L85 38L75 40L60 15H35V130H48V80H52V130H65V15"
            fill={mainColor}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Reflective high-visibility tapes */}
          <rect x="25" y="45" width="60" height="7" fill="#C5E838" />
          <rect x="25" y="70" width="60" height="7" fill="#C5E838" />
          {/* Pockets */}
          <rect x="30" y="30" width="16" height="12" rx="1" fill="#152B4D" stroke="#FFFFFF" strokeWidth="0.8" />
          <rect x="64" y="30" width="16" height="12" rx="1" fill="#152B4D" stroke="#FFFFFF" strokeWidth="0.8" />
          {/* Badge */}
          <circle cx="55" cy="22" r="3" fill="#F8971D" />
        </g>

        {/* Technical Label */}
        <rect x="10" y="132" width="180" height="18" rx="3" fill="#151916" />
        <text x="100" y="145" textAnchor="middle" fill="#A4B09E" fontSize="9" fontFamily="monospace" fontWeight="bold">
          {isCoverall ? 'EN ISO 13688:2013 COVERALL' : 'SANFORIZED WORKWEAR'}
        </text>
      </svg>
    );
  }

  // Safety Shoes & Boots
  const shoeColor = isBrown ? '#8B5A2B' : '#2A2E2C';
  const soleColor = '#181C19';
  const accentColor = isFluro ? '#7CFC00' : isBrown ? '#DAA520' : '#F8971D';

  return (
    <svg
      viewBox="0 0 200 160"
      className={`w-full h-full ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="160" fill="#202522" />
      {/* Background Engineering Blueprint grid */}
      <path d="M0 40H200 M0 80H200 M0 120H200 M50 0V160 M100 0V160 M150 0V160" stroke="#2D332F" strokeWidth="1" />
      
      {/* Safety Shoe / Boot Profile */}
      <g transform={isBoot ? 'translate(25, 20)' : 'translate(25, 35)'}>
        {/* Outsole (DDPU / RBPU 300C) */}
        <path
          d="M10 85C25 85 45 84 80 84C105 84 130 87 145 83C150 82 150 78 145 76C130 75 80 74 60 74C35 74 15 76 10 78Z"
          fill={soleColor}
          stroke="#444C47"
          strokeWidth="1.5"
        />
        {/* Deep tread lugs */}
        <path d="M20 85L25 90M40 85L45 90M60 85L65 90M80 85L85 90M105 85L110 90M125 85L130 90" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        
        {/* Midsole / Insole Line */}
        <path d="M12 76H144" stroke="#F8971D" strokeWidth="2.5" />
        
        {/* Shoe Upper */}
        {isBoot ? (
          /* High ankle boot profile */
          <path
            d="M20 74C18 60 20 40 22 15C35 14 55 18 58 35C65 42 80 50 110 56C135 60 146 68 144 76C120 74 40 73 20 74Z"
            fill={shoeColor}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        ) : (
          /* Low-cut athletic shoe profile */
          <path
            d="M20 74C18 62 25 45 35 40C45 36 60 42 70 48C90 52 120 58 144 68C146 72 142 75 140 76C110 74 40 73 20 74Z"
            fill={shoeColor}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        )}

        {/* 200J Composite / Steel Toe Cap Highlight */}
        <path
          d="M115 62C125 64 138 70 144 74C138 75 125 75 115 74C113 70 114 65 115 62Z"
          fill={accentColor}
          opacity="0.9"
        />

        {/* Laces & Eyelets */}
        <path d="M50 42L65 48M52 48L68 54M54 55L72 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        
        {/* Reflective Heel strip */}
        <rect x="20" y={isBoot ? '25' : '48'} width="4" height={isBoot ? '35' : '18'} rx="1" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* Technical Label */}
      <rect x="10" y="132" width="180" height="18" rx="3" fill="#151916" />
      <text x="100" y="145" textAnchor="middle" fill="#A4B09E" fontSize="9" fontFamily="monospace" fontWeight="bold">
        {isBoot ? 'EN ISO 20345:2022 S3 BOOT' : 'EN ISO 20345:2022 CERTIFIED'}
      </text>
    </svg>
  );
};
