import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Download, CheckCircle, Smartphone, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUrl?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  initialUrl,
}) => {
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [qrPngUrl, setQrPngUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const defaultUrl = initialUrl || window.location.href;
      setTargetUrl(defaultUrl);
      generateQr(defaultUrl);
    }
  }, [isOpen, initialUrl]);

  const generateQr = async (url: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 600,
        margin: 3,
        color: {
          dark: '#1E4378',
          light: '#FFFFFF',
        },
      });
      setQrPngUrl(dataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  if (!isOpen) return null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setTargetUrl(newUrl);
    generateQr(newUrl);
  };

  const downloadQr = () => {
    if (!qrPngUrl) return;
    const a = document.createElement('a');
    a.href = qrPngUrl;
    a.download = 'rangers-safety-exhibition-qr-code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white text-[#202522] rounded-xl shadow-2xl border border-stone-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1E4378] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#F8971D]" />
            <h3 className="font-heading font-bold text-base">
              Exhibition QR Code Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Close QR Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* QR Display */}
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-xl shadow-md border-2 border-stone-200">
              {qrPngUrl ? (
                <img
                  src={qrPngUrl}
                  alt="Rangers Safety Systems QR Code"
                  className="w-56 h-56 mx-auto object-contain"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center bg-stone-100">
                  <RefreshCw className="w-8 h-8 animate-spin text-stone-400" />
                </div>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-2 font-mono">
              Scan with iOS Camera, Android Camera, or Google Lens
            </p>
          </div>

          {/* Download Action */}
          <div>
            <button
              onClick={downloadQr}
              className="w-full bg-[#F8971D] hover:bg-[#e0840e] text-white font-bold text-xs py-3 px-4 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Printable Exhibition QR Card</span>
            </button>
          </div>

          {/* Customer Exhibition Guidance */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2.5 text-xs">
            <div className="font-bold text-[#1E4378] uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
              <span>Quick Exhibition Access Instructions</span>
            </div>
            <div className="space-y-2 text-stone-600 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0 mt-0.5" />
                <span>Open your smartphone camera or any QR scanner app.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0 mt-0.5" />
                <span>Focus your camera on the QR code above to immediately open the digital exhibition booklet.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#438B3E] shrink-0 mt-0.5" />
                <span>Browse our 24 certified footwear, coveralls, and PPE models on your mobile device.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
