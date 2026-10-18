import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import {
  X,
  Maximize2,
  Minimize2,
  Download,
  QrCode,
  ShieldCheck,
  Flame,
  Shirt,
  Warehouse,
  ExternalLink,
} from 'lucide-react';
import QRCode from 'qrcode';

interface TvBackdropModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export const TvBackdropModal: React.FC<TvBackdropModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1E4378',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR Gen error:', err));
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Exit fullscreen error:', err);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        ref={containerRef}
        className="bg-[#181C19] border border-stone-700 text-white rounded-xl shadow-2xl flex flex-col w-full max-w-6xl max-h-[96vh] overflow-hidden"
      >
        {/* TV Header controls */}
        <div className="bg-[#202522] px-6 py-3 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#F8971D] text-black font-mono font-bold text-xs px-2.5 py-1 rounded">
              TV BACKDROP 16:9
            </span>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                WETEX 2026 Dubai Booth Display Layout
              </h3>
              <p className="text-[11px] text-stone-400">
                1920 &times; 1080 Native Aspect Ratio • Live Scannable Mobile QR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Exit TV Fullscreen' : 'Enter TV Fullscreen'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close TV mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 16:9 Canvas Screen Frame */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-stone-950">
          <div className="w-full aspect-16/9 max-w-5xl bg-gradient-to-br from-[#1E4378] via-[#202522] to-[#181C19] border-2 border-stone-600 rounded-lg shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
            {/* Top Bar with Official Logo */}
            <div className="flex items-start justify-between relative z-10">
              <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
                <Logo variant="horizontal" size="md" />
              </div>

              <div className="text-right">
                <div className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
                  WETEX 2026 DUBAI
                </div>
                <div className="text-white text-xs font-medium">
                  Your Safety Our Priority
                </div>
              </div>
            </div>

            {/* Middle Section: Split screen with headline & TV center */}
            <div className="grid grid-cols-12 gap-6 items-center my-auto relative z-10">
              {/* Left Headline */}
              <div className="col-span-7 space-y-3">
                <div className="text-amber-400 font-heading font-black tracking-widest text-xs uppercase">
                  RANGERS SAFETY SYSTEMS LLC
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-md">
                  PROTECTING THE REGION'S WORKFORCE
                </h1>
                <p className="text-stone-300 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                  Premium Personal Protective Equipment &amp; Safety Solutions.
                </p>

                {/* 4 Value Pillars Banner */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-bold tracking-wide">
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1.5 rounded flex items-center gap-2 text-stone-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#438B3E]" />
                    <span>CERTIFIED HEAD-TO-TOE PPE</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1.5 rounded flex items-center gap-2 text-stone-200">
                    <Flame className="w-3.5 h-3.5 text-[#F8971D]" />
                    <span>HEAT STRESS &amp; SPECIALIZED GEAR</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1.5 rounded flex items-center gap-2 text-stone-200">
                    <Shirt className="w-3.5 h-3.5 text-blue-300" />
                    <span>CUSTOM INDUSTRIAL WORKWEAR</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-3 py-1.5 rounded flex items-center gap-2 text-stone-200">
                    <Warehouse className="w-3.5 h-3.5 text-emerald-300" />
                    <span>READY LOCAL INVENTORY</span>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code Area */}
              <div className="col-span-5 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-[#F8971D] space-y-2">
                  <div className="text-[11px] font-heading font-black text-[#1E4378] uppercase tracking-wider">
                    SCAN FOR MORE INFORMATION
                  </div>

                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Scannable QR Code to Rangers Safety Systems"
                      className="w-36 h-36 sm:w-44 sm:h-44 mx-auto"
                    />
                  ) : (
                    <div className="w-36 h-36 sm:w-44 sm:h-44 bg-stone-100 flex items-center justify-center text-stone-400">
                      <QrCode className="w-10 h-10 animate-spin" />
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-stone-600 font-bold uppercase tracking-widest">
                    Open On Your Phone
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Ribbon */}
            <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-stone-300">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">Rangers Safety Systems LLC</span>
                <span>•</span>
                <span>Unit SH01, Street 57, Jebel Ali Industrial First, Dubai, UAE</span>
              </div>
              <div className="font-mono text-stone-400">
                TRN: 100391707500003 • Tel: +971 4 244 5408
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
