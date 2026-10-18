import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'mark' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Authentic Rangers Safety Systems LLC emblem based on the official uniform embroidery:
 * Features the signature safety emblem (tall green vertical stem with left upward-hooking arm and right offset pillar)
 * and rich royal blue "RANGERS" lettering.
 */
const RangersMark: React.FC<{ className?: string; isWhite?: boolean }> = ({
  className = 'h-10 w-auto',
  isWhite = false,
}) => {
  const green = isWhite ? '#6EE7B7' : '#00A859';

  return (
    <svg
      viewBox="0 0 62 88"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rangers Safety Systems Authentic Brand Mark"
    >
      {/* Left curved arm */}
      <rect x="7" y="36" width="8.5" height="20" rx="4.25" fill={green} />
      {/* Curve joining left arm to center stem */}
      <path
        d="M 7 48 C 7 64 14 67 23 67 L 23 58 C 17 58 15.5 56 15.5 48 Z"
        fill={green}
      />
      {/* Center tall pillar */}
      <rect x="21" y="8" width="9" height="74" rx="4.5" fill={green} />
      {/* Right offset pillar */}
      <rect x="37" y="20" width="8.5" height="42" rx="4.25" fill={green} />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-20',
  };

  const isWhite = variant === 'white';
  const brandBlue = isWhite ? 'text-white' : 'text-[#0D6EFD]';
  const brandGreen = isWhite ? 'text-emerald-300' : 'text-[#00A859]';

  if (variant === 'mark') {
    return <RangersMark className={`${heights[size]} w-auto ${className}`} isWhite={isWhite} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <RangersMark className="h-14 w-auto mb-2" isWhite={isWhite} />

        {/* Arabic Lettering */}
        <div className={`font-arabic font-bold text-2xl ${brandBlue} tracking-wide leading-none mb-0.5`}>
          رينـجـرز
        </div>
        <div className={`font-arabic text-[10px] ${brandGreen} font-medium tracking-wider mb-1`}>
          لأنظمة السلامة ذ.م.م
        </div>

        {/* English Lettering */}
        <div className={`font-heading font-black tracking-widest ${brandBlue} text-2xl leading-none`}>
          RANGERS
        </div>
        <div className={`font-heading font-bold text-[9px] ${brandGreen} tracking-[0.25em] uppercase mt-0.5`}>
          SAFETY SYSTEMS LLC
        </div>
      </div>
    );
  }

  // Default: Horizontal layout matching official embroidered uniform branding
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <RangersMark className={`${heights[size]} w-auto shrink-0`} isWhite={isWhite} />

      <div className="flex flex-col justify-center leading-tight">
        {/* Top: Arabic */}
        <div className="flex items-baseline gap-2">
          <span className={`font-arabic font-bold text-base md:text-lg ${brandBlue} tracking-wide leading-none`}>
            رينـجـرز
          </span>
          <span className={`font-arabic text-[9px] md:text-[10px] ${brandGreen} font-medium`}>
            لأنظمة السلامة ذ.م.م
          </span>
        </div>

        {/* Bottom: English */}
        <div className="flex flex-col">
          <span className={`font-heading font-black text-xl md:text-2xl tracking-wider ${brandBlue} leading-none`}>
            RANGERS
          </span>
          <span className={`font-heading font-bold text-[8.5px] md:text-[9.5px] tracking-[0.24em] ${brandGreen} uppercase mt-0.5`}>
            SAFETY SYSTEMS LLC
          </span>
        </div>
      </div>
    </div>
  );
};

